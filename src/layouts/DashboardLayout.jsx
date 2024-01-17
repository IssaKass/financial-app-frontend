import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";
import Bars3Icon from "@heroicons/react/20/solid/Bars3Icon";
import ArrowsPointingInIcon from "@heroicons/react/20/solid/ArrowsPointingInIcon";
import ArrowsPointingOutIcon from "@heroicons/react/20/solid/ArrowsPointingOutIcon";
import MoonIcon from "@heroicons/react/20/solid/MoonIcon";
import SunIcon from "@heroicons/react/20/solid/SunIcon";
import useLocalStorage from "../hooks/useLocalStorage";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen((isOpen) => !isOpen);

  const handleTogglFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullScreen(true));
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className="min-h-screen w-full text-neutral-600 dark:text-neutral-400">
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-48 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto bg-primary-900 px-3 py-4">
          <ul className="flex h-full flex-col gap-2 font-medium">
            {[
              {
                title: "Analytics",
                to: "/analytics",
              },
              {
                title: "Projects",
                to: "/projects",
              },
              {
                title: "Subscriptions",
                to: "/subscriptions",
              },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className={`group flex items-center rounded-md p-2 text-white hover:bg-primary-700 dark:text-white
									${location.pathname === link.to && "bg-primary-700"}`}
                >
                  <span className="ms-3">{link.title}</span>
                </Link>
              </li>
            ))}
            <li className="mt-auto">
              <button
                className="group flex w-full items-center rounded-md p-2 text-white hover:bg-primary-700 dark:text-white"
                onClick={() => dispatch(logout())}
              >
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className={isSidebarOpen ? "ml-48" : ""}>
        <div className="bg-neutral-100 py-2 dark:bg-neutral-800">
          <div className="container mx-auto flex items-center gap-2 px-4">
            <button
              onClick={handleToggleSidebar}
              type="button"
              className="inline-flex items-center rounded-full p-1.5 text-sm text-neutral-500 hover:bg-neutral-200 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              <span className="sr-only">Toggle sidebar</span>
              <Bars3Icon className="h-5 w-5" />
            </button>
            <div className="flex flex-1 items-center justify-end gap-2">
              <button
                onClick={handleToggleDarkMode}
                type="button"
                className="inline-flex items-center rounded-full p-1.5 text-sm text-neutral-500 hover:bg-neutral-200 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Toggle color mode</span>
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={handleTogglFullScreen}
                type="button"
                className="inline-flex items-center rounded-full p-1.5 text-sm text-neutral-500 hover:bg-neutral-200 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Toggle Fullscreen</span>
                {isFullScreen ? (
                  <ArrowsPointingInIcon className="h-5 w-5" />
                ) : (
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                )}
              </button>
              <div className="inline-flex items-center rounded-full bg-neutral-500 p-1.5 text-sm font-bold text-white focus:outline-none">
                <span className="grid h-5 w-5 place-items-center">
                  {String(userInfo.username).charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useEffect, useState } from "react";
import {
  FaArrowRightFromBracket,
  FaBriefcase,
  FaCalendar,
  FaChartPie,
} from "react-icons/fa6";
import {
  PiArrowsInBold,
  PiArrowsOutBold,
  PiListBold,
  PiMoonBold,
  PiSunBold,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { logout, setCredentials } from "../features/auth/authSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGetUserDetailsQuery } from "../services/auth/authService";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "isSidebarOpen",
    true,
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen((isOpen) => !isOpen);

  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullScreen(true));
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen w-full text-neutral-600 dark:text-neutral-400">
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-48 transition-all ${
          isSidebarOpen ? "" : "w-16"
        }`}
      >
        <div className="h-full overflow-y-auto bg-primary-900 px-3 py-4">
          <ul className="flex h-full flex-col gap-4 overflow-hidden font-medium">
            {[
              {
                title: "Analytics",
                to: "/analytics",
                icon: <FaChartPie />,
              },
              {
                title: "Projects",
                to: "/projects",
                icon: <FaBriefcase />,
              },
              {
                title: "Subscriptions",
                to: "/subscriptions",
                icon: <FaCalendar />,
              },
              {
                title: "Logout",
                icon: <FaArrowRightFromBracket />,
                onClick: handleLogout,
              },
            ].map((link, index) => (
              <li key={index} className="last:mt-auto">
                <Link
                  to={link.to}
                  onClick={link.onClick}
                  className={`group flex h-10 w-full items-center gap-4 rounded-md px-3 text-white hover:bg-primary-700 dark:text-white
									${location.pathname === link.to && "bg-primary-700"}`}
                >
                  <div>{link.icon}</div>
                  <span
                    className={
                      isSidebarOpen
                        ? ""
                        : "invisible absolute left-full rounded bg-neutral-500 px-2 py-1 text-xs opacity-0 transition-all group-hover:visible group-hover:-translate-x-1 group-hover:opacity-100"
                    }
                  >
                    {link.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className={isSidebarOpen ? "ml-48" : "ml-16"}>
        <div className="bg-neutral-100 py-2 dark:bg-neutral-800">
          <div className="container mx-auto flex items-center gap-2 px-4">
            <button
              onClick={handleToggleSidebar}
              type="button"
              className="inline-flex items-center rounded-full p-1.5 text-sm text-neutral-500 hover:bg-neutral-200 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              <span className="sr-only">Toggle sidebar</span>
              <PiListBold className="h-5 w-5" />
            </button>
            <div className="flex flex-1 items-center justify-end gap-2">
              <button
                onClick={toggleDarkMode}
                type="button"
                className="inline-flex items-center rounded-full p-1.5 text-sm text-neutral-500 hover:bg-neutral-200 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Toggle color mode</span>
                {isDarkMode ? (
                  <PiSunBold className="h-5 w-5" />
                ) : (
                  <PiMoonBold className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={handleToggleFullScreen}
                type="button"
                className="inline-flex items-center rounded-full p-1.5 text-sm text-neutral-500 hover:bg-neutral-200 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Toggle Fullscreen</span>
                {isFullScreen ? (
                  <PiArrowsInBold className="h-5 w-5" />
                ) : (
                  <PiArrowsOutBold className="h-5 w-5" />
                )}
              </button>
              <div className="ms-2 inline-flex items-center rounded-full bg-neutral-500 p-1.5 text-sm font-bold text-white focus:outline-none">
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

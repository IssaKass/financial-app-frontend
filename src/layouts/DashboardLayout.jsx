import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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

  const links = [
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
      onClick: () => dispatch(logout()),
    },
  ];

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

  return (
    <div className="min-h-screen w-full">
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r transition-all ${
          isSidebarOpen ? "w-48" : "w-16"
        }`}
      >
        <div className="h-full overflow-y-auto px-3 py-4">
          <ul className="flex h-full flex-col gap-4 overflow-hidden font-medium">
            {links.map((link, index) => (
              <li key={index} className="last:mt-auto">
                <Link
                  to={link.to}
                  onClick={link.onClick}
                  className={`group flex h-10 w-full items-center gap-4 rounded-md px-3
									${location.pathname === link.to && "bg-primary text-primary-foreground"}`}
                >
                  <div>{link.icon}</div>
                  {isSidebarOpen && <span>{link.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className={isSidebarOpen ? "ml-48" : "ml-16"}>
        <div className="border-b py-2">
          <div className="mx-auto flex max-w-[100rem] items-center gap-2 px-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleToggleSidebar}
            >
              <span className="sr-only">Toggle sidebar</span>
              <PiListBold className="h-4 w-4" />
            </Button>
            <div className="flex flex-1 items-center justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
              >
                <span className="sr-only">Toggle color mode</span>
                {isDarkMode ? (
                  <PiSunBold className="h-4 w-4" />
                ) : (
                  <PiMoonBold className="h-4 w-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleToggleFullScreen}
              >
                <span className="sr-only">Toggle Fullscreen</span>
                {isFullScreen ? (
                  <PiArrowsInBold className="h-4 w-4" />
                ) : (
                  <PiArrowsOutBold className="h-4 w-4" />
                )}
              </Button>
              <Avatar className="ms-4">
                <AvatarFallback>
                  {String(userInfo.username).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[100rem] p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

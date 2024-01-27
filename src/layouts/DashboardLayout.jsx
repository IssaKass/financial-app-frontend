import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { firstLetterUppercase } from "@/utils/format";
import { FINANCIAL_UI_SIDEBAR_OPEN_KEY } from "@/utils/keys";
import {
  Brush,
  CalendarCheck,
  FolderDot,
  Laptop,
  LogOut,
  Maximize,
  Menu,
  Minimize,
  Moon,
  PieChart,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COLOR_MODES, useTheme } from "../contexts/ThemeContext";
import { logout, setCredentials } from "../features/auth/authSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGetUserDetailsQuery } from "../services/auth/authService";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    FINANCIAL_UI_SIDEBAR_OPEN_KEY,
    true,
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { colorMode, setColorMode } = useTheme();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  const [open, setOpen] = useState(false);

  const { isMac, isWindows } = useSelector((state) => state.os);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const links = [
    {
      title: "Analytics",
      to: "/analytics",
      icon: <PieChart size={20} />,
    },
    {
      title: "Projects",
      to: "/projects",
      icon: <FolderDot size={20} />,
    },
    {
      title: "Subscriptions",
      to: "/subscriptions",
      icon: <CalendarCheck size={20} />,
    },
  ];

  const commands = [
    {
      heading: "Links",
      id: "links",
      items: [
        {
          id: "analytics",
          children: "Analytics",
          icon: <PieChart />,
          onSelect: () => navigate("/analytics"),
        },
        {
          id: "projects",
          children: "Projects",
          icon: <FolderDot />,
          onSelect: () => navigate("/projects"),
        },
        {
          id: "subscriptions",
          children: "Subscriptions",
          icon: <CalendarCheck />,
          onSelect: () => navigate("/subscriptions"),
        },
      ],
    },
    {
      heading: "Settings",
      id: "settings",
      items: [
        {
          id: "profile",
          children: "Profile",
          icon: <User />,
          onSelect: () => navigate("/settings"),
        },
        {
          id: "appearance",
          children: "Appearance",
          icon: <Brush />,
          onSelect: () => navigate("/settings/appearance"),
        },
      ],
    },
    {
      heading: "Theme",
      id: "theme",
      items: [
        {
          id: "light",
          children: "Light",
          icon: <Sun />,
          onSelect: () => setColorMode(COLOR_MODES.LIGHT),
        },
        {
          id: "dark",
          children: "Dark",
          icon: <Moon />,
          onSelect: () => setColorMode(COLOR_MODES.DARK),
        },
        {
          id: "system",
          children: "System",
          icon: <Laptop />,
          onSelect: () => setColorMode(COLOR_MODES.SYSTEM),
        },
      ],
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
    <div className="flex min-h-screen w-full">
      <aside
        className={`h-screen border-r transition-all ${
          isSidebarOpen ? "w-48" : "w-16"
        }`}
      >
        <div className="grid h-14 place-items-center border-b"></div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto p-2">
          <ul className="flex h-full flex-col gap-2 overflow-hidden font-medium">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  onClick={link.onClick}
                  className={`flex h-9 w-full items-center rounded-md px-3
                  ${!isSidebarOpen && "justify-center"}
									${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground dark:bg-muted dark:text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  <div>{link.icon}</div>
                  {isSidebarOpen && (
                    <Typography className="ms-2.5" variant="subtitle2">
                      {link.title}
                    </Typography>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b">
          <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-2 px-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleToggleSidebar}
            >
              <span className="sr-only">Toggle sidebar</span>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex flex-1 items-center justify-end gap-0.5">
              <div className="relative me-2 flex-1">
                <Input
                  placeholder="Search..."
                  className="ms-auto h-8 w-48 text-xs max-sm:w-full"
                  onClick={() => setOpen(true)}
                />
                <kbd className="pointer-events-none absolute right-1 top-1/2 inline-flex h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Sun size={16} className="dark:hidden" />
                    <Moon size={16} className="hidden dark:block" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setColorMode(COLOR_MODES.LIGHT)}
                    className="gap-3"
                  >
                    <Sun size={16} />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setColorMode(COLOR_MODES.DARK)}
                    className="gap-3"
                  >
                    <Moon size={16} />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setColorMode(COLOR_MODES.SYSTEM)}
                    className="gap-3"
                    sName="gap-3"
                  >
                    <Laptop size={16} />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleToggleFullScreen}
              >
                <span className="sr-only">
                  {isFullScreen ? "Exit full screen" : "Enter full screen"}
                </span>
                {isFullScreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative ms-2 rounded-full"
                  >
                    <Avatar className="">
                      <AvatarFallback>
                        {firstLetterUppercase(userInfo.username)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>
                    <Typography variant="subtitle2">
                      {userInfo.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-muted-foreground"
                    >
                      {userInfo.email}
                    </Typography>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="/settings">
                      <DropdownMenuItem className="gap-3">
                        <Settings size={16} />
                        Settings
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-3"
                    onClick={() => dispatch(logout())}
                  >
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1000rem] p-6">{children}</div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {commands.map((command, index) => (
              <CommandGroup key={command.id} heading={command.heading}>
                {command.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      item.onSelect();
                      setOpen(false);
                    }}
                    className="gap-3"
                  >
                    {item.icon}
                    <span>{item.children}</span>
                  </CommandItem>
                ))}
                {index < commands.length - 1 && (
                  <CommandSeparator className="my-1" />
                )}
              </CommandGroup>
            ))}
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { firstLetterUppercase } from "@/utils/format";
import {
	Laptop,
	LogOut,
	Maximize,
	Menu,
	Minimize,
	Moon,
	Settings,
	Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COLOR_MODES } from "../contexts/ThemeContext";
import { logout } from "../features/user/userSlice";

import {
	Brush,
	CalendarCheck,
	FolderDot,
	PieChart,
	UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { setCredentials } from "../features/user/userSlice";
import { useGetUserDetailsQuery } from "../services/auth/authService";

const Navbar = ({ onToggleSidebar, onToggleCollapse }) => {
	const navigate = useNavigate();

	const [isFullScreen, setIsFullScreen] = useState(false);

	const { setColorMode } = useTheme();

	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { data } = useGetUserDetailsQuery("userDetails", {
		pollingInterval: 900000,
	});

	const [open, setOpen] = useState(false);

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
					id: "public-profile",
					children: "Public Profile",
					icon: <UserRound />,
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
		<div className="sticky top-0 z-50 flex h-[var(--nav-height)] items-center border-b bg-background shadow-sm">
			<div className="container flex w-full items-center justify-between gap-2">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onToggleSidebar}
				>
					<span className="sr-only">Toggle sidebar</span>
					<Menu className="h-4 w-4" />
				</Button>
				<div className="flex flex-1 items-center justify-end gap-0.5">
					<div className="relative me-2 flex-1">
						<Input
							placeholder="Search..."
							className="ms-auto h-8 w-48 text-xs max-sm:w-full"
							variant="filled"
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
							<DropdownMenuItem onClick={() => setColorMode(COLOR_MODES.LIGHT)}>
								<Sun size={16} className="me-2" />
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setColorMode(COLOR_MODES.DARK)}>
								<Moon size={16} className="me-2" />
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setColorMode(COLOR_MODES.SYSTEM)}
							>
								<Laptop size={16} className="me-2" />
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
								<Avatar className="border">
									<AvatarFallback>
										{firstLetterUppercase(userInfo.username)}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48" align="end">
							<DropdownMenuLabel>
								<Typography variant="subtitle2">{userInfo.username}</Typography>
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
									<DropdownMenuItem>
										<Settings size={16} className="me-2" />
										Settings
									</DropdownMenuItem>
								</Link>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => dispatch(logout())}>
								<LogOut size={16} className="me-2" />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
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
								>
									<div className="me-2">{item.icon}</div>
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
	);
};

export default Navbar;

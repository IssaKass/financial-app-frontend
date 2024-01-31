import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
} from "@/components/ui/sheet";
import { Typography } from "@/components/ui/typography";
import { useMediaQuery } from "@/hooks/use-media-query";

import { CalendarCheck, FolderDot, PieChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, onToggleSidebar }) => {
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

	const location = useLocation();

	const isMobile = useMediaQuery("(max-width: 767px)");

	const renderedSidebar = (
		<ul className="space-y-2">
			{links.map((link, index) => (
				<li key={index}>
					<Button
						variant={location.pathname === link.to ? "default" : "ghost"}
						className={`w-full justify-start`}
						size="sm"
						asChild
					>
						<Link to={link.to} onClick={link.onClick}>
							<div>{link.icon}</div>
							<Typography className="ms-2.5" variant="subtitle2">
								{link.title}
							</Typography>
						</Link>
					</Button>
				</li>
			))}
		</ul>
	);

	if (isMobile) {
		return (
			<Sheet open={isSidebarOpen} onOpenChange={onToggleSidebar}>
				<SheetContent side="left" className="w-[200px] px-2 py-12">
					<SheetHeader>
						<SheetDescription>{renderedSidebar}</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<aside className="h-screen border-r shadow-sm transition-all w-44">
			<div className="grid h-[var(--nav-height)] place-items-center border-b relative"></div>
			<div className="h-[calc(100vh-var(--nav-height))] overflow-y-auto p-2">
				{renderedSidebar}
			</div>
		</aside>
	);
};

export default Sidebar;

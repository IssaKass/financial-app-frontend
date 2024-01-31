import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen((open) => !open);

	return (
		<div className="flex min-h-screen w-full">
			<Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
			<div className="h-screen flex-1 overflow-y-auto">
				<Navbar onToggleSidebar={toggleSidebar} />
				<div className="container py-6">{children}</div>
			</div>
		</div>
	);
};

export default DashboardLayout;

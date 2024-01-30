import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import DashboardLayout from "@/layouts/DashboardLayout";
import { firstLetterUppercase } from "@/utils/format";

import { Brush, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SettingsLayout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  const links = [
    {
      title: "Public Profile",
      to: "/settings",
      icon: <UserRound size={16} />,
    },
    {
      title: "Appearance",
      to: "/settings/appearance",
      icon: <Brush size={16} />,
    },
  ];

  return (
    <DashboardLayout>
      <header>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2">
            <AvatarFallback>
              {firstLetterUppercase(userInfo.username)}
            </AvatarFallback>
          </Avatar>
          <Typography variant="h4" component="h1" className="flex items-center">
            {userInfo.name || userInfo.username}
            <span className="text-muted-foreground ms-2 text-[75%]">({userInfo.username})</span>
          </Typography>
        </div>
      </header>
      <main className="mt-8 flex gap-x-8 gap-y-12 flex-col md:flex-row">
        <aside >
          <ul className="space-y-2 md:w-36 lg:w-48">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  onClick={link.onClick}
                  className={`relative flex w-full items-center gap-2 rounded-md px-2 py-1
									${location.pathname === link.to
                      ? "bg-secondary text-secondary-foreground before:absolute before:-left-2 before:h-[60%] before:w-1 before:rounded-full before:bg-primary dark:bg-muted dark:text-white"
                      : "hover:bg-muted"
                    }`}
                >
                  {link.icon}
                  <Typography variant="body2" component="span">
                    {link.title}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="flex-1">{children}</section>
      </main>
    </DashboardLayout>
  );
};

export default SettingsLayout;

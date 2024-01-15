import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const handleOpenSidebar = () => setIsSidebarOpen((isOpen) => !isOpen);

  return (
    <div className="min-h-screen text-neutral-600 dark:text-neutral-400">
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
      <div className={isSidebarOpen && "ml-48"}>
        <div className="bg-neutral-100 px-4 py-2 dark:bg-neutral-800">
          <button
            onClick={handleOpenSidebar}
            type="button"
            className="inline-flex items-center rounded-md p-2 text-sm text-neutral-500 hover:bg-neutral-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mx-auto max-w-[80rem] p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

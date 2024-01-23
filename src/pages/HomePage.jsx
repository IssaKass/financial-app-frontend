import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const HomePage = () => {
  const { userToken } = useSelector((state) => state.auth);

  const links = [
    {
      title: "Login",
      to: "/login",
    },
    {
      title: "Register",
      to: "/register",
    },
  ];

  return (
    <>
      {userToken ? (
        <Navigate to="/analytics" />
      ) : (
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to Financial</h1>
            <div className="mt-8 flex items-center justify-center gap-x-2">
              {links.map((link, index) => (
                <Link key={index} to={link.to}>
                  <Button size="sm">{link.title}</Button>
                </Link>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default HomePage;

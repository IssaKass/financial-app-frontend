import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-black dark:text-white md:text-5xl">
          Welcome to Financial
        </h1>
        <div className="mt-8 flex items-center justify-center gap-x-2">
          <Link
            to="/login"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

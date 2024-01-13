import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useSelector } from "react-redux";

const AnalyticsPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <DashboardLayout>
      <div className="rounded-md bg-primary-600/10 p-4">
        <h2 className="text-3xl font-bold">{userInfo.username}</h2>
        <p>{userInfo.email}</p>
      </div>
      <div></div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;

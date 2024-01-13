import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth);

  return <>{userToken ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;

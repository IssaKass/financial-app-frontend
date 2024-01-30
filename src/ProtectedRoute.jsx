import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user);

  return <>{userToken ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;

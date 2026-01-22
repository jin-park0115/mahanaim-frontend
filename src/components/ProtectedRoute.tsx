import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";
import AuthLoading from "./AuthLoading";

const ProtectedRoute = () => {
  const { user, authLoading } = useUserStore();

  if (authLoading) return <AuthLoading />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

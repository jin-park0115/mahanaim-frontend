import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedRoute = () => {
  const { user, isLoading } = useUserStore();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

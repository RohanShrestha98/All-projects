import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

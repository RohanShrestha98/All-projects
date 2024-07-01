import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { getAccessToken } from './cookie';

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return auth.access || getAccessToken() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

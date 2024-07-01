import { getUserDetails } from '../utils/cookie';
import { Navigate, Outlet } from 'react-router-dom';

interface IRoleHandlerProps {
  permittedRoles: string[];
}

export const RoleHandler = ({ permittedRoles }: IRoleHandlerProps) => {
  const roles = getUserDetails().roles;
  if (!roles) {
    window.location.replace('/login');
  }
  return permittedRoles.some((role: string) => roles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/401" replace />
  );
};

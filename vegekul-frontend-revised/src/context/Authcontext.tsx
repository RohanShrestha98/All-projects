/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
import React, { ReactNode, useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { getUserDetails } from '../utils/cookie';
import { UserResponseType } from '../types';
import { useLocation } from 'react-router-dom';

type AuthState = {
  access: string;
  refresh: string;
};

interface IAuthProps {
  children: ReactNode;
}

type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  roles: string[];
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
  user: UserResponseType;
  setUser: React.Dispatch<React.SetStateAction<UserResponseType>>;
};

const defaultUser: UserResponseType = {
  idx: '',
  first_name: '',
  last_name: '',
  email: '',
  avatar: '',
  is_active: '',
};

const AuthContext = createContext<AuthContextType>({
  auth: { access: '', refresh: '' },
  setAuth: () => { },
  roles: [],
  setRoles: () => { },
  user: defaultUser,
  setUser: () => { },
});

export const AuthProvider: React.FC<IAuthProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ access: '', refresh: '' });
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUser] = useState<UserResponseType>(defaultUser);

  const location = useLocation();
  if (
    !getUserDetails() &&
    !['/login', '/reset-password'].includes(location.pathname)
  ) {
    window.location.replace('/login');
  }
  useEffect(() => {
    if (location.pathname === '/login') {
      return;
    }
    if (roles?.length === 0) {
      setRoles(getUserDetails()?.roles);
    }
    if (user?.idx === '') {
      setUser(getUserDetails());
    }
  }, [roles, user]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        roles,
        setRoles,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);

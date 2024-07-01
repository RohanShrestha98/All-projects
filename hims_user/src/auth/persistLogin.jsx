import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useAuthContext } from "../context/authContext";
import { useToken } from "../hooks/useToken";

const PersistLogin = () => {
  const refreshTokenFn = useToken();
  const { auth } = useAuthContext();
  const cookie = new Cookies();

  useEffect(() => {
    !auth?.accessToken && cookie.get("refreshToken") && refreshTokenFn();
  }, [refreshTokenFn, auth, cookie?.get("refreshToken")]);

  return <Outlet />;
};

export default PersistLogin;

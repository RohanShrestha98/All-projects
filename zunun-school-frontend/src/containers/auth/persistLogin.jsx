import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";

const PersistLogin = () => {
  const refreshTokenFn = useToken();
  const { auth } = useAuthContext();
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refreshTokenFn();
      } catch (error) {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        cookies.remove("userDetails");
        navigate("/login");
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && cookies.get("refreshToken")
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [refreshTokenFn, auth, cookies.get("refreshToken")]);

  return !isLoading && <Outlet />;
};

export default PersistLogin;

import { useEffect } from "react";
import { useToken } from "./useToken";
import { useAuthContext } from "../context/authContext";
import { axiosPrivate } from "../utils/axios";

const useAxiosPrivate = () => {
  const refreshTokenFn = useToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = auth?.accessToken
            ? `Bearer ${auth?.accessToken}`
            : undefined;
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error?.config;
        if (error?.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshTokenFn();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshTokenFn]);
  return axiosPrivate;
};

export default useAxiosPrivate;

import axios from "../utils/axios";
import { useAuthContext } from "../context/authContext";
import Cookies from "universal-cookie";
import { decryptedData } from "../utils/crypto";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { usePermissionContext } from "../context/permissionContext";

export const useToken = () => {
  const { setAuth } = useAuthContext();
  const { setPermissions } = usePermissionContext();
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();

  const refreshTokenFn = async () => {
    try {
      const response = await axios.post("auth/v1/token/access/", {
        refresh: decryptedData(cookies.get("refreshToken")),
      });

      setAuth(prev => ({
        ...prev,
        accessToken: response?.data?.data?.access,
      }));
      return response?.data?.data?.access;
    } catch (error) {
      setAuth({});
      setPermissions({});
      cookies.remove("refreshToken");
      cookies.remove("userDetails");
      localStorage.removeItem("permissions");
      message.error(
        error?.response?.data?.errors?.error?.toString() || "Token expired",
      );
      navigate("/login", { replace: true });
    }
  };
  return refreshTokenFn;
};

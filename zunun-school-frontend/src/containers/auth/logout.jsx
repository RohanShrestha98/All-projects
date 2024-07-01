import { message } from "antd";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuthContext } from "../../context/authContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { usePermissionContext } from "../../context/permissionContext";

const useHandleLogout = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuthContext();
  const { setPermissions } = usePermissionContext();
  const cookies = new Cookies({ path: "/" });
  const logout = async () => {
    try {
      const response = await axiosPrivate.post("auth/v1/account/logout/");
      if (response?.data) {
        setAuth({});
        setPermissions({});
        cookies.remove("refreshToken");
        cookies.remove("userDetails");
        localStorage.clear();
        message.success("Logout Successfully", [2]);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      message.error(JSON.stringify(error.message), [2]);
    }
  };
  return logout;
};

export default useHandleLogout;

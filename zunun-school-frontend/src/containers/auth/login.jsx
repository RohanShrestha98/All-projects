import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import AntdCheckbox from "../../components/UI/antdCheckbox";
import InputFileld from "../../components/inputFiled/inputField";
import { useAuthMutation } from "../../hooks/useMutateData";
import { useAuthContext } from "../../context/authContext";
import Cookies from "universal-cookie";
import { encryptData } from "../../utils/crypto";
import uk_flag from "../../assets/flags/uk.webp";
import spain_flag from "../../assets/flags/spain.webp";
import { usePermissionContext } from "../../context/permissionContext";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

const loginSchema = Yup.object().shape({
  identity: Yup.string()
    .required("Required")
    .max(36, "Must be 36 characters or less"),

  password: Yup.string().required("Required"),
});

const Login = () => {
  const { setAuth } = useAuthContext();
  const { setPermissions } = usePermissionContext();
  const authMutation = useAuthMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const cookies = new Cookies({ path: "/" });

  // const { t } = useTranslation();

  const [langDropDown, setLangDropDown] = useState(false);
  const languages = [
    {
      id: 1,
      name: "english",
      flag: uk_flag,
      code: "en",
    },
    {
      id: 2,
      name: "spanish",
      flag: spain_flag,
      code: "es",
    },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const onSubmitHandler = async data => {
    try {
      const result = await authMutation.mutateAsync(["post", "", data]);
      if (result?.success) {
        message.success("Login Successfully", [2]);
        const userDetailsData = {
          accessToken: result?.data?.access,
          user: {
            id: result?.data?.user?.id || "",
            firstName: result?.data?.user?.firstName || "",
            surname: result?.data?.user?.surname || "",
            email: result?.data?.user?.email || "",
            username: result?.data?.user?.username || "",
            cellular: result?.data?.user?.cellular || "",
            schoolName: result?.data?.schoolName || "",
            birthplace: result?.data?.user?.birthplace || "",
            dob: result?.data?.user?.dob || "",
            gender: result?.data?.user?.gender || "",
            homePhone: result?.data?.user?.homePhone || "",
            role: result?.data?.user?.role || {},
            file: result?.data?.user?.file || {},
          },
        };
        const userPermissionsData = {
          permissions: result?.data?.user?.permissions,
        };
        setAuth(userDetailsData);
        cookies.set("refreshToken", encryptData(result?.data?.refresh));
        cookies.set("accessToken", encryptData(result?.data?.access));
        cookies.set("userDetails", encryptData(userDetailsData));
        setPermissions(userPermissionsData);
        localStorage.setItem("permissions", encryptData(userPermissionsData));
        reset();
        navigate(from, { replace: true });
      } else {
        message.error(result?.response?.data?.errors?.error.toString(), [2]);
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.errors?.error
        ? error?.response?.data?.errors?.error?.toString()
        : error?.message?.toString();
      message.error(errorMessage, [2]);
    }
  };

  return (
    <div className="md:bg-white w-1/2 xl:w-2/3 lg:w-3/4 md:w-full h-full flex ml-12 md:ml-0 flex-col md:gap-16 md:h-[100vh]  md:px-6 md:py-16">
      <div className="hidden md:block px-4  ">
        <ImArrowLeft2 onClick={() => navigate(-1)} />
      </div>
      <div className=" sm:w-full items-center  justify-center flex flex-col sm:gap-16 ">
        <div className="flex-col bg-white w-full  sm:w-full px-6 py-8 sm:py-0 rounded-lg sm:border-none space-y-6 sm:space-y-16">
          <div className="flex items-start justify-between">
            <div className="text-2xl sm:text-5xl font-bold text-gray-4">
              Login to your <span className="block sm:mt-1">Account</span>
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex flex-col w-full space-y-4 sm:space-y-4 "
            >
              <div className="rounded-md">
                <InputFileld
                  {...register("identity")}
                  name="identity"
                  type="text"
                  placeholder="Username / Email"
                  prefixIcon={<MailOutlined />}
                />
                <p className="text-red text-sm">{errors?.identity?.message}</p>
              </div>
              <div className="rounded-md">
                <InputFileld
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Password"
                  prefixIcon={<LockOutlined />}
                />
                <p className="text-red text-sm">{errors?.password?.message}</p>
              </div>
              <div className="flex flex-row items-center justify-between space-x-6 py-[10px]">
                <AntdCheckbox />
              </div>
              <button
                disabled={!isValid}
                type="submit"
                className={`flex justify-center items-center gap-2 rounded-full ${
                  isValid
                    ? "bg-blue-light text-white"
                    : "bg-gray-100 sm:bg-gray-dark text-neutral sm:text-white"
                }  sm:p-4 p-2 `}
              >
                Sign In <ImArrowRight2 />
              </button>
            </form>
          </div>
        </div>
        {/* <div>
          <Divider orientation="center" plain>
            or continue with
          </Divider>
          <div className="flex flex-row items-center justify-center gap-8">
            <div className="px-6 py-1 sm:px-6 sm:py-4 border sm:rounded-2xl rounded-full border-zinc-300">
              <Link to="https://www.facebook.com/">
                <FaFacebook className="text-blue-500" size={24} />
              </Link>
            </div>
            <div className="px-6 py-1 sm:px-6 sm:py-4 border sm:rounded-2xl rounded-full border-zinc-300">
              <Link to="https://www.google.com/">
                <FcGoogle size={24} />
              </Link>
            </div>
          </div>
        </div> */}
        <div className="my-4 text-center">
          <span className="text-black">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-cyan ">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../hooks/useMutateData";
import { useAuthContext } from "../context/authContext";
import Cookies from "universal-cookie";
import { encryptData } from "../utils/crypto";
import InputField from "../components/InputField";
import loading from "../assets/loading.webp";
import { toast } from "react-toastify";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { useState } from "react";

const Login = () => {
  const { setAuth } = useAuthContext();
  const authMutation = useAuthMutation();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies({ path: "/" });
  const isLibraryENV = import.meta.env.VITE_IS_LIBRARY;

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  });
  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    try {
      const result = await authMutation.mutateAsync(["post", "", data]);
      if (result?.status === 200) {
        const userDetailsData = {
          accessToken: result?.data?.access,
          user: result?.data?.user,
        };
        setIsLoading(false);
        setAuth(userDetailsData);
        cookies.set("accessToken", encryptData(result?.data?.access));
        cookies.set("userDetails", encryptData(userDetailsData));
        reset();
        toast.success("Login Success");
        result?.data?.user?.has_filled_work_experience &&
        result?.data?.user?.has_filled_education_info &&
        result?.data?.user?.has_filled_profile_info
          ? navigate(isLibraryENV == "true" ? "/library" : "/")
          : navigate("/profile-add");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      toast.error(error?.response?.data?.detail);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen sm:w-full">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 w-[460px] sm:w-full sm:shadow-none  sm:px-6 py-10 px-14  "
      >
        <h1 className=" font-bold text-2xl pt-4 text-gray-600">
          Welcome Back !
        </h1>
        <p className="text-gray-500 text-xs mb-4 ">
          Enter your Credentials to access your account
        </p>
        <InputField
          icon={<MdOutlineEmail />}
          register={register}
          registerName="email"
          type="email"
          label={"Email"}
          required={true}
          // isIcon={true}

          placeholder="Email"
        />
        {error?.email && (
          <p className="text-red-600 text-xs">{error?.email?.[0]}</p>
        )}

        <InputField
          icon={<MdOutlineLock />}
          className={"mt-1"}
          // isIcon={true}
          register={register}
          label={"Password"}
          required={true}
          registerName="password"
          type="password"
          placeholder="Password"
        />
        {error?.password && (
          <p className="text-red-600 text-xs">{error?.password?.[0]}</p>
        )}

        <div className="w-full">
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <p className="text-[#343434] text-xs font-medium">
                Keep me logged in
              </p>
            </div>
            <p className="text-red-500 text-xs font-semibold cursor-pointer">
              Forgot your password?
            </p>
          </div>
        </div>
        <button
          disabled={isLoading}
          className={`rounded-lg mt-2 hover:opacity-70 border flex gap-2 justify-center items-center w-full h-10  bg-[#265CC0] text-white`}
        >
          {isLoading && <img className="w-6 h-6" src={loading} />}
          <p>Login</p>
        </button>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-semibold text-gray-500 text-xs">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                navigate("/sign-up");
              }}
              className="text-[#265CC0] underline cursor-pointer"
            >
              {" "}
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

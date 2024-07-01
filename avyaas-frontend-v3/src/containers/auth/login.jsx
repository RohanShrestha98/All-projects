/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuthMutation } from "../../hooks/useMutateData";
import InputFielld from "../../components/inputField/inputField";
import logo1 from "../../assets/logo1.png";
import loginBgR from "../../assets/loginBgR.svg";
import loginBgL from "../../assets/loginBgL.svg";
import { useAuthStore } from "../../store/useAuthStore";
import Button from "../../components/UI/button";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import VerificationForm from "./verificationForm";

const loginSchema = Yup.object().shape({
  identity: Yup.string()
    .required("Required")
    .max(36, "Must be 36 characters or less"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { login } = useAuthStore();
  const { setUser } = useAuthStore();
  const authMutation = useAuthMutation();
  const navigate = useNavigate();
  const [isVerification, setIsVerification] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmitHandler = (data) => {
    const result = authMutation.mutateAsync(["post", "", data], {
      onSuccess: (res) => {
        setUser({
          token: res?.access,
          refresh: res?.refresh,
        });
        message.success("Login Successfully", [2]);
        login(res?.data);
        navigate("/enrolledCourse");
        reset();
      },
      onError: (error) => {
        let errorMessage =
          error.response?.data?.errors?.error || "Login Failed!";
        if (isAxiosError(error)) {
          if (!error.response?.data) errorMessage = "No Server Response!";
          if (
            errorMessage === "unverified account: please verify your account"
          ) {
            setIsVerification(false);
          }
          message.error(errorMessage, [2]);
        }
      },
    });
    return result;
  };

  return (
    <>
      <img src={loginBgR} className="absolute right-0 sm:w-7" alt="" />
      <div className="flex md:justify-center px-4">
        <img className="h-20 w-20" src={logo1} alt="logo" />
      </div>
      {isVerification ? (
        <div className="flex flex-col items-center md:justify-center mt-20 w-full">
          <div className="flex flex-col w-1/2 md:w-full">
            <div className="flex md:px-4 flex-col gap-2 mb-10 md:items-center tracking-tight md:justify-center text-2xl sm:text-xl  ">
              <p className="text-[#4D4D4D] font-semibold">Log in</p>
              <p className="text-[#666] text-sm ">
                Enter your credentials to login to your account.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex w-full flex-col gap-3 md:px-4"
            >
              <InputFielld
                className="outline-none bg-white w-full text-sm"
                {...register("identity", {
                  required: true,
                  pattern: {
                    value:
                      /^9\d{9}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email or phone number",
                  },
                })}
                name="identity"
                type="text"
                placeholder="Email or Phone number"
                errorMessage={errors?.identity?.message}
              />
              <InputFielld
                className="outline-none bg-white w-full text-sm"
                {...register("password")}
                name="password"
                type="password"
                placeholder="Password"
                errorMessage={errors?.password?.message}
              />
              <Link
                to={`/forgot-password`}
                className={`tracking-tight flex gap-2 justify-end`}
              >
                <p className="text-[#C1230D] text-sm underline lg:text-xs whitespace-nowrap cursor-pointer">
                  Forgot your password?
                </p>
              </Link>
              <img
                src={loginBgL}
                className="hidden md:block bottom-0 absolute justify-start left-0 sm:w-7"
                alt=""
              />
              <Button
                buttonName={"Log in"}
                type="submit"
                isLoading={authMutation.isPending}
                className={`flex mt-2 justify-center items-center gap-2 rounded-lg cursor-pointer bg-theme-color hover:bg-white border hover:text-black text-white sm:p-4 p-2`}
              />
            </form>
          </div>
          <div className="flex whitespace-nowrap justify-center tracking-tight text-sm gap-1 mt-32 md:mt-60">
            <p className="text-[#666]">Don’t have an account? </p>

            <p
              onClick={() => navigate("/signup")}
              className="text-theme-color cursor-pointer underline"
            >
              Create a free account
            </p>
          </div>
        </div>
      ) : (
        <VerificationForm
          identity={getValues("identity")}
          handleSuccess={() => {
            reset();
            setIsVerification(true);
          }}
        />
      )}
    </>
  );
};

export default Login;

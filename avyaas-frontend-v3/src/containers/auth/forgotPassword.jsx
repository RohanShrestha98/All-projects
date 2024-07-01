/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  useResendOTPMutation,
  useResetPasswordMutation,
} from "../../hooks/useMutateData";
import InputFielld from "../../components/inputField/inputField";
import logo1 from "../../assets/logo1.png";
import loginBgR from "../../assets/loginBgR.svg";
import loginBgL from "../../assets/loginBgL.svg";
import Button from "../../components/UI/button";
import { useState } from "react";
import InputField from "../../components/inputField/inputField";
import { isAxiosError } from "axios";

const resetSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .max(36, "Must be 36 characters or less"),
  newPassword: Yup.string()
    .required("This field is required")
    .min(8, "Must be 10 characters or more"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .min(8, "Must be 8 characters or more")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const otpSchema = Yup.object().shape({
  identity: Yup.string()
    .required("Phone or Email is required")
    .max(36, "Must be 36 characters or less"),
});

const ForgotPassword = () => {
  const sendOTPMutation = useResendOTPMutation();
  const resetPasswordMutation = useResetPasswordMutation();
  const navigate = useNavigate();
  const [isVerification, setIsVerification] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(isVerification ? resetSchema : otpSchema),
  });

  const onPasswordResetHandler = async (data) => {
    const postData = {
      otp: data?.otp,
      identity: data?.identity,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    };
    await resetPasswordMutation.mutateAsync(["post", "", postData], {
      onSuccess: () => {
        message.success("Password Reset Successful", [2]);
        reset();
        navigate("/login");
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          if (!error?.response?.data) errorMsg = "No Server Response!";

          let errorMsg = error?.response?.data;
          if (error?.response?.data?.errors) {
            setError(
              "otp",
              {
                type: "manual",
                message: error?.response?.data?.errors?.otp,
              },
              { shouldFocus: true }
            );
          } else {
            message.error(errorMsg?.error, [2]);
          }
        }
      },
    });
  };

  const onOTPSubmitHandler = async (data) => {
    const postData = {
      identity: data?.identity,
    };
    await sendOTPMutation.mutateAsync(["post", "", postData], {
      onSuccess: () => {
        message.success("OTP Sent Successfully", [2]);
        setIsVerification(true);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          if (!error?.response?.data) errorMsg = "No Server Response!";

          let errorMsg = error?.response?.data;
          message.error(errorMsg?.error, [2]);
        }
      },
    });
  };

  return (
    <>
      <img src={loginBgR} className="absolute right-0 sm:w-7" alt="" />
      <div className="flex md:justify-center px-4">
        <img className="h-20 w-20" src={logo1} alt="logo" />
      </div>
      {!isVerification ? (
        <div className="flex flex-col items-center md:justify-center mt-20 w-full">
          <div className="flex flex-col w-1/2 md:w-full">
            <div className="flex flex-col gap-2 mb-10 sm:items-center tracking-tight sm:justify-center text-2xl sm:text-xl font-semibold">
              <p className="text-[#4D4D4D]">Forgot Password</p>
              <p className="text-[#666] text-sm">
                Enter your registered phone or email.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onOTPSubmitHandler)}
              className="flex md:w-full flex-col gap-3"
            >
              <InputFielld
                className="outline-none bg-white w-full text-sm"
                {...register("identity")}
                name="identity"
                type="text"
                placeholder="Phone or Email"
                required
                errorMessage={errors?.identity?.message}
              />
              <img
                src={loginBgL}
                className="hidden md:block bottom-0 absolute justify-start left-0 sm:w-7"
                alt=""
              />
              <Button
                buttonName={"Submit"}
                type="submit"
                isLoading={sendOTPMutation.isPending}
                className={`flex mt-2 justify-center items-center gap-2 rounded-lg cursor-pointer bg-theme-color hover:bg-white border hover:text-black text-white sm:p-4 p-2`}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center md:justify-center mt-20">
          <div className="flex flex-col w-1/2 md:w-full">
            <div className="flex flex-col gap-2 mb-10 md:items-center tracking-tight md:justify-center text-2xl sm:text-xl ">
              <p className="text-[#4D4D4D] font-semibold ">Forgot Password</p>
              <p className="text-[#666] text-sm ">
                Enter the following credentials to reset your account.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onPasswordResetHandler)}
              className="flex w-full flex-col gap-2 md:px-4"
            >
              <InputFielld
                className="outline-none bg-white w-full text-sm"
                {...register("otp")}
                name="otp"
                type="text"
                placeholder="xxxxxx"
                required
                errorMessage={errors?.otp?.message}
              />
              <InputField
                className="outline-none bg-white w-full text-sm"
                {...register("newPassword")}
                name="newPassword"
                type="password"
                placeholder="New Password"
                errorMessage={errors?.newPassword?.message}
              />

              <InputField
                className="outline-none bg-white w-full text-sm"
                {...register("confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                errorMessage={errors?.confirmPassword?.message}
              />
              <img
                src={loginBgL}
                className="hidden md:block bottom-0 absolute justify-start left-0 sm:w-7"
                alt=""
              />
              <Button
                buttonName={"Reset Password"}
                type="submit"
                isLoading={resetPasswordMutation.isPending}
                className={`flex mt-2 justify-center items-center gap-2 rounded-lg cursor-pointer bg-theme-color hover:bg-white border hover:text-black text-white sm:p-4 p-2`}
              />
            </form>
          </div>
          <div className="flex whitespace-nowrap justify-center tracking-tight text-sm gap-1 mt-20">
            <p className="text-[#666]">Remembered your password? </p>
            <p
              onClick={() => navigate("/login")}
              className="text-theme-color cursor-pointer underline"
            >
              Login
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;

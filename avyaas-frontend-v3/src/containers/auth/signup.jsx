/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthSignupMutation } from "../../hooks/useMutateData";
import { message } from "antd";
import loginBgR from "../../assets/loginBgR.svg";
import loginBgL from "../../assets/loginBgL.svg";
import logo1 from "../../assets/logo1.png";
import InputField from "../../components/inputField/inputField";
import { useAuthStore } from "../../store/useAuthStore";
import Button from "../../components/UI/button";
import { isAxiosError } from "axios";
import VerificationForm from "./verificationForm";

const signupSchema = Yup.object().shape({
  collegeName: Yup.string().optional(),
  identity: Yup.string()
    .required("Email or Phone is required")
    .min(10, "Must be 8 characters or more"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "Must be 10 characters or more"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .min(8, "Must be 8 characters or more")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .max(36, "Must be 36 characters or less"),
});

export const Signup = () => {
  const signupMutation = useAuthSignupMutation();
  const navigate = useNavigate();
  const [isVerification, setIsVerification] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(isVerification ? signupSchema : otpSchema),
  });
  const { setPhone } = useAuthStore();

  const onSubmitHandler = (data) => {
    signupMutation.mutateAsync(["post", "", data], {
      onSuccess: () => {
        setPhone(data?.phone);
        message.success("Registration Successful", [2]);
        setIsVerification(false);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          if (!error?.response?.data) errorMsg = "No Server Response!";

          let errorMsg = error?.response?.data;
          if (error?.response?.data?.errors) {
            setError(
              "identity",
              {
                type: "manual",
                message: error?.response?.data?.errors?.email,
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

  return (
    <>
      <img src={loginBgR} className="absolute right-0 sm:w-7" alt="" />
      <div className="flex md:justify-center px-4">
        <img className="h-20 w-20" src={logo1} alt="logo" />
      </div>
      {isVerification ? (
        <div className="flex flex-col items-center md:justify-center mt-20">
          <div className="flex flex-col w-1/2 md:w-full">
            <div className="flex flex-col gap-2 mb-10 md:items-center tracking-tight md:justify-center text-2xl sm:text-xl ">
              <p className="text-[#4D4D4D] font-semibold ">Sign up</p>
              <p className="text-[#666] text-sm ">
                Enter the following credentials to create an account.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex w-full flex-col gap-2 md:px-4"
            >
              <InputField
                className="outline-none bg-white w-full text-sm"
                {...register("collegeName")}
                name="collegeName"
                type="text"
                placeholder="College Name"
                errorMessage={errors?.collegeName?.message}
              />

              <InputField
                className="outline-none bg-white w-full text-sm"
                {...register("identity")}
                name="identity"
                type="text"
                placeholder="Phone or Email"
                errorMessage={errors?.identity?.message}
              />

              <InputField
                className="outline-none bg-white w-full text-sm"
                {...register("password")}
                name="password"
                type="password"
                placeholder="Password"
                errorMessage={errors?.password?.message}
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
                buttonName={"Sign up"}
                type="submit"
                isLoading={signupMutation.isPending}
                className={`flex mt-2 justify-center items-center gap-2 rounded-lg cursor-pointer bg-theme-color hover:bg-white border hover:text-black text-white sm:p-4 p-2`}
              />
            </form>
          </div>
          <div className="flex whitespace-nowrap justify-center tracking-tight text-sm gap-1 mt-20">
            <p className="text-[#666]">Already have an account? </p>
            <p
              onClick={() => navigate("/login")}
              className="text-theme-color cursor-pointer underline"
            >
              Login
            </p>
          </div>
        </div>
      ) : (
        <VerificationForm
          identity={getValues("identity")}
          handleSuccess={() => {
            reset();
            navigate("/login");
          }}
        />
      )}
    </>
  );
};

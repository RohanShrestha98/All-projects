/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { message } from "antd";
import {
  useOTPVerifyMutation,
  useResendOTPMutation,
} from "../../hooks/useMutateData";
import InputFielld from "../../components/inputField/inputField";
import loginBgL from "../../assets/loginBgL.svg";
import Button from "../../components/UI/button";
import { useCallback } from "react";
import { useEffect } from "react";

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .max(36, "Must be 36 characters or less"),
});

const VerificationForm = ({ identity, handleSuccess }) => {
  const otpVerifiedMutation = useOTPVerifyMutation();
  const resendOTPMutation = useResendOTPMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(otpSchema),
  });

  const [timer, setTimer] = useState(60);

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = () => {
    if (!timer) {
      setTimer(60);
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    const postData = {
      identity: identity,
    };
    await resendOTPMutation.mutateAsync(["post", "", postData], {
      onSuccess: () => {
        message.success("OTP Resend Successfully", [2]);
      },
      onError: (error) => {
        message.error(error?.response?.data?.errors?.error, [2]);
        resetTimer();
      },
    });
    
  };



  const onOTPSubmitHandler = async (data) => {
    const postData = {
      otp: data?.otp,
      identity: identity,
    };
    await otpVerifiedMutation.mutateAsync(["post", "", postData], {
      onSuccess: () => {
        message.success("OTP Verified Successfully", [2]);
        reset();
        handleSuccess();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errors?.error, [2]);
      },
    });
  };

  return (
    <div className="md:items-center md:justify-center flex flex-col">
      <div className="flex flex-col px-28 md:px-0 mt-20">
        <div className="flex flex-col gap-2 mb-10 sm:items-center tracking-tight sm:justify-center text-2xl sm:text-xl font-semibold">
          <p className="text-[#4D4D4D]">Verify OTP</p>
          <p className="text-[#666] text-sm">
            Enter OTP code sent to your email.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onOTPSubmitHandler)}
          className="flex md:w-full flex-col gap-3"
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
          <img
            src={loginBgL}
            className="hidden md:block bottom-0 absolute justify-start left-0 sm:w-7"
            alt=""
          />
          <div className="text-sm">
            Didn't receive OTP?{" "}
            <button
              disabled={timer ? true : false}
              className={`${
                timer ? "opacity-80" : "opacity-100"
              } text-blue-500 disabled:cursor-auto cursor-pointer`}
              onClick={resendOTP}
            >
              Resend OTP
            </button>{" "}
            {timer ? <span>in {timer}</span> : ""}
          </div>
          <Button
            buttonName={"Verify"}
            type="submit"
            isLoading={otpVerifiedMutation.isPending}
            className={`flex mt-2 justify-center items-center gap-2 rounded-lg cursor-pointer bg-theme-color hover:bg-white border hover:text-black text-white sm:p-4 p-2`}
          />
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;

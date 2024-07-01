import React, { useState } from "react";

// import logo from "../../assets/logo.svg";
import logo1 from "../../assets/logo1.png";
import loginBgR from "../../assets/loginBgR.svg";
import loginBgL from "../../assets/loginBgL.svg";
import InputField from "../../components/inputField/inputField";

export const LoginStepper = () => {
  return (
    <div>
      <img src={loginBgR} className="absolute right-0 sm:w-7" alt="" />
      <div className="flex md:justify-center px-4">
        <img className="h-20 w-20" src={logo1} alt="logo" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 mb-10 md:items-center tracking-tight md:justify-center text-2xl sm:text-xl font-semibold ">
          <p className="text-[#4D4D4D]">Log in</p>
          <p className="text-[#666] text-sm ">
            Enter your credentials to login to your account.
          </p>
        </div>
        <form className="flex md:w-full flex-col gap-3 md:px-4 ">
          <div className="rounded-md">
            <InputField
              className="outline-none bg-white w-full text-sm"
              name="identity"
              type="text"
              placeholder="Verify OTP"
            />
            {/* <p className="text-red text-sm">{errors?.identity?.message}</p> */}
          </div>

          <img
            src={loginBgL}
            className="hidden md:block bottom-0 absolute justify-start left-0 sm:w-7"
            alt=""
          />
          <button
            disabled={!isValid}
            type="submit"
            className={`flex justify-center items-center gap-2 rounded-lg cursor-pointer ${
              isValid
                ? "bg-theme-color text-white"
                : "bg-white sm:bg-gray-dark border text-neutral sm:text-white"
            }  sm:p-4 p-2 `}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import esewa from "../../images/esewa.svg";
import khalti from "../../images/khalti.svg";
import MobileHeader from "../../components/navbar/mobileHeader";
import { DynamicFooter } from "../../components/footer/dynamicFooter";
import { CircleSvg, DotCicleSvg } from "../../assets/allSvg";

export const PaymentMethod = () => {
  const [checkboxActive, setCheckboxActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  return (
    <>
      <MobileHeader headerName={"Subscription Plans"} noProfile={true} />
      <div className="px-3">
        <p className="text-[#4B4B4B] text-sm font-medium leading-4 tracking-tight">
          Select Payment Method
        </p>
        <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-4 gap-3 ">
          <div
            onClick={() => setPaymentMethod("esewa")}
            className={`flex justify-between border border-[#DADADA] rounded-lg px-4 py-3 h-[89px] cursor-pointer ${
              paymentMethod === "esewa" ? "bg-[#f0fcf3]" : ""
            }`}>
            <div className="flex flex-col gap-2">
              <img src={esewa} className="object-fill h-8 w-8" alt="" />
              <p className="text-[#444] text-xs tracking-tight font-bold">
                Esewa
              </p>
            </div>
            <div onClick={() => setPaymentMethod("esewa")}>
              {paymentMethod === "esewa" ? (
                <DotCicleSvg
                  hasCircleLine
                  height="24"
                  width="24"
                  color="#68bf4c"
                />
              ) : (
                <CircleSvg
                  hasCircleLine
                  color="#dadada"
                  height="24"
                  width="24"
                />
              )}
            </div>
          </div>
          <div
            onClick={() => setPaymentMethod("khalti")}
            className={`flex justify-between border border-[#DADADA] rounded-lg p-4 h-[89px] cursor-pointer ${
              paymentMethod === "khalti" ? "bg-[#f3ebfc]" : ""
            }`}>
            <div className="flex flex-col gap-1">
              <img src={khalti} className="object-fill h-8 w-8" alt="" />
              <p className="text-[#444] text-xs tracking-tight font-bold">
                Khalti
              </p>
            </div>
            <div onClick={() => setPaymentMethod("khalti")}>
              {paymentMethod === "khalti" ? (
                <DotCicleSvg
                  hasCircleLine
                  height="24"
                  width="24"
                  color="#6f43a1"
                />
              ) : (
                <CircleSvg
                  hasCircleLine
                  color="#dadada"
                  height="24"
                  width="24"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3  mb-3">
          <input
            onClick={() => setCheckboxActive(!checkboxActive)}
            type="checkbox"
            className=""
          />
          <p className="text-sm">Do you have a referral code?</p>
        </div>
        {checkboxActive && (
          <div className="flex gap-2 bg-[#F9F9F9] py-3 px-2 rounded-md">
            <input
              className="text-[#9A9A9A] w-full border border-[#D0D5DD] rounded-lg px-[14px] py-[8px] outline-none"
              type="text"
              placeholder="Have a referral code?"
            />
            <button className="px-[48px] py-[14px] bg-[#D6E1F7] rounded-lg text-theme-color leading-5 tracking-tight">
              Apply
            </button>
          </div>
        )}
      </div>
      <DynamicFooter buttonName={"Proceed"} className="w-full" />
    </>
  );
};

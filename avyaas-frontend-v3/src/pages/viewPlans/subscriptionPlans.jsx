import React, { useState } from "react";
import arrow from "../../images/arrow.svg";
import esewa from "../../images/esewa.svg";
import khalti from "../../images/khalti.svg";
import Plans from "./plans";
import MobileHeader from "../../components/navbar/mobileHeader";
import { CircleSvg, DotCicleSvg, ForwardArrowSvg } from "../../assets/allSvg";
import { DynamicFooter } from "../../components/footer/dynamicFooter";
import { useNavigate } from "react-router-dom";
import { usePlanList } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import EsewaPayment from "../../containers/payment/esewa/esewaPayment";
import useKhaltiPayment from "../../containers/payment/khalti/khaltiPayment";
import Button from "../../components/UI/button";
import { useEffect } from "react";

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const [checkboxActive, setCheckboxActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [selectedPackage, setSelectedPackage] = useState();
  const { currentModule } = useModuleStore();

  const {
    data,
    isLoading: planTypeLoading,
    isError: planTypeError,
  } = usePlanList(currentModule?.id);

  useEffect(() => {
    if (data?.data?.length > 0) {
      setSelectedPackage(data?.data[0]);
    }
  }, [data?.data]);

  const handleEsewaPayment = EsewaPayment({
    selectedPackage: selectedPackage,
    price: selectedPackage?.price,
    txAmt: 0,
  });

  const handleKhaltiPayment = useKhaltiPayment({
    selectedPackage: selectedPackage,
    amount: selectedPackage?.price,
    referralCode: "",
  });

  const subscriptionData = [
    {
      id: 1,
      plans: "400+ hours of High Quality Video lessons",
    },
    {
      id: 2,
      plans: "Highly yield interactive courses",
    },
    {
      id: 3,
      plans: "Videos by top rated Mentors",
    },
    {
      id: 4,
      plans: "Interactive discussion, polls & ranking",
    },
    {
      id: 5,
      plans: "CEE oriented tutorials",
    },
    {
      id: 6,
      plans: "Updated coursework, MCQ's & Mock tests",
    },
    {
      id: 7,
      plans: "Unlimited Access of Online Course",
    },
  ];

  return (
    <div className="md:bg-[#F7F7F7] md:pb-16 ">
      <MobileHeader headerName={"Subscription Plans"} noProfile={true} />
      <div className="flex flex-col gap-10 md:px-3 sm:pb-5 sm:flex-col-reverse ">
        <div>
          <p className="text-[#666] text-sm leading-5 mb-3">
            Your premium plans includes:
          </p>
          <div className=" flex flex-col gap-3 ms-2">
            {subscriptionData.map((item) => {
              return (
                <div key={item?.id} className="flex gap-3">
                  <img src={arrow} alt="" />
                  <p className=" text-sm leading-5 text-[#666] tracking-tight">
                    {item?.plans}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[#4B4B4B] text-sm font-medium leading-4 tracking-tight">
            Choose a plan that’s best fit for you
          </p>
          {data?.data?.length > 0 ? (
            <Plans
              planTypeData={data?.data}
              setSelectedPackage={setSelectedPackage}
              isLoading={planTypeLoading}
              isError={planTypeError}
            />
          ) : (
            <p className="text-[#666]">No Plans Available</p>
          )}
        </div>

        <div className="md:hidden flex flex-col gap-5">
          <div>
            <p className="text-[#4B4B4B] text-sm font-medium leading-4 tracking-tight">
              Select Payment Method
            </p>
            <div className="grid grid-cols-4 md:grid-cols-3 mt-4 gap-3 ">
              <div
                onClick={() => setPaymentMethod("esewa")}
                className={`flex justify-between border border-[#DADADA] rounded-lg px-4 py-3 h-[89px] cursor-pointer ${
                  paymentMethod === "esewa" ? "bg-[#f0fcf3]" : ""
                }`}
              >
                <div className="flex flex-col gap-2">
                  <img
                    src={esewa}
                    className=" min-h-[32px] min-w-[32px]"
                    alt=""
                  />
                  <p className="text-[#444] text-base md:text-sm tracking-tight font-medium">
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
                }`}
              >
                <div className="flex flex-col gap-1">
                  <img
                    src={khalti}
                    className="object-fill min-h-[32px] min-w-[32px]"
                    alt=""
                  />
                  <p className="text-[#444] text-base md:text-sm tracking-tight font-medium">
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
          </div>
          <div className="flex items-center gap-3">
            <input
              onClick={() => setCheckboxActive(!checkboxActive)}
              type="checkbox"
              className=""
            />
            <p className="text-sm">Do you have a referral code?</p>
          </div>
          <div className="flex gap-3 lg:flex-col">
            {checkboxActive && (
              <div className="flex gap-3">
                <input
                  className=" text-[#9A9A9A] w-64 xl:w-56 border border-[#D0D5DD] rounded-lg px-[14px] py-[8px]"
                  type="text"
                  placeholder="Enter your referral code"
                />
                <button className="px-12 xl:px-8 lg:px-6 sm:px-4 py-[14px] bg-[#D6E1F7] rounded-lg text-theme-color leading-5 tracking-tight">
                  Apply
                </button>
              </div>
            )}
            <div className="md:hidden">
              <Button
                buttonName="Proceed and Pay"
                afterIcon={<ForwardArrowSvg />}
                handleClick={() =>
                  paymentMethod === "esewa"
                    ? handleEsewaPayment()
                    : handleKhaltiPayment()
                }
                disabled={!selectedPackage}
                className="px-12 xl:px-8 lg:px-6 sm:px-4 py-[14px] bg-theme-color rounded-lg text-white leading-5 tracking-tight flex items-center gap-2 whitespace-nowrap"
              />
            </div>
          </div>
        </div>
      </div>
      <DynamicFooter
        handleButtonClick={() => navigate("/subscriptionPlans/payment")}
        buttonName="Proceed"
        className="w-full"
      />
    </div>
  );
}

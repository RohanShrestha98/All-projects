import React from "react";
import welcomeImg from "../../images/wcImg.png";
import { useAuthStore } from "../../store/useAuthStore";

const WelcomePage = () => {
  const { user } = useAuthStore();
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;
  if (hours < 12) greet = "Morning";
  else if (hours >= 12 && hours <= 17) greet = "Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Evening";

  return (
    <div className="flex rounded-md w-full md:px-0">
      <div className="sm:w-full flex flex-col items-stretch w-[60%] justify-center pl-12 py-[30px] lg:py-[25px] md:py-[20px] bg-baby-blue rounded-l-md sm:px-3 sm:py-5">
        <h1 className="text-blue-steel font-semibold text-xl lg:text-[18px] sm:text-[16px] whitespace-nowrap">
          Good {greet} , {user?.name}
        </h1>
        <h2 className="text-blue-steel text-sm  lg:text-[12px] lg:whitespace-nowrap">
          Let&apos;s guide you through the learning process&hellip;
        </h2>
      </div>
      <div
        className="flex w-[40%] bg-cover bg-center bg-no-repeat justify-center items-center rounded-r-md"
        style={{
          backgroundImage: `url(${welcomeImg})`,
        }}
      />
    </div>
  );
};

export default WelcomePage;

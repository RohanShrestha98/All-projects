import React from "react";
import welcomeImg from "../../assets/images/wcImg.png";
import { useAuthContext } from "../../context/authContext";

const WelcomePage = () => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) greet = "Morning";
  else if (hours >= 12 && hours <= 17) greet = "Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Evening";

  const { auth } = useAuthContext();

  return (
    <div className="flex rounded-md w-full md:px-0 sm:mt-24">
      <div className="sm:w-full flex flex-col items-stretch w-[60%] justify-center pl-12 py-[30px] bg-baby-blue rounded-l-md sm:px-3 sm:py-5">
        <h1 className="text-blue-steel font-bold text-xl sm:text-[16px]">
          Good {greet}, Mr. {auth?.user?.surname || auth.user?.role?.name}
        </h1>
        <h2 className="text-blue-steel text-sm md:text-[12px]">
          Let&apos;s guide you through the learning process...
        </h2>
      </div>
      <div
        className="flex w-[40%] bg-cover bg-center bg-no-repeat justify-center items-center rounded-r-md"
        style={{
          backgroundImage: `url(${welcomeImg})`,
        }}
      ></div>
    </div>
  );
};

export default WelcomePage;

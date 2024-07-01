import React from "react";
import { Link } from "react-router-dom";
import login from "../../assets/login.svg";
import googlePlay from "../../assets/googlePlay.svg";
import appStore from "../../assets/appStore.svg";
import "react-lazy-load-image-component/src/effects/blur.css";

const HeroSection = () => {
  return (
    <div className="bg-[#D9E8FD] flex items-center flex-col px-[180px] xl:px-[100px] py-10 lg:px-8 md:px-6 sm:px-3 pt-[100px] gap-3 h-full w-full">
      <img className="md:hidden w-[80%]" src={login} alt="" />
      <div className="flex gap-4 tracking-tighter">
        <p className="text-xl font-semibold text-[#4D4D4D]">
          Get started with <span className="text-red">NAME Online</span> and
          embrace your learning experience
        </p>
      </div>
      <p className="text-sm text-[#666]">
        Learn from video courses by top instructors. Participate in Live tests,
        Discussions and Polls inside the app.
      </p>
      <div className="flex flex-col mt-10">
        <p className=" flex text-sm text-[#808080] uppercase rounded-md ">
          download app
        </p>
        <div className="flex gap-2">
          <Link to="https://play.google.com/store">
            <img
              src={googlePlay}
              alt="googleplay"
              className="h-16 w-36 sm:h-16 sm:w-50 max-w-full"
            />
          </Link>
          <Link t="https://www.apple.com/store">
            <img
              src={appStore}
              alt="appstore"
              className="h-16 w-36 sm:h-16 sm:w-50 max-w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

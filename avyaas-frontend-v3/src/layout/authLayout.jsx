import React from "react";
import HeroSection from "../components/shared/heroSection";

const AuthLayout = (props) => {
  return (
    <div className="flex sm:items-center sm:justify-center sm:p-0 min-h-screen">
      <div className="w-1/2 md:hidden block">
        <HeroSection />
      </div>
      <div className="md:w-full w-1/2">{props.children}</div>
    </div>
  );
};

export default AuthLayout;

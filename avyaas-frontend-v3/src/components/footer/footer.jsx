import React from "react";
import MobileFootlinkContents from "./mobileFootlinkContent";

const MyFooter = () => {
  return (
    <div className="bg-white h-[60px] w-[100vw] hidden md:flex justify-around md:justify-evenly items-center fixed bottom-0 shadow-md ">
      <MobileFootlinkContents />
    </div>
  );
};

export default MyFooter;


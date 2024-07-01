import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import FootLinkContnents from "./footLinkContents";
import MobileFootlinkContents from "./mobileFootlinkContent";
import playStore from "../../assets/images/playStore.svg";

const MyFooter = ({ setPathName }) => {
  return (
    <>
      <div className="bg-blue-gray  flex justify-between items-center py-2 px-[105px] md:px-8 sm:px-4 sm:hidden">
        <div className="flex gap-14 md:gap-7 items-center">
          <div className="flex flex-col items-center gap-1 justify-center md:items-start">
            {/* <h3 className="text-gray text-sm font-medium">Download app</h3> */}
            <img
              src={playStore}
              alt="logo"
              className="h-11 md:h-9 w-32 md:w-24 object-cover  cursor-pointer"
            />
          </div>
          <FootLinkContnents setPathName={setPathName} />
        </div>
        <div className="flex items-center text-xs md:hidden">
          <AiOutlineCopyrightCircle />
          <span>All Rights Reserved</span>
        </div>
      </div>
      <div className="bg-white h-[60px] w-[100vw] hidden sm:flex justify-around items-center fixed bottom-0 shadow-md">
        <MobileFootlinkContents />
      </div>
    </>
  );
};

export default MyFooter;

import React from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import LeftMenu from "./leftMenu";
import ChatComponent from "../chat/chat";

const CustomerService = () => {
  return (
    <div className="flex flex-col">
      {/* <p className="font-bold text-3xl block sm:hidden md:pl-3">Profile</p> */}
      <div className="flex gap-20 sm:block">
        <div className="min-w-fit block sm:hidden">
          <LeftMenu />
        </div>
        <div className="w-[80%] px-6  mr-0 sm:w-[100%] sm:ml-0">
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center">
              <Link to="/helpcenter" state={{ activeTab: "2" }}>
                <HiOutlineArrowLeft className="cursor-pointer" />
              </Link>
              <div className="ml-4 font-bold text-2xl">Customer Service</div>
            </div>
            <HiOutlineDotsCircleHorizontal size={28} sm:inline hidden />
          </div>
          <ChatComponent isTime={true} width={"w-[284px]"} />
        </div>
      </div>
    </div>
  );
};

export default CustomerService;

import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import BottomNavigation from "../components/BottomNavigation";
import { useState } from "react";

export default function DashboardLayout() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <div className="flex justify-between sm:flex-col h-screen sm:justify-between ">
      <div
        className={`${sideBarOpen ? "w-[18%]" : "w-[5%]"} lg:w-16 sm:hidden`}
      >
        <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      </div>
      <div
        className={` ${
          sideBarOpen ? "w-[82%]" : "w-[95%]"
        } lg:w-full bg-gray-50 sm:bg-white  sm:pb-10  h-screen  sm:h-full overflow-auto no-scrollbar px-6 py-2 sm:py-0 sm:px-4`}
      >
        <Outlet />
      </div>
      <div className="sm:block hidden sticky bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}

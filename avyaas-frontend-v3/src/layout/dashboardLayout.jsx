import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/navbar/sidebar";
import { useLocation } from "react-router-dom";

const DashboardLayout = (props) => {
  const location = useLocation();

  return (
    <div className="h-screen overflow-hidden flex flex-col ">
      <Navbar />
      {location?.pathname?.startsWith("/tests/quiz") ? (
        <>
          <div className="bg-[#F7F7F7] flex justify-between gap-16 pt-8 md:pt-0  px-32  md:px-0">
            <div className="w-full h-screen pb-64 overflow-y-auto no-scrollbar">
              {props?.children}
            </div>
          </div>
          {location?.pathname === "/tests/quiz" ? (
            <> </>
          ) : (
            <div className="w-full bottom-0">
              <Footer />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between gap-16 md:gap-6  md:pt-0 px-32 lg:px-14 md:px-0">
            <div className="w-fit md:hidden pb-64">
              <Sidebar />
            </div>
            <div className="lg:w-full h-screen  pb-64 md:pb-14 w-[85%] overflow-y-auto no-scrollbar md:px-0">
              {props?.children}
            </div>
          </div>
          {location?.pathname === "/subscriptionPlans" ||
          location.pathname === "/profile/aboutProfile" ||
          location.pathname === "/subscriptionPlans/payment" ||
          location.pathname === "/discussion/replies" ||
          location.pathname === "/viewProfile" ||
          location.pathname === "/discussion/addDiscussion" ? (
            <></>
          ) : (
            <div className={`w-full bottom-0 `}>
              <Footer />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardLayout;

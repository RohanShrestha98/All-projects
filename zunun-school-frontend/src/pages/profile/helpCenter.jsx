import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import LeftMenu from "../../containers/profile/leftMenu";
import HelpCenterTabs from "../../containers/profile/helpCenterTabs";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { ShimmerText } from "react-shimmer-effects";

const HelpCenter = () => {
  const location = useLocation();
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  useEffect(() => {
    changeLayout(width, false, false, "light");
  }, [width]);

  return (
    <div className="flex flex-col">
      {/* {!initial && (
        <p className="font-bold text-3xl block sm:hidden md:pl-3">Profile</p>
      )} */}
      <div className="flex gap-20 sm:block">
        <div className="min-w-fit block sm:hidden">
          <LeftMenu initial={initial} />
        </div>
        <div className="w-[80%]  sm:w-full sm:ml-0">
          <div className="flex items-center justify-between mb-7 sm:mb-0 sm:fixed sm:z-[1000] px-6 sm:top-0 sm:bg-white sm:shadow-md sm:w-full sm:pt-[28px] sm:pb-3">
            <div className="flex items-center  ">
              {!initial && (
                <Link to="/profile">
                  <HiOutlineArrowLeft className="cursor-pointer mr-[15px] hidden sm:inline" />
                </Link>
              )}
              {initial ? (
                <div className="w-32">
                  <ShimmerText line={1} />
                </div>
              ) : (
                <div className="font-bold text-2xl tracking-[0.03em] sm:text-xl">
                  Help Center
                </div>
              )}
            </div>
            {!initial && (
              <HiOutlineDotsCircleHorizontal
                size={28}
                className="sm:inline hidden"
              />
            )}
          </div>
          <div className="px-6 sm:mt-24">
            <HelpCenterTabs
              initial={initial}
              activeTab={location.state?.activeTab ?? "1"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

import React, { useEffect, useState } from "react";
import LeftMenu from "../../../containers/profile/leftMenu";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import ChangePassword from "./changePassword";

const Security = () => {
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
    changeLayout(width, false, false, "white");
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
        <div className="w-[80%] sm:mt-0 sm:w-[100%] sm:ml-0 ">
          <div className="mb-7 px-6 flex items-center sm:fixed sm:top-0 sm:shadow-md sm:w-full sm:pt-[28px] sm:pb-3 sm:z-[1000] sm:bg-white">
            {!initial && (
              <Link to="/profile/security">
                <HiOutlineArrowLeft className="cursor-pointer mr-[15px] hidden sm:inline" />
              </Link>
            )}
            {initial ? (
              <div className="w-32">
                <ShimmerTitle line={1} />
              </div>
            ) : (
              <div className="font-bold tracking-[0.03em] sm:text-black-gray text-2xl sm:text-xl">
                Change Password
              </div>
            )}
          </div>
          {initial ? (
            <ShimmerThumbnail />
          ) : (
            <div className="px-6 sm:mt-28">
              <ChangePassword />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;

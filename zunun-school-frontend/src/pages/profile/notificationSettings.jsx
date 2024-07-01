import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import LeftMenu from "../../containers/profile/leftMenu";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { ShimmerBadge, ShimmerText, ShimmerTitle } from "react-shimmer-effects";

const NotificationSettings = () => {
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

  const onChange = () => {};

  const EachSettings = props => {
    return (
      <div className="flex justify-between w-[70%] mb-[38px] notification-switch sm:w-full">
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          <div className="font-semibold text-[16px] text-black-gray">
            {props.settings}
          </div>
        )}
        {initial ? (
          <ShimmerBadge />
        ) : (
          <Switch checked={props.checked} onChange={onChange} />
        )}
      </div>
    );
  };

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
              <Link to="/profile">
                <HiOutlineArrowLeft className="cursor-pointer mr-[15px] hidden sm:inline" />
              </Link>
            )}
            {initial ? (
              <div className="w-32">
                <ShimmerTitle line={1} />
              </div>
            ) : (
              <div className="font-bold tracking-[0.03em] sm:text-black-gray text-2xl sm:text-xl">
                Notification
              </div>
            )}
          </div>
          <div className="sm:mt-28 px-6">
            <EachSettings settings="General Notification" checked={false} />
            <EachSettings settings="Sound" checked={true} />
            <EachSettings settings="Special Offers" checked={false} />
            <EachSettings settings="Cashback" checked={true} />
            <EachSettings settings="Payments" checked={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

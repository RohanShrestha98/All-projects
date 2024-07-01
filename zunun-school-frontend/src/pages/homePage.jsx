import React, { useEffect, useState } from "react";
import {
  ShimmerBadge,
  ShimmerText,
  ShimmerThumbnail,
} from "react-shimmer-effects";
import Assignments from "../containers/home/assignments";
import WelcomePage from "../containers/home/welcomePage";
import AntdSelect from "../containers/home/antdSelect";
import HomeCard from "../containers/home/courseCard";
import RecentlyViewed from "../containers/home/recentlyViewed";
import Blog from "../containers/home/blog";
import "../containers/home/home.css";
import useChangeLayout from "../components/customHooks/changeLayout";
import useWindowsDimensions from "../components/customHooks/windowsDimesnions";
import { Calendar } from "antd";

const Home = () => {
  const { changeLayout } = useChangeLayout();
  const width = useWindowsDimensions();

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  useEffect(() => {
    changeLayout(width, true, true, "light");
  }, []);

  return (
    <div className="h-full home overflow-x-scroll md:px-6">
      <div className="flex justify-end ">
        {initial ? (
          <div className="hidden">
            <ShimmerBadge />
          </div>
        ) : (
          <div className="hidden mb-4">
            <AntdSelect sizeMiddle={true} />
          </div>
        )}
      </div>
      {initial ? (
        <ShimmerThumbnail height={100} />
      ) : (
        <div className="sm:w-full hidden sm:block mb-4">
          <WelcomePage />
        </div>
      )}
      {initial ? (
        <div className="w-32">
          <ShimmerText line={1} />
        </div>
      ) : (
        <div className="font-semibold text-lg hidden sm:inline">
          Here is your dashboard
        </div>
      )}
      <>
        <div className="flex flex-col gap-10 sm:gap-6">
          {initial ? (
            <ShimmerThumbnail height={100} />
          ) : (
            <div className="sm:hidden">
              <WelcomePage />
            </div>
          )}

          <div className="sm:order-2">
            <HomeCard initial={initial} />
          </div>
          <div className="flex justify-center gap-[72px]  lg:block sm:order-1 ">
            <div className="w-1/2 lg:w-full">
              <div>
                <p className="text-xl font-bold text-black-gray sm:text-lg mb-2">
                  Calendar
                </p>
              </div>
              <Calendar fullscreen={false} className="h-[400px] py-8" />
            </div>
            <div className="flex w-1/2 lg:w-full  sm:hidden">
              <Assignments initial={initial} />
            </div>
          </div>
          <div className=" sm:order-3">
            <RecentlyViewed initial={initial} />
          </div>
          <div className="sm:order-5">
            <Blog initial={initial} />
          </div>
          <div className=" w-1/2 lg:w-full  hidden sm:flex sm:order-4">
            <Assignments initial={initial} />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;

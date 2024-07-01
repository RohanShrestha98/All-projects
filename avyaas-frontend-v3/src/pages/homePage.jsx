import React, { useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import WelcomePage from "../containers/home/welcomePage";
import RecentlyViewed from "../containers/home/recentlyViewed";
import Instructors from "../containers/home/instructors";
import QuickLinks from "../containers/home/quickLinks";
import LiveUpdates from "../containers/home/liveUpdates";
import MobileHeader from "../components/navbar/mobileHeader";
import { useNavigate } from "react-router-dom";
import { useModuleStore } from "../store/useModuleStore";
import Subjects from "../containers/home/subjects";
import useChangeLayout from "../hooks/useChangeLayout";
import useWindowsDimensions from "../hooks/useWindowsDimensions";

const Home = () => {
  const { changeLayout } = useChangeLayout();
  const navigate = useNavigate();
  const width = useWindowsDimensions();
  const { currentModule } = useModuleStore();

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
    <>
      <MobileHeader headerName={"Home"} className={""} noArrow={true} />
      <div className="md:px-4 flex flex-col gap-6 ">
        <div className="overflow-x-hidden">
          <div className="flex flex-col mt-2 md:mt-0 gap-10 md:gap-6">
            {initial ? (
              <ShimmerThumbnail className="rounded-xl" height={100} />
            ) : (
              <div className="">
                <WelcomePage />
              </div>
            )}
          </div>
        </div>
        <Subjects page="home" />
        <LiveUpdates />
        <div className="bg-gradient-to-r from-[#003AB2] via-[#6288D8] to-[#8800DC] flex  gap-2 items-center justify-between px-8 py-4 md:py-3  md:p-4 rounded-xl ">
          <section>
            <h4 className="text-lg md:text-xs font-bold text-white">
              Introducing Subscription Plans!
            </h4>
            <h5 className="text-sm md:text-[11px] text-white">
              Take Your {currentModule?.name} Preparation to Next Level &
              Discover more today !!
            </h5>
          </section>
          <button
            onClick={() => navigate("/subscriptionPlans")}
            className="bg-white  md:border-white md:bg-transparent md:border text-[#334D7F] md:text-white md:text-[13px] rounded-md px-8 md:px-[18px] py-1 whitespace-nowrap">
            Buy Now
          </button>
        </div>
        <QuickLinks />
        <RecentlyViewed initial={initial} />
        <Instructors />
      </div>
    </>
  );
};

export default Home;

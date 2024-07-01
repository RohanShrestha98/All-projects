import React, { useState, useEffect } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import SubjectSidebar from "../../../containers/courses/subjectSidebar";
import SubjectBody from "../../../containers/courses/eachSubject/subjectBody";
import { NavLink, useLocation } from "react-router-dom";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { ShimmerText } from "react-shimmer-effects";

const SubjectPage = () => {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [initial, setInitial] = useState(true);

  const location = useLocation();

  const width = useWindowsDimensions();

  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  useEffect(() => {
    if (initial) {
      setTimeout(() => {
        setInitial(false);
      }, [1000]);
    }
  }, []);

  const handleChapterClick = id => {
    setChapterIndex(id);
  };

  const handleHideSidebar = value => {
    setHideSidebar(value);
  };

  return (
    <div className={`flex  relative md:ml-0 -ml-[78px]`}>
      <div
        className={`fixed ${
          !hideSidebar && width < 769
            ? "w-[80%]"
            : hideSidebar
            ? "w-[5%]"
            : "w-[20%]"
        }`}
      >
        {width > 480 && (
          <SubjectSidebar
            isMaterial={false}
            initial={initial}
            wide={width}
            hideSidebar={hideSidebar}
            handleHideSidebar={handleHideSidebar}
            handleChapterClick={handleChapterClick}
            chapterIndex={chapterIndex}
          />
        )}
      </div>
      <div
        className={`sm:pl-0 sm:ml-0 pl-[35px] flex flex-col gap-y-10 sm:w-full ${
          !hideSidebar && width < 769
            ? "w-full"
            : hideSidebar
            ? "w-[95%] ml-[5%]"
            : "w-[80%] ml-[25%]"
        }`}
      >
        <div className="sm:shadow-md sm:w-full sm:fixed sm:top-0  sm:bg-white sm:pb-3 sm:pt-[28px]">
          <div className="md:px-6 font-bold text-lg gray-4 flex items-center justify-between">
            {initial ? (
              <div className="w-32">
                <ShimmerText line={1} />
              </div>
            ) : (
              <div className="flex items-center">
                <NavLink to="/courses" className="mr-2">
                  <HiOutlineArrowLeft />
                </NavLink>
                {location.state?.subject}
              </div>
            )}
            <HiOutlineDotsCircleHorizontal className="sm:inline hidden" />
          </div>
        </div>
        <div className="md:px-6 sm:mt-24">
          <SubjectBody
            initial={initial}
            width={width}
            subject={location.state?.subject}
            handleChapterClick={handleChapterClick}
            chapterIndex={chapterIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;

import { useQueryData } from "../../hooks/useQueryData";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ToggleLesson from "./toggleLesson";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import sidebarIcon from "../../assets/images/sidebarIcon.png";
import ErrorPage from "../../components/errorPage/errorPage";
import noCourse from "../../assets/images/noCourse.png";
import ContentDetails from "./eachMaterial/contentDetail";

const StudentCourseDetails = ({ data, isError, isLoading, courseId }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sideBarActive, setSideBarActive] = useState(true);

  const finalData = data?.data?.lesson;
  const contentLessonData = data?.data;

  return (
    <>
      {finalData && (
        <div
          className={`${
            sideBarActive ? "gap-20" : "gap-8 ml-[52px]"
          } flex my-8 `}
        >
          {sideBarActive ? (
            <div className="w-1/4 h-[78vh] overflow-auto bg-white  p-4 rounded-md">
              <button
                className="flex items-center gap-1 mb-4 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
                onClick={() => navigate(-1)}
              >
                <BiArrowBack size={16} />
              </button>
              <div className="flex items-center justify-between mb-6 ">
                <p className="font-semibold text-base cursor-pointer">
                  Lessons
                </p>
                <button
                  className=" p-1 rounded-full text-blue bg-gray-11"
                  onClick={() => setSideBarActive(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              {finalData?.map((item, index) => {
                const contentData = item?.content;
                return (
                  <ContentDetails
                    key={index}
                    index={index}
                    contentData={contentData}
                    item={item}
                  />
                );
              })}
            </div>
          ) : (
            <button
              className="ml-[-105px] h-7"
              onClick={() => setSideBarActive(true)}
            >
              <img src={sidebarIcon} className="w-9 h-9" alt="" />
            </button>
          )}
          <div
            className={`${
              sideBarActive ? "w-3/4" : "w-full "
            } h-[78vh]  overflow-auto `}
          >
            <h2 className="text-xl w-3/4 mb-4  md:text-lg font-semibold sm:font-medium sm:text-base">
              {state?.name}
            </h2>
            {finalData &&
              finalData?.map((item, index) => {
                const contentData = item?.content;
                return (
                  <div key={index}>
                    <ToggleLesson
                      courseId={courseId}
                      index={index}
                      item={item}
                      contentData={contentData}
                      finalData={contentLessonData}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {!finalData && (
        <ErrorPage
          emptyImage={noCourse}
          data={finalData ?? []}
          isFetching={isLoading}
          error={isError}
          title={"No lessons made public yet"}
        />
      )}
    </>
  );
};

export default StudentCourseDetails;

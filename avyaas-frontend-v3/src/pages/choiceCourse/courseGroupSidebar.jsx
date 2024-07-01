import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftArrowSvg } from "../../assets/allSvg";
import logo1 from "../../assets/logo1.png";

import { useCourseStore } from "../../store/useCourseStore";

const CourseGroupSidebar = ({ isLoading, isError, courseGroup }) => {
  const navigate = useNavigate();
  const { selectedCourseGroup, setSelectedCourseGroup } = useCourseStore();
  return (
    <div className="flex flex-col gap-7 min-w-[30%]">
      <img src={logo1} alt="logo" className="w-[70px] h-18 " />
      <div onClick={() => navigate(-1)}>
        <LeftArrowSvg className="text-[#1D2939] cursor-pointer md:hidden" />
      </div>
      <div className="flex flex-col gap-2 h-[75vh] overflow-y-auto no-scrollbar">
        <p className=" text-[#999] text-sm ">Course List</p>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            [...Array(6)]?.map((_, id) => {
              return (
                <div key={id} className="p-4 w-full">
                  <div className="animate-pulse space-y-2">
                    <div className="bg-gray-6 h-8 w-32" />
                  </div>
                </div>
              );
            })
          ) : isError ? (
            <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
              Error
            </h1>
          ) : (
            courseGroup?.data?.map((item) => (
              <div
                onClick={() => {
                  setSelectedCourseGroup(item);
                }}
                key={item?.id}
                className="   sm:p-4 w-full font-bold lg:w-fit cursor-pointer"
              >
                <div
                  // to={item.link}
                  className={`flex flex-col tracking-tight  text-[13px] gap-1 p-2 ${
                    item.id ===
                    (selectedCourseGroup?.id || courseGroup?.data?.[0]?.id)
                      ? "text-theme-color border-l-2"
                      : "text-gray-dark border-l-2 border-white"
                  }`}
                >
                  {item?.title}
                  <p className="text-[#808080] text-xs">
                    {`${
                      item?.noOfCourses > 1
                        ? `${item?.noOfCourses} Courses`
                        : `${item?.noOfCourses} Course`
                    }`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGroupSidebar;

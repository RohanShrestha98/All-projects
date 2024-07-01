import React, { useEffect, useState } from "react";
import {
  BookSvg,
  RightArrow,
  UsersSvg,
  PlusSvg,
  DownArrowSvg,
} from "../../assets/allSvg";
import thumbnail from "../../assets/thumbnail.svg";
import MobileHeader from "../../components/navbar/mobileHeader";
import { useCourseStore } from "../../store/useCourseStore";
import Error from "../../components/shared/error";
import { useModalStore } from "../../store/useModalStore";

const MobileViewChoiceCourse = ({
  initial,
  isCourseGroupLoading,
  isCourseGroupError,
  courseGroupData,
  isCourseLoading,
  isCourseError,
  courseData,
  enrolledCourses,
}) => {
  const [active, setActive] = useState(false);
  const { toggleCustomDrawer } = useModalStore();
  const { selectedCourseGroup, setSelectedCourseGroup, setSelectedCourse } =
    useCourseStore();

  useEffect(() => {
    selectedCourseGroup && setActive(true);
  }, [selectedCourseGroup?.id]);

  return (
    <div className="pb-4">
      <MobileHeader
        className="flex"
        headerName="Select Courses"
        noProfile={true}
      />
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-col">
          <p className="text-theme-color font-bold" onClick={() => {}}>
            Find a course you want to enroll in
          </p>
          <p className="text-[#595959] text-xs md:text-[10px] tracking-tight">
            Select one of the courses below and start learning today
          </p>
        </div>
        {initial || isCourseGroupLoading ? (
          [...Array(6)]?.map((_, id) => {
            return (
              <div key={id} className="shadow rounded-md p-4 w-full">
                <div className="animate-pulse space-y-2">
                  <div className=" bg-gray-6 h-[70px] w-full rounded" />
                </div>
              </div>
            );
          })
        ) : isCourseGroupError ? (
          <Error />
        ) : (
          courseGroupData?.data?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col shadow py-4 px-2 gap-4">
                <div
                  onClick={() => {
                    setSelectedCourseGroup(item);
                    setActive((prev) => !prev);
                  }}
                  className="flex justify-between items-center cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#2E3B54] text-sm font-semibold">
                      {item.title}
                    </p>
                    <div className="flex gap-2 items-center h-4 ">
                      <BookSvg />
                      <p className="text-[#808080] text-xs">
                        {`${
                          item?.noOfCourses > 1
                            ? `${item?.noOfCourses} Courses`
                            : `${item?.noOfCourses} Course`
                        }`}
                      </p>
                    </div>
                  </div>
                  {selectedCourseGroup?.id === item.id && active ? (
                    <DownArrowSvg currentColor={"#262626"} className="" />
                  ) : (
                    <RightArrow currentColor={"#262626"} className="" />
                  )}
                </div>
                {selectedCourseGroup?.id === item.id && active && (
                  <div className="flex flex-col gap-4  w-full">
                    {initial || isCourseLoading ? (
                      [...Array(6)]?.map((_, id) => {
                        return (
                          <div
                            key={id}
                            className="shadow rounded-md p-4 w-full">
                            <div className="animate-pulse space-y-2">
                              <div className=" bg-gray-6 h-[70px] w-full rounded" />
                            </div>
                          </div>
                        );
                      })
                    ) : isCourseError ? (
                      <Error />
                    ) : (
                      courseData?.data?.map((course) => {
                        return (
                          <div
                            key={course.id}
                            className={`${
                              enrolledCourses?.includes(course?.courseID)
                                ? "border-theme-color"
                                : "border-[#F2F2F2]"
                            } p-3 flex items-center justify-between border  rounded-[6px]`}>
                            <div className="flex gap-2 items-center">
                              <img
                                src={thumbnail ?? course.thumbnail}
                                className="rounded-md h-16 w-24"
                                alt=""
                              />
                              <div>
                                <p className="text-[#272727] text-sm ">
                                  {course.title}
                                </p>
                                <p className="text-[#7B879D] text-xs flex items-center gap-[6px]">
                                  <UsersSvg /> {course.enrolled} enrolled
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourse(item);
                                !enrolledCourses?.includes(item?.courseID) &&
                                  toggleCustomDrawer();
                              }}>
                              <PlusSvg className="text-gray-dark1 h-5 w-5 cursor-pointer" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MobileViewChoiceCourse;

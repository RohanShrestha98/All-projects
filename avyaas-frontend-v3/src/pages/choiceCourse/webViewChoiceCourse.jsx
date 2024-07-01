import React from "react";
import { CircleArrow, RightArrow } from "../../assets/allSvg";
import { imageUrl } from "../../config/config";
import enrolled from "../../assets/enrolled.svg";
import { useModalStore } from "../../store/useModalStore";
import { useCourseStore } from "../../store/useCourseStore";

const WebViewChoiceCourse = ({
  initial,
  data,
  courseGroup,
  courseLoading,
  courseError,
  enrolledCourses,
}) => {
  const { toggleCourseEnrollModal } = useModalStore();
  const { selectedCourseGroup, setSelectedCourse } = useCourseStore();

  return (
    <div className="min-w-[60%] px-32 md:px-3 pt-8 md:pt-0 flex  gap-24">
      <div className="pt-8 md:pt-0 tracking-tight flex flex-col gap-4 md:gap-3 w-full">
        <div className="md:bg-[#FAFAFA] md:mx-[-12px] md:py-3 md:mt-[-12px] flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <p className="text-theme-color font-bold">
              Find a course you want to enroll in
            </p>
            <p className="text-[#595959] text-xs md:text-[10px] tracking-tight">
              Select one of the courses below and start learning today
            </p>
          </div>
          {/* <div className="flex items-center gap-2 md:mx-4 px-3 py-[6px] border border-[#B4B4B4] rounded-full bg-white">
            <SearchSvg className="text-[#B3B3B3] h-4 w-4" />
            <input
              //   onChange={(e) => handleCourseSearch(e)}
              className="text-xs w-full outline-none"
              type="text"
              placeholder="Search for courses"
            />
          </div> */}
        </div>
        <p className="text-[#7F7F7F] text-sm hidden md:flex">Course List</p>
        <div className="flex flex-col gap-6 md:gap-3 ">
          <p className="uppercase text-[#7F7F7F] text-sm md:hidden">
            {selectedCourseGroup?.title ?? courseGroup?.data?.[0]?.title}
          </p>
          <div className="grid grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5 sm:gap-3 max-h-[65vh] overflow-y-auto no-scrollbar">
            {initial || courseLoading ? (
              [...Array(6)]?.map((_, id) => {
                return (
                  <div key={id} className="shadow rounded-md p-4 w-full">
                    <div className="animate-pulse space-y-2">
                      <div className=" bg-gray-6 h-28 w-full rounded" />
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-8 bg-gray-6 rounded" />
                        <div className="flex justify-end">
                          <div className="h-4 bg-gray-6 rounded w-8 " />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : courseError ? (
              <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
                Error
              </h1>
            ) : data?.data?.length === 0 ? (
              <div className="text-[#7F7F7F] text-sm md:hidden">
                No course found
              </div>
            ) : (
              data?.data?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(item);
                      !enrolledCourses?.includes(item?.courseID) &&
                        toggleCourseEnrollModal();
                    }}
                    className={`${
                      enrolledCourses?.includes(item?.courseID)
                        ? "border-theme-color cursor-not-allowed bg-[#f0fdf4]"
                        : "border-[#EDEDED] cursor-pointer"
                    } border  shadow flex flex-col justify-between gap-2 md:flex-row md:items-center md:justify-between rounded-lg p-3 md:p-2`}>
                    <div className="flex flex-col md:flex-row md:items-start gap-3">
                      <img
                        className="rounded-xl  md:w-28 "
                        src={
                          enrolled ?? `${imageUrl}/courses/${item?.thumbnail}`
                        }
                        alt=""
                      />
                      <p className="text-[#4D4D4D] font-medium text-xs  md:text-sm sm:text-xs tracking-tight">
                        {item?.title} <br className="md:hidden" />
                      </p>
                    </div>
                    <div>
                      <div className="justify-end  flex md:hidden">
                        <CircleArrow className=" h-5 w-5" />
                      </div>
                      <div className="justify-end  hidden md:flex">
                        <RightArrow currentColor={"black"} className="" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebViewChoiceCourse;

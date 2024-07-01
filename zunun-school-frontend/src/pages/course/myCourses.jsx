import React, { useEffect } from "react";
import CourseStatusTabs from "../../containers/courses/tabs";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { BsSearch } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import CourseList from "../../containers/courses/list/courseList";
import { useAuthContext } from "../../context/authContext";
import ErrorPage from "../../components/errorPage/errorPage";

const MyCourses = ({ setCourseId, setCourseName }) => {
  const width = useWindowsDimensions();
  const location = useLocation();
  const { changeLayout } = useChangeLayout();
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;

  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);
  return isStudent ? (
    <div className="flex flex-col h-full relative">
      <div className="sm:bg-white sm:z-[1000] sm:w-full sm:fixed sm:top-0 sm:shadow-md sm:pt-[28px] md:px-6 sm:pb-3">
        <div className="flex items-center justify-between">
          <div className="w-full flex justify-between">
            <p className="font-bold sm:text-xl text-2xl">My Courses</p>
          </div>
          <div className="items-center sm:flex hidden">
            <BsSearch className="mr-6" size={20} />
            <HiOutlineDotsCircleHorizontal size={20} />
          </div>
        </div>
      </div>
      <div className="md:px-6 sm:mt-24 mt-4">
        <CourseStatusTabs
          setCourseId={setCourseId}
          setCourseName={setCourseName}
          activeTab={location.state?.active ?? "1"}
          isStudent={isStudent}
        />
      </div>
    </div>
  ) : (
    <CourseList
      isStudent={isStudent}
      studentId={location?.state?.studentId}
      firstName={location?.state?.firstName}
    />
  );
};

export default MyCourses;

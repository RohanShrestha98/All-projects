import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import ContentDetails from "./eachMaterial/contentDetail";
import sidebarIcon from "../../assets/images/sidebarIcon.png";
import ErrorPage from "../../components/errorPage/errorPage";
import noCourse from "../../assets/images/noCourse.png";
import ToggleLesson from "./toggleLesson";
import { useQueryData } from "../../hooks/useQueryData";
import { useContentDetailsContext } from "../../context/contentDetailContext";

export default function CourseDetailsStudent({courseId,isStudent}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const { setContentDetails } = useContentDetailsContext();
  const [sideBarActive, setSideBarActive] = useState(true);
  const contentDetails = JSON.parse(localStorage?.getItem("contentDetails"));
  const courseDetails = JSON.parse(localStorage?.getItem("courseDetails"));
  const { data, isError, isLoading, refetch } = useQueryData(
    ["student_course_details", courseId, courseDetails?.courseId,id],
    `api/v1/course/student-details/${id??courseId ?? courseDetails?.courseId}/`,
    "",
    isStudent , 
  );
  const studentContentDetails = data?.data??courseDetails

  useEffect(() => {
    if (isStudent) {
      localStorage.setItem(
        "contentDetails",
        data !== undefined && JSON.stringify(data?.data),
      );
      setContentDetails(JSON.stringify(data !== undefined && data?.data));
    }
  }, [data, isStudent]);
  return (
    <div>
      {studentContentDetails?.lesson && (
        <div
          className={`${
            sideBarActive ? "gap-20" : "gap-8 ml-[52px]"
          } flex my-8 `}
        >
          {sideBarActive ? (
            <div className="w-1/4 h-[78vh] overflow-auto bg-white  p-4 rounded-md">
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
              {studentContentDetails?.lesson?.map((item, index) => {
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
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-1 mb-4 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
                onClick={() => navigate(-1)}
              >
                <BiArrowBack size={16} />
              </button>
              <h2 className="text-xl  mb-4  md:text-lg font-semibold sm:font-medium sm:text-base">
                {courseDetails?.courseName??location?.state?.name}
              </h2>
            </div>

            {studentContentDetails?.lesson &&
              studentContentDetails?.lesson?.map((item, index) => {
                const contentData = item?.content;
                return (
                  <div key={index}>
                    <ToggleLesson
                      index={index}
                      item={item}
                      contentData={contentData}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {!studentContentDetails?.lesson && (
        <ErrorPage
          emptyImage={noCourse}
          data={data?.data?.lesson??contentDetails?.lessonDetails?.lesson}
          isFetching={isLoading}
          error={isError}
          title={"No lessons made public yet"}
        />
      )}
    </div>
  );
}

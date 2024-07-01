import React, { useState, useEffect } from "react";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import SubjectSidebar from "../../../containers/courses/subjectSidebar";
import MaterialBody from "../../../containers/courses/eachMaterial/materialBody";
import MaterialRightSidebar from "../../../containers/courses/eachMaterial/materialRightSidebar";
import "../../../containers/courses/eachMaterial/eachMaterial.css";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { useQueryData } from "../../../hooks/useQueryData";
import { useAuthContext } from "../../../context/authContext";

const MaterialPage = ({ refetch }) => {

  const lessonDetails = JSON.parse(localStorage?.getItem("lessonDetails"));
  const contentDetails = JSON.parse(localStorage?.getItem("contentDetails"));
  const [selectedLessonId, setSelectedLessonId] = useState(
    lessonDetails?.lessonId,
  );
  const [selectedChapterId, setSelectedChapterId] = useState(
    lessonDetails?.contentId,
  );
  const [hideSidebar, setHideSidebar] = useState(false);

  const [initial, setInitial] = useState(true);
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;

  const { data } = useQueryData(
    ["mark-as-completed", lessonDetails?.contentId, selectedChapterId],
    contentDetails?.data?.contentType === "QUESTIONNAIRE"
      ? `api/v1/content/quiz/detail/${
          selectedChapterId ?? lessonDetails?.contentId
        }`
      : `api/v1/content/${!isStudent ? "details" : "student-details"}/${
          selectedChapterId ?? lessonDetails?.contentId
        }`,
    [],
    open ? true : false,
  );

  const width = useWindowsDimensions();
  const sidebarLessonData = contentDetails?.lesson;

  const { changeLayout } = useChangeLayout();
  useEffect(() => {
    if (initial) {
      setTimeout(() => {
        setInitial(false);
      }, [500]);
    }
  }, []);

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const handleChapterClick = selectedId => {
    setSelectedLessonId(selectedId);
  };

  const handleHideSidebar = value => {
    setHideSidebar(value);
  };
  return (
    <div className="flex relative lg:static each-material lg:flex-col  mt-[-20px]  lg:ml-0">
      <div
        className={` fixed z-10 lg:ml-[-40px] ${
          hideSidebar ? "w-[28px]" : "w-[20%]"
        }`}
      >
        <SubjectSidebar
          lessons={sidebarLessonData}
          selectedChapterId={selectedChapterId}
          isMaterial={true}
          initial={initial}
          wide={width}
          setSelectedChapterId={setSelectedChapterId}
          hideSidebar={hideSidebar}
          handleHideSidebar={handleHideSidebar}
          handleChapterClick={handleChapterClick}
          selectedLessonId={selectedLessonId}
        />
      </div>
      <div
        className={`sm:pl-0  pl-[10px] mr-[10px]  lg:w-full lg:ml-0 lg:mr-0 ${
          hideSidebar ? "w-[65%] ml-4" : "w-[65%] ml-[25%]"
        }`}
      >
        <MaterialBody
          initial={initial}
          hideSidebar={hideSidebar}
          selectedChapterId={selectedChapterId}
          data={data?.data}
        />
      </div>
      <div
        className={`${
          hideSidebar ? "w-[30%]" : "w-1/3"
        }  sm:min-w-full ml-[35px] lg:w-full lg:ml-0 lg:mr-0 lg:mt-10 lg:px-6`}
      >
        <MaterialRightSidebar
          initial={initial}
          refetch={refetch}
          selectedChapterId={selectedChapterId}
          setSelectedChapterId={setSelectedChapterId}
        />
      </div>
    </div>
  );
};

export default MaterialPage;

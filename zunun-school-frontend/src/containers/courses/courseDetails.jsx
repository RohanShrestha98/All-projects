import { useQueryData } from "../../hooks/useQueryData";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { React, useEffect, useState } from "react";
import ToggleLesson from "./toggleLesson";
import { RxCross2 } from "react-icons/rx";
import sidebarIcon from "../../assets/images/sidebarIcon.png";
import LevelToggle from "./LevelToggle";
import UnitToggle from "./UnitToggle";
import ErrorPage from "../../components/errorPage/errorPage";
import { useContentDetailsContext } from "../../context/contentDetailContext";

const CourseDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [sideBarActive, setSideBarActive] = useState(true);
  const [lessonBodyDisplay, setLessonBodyDisplay] = useState([]);
  const [unitByLevel, setUnitByLevel] = useState([]);
  const { setContentDetails } = useContentDetailsContext();

  const { data, isError, isLoading } = useQueryData(
    ["course", id, state?.studentId],
    state?.section
      ? `api/v1/course/details/${id}/?sectionId=${state?.section}`
      : state?.studentId
      ? `api/v1/course/details/${id}/?studentId=${state?.studentId}`
      : `api/v1/course/details/${id}`,
  );
  const finalData = data && data;
  const courseDetails = JSON.parse(localStorage?.getItem("courseDetails"));
  const contentDetails = JSON.parse(localStorage?.getItem("contentDetails"));

  const startLessonData = finalData?.unit?.[0]?.skill?.[0]?.indicator?.[0];
  useEffect(() => {
    setLessonBodyDisplay(startLessonData);
  }, [data]);

  useEffect(() => {
    localStorage.setItem(
      "contentDetails",
      lessonBodyDisplay !== undefined &&
        data !== undefined &&
        JSON.stringify(lessonBodyDisplay),
      setContentDetails(
        JSON.stringify(
          lessonBodyDisplay !== undefined &&
            data !== undefined &&
            lessonBodyDisplay,
        ),
      ),
    );
  }, [lessonBodyDisplay, data]);

  const unitData = finalData?.unit;

  const groupUnitByLevels = () => {
    let tempData = {};
    if (data?.hasLevel) {
      data?.unit?.map(each => {
        const levels = each.level;
        if (levels in tempData) {
          tempData[levels].push(each);
        } else {
          tempData[levels] = [each];
        }
      });
    }
    setUnitByLevel(tempData);
  };

  useEffect(() => {
    groupUnitByLevels();
  }, [finalData?.hasLevel]);

  useEffect(() => {}, [data]);

  const LevelDataKey = unitByLevel && Object.keys(unitByLevel);

  if (isError) return <>Somthing went wrong!</>;
  if (isLoading) return <>Loading...</>;
  if (lessonBodyDisplay?.length < 1)
    return setLessonBodyDisplay(startLessonData);

  return (
    <>
      <div
        className={`${
          sideBarActive ? "gap-20" : "gap-4  w-full"
        } flex justify-between items-start  mt-4 flex-shrink`}
      >
        {sideBarActive ? (
          <div className="w-[35%] bg-white min-h-[70vh] p-4 rounded-md">
            <div className="flex items-center justify-between mb-3 ">
              <p className="font-semibold text-base cursor-pointer">Units</p>
              <button
                className=" p-1 rounded-full text-blue bg-gray-11"
                onClick={() => setSideBarActive(false)}
              >
                <RxCross2 />
              </button>
            </div>
            {data?.hasLevel ? (
              <div>
                {LevelDataKey?.map(item => {
                  return (
                    <LevelToggle
                      key={item}
                      finalData={finalData}
                      title={item}
                      setLessonBodyDisplay={setLessonBodyDisplay}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="h-[78vh] overflow-auto">
                {unitData?.map((item, index) => {
                  const skillData = item?.skill;
                  return (
                    <UnitToggle
                      key={index}
                      index={index}
                      skillData={skillData}
                      item={item}
                      finalData={finalData}
                      setLessonBodyDisplay={setLessonBodyDisplay}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <button
            className="text-white rounded"
            onClick={() => setSideBarActive(true)}
          >
            <img src={sidebarIcon} className="w-9 h-9" alt="" />
          </button>
        )}
        <div className="w-full">
          <div className="flex items-center gap-3">
            <button
              className="text-base mb-4 flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 py-1"
              onClick={() => navigate(-1)}
            >
              <BiArrowBack size={16} />
            </button>
            <h2 className="text-xl mb-4 md:text-lg font-semibold sm:font-medium sm:text-base">
              {courseDetails?.courseName}
            </h2>
          </div>
          <div className={`h-[78vh] overflow-y-auto no-scrollbar`}>
            {contentDetails ? (
              contentDetails.lesson?.map((item, index) => {
                const contentData = item?.content;
                return (
                  <div key={index}>
                    <ToggleLesson
                      studentId={state?.studentId}
                      isTeacher={true}
                      courseId={id}
                      item={item}
                      index={index}
                      sectionId={state?.section}
                      contentData={contentData}
                      finalData={contentDetails}
                    />
                  </div>
                );
              })
            ) : (
              <ErrorPage
                // emptyImage={emptyImage ?? noData1}
                title={"No lessons made public yet"}
                isFetching={false}
                data={[]}
                error={false}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;

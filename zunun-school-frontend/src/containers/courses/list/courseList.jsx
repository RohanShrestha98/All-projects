/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { BiFilter, BiSync } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Img from "../../../assets/images/threeD.png";
import { useQueryData } from "../../../hooks/useQueryData";
import AddCourse from "./addCourse";
import AssignToSection from "./assignToSection";
import { useMutate } from "../../../hooks/useMutateData";
import toast from "../../../utils/toast";
import { usePermissionContext } from "../../../context/permissionContext";
import ConfirmModel from "../../profile/confirmModel";
import ErrorPage from "../../../components/errorPage/errorPage";
import FilterByGrades from "../../../pages/section/filterByGrades";
import { Checkbox, Progress } from "antd";

const CourseList = ({ studentId, firstName }) => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const [syncCourseId, setSyncCourseId] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [selectedCoursesClick, setSelectedCoursesClick] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [gradeId, setGradeId] = useState("");
  const { permissions } = usePermissionContext().permissions;
  const coursePermission = permissions
    ?.filter(each => each.url.path.includes("course"))
    ?.map(each => each.url.path);

  const useAssignSectionMutation = () =>
    useMutate(["course"], "api/v1/section/remove-course/");

  const { mutateAsync: unAssignMutateAsync } = useAssignSectionMutation();
  const useSyncMutation = () =>
    useMutate(["course"], "api/v1/section/sync-course/");

  const { mutateAsync: syncMutateAsync } = useSyncMutation();

  const { data, isError, isLoading } = useQueryData(
    ["course", isFiltered, gradeId],
    !isFiltered ? `api/v1/course/list/` : `api/v1/course/list?grade=${gradeId}`,
    {
      section: state?.id,
    },
    !studentId,
  );

  const { data: studentCourse } = useQueryData(
    ["students-course"],
    `api/v1/course/student-list/${studentId}`,
    "",
    !!studentId,
  );

  const navigate = useNavigate();
  const handleCourseClick = item => {
    localStorage.setItem(
      "courseDetails",
      data !== undefined &&
        JSON.stringify({ courseName: item?.name, courseId: item?.id }),
    );
    navigate(`/courses/list/${item.id}`, {
      state: {
        section: state?.id,
        isSynced: item?.isSynced,
        studentId: studentId,
      },
    });
  };

  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      setCheckboxes([...checkboxes, value]);
    }
    if (!checked) {
      setCheckboxes(pre => pre.filter(each => each !== value));
    }
  };

  const handleSelectedCourses = item => {
    setSelectedCourses(item.id);
    setSelectedCoursesClick(!selectedCoursesClick);
  };

  const handleSync = async courseID => {
    const postData = {
      section: state && state?.id,
      course: courseID,
    };
    try {
      const response = await syncMutateAsync(["post", "", postData]);
      if (response.success) {
        toast.success("Course synced successfull");
        setConfirmModel(false);
      }
    } catch (err) {
      toast.error(Object?.values(err?.response?.data?.errors)?.[0]);
    }
  };

  const handleUnassignCourse = async () => {
    const postData = {
      section: state.id,
      courses: checkboxes,
    };
    try {
      const response = await unAssignMutateAsync(["post", "", postData]);
      if (response.success) {
        setOpen(false);
        toast.success("Unassign Courses successfully!");
        setCheckboxes([]);
      }
    } catch (err) {
      toast.error(Object?.values(err?.response?.data?.errors)?.[0]);
    }
  };
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        {state ? (
          <div className="flex items-center gap-2">
            <p
              className="flex items-center gap-1 border border-blue h-8 rounded-md bg-blue text-white hover:text-blue hover:bg-white cursor-pointer px-3 text-sm py-1"
              onClick={() => navigate(-1)}
            >
              <ImArrowLeft2 size={16} />
            </p>
            <p className="font-bold sm:text-lg text-xl">
              {state && studentId === undefined
                ? `Courses in ${state.name}`
                : studentId !== undefined
                ? `Courses of ${firstName}`
                : "Course List"}
            </p>
          </div>
        ) : (
          <p className="font-bold sm:text-lg text-xl">
            {state && studentId === undefined
              ? `Courses in ${state.name}`
              : studentId !== undefined
              ? `Courses of ${firstName}`
              : "Course List"}
          </p>
        )}
        <section className="flex items-center">
          <p className="font-semibold sm:text-sm text-base">
            Total Courses :{" "}
            {studentId === undefined && data
              ? data?.data?.length ?? 0
              : studentCourse?.data?.length ?? 0}
          </p>
        </section>
        <div
          className={`flex gap-2 ${
            isFiltered
              ? "font-bold bg-red text-white hover:text-red hover:bg-white border border-red px-4 py-[2px]"
              : "bg-blue text-white px-4 py-[2px] hover:bg-white hover:text-blue cursor-pointer border border-blue"
          }  rounded cursor-pointer h-8`}
          onClick={() => {
            !isFiltered ? setOpenFilter(true) : setIsFiltered(false);
          }}
        >
          {!isFiltered ? "Filter" : "Clear "}
          {!isFiltered ? <BiFilter size={22} /> : " X"}
        </div>
      </div>
      {coursePermission?.includes("/section/assign-course/") ||
        coursePermission?.includes("/section/remove-course/") ||
        (permissions[0].name === "Any" && (
          <>
            {checkboxes?.length ? (
              <div className="flex justify-between  bg-blue-light items-center h-12 rounded px-4 text-white">
                {checkboxes?.length} Courses Selected
                <div className="unassign_button">
                  <button
                    className={`border-2 px-4 py-1 rounded font-semibold bg-white ${
                      state
                        ? "text-red hover:bg-red"
                        : "text-blue hover:bg-blue-light"
                    }  hover:text-white`}
                    onClick={() => {
                      state
                        ? handleUnassignCourse()
                        : setOpenAssign(!openAssign);
                    }}
                  >
                    {state ? "Unassign from Section" : "Assign to Section"}
                  </button>
                </div>
              </div>
            ) : null}

            {openAssign && (
              <AssignToSection
                open={openAssign}
                setOpen={setOpenAssign}
                checkboxes={checkboxes}
                setCheckboxes={setCheckboxes}
              />
            )}
          </>
        ))}

      <div className="grid grid-cols-3 gap-7 xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 md:grid-cols-1 md:gap-4 cursor-pointer">
        {studentId === undefined &&
          data?.data &&
          (permissions[0].name === "Any" ||
            coursePermission.includes("/course/list/")) &&
          data?.data?.map(item => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  (coursePermission.includes("/course/details/") ||
                    permissions[0].name === "Any") &&
                    handleCourseClick(item);
                }}
                className="flex p-4 shadow-md min-w-[200px] bg-white rounded-2xl gap-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="sm:w-1/4 flex items-center">
                    <LazyLoadImage
                      src={Img}
                      alt="img"
                      effect="blur"
                      className="h-100 w-100"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <p className="text-lg font-Urbanist  font-bold">
                      {item.name}
                    </p>
                    {item?.progress && (
                      <div className="pr-2">
                        <Progress
                          percent={(item?.progress / 100) * 100}
                          format={() => `${item?.progress ?? 0}/100`}
                          strokeColor="#75D9C5"
                          trailColor="#f5f5f5"
                        />
                      </div>
                    )}

                    <p className="text-sm text-stone-400">View lesson</p>
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-2 items-end ${
                    state && "justify-evenly"
                  } `}
                >
                  {" "}
                  {(coursePermission.includes("/section/assign-course/") ||
                    permissions[0].name === "Any" ||
                    coursePermission.includes("/section/remove-course/")) && (
                    <Checkbox
                      className="w-4 h-4"
                      value={item.id}
                      onChange={e => {
                        handleCheckboxChange(e.target.value, e.target.checked);
                      }}
                      onClick={e => {
                        e.stopPropagation();
                        handleSelectedCourses(item);
                      }}
                    />
                  )}
                  {state?.name && (
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        setSyncCourseId(item?.id);
                        setConfirmModel(!item?.isSynced);
                      }}
                      className={`flex gap-1 py-1 items-center px-2  ${
                        !item.isSynced
                          ? "bg-blue border-blue cursor-pointer"
                          : "bg-gray-dark3 border-gray-dark3 cursor-not-allowed"
                      } text-white rounded-xl border  `}
                    >
                      <BiSync className="text-lg" />
                      <p className="text-xs">
                        {item?.isSynced ? "Synced" : "Sync"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        {studentId !== undefined &&
          studentCourse?.data &&
          (permissions[0].name === "Any" ||
            coursePermission.includes("/course/list/")) &&
          studentCourse?.data?.map(item => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  (coursePermission.includes("/course/details/") ||
                    permissions[0].name === "Any") &&
                    handleCourseClick(item);
                }}
                className="flex p-4 shadow-md min-w-[200px] w-full bg-white rounded-2xl gap-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="sm:w-1/4 flex items-center">
                    <LazyLoadImage
                      src={Img}
                      alt="img"
                      effect="blur"
                      className="h-100 w-100"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <p className="text-lg font-Urbanist  font-bold">
                      {item.name}
                    </p>
                    {item?.progress && (
                      <div className="pr-2 min-w-full">
                        <Progress
                          percent={(item?.progress / 100) * 100}
                          format={() => `${item?.progress ?? 0}/100`}
                          strokeColor="#75D9C5"
                          trailColor="#f5f5f5"
                        />
                      </div>
                    )}

                    <p className="text-sm text-stone-400">View lesson</p>
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-2 items-end ${
                    state && "justify-evenly"
                  } `}
                >
                  {" "}
                  {(coursePermission.includes("/section/assign-course/") ||
                    permissions[0].name === "Any" ||
                    coursePermission.includes("/section/remove-course/")) &&
                    studentId === undefined && (
                      <Checkbox
                        className="w-4 h-4"
                        value={item.id}
                        onChange={e => {
                          handleCheckboxChange(
                            e.target.value,
                            e.target.checked,
                          );
                        }}
                        onClick={e => {
                          e.stopPropagation();
                          handleSelectedCourses(item);
                        }}
                      />
                    )}
                  {state?.name && (
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        setSyncCourseId(item?.id);
                        setConfirmModel(!item?.isSynced);
                      }}
                      className={`flex gap-1  h-7 items-center px-2  ${
                        !item.isSynced
                          ? "bg-blue border-blue cursor-pointer"
                          : "bg-gray-dark3 border-gray-dark3 cursor-not-allowed"
                      } text-white rounded-xl border  `}
                    >
                      <BiSync className="text-xl" />
                      <p>sync</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {!data?.data && (
        <ErrorPage
          isFetching={isLoading}
          error={isError}
          data={data?.data}
          title={"No course"}
        />
      )}

      <FilterByGrades
        open={openFilter}
        setOpen={setOpenFilter}
        title={"Filter courses by grade"}
        setIsFiltered={setIsFiltered}
        setGradeId={setGradeId}
        gradeId={gradeId}
      />

      {state && (
        <AddCourse open={open} setOpen={setOpen} sectionId={state?.id} />
      )}
      {confirmModel && (
        <ConfirmModel
          title={"Sync Course"}
          isOpen={confirmModel}
          setOpen={setConfirmModel}
          desc={"Are you sure you want to sync this course?"}
          btnName={"Sync"}
          handleConfirm={() => handleSync(syncCourseId)}
        />
      )}
    </div>
  );
};

export default CourseList;

import React, { useEffect, useState } from "react";
import { message } from "antd";
import logo1 from "../../assets/logo1.png";
import MobileHeader from "../../components/navbar/mobileHeader";
import { CustomDrawer } from "../../components/modal/cusotmDrawer";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";
import { useNavigate } from "react-router-dom";
import { useCourseAvailable } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import { useRemoveEnrollCourseMutation } from "../../hooks/useMutateData";
import { CustomModal } from "../../components/modal/customModal";
import EnrolledCourseCard from "./enrolledCourseCard";
import { useModalStore } from "../../store/useModalStore";

export const EnrolledCourse = () => {
  const navigate = useNavigate();

  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [initial, setInitial] = useState(true);

  const width = useWindowsDimensions();
  const { data, isLoading, isError } = useCourseAvailable();
  const { userModules, setUserModules } = useModuleStore();
  const { toggleConfirmModal } = useModalStore();

  const removeEnrollCourseMutation =
    useRemoveEnrollCourseMutation(selectedModuleId);

  const unassignCourseList = data?.detail?.filter(
    (assignCourse1) =>
      !userModules?.some(
        (userModuleId) => userModuleId === assignCourse1?.module_id
      )
  );

  const handleRemoveAssignCourse = () => {
    removeEnrollCourseMutation.mutateAsync(["delete", ""], {
      onSuccess: () => {
        message.success("Assigned Courses Removed Successfully", [4]);
        setUserModules(
          userModules?.filter(
            (userModuleId) => userModuleId !== selectedModuleId
          )
        );
        toggleConfirmModal();
      },
      onError: (error) => {
        let errorMessage = error?.response?.data?.message
          ? error?.response?.data?.message?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [1000]);
  }, []);

  return (
    <div className="md:w-screen h-[100vh] overflow-auto">
      <MobileHeader
        className={"hidden md:flex"}
        noProfile={true}
        headerName={"Enrolled Courses"}
      />
      <div className="flex flex-col gap-10 lg:gap-6 px-10 md:px-4">
        {width > 768 && (
          <div className="flex justify-center">
            <img className="h-20 w-20" src={logo1} alt="logo" />
          </div>
        )}
        <div className="flex lg:flex-col lg:items-start items-center gap-4 lg:justify-start justify-between tracking-tight">
          {width > 768 && (
            <div>
              <p className="text-lg">Enrolled Courses</p>
              <p className="text-[#666] text-sm">
                Select any of your enrolled course to continue
              </p>
            </div>
          )}
          <button
            onClick={() =>
              navigate("/choiceCourse", {
                state: {
                  unassignCourseList,
                },
              })
            }
            className="text-xs text-white  bg-theme-color rounded-lg cursor-pointer px-9 py-4 flex-shrink-0 whitespace-nowrap md:w-full"
          >
            + Enroll to new course
          </button>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4  md:gap-3 pb-10">
          {isLoading || initial ? (
            [...Array(6)]?.map((_, id) => {
              return (
                <div key={id} className="shadow rounded-md p-4 w-full">
                  <div className="animate-pulse  space-y-2">
                    <div className=" bg-gray-6 h-20 w-full" />
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-8 bg-gray-6 rounded" />
                      <div className="h-4 bg-gray-6 rounded" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : isError ? (
            <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
              Error
            </h1>
          ) : data?.data?.length === 0 ? (
            <>No data found</>
          ) : (
            data?.data?.map((assignCourse) => {
              return (
                <EnrolledCourseCard
                  key={assignCourse?.id}
                  setSelectedModuleId={setSelectedModuleId}
                  assignCourse={assignCourse}
                />
              );
            })
          )}
        </div>

        {width > 768 ? (
          <CustomModal
            clickHandler={() => handleRemoveAssignCourse()}
            message={"Are you sure you want to unsubscribe to this course?"}
            buttonName={"Confirm"}
            note={
              "Note: This will also remove all of your subscription and progress related to this course and this action can't be undone!"
            }
            isSubmitting={removeEnrollCourseMutation?.isPending}
          />
        ) : (
          <CustomDrawer
            clickHandler={() => handleRemoveAssignCourse()}
            message={"Are you sure you want to unsubscribe to this course?"}
            buttonName={"Confirm"}
            note={
              "Note: This will also remove all of your subscription and progress related to this course and this action can't be undone!"
            }
            isSubmitting={removeEnrollCourseMutation?.isPending}
          />
        )}
      </div>
    </div>
  );
};

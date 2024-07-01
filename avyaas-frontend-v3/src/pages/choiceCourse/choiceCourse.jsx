import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";
import {
  useCourseAvailable,
  useCourseGroup,
  useCourseList,
} from "../../hooks/useQueryData";
import { CourseEnrollModal } from "../../components/modal/courseEnrollModal";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";
import { useEnrollCourseMutation } from "../../hooks/useMutateData";
import MobileViewChoiceCourse from "./mobileViewChoiceCourse";
import WebViewChoiceCourse from "./webViewChoiceCourse";
import CourseGroupSidebar from "./courseGroupSidebar";
import { useModalStore } from "../../store/useModalStore";
import { useCourseStore } from "../../store/useCourseStore";
import { CustomDrawer } from "../../components/modal/cusotmDrawer";
import { isAxiosError } from "axios";

export const ChoiceCourse = () => {
  const { toggleCourseEnrollModal } = useModalStore();
  const { selectedCourseGroup, selectedCourse } = useCourseStore();

  const {
    data: courseGroup,
    isLoading: courseGroupLoading,
    isError: courseGroupError,
  } = useCourseGroup();

  useEffect(() => {
    if (courseGroup?.data?.length > 0) {
      const selectedCourseGroup = courseGroup?.data[0];
      useCourseStore.setState({ selectedCourseGroup });
    }
  }, [courseGroup]);

  const { data: enrolledCourseList } = useCourseAvailable();
  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
  } = useCourseList({ courseGroupID: selectedCourseGroup?.id });

  const enrollCourseMutation = useEnrollCourseMutation();
  const enrolledCourses = [];

  enrolledCourseList?.data?.map((item) =>
    enrolledCourses?.push(item?.courseID)
  );

  const navigate = useNavigate();
  const width = useWindowsDimensions();

  const handleEnrolledCourse = () => {
    enrollCourseMutation.mutateAsync(
      ["post", `${selectedCourse?.id}/`, courseData],
      {
        onSuccess: () => {
          message.success("Course enrolled Successfully", [2]);
          toggleCourseEnrollModal();
          navigate("/enrolledCourse");
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            if (!error?.response?.data) errorMsg = "No Server Response!";

            let errorMsg = error?.response?.data;
            message.error(errorMsg?.error, [2]);
          }
        },
      }
    );
  };

  return (
    <>
      {width > 768 ? (
        <div className="px-16 pt-8 flex">
          <CourseGroupSidebar
            isLoading={courseGroupLoading}
            isError={courseGroupError}
            courseGroup={courseGroup}
          />
          <WebViewChoiceCourse
            data={courseData}
            courseGroup={courseGroup}
            courseLoading={courseLoading}
            courseError={courseError}
            enrolledCourses={enrolledCourses}
          />
        </div>
      ) : (
        <MobileViewChoiceCourse
          isCourseGroupLoading={courseGroupLoading}
          isCourseGroupError={courseGroupError}
          courseGroupData={courseGroup}
          isCourseLoading={courseLoading}
          isCourseError={courseError}
          courseData={courseData}
          enrolledCourses={enrolledCourses}
        />
      )}
      {width > 768 ? (
        <CourseEnrollModal
          clickHandler={() => handleEnrolledCourse()}
          name={selectedCourse?.title}
          description={
            selectedCourse?.description
              ? ConvertHtmlToPlainText(selectedCourse?.description)
              : "No description"
          }
        />
      ) : (
        <CustomDrawer
          clickHandler={() => handleEnrolledCourse()}
          message={selectedCourse?.title}
          buttonName={"Confirm"}
          note={
            selectedCourse?.description
              ? ConvertHtmlToPlainText(selectedCourse?.description)
              : "No description"
          }
          isSubmitting={enrollCourseMutation.isPending}
        />
      )}
    </>
  );
};

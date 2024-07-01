import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { ShimmerBadge } from "react-shimmer-effects";
import CompletedCourse from "./cards/completedCourse";
// import Grades from "./cards/grades";
import OngoingCourse from "./cards/ongoingCourse";
import { useQueryData } from "../../hooks/useQueryData";
import { useAuthContext } from "../../context/authContext";

const CourseStatusTabs = ({
  activeTab,
  isStudent,
  setCourseId,
  setCourseName,
}) => {
  const { auth } = useAuthContext();
  const [initial, setInitial] = useState(true);
  const { data, isError, isLoading } = useQueryData(
    ["course", isStudent],
    `api/v1/course/student-list/${auth?.user?.id}`,
    "",
    !!isStudent,
  );

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  const items = [
    {
      key: "1",

      label: (
        <>
          {initial ? (
            <div>
              <ShimmerBadge />
            </div>
          ) : (
            <div className="px-4 py-1 border rounded-full tab-box">
              <span>Ongoing</span>
            </div>
          )}
        </>
      ),
      children: (
        <OngoingCourse
          setCourseId={setCourseId}
          setCourseName={setCourseName}
          isLoading={isLoading}
          isError={isError}
          data={data?.data?.filter(item => item?.progress !== 100)}
        />
      ),
    },
    {
      key: "2",
      label: (
        <>
          {initial ? (
            <div>
              <ShimmerBadge />
            </div>
          ) : (
            <div className="px-4 py-1 border rounded-full tab-box">
              <span>Completed</span>
            </div>
          )}
        </>
      ),
      children: (
        <CompletedCourse
          setCourseId={setCourseId}
          setCourseName={setCourseName}
          isLoading={isLoading}
          isError={isError}
          data={data?.data?.filter(item => item?.progress === 100)}
        />
      ),
    },
    // {
    //   key: "3",
    //   label: (
    //     <>
    //       {initial ? (
    //         <div>
    //           <ShimmerBadge />
    //         </div>
    //       ) : (
    //         <div className="px-4 py-1 border rounded-full tab-box">
    //           <span>Grades</span>
    //         </div>
    //       )}
    //     </>
    //   ),
    //   children: <Grades />,
    // },
  ];

  return (
    <div className="w-full course-tab">
      <Tabs
        defaultActiveKey={activeTab}
        items={items}
        tabBarStyle={{ borderBottom: "0px" }}
      />
    </div>
  );
};

export default CourseStatusTabs;

import React from "react";
import { Tabs } from "antd";
import Overdue from "./assignmentList/overdue";
import AllAssignment from "./assignmentList/all";
import Submitted from "./assignmentList/submitted";
import Graded from "./assignmentList/graded";
import { ShimmerBadge } from "react-shimmer-effects";

const AssignmentStatusTabs = ({ initial }) => {
  const items = [
    {
      key: "1",
      label: (
        <>
          {initial ? (
            <ShimmerBadge />
          ) : (
            <div className="px-4 py-1 border rounded-full tab-box">
              <span>All</span>
            </div>
          )}
        </>
      ),
      children: <AllAssignment />,
    },
    {
      key: "2",
      label: (
        <>
          {initial ? (
            <ShimmerBadge />
          ) : (
            <div className="px-4 py-1 border rounded-full tab-box">
              <span>Overdue</span>
            </div>
          )}
        </>
      ),
      children: <Overdue />,
    },
    {
      key: "3",
      label: (
        <>
          {initial ? (
            <ShimmerBadge />
          ) : (
            <div className="px-4 py-1 border rounded-full tab-box">
              <span>Submitted</span>
            </div>
          )}
        </>
      ),
      children: <Submitted />,
    },
    {
      key: "4",
      label: (
        <>
          {initial ? (
            <ShimmerBadge />
          ) : (
            <div className="px-4 py-1 border rounded-full tab-box">
              <span>Graded</span>
            </div>
          )}
        </>
      ),
      children: <Graded />,
    },
  ];

  return (
    <div className="w-full flex ">
      <Tabs
        className="w-full"
        defaultActiveKey="1"
        items={items}
        tabBarStyle={{ borderBottom: "none" }}
      />
    </div>
  );
};

export default AssignmentStatusTabs;

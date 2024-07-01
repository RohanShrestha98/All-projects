import React, { useState, useEffect } from "react";
import { ShimmerText } from "react-shimmer-effects";
import AssignmentStatusTabs from "../../containers/assisgnment/tabs";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import AssignmentList from "./AssignmentList";
import { useAuthContext } from "../../context/authContext";

const MyAssignment = () => {
  const [initial, setInitial] = useState(true);
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;
  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);
  return isStudent ? (
    <div className="flex flex-col h-full gap-4 sm:gap-0">
      <div className="sm:z-[1000] sm:w-full sm:bg-white sm:fixed sm:top-0 sm:pt-[28px] sm:pb-3 sm:shadow-md md:px-6">
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {" "}
            <p className="font-bold sm:text-xl text-3xl text-black">
              Assignment
            </p>
          </div>
        )}
      </div>
      <div className="md:px-6 sm:pt-24">
        <AssignmentStatusTabs initial={initial} />
      </div>
    </div>
  ) : (
    <AssignmentList />
  );
};

export default MyAssignment;

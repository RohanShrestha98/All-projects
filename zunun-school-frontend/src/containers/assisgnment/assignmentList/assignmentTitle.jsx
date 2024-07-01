import React, { useState, useEffect } from "react";
import { ShimmerText } from "react-shimmer-effects";

const AssignmentTitle = props => {
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  return (
    <div className="flex mb-[16px] items-center sm:justify-between sm:px-4 sm:mt-2 mt-[29px]">
      <div
        className={`w-[40%] font-bold text-xl  sm:text-[15px] sm:font-medium ${
          props.isOverdue ? "text-[#F20D0D]" : ""
        }`}
      >
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          props.title
        )}
      </div>
      <div className="w-[20%] text-center font-bold  text-[#6f6f6f] text-[15px] sm:hidden ">
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          "Added date"
        )}
      </div>
      <div className="w-[20%] text-center font-bold text-[#6f6f6f] text-[15px] sm:hidden ">
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          "Due date"
        )}
      </div>
      <div className="text-center w-[20%] font-bold  text-[#6f6f6f] text-[15px] sm:text-sm  sm:w-fit">
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          props.lastRow
        )}
      </div>
    </div>
  );
};

export default AssignmentTitle;

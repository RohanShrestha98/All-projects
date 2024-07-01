import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UploadTop = ({ title, openDate, dueDate }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sm:z-[1000] sm:fixed sm:top-0 sm:pt-[28px] sm:bg-white sm:shadow-md sm:w-full md:px-6 sm:pb-3">
        <div className="flex items-center gap-x-2">
          <HiOutlineArrowLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="font-bold text-xl">{title}</div>
        </div>
      </div>
      <div className="my-7 sm:my-0 sm:mb-7 md:px-6 sm:pt-24">
        <div className="font-semibold text-[15px]">
          Open date:{" "}
          <span className="ml-2 font-medium text-[15px] text-gray-dark">
            {openDate?.slice(0, 10)}
          </span>
        </div>
        <div className="font-semibold text-[15px]">
          Due date:{" "}
          <span className="ml-2 font-medium text-[15px] text-gray-dark">
            {dueDate?.slice(0, 10)}
          </span>
        </div>
      </div>
    </>
  );
};

export default UploadTop;

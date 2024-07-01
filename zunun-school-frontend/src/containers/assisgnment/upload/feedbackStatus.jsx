import React from "react";
import profileImg from "../../../assets/images/profile.png";
import dayjs from "dayjs";

const FeedbackStatus = ({ data }) => {
  return (
    <div>
      <div className="font-[800] text-[22px] mt-[27px] mb-4 ">Feedback</div>
      <div className="grid grid-cols-6 ">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Grade
        </div>
        <div className="col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm">
          {data?.feedback?.gradePoint ? (
            <> {data?.feedback?.gradePoint}</>
          ) : (
            "Not Publish"
          )}
        </div>
      </div>
      <div className="grid grid-cols-6 bg-gray-16">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Graded on
        </div>
        <div className="col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm">
          {dayjs(data?.feedback?.gradedOn).format("	dddd, MMMM D, YYYY h:mm A")}
        </div>
      </div>
      <div className="grid grid-cols-6 ">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Graded by
        </div>
        <div className="flex items-center col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm">
          <img src={profileImg} alt="image" className="w-6 h-6" />{" "}
          <span className="ml-[9px]">
            {data?.feedback?.gradedBy?.name === " "
              ? "Super Admin"
              : data?.feedback?.gradedBy?.name}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 bg-gray-16">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Feedback Comments
        </div>
        <div className="col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm">
          {data?.feedback?.feedback ?? "Study More"}
        </div>
      </div>
    </div>
  );
};

export default FeedbackStatus;

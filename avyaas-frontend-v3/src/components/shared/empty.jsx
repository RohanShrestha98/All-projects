import React from "react";
import { AlertCircleSvg } from "../../assets/allSvg";

const Empty = ({ message = "", className = "border border-gray-6" }) => {
  return (
    <div
      className={`${className} rounded-md flex flex-col gap-2 py-4 px-10 items-center justify-center min-w-fit`}>
      <AlertCircleSvg className="text-gray-7 h-8 w-8" />
      <p className="whitespace-nowrap text-gray-7">{message}</p>
    </div>
  );
};

export default Empty;

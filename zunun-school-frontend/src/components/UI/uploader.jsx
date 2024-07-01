import React from "react";
import { LoadingSpinnerSvg } from "../../assets/icons/allSvg";
import { RxCross2 } from "react-icons/rx";

const Uploader = ({
  id,
  isUploading,
  file,
  handleRemoveFile,
  handleChange,
  className = "px-4 py-[3px] border border-[#d9d9d9] max-w-[120px] bg-white rounded-md whitespace-nowrap",
  accept,
}) => {
  return (
    <div className="flex gap-2 ">
      <input
        type="file"
        id={id}
        onChange={e => {
          handleChange(e);
        }}
        className="hidden"
        accept={accept}
      />
      <label
        className={` ${className} hover:border-cyan hover:cursor-pointer`}
        htmlFor={id}
      >
        {file?.fileName ? "Change file" : "Choose file"}
      </label>

      <div className="flex gap-1 items-center">
        <p className="line-clamp-1 text-xs">
          {!isUploading && (file?.fileName ? file?.fileName : "No file chosen")}
        </p>
        {file?.fileName && !isUploading && handleRemoveFile && (
          <div
            className=" cursor-pointer border rounded-full p-[1px] border-red"
            onClick={() => handleRemoveFile()}
          >
            <RxCross2 className="text-red h-4 w-4" />
          </div>
        )}

        {isUploading && <LoadingSpinnerSvg className="h-5 w-5 text-cyan" />}
      </div>
    </div>
  );
};

export default Uploader;

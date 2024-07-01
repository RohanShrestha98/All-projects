import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import profileImg from "../../../assets/images/profile.png";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutate } from "../../../hooks/useMutateData";
import toast from "../../../utils/toast";
import ReactQuill from "react-quill";

const SubmissionStatus = ({ data }) => {
  const { handleSubmit, register, reset } = useForm();
  const useCommentMutation = () =>
    useMutate(["student-assignment-details"], "api/v1/assignment/comment/");
  const { mutateAsync } = useCommentMutation();
  // const onlineText =
  //   "In the video, Harari and TED Trustee Chris Anderson debated";

  // const [len, setLen] = useState(40);
  const [showComment, setShowComment] = useState(false);

  // const handleLength = () => {
  //   if (onlineText.length < 40 || (onlineText.length > 40 && len === 40)) {
  //     setLen(onlineText.length);
  //   } else {
  //     setLen(40);
  //   }
  // };

  const handleComment = async comment => {
    try {
      const response = await mutateAsync(["post", `${data.id}/`, comment]);
      if (response.success) {
        toast.success("Comment Added Successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

  return (
    <>
      <div className="font-[800] text-[22px] mb-4">Submission Status</div>
      <div className="grid grid-cols-6">
        <div className="bg-gray-16 col-start-1 col-end-3">
          <div className=" pl-4 py-[10px] font-semibold text-[15px]">
            Submission Status
          </div>
        </div>
        <div className="col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm bg-light-green2">
          {data?.submissionStatus === "SUBMITTED"
            ? " Submitted for grading"
            : "Submission Graded"}
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Grading Status
        </div>
        <div
          className={`col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm ${
            data?.feedback?.gradePoint < 40
              ? "bg-red-3"
              : data?.feedback?.gradePoint > 40
              ? "bg-light-green2"
              : "bg-light-green2"
          }`}
        >
          {data?.feedback?.gradePoint < 40
            ? "Fail "
            : data?.feedback?.gradePoint >= 40
            ? "Pass "
            : "Not Publish"}
          {`( ${data?.feedback?.gradePoint}/ 100)`}
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="bg-gray-16 col-start-1 col-end-3">
          <div className=" pl-4 py-[10px] font-semibold text-[15px] ">
            Time submitted
          </div>
        </div>
        <div
          className={`col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm ${
            data?.assignment?.dueDate > data?.updatedAt
              ? "bg-light-green2"
              : "bg-red-3"
          }`}
        >
          {data?.assignment?.dueDate > data?.updatedAt
            ? "Submitted on Time"
            : "Submission Late"}
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Last Modified
        </div>
        <div className="col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm bg-light-green2">
          {dayjs(data?.updatedAt).format("	dddd, MMMM D, YYYY h:mm A")}
        </div>
      </div>
      <div className="grid grid-cols-6 bg-gray-16">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          Submitted Text
        </div>
        <div className="col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm">
          <div className="font-bold text-sm mb-2">
            <ReactQuill
              theme="bubble"
              className="min:h-20"
              readOnly={true}
              showBorder={false}
              value={data?.submissionText}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px]">
          File Submissions
        </div>
        <div className="flex items-center gap-2 col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm">
          <MdOutlineInsertDriveFile />
          <div>File name</div>
        </div>
      </div>
      <div className="grid grid-cols-6 bg-gray-16">
        <div className="col-start-1 col-end-3 pl-4 py-[10px] font-semibold text-[15px] sm:col-end-7">
          Submissions comments
        </div>
        <div className="flex gap-2 col-start-3 col-end-7 pl-4  py-[10px] font-normal text-sm sm:col-start-1 ">
          <IoMdArrowDropright className="mt-1" />
          <div>
            <div
              onClick={() => setShowComment(!showComment)}
              className="cursor-pointer font-medium text-sm underline"
            >
              Comments({data?.comments?.length})
            </div>
            {showComment && (
              <>
                {data?.comments?.map(item => {
                  return (
                    <div key={item.id} className="mt-4">
                      <div className="flex">
                        <img
                          src={profileImg}
                          alt="image"
                          className="w-6 h-6 rounded-full mr-[9px]"
                        />
                        <div>
                          <div className="font-medium text-sm text-brown-1">
                            {item?.user?.name !== " "
                              ? `${item?.user?.name}`
                              : "Super Admin"}
                            <span className="ml-2 font-normal text-[12px] text-gray-dark">
                              {dayjs(item?.createdAt)
                                .utc()
                                .local()
                                .format("ddd, MMM D, YYYY h:mm A")}
                            </span>
                          </div>
                          <div className="font-normal text-sm">
                            {item?.comment}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <form
                  onSubmit={handleSubmit(handleComment)}
                  className="mt-[10px] mr-[9px]"
                >
                  <textarea
                    type="text"
                    {...register("comment")}
                    className="min-h-[104px] min-w-[200px] w-full outline-none"
                    placeholder="Write a comment"
                  />
                  <div className="font-medium text-sm flex justify-end mt-2">
                    <button className=" px-4 py-1 rounded-full bg-blue text-white hover:bg-blue-light">
                      Comment
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionStatus;

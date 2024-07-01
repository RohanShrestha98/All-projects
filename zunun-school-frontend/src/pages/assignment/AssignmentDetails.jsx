import { React, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineFile } from "react-icons/ai";
import PopUpModal from "../../components/modal/PopUpModal";
import { useQueryData } from "../../hooks/useQueryData";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import profileImg from "../../assets/images/profile.png";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { usePermissionContext } from "../../context/permissionContext";
import FeedbackStatus from "../../containers/assisgnment/upload/feedbackStatus";

export default function AssignmentDetails() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [gradeModal, setGradeModal] = useState(false);
  const location = useLocation();
  const { data } = location.state !== null && location.state && location.state;
  const useEventRessignMutation = () =>
    useMutate(["reassign-assignment"], "api/v1/assignment/reassign/");
  const { mutateAsync: mutateReassignAsync } = useEventRessignMutation();
  const useCommentMutation = () =>
    useMutate(["student-assignment-details"], "api/v1/assignment/comment/");
  const { mutateAsync } = useCommentMutation();
  const { data: assignmentDetails } = useQueryData(
    ["student-assignment-details"],
    `api/v1/assignment/detail/${data?.id}`,
    [],
  );

  const { permissions } = usePermissionContext().permissions;
  const assignmentPermission = permissions
    .filter(each => each.url.path.includes("assignment"))
    .map(each => each.url.path);

  const handleReassign = async data => {
    try {
      const response = await mutateReassignAsync([
        "patch",
        `${data.id}/`,
        data,
      ]);
      if (response.success) {
        toast.success("Assignment Resigned Successfully!");
        navigate("/assignment/list");
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

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

  const handleGradeModelOpen = () => {
    setGradeModal(!gradeModal);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          className="text-base  flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3  py-1"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={16} />
        </button>
        <h2 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
          Assignment List
        </h2>
        <div></div>
      </div>
      <div className="bg-white flex justify-between items-center px-9 py-3 my-9 rounded-md md:inline-block">
        <p className="font-bold text-base">
          {assignmentDetails?.data?.assignment?.title}
        </p>
        <NavLink to={""} className="text-sm">
          View Assignment Details{" "}
        </NavLink>
      </div>
      <div className="flex justify-between items-start md:flex-wrap-reverse md:gap-2">
        <div className="font-medium">
          <p>Student Name: {assignmentDetails?.data?.student?.name}</p>
          <p>Grade: {assignmentDetails?.data?.student?.grade}</p>
          {/* <p>Section: A</p> */}
        </div>
        {assignmentDetails?.data?.gradingStatus !== "GRADED" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleReassign(data)}
              className="border border-blue text-blue bg-white px-8 py-1 font-semibold hover:bg-blue hover:text-white rounded-md"
            >
              {(assignmentPermission.includes("/assignment/reassign/") ||
                permissions[0].name === "Any") &&
                "Re-assign"}
            </button>
            <button
              className="border border-blue bg-blue text-white px-11 py-1 font-semibold hover:text-blue hover:bg-white rounded-md"
              onClick={handleGradeModelOpen}
            >
              {(assignmentPermission.includes("/assignment/grade/") ||
                permissions[0].name === "Any") &&
                "Grade"}
            </button>
          </div>
        )}
      </div>
      <div className="my-8 font-normal">
        <p className="font-semibold">Submission Text</p>
        {/* <p className="font-medium mt-6">
          {assignmentDetails?.data?.submissionText}
        </p> */}
        <ReactQuill
          theme="bubble"
          className="h-20"
          readOnly={true}
          showBorder={false}
          value={assignmentDetails?.data?.submissionText}
        />
      </div>
      <div>
        <p className="font-semibold">Files Submitted:</p>
        <div className="flex mt-4 gap-3">
          {assignmentDetails?.data?.files?.map(item => {
            return (
              <a
                href={item?.url}
                target="_blank"
                key={item?.id}
                className="border border-gray rounded-lg bg-white flex gap-2 cursor-pointer flex-col items-center justify-center px-3 py-8"
                rel="noreferrer"
              >
                <AiOutlineFile className="text-xl" />
                <p className="font-semibold text-base">
                  {item?.fileName?.slice(0, 10)}
                </p>
              </a>
            );
          })}
        </div>
        {/* <div className="flex mt-4 gap-3">
          <div className="border border-gray rounded-lg bg-white flex gap-2 cursor-pointer flex-col items-center justify-center px-3 py-8">
            <AiOutlineFile className="text-xl" />
            <p className="font-semibold text-base">File Name</p>
          </div>
          <div className="border border-gray rounded-lg bg-white flex gap-2 cursor-pointer flex-col items-center justify-center px-3 py-8">
            <AiOutlineFile className="text-xl" />
            <p className="font-semibold text-base">File Name</p>
          </div>
        </div> */}
      </div>
      <FeedbackStatus data={assignmentDetails?.data} />
      <div className="flex flex-col mt-4 gap-2 w-1/2 md:w-full">
        {assignmentDetails?.data?.comments?.map(item => {
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
                  <div className="font-normal text-sm">{item?.comment}</div>
                </div>
              </div>
            </div>
          );
        })}

        {(assignmentPermission.includes("/assignment/comment/") ||
          permissions[0].name === "Any") && (
          <>
            <p className="font-semibold">Add Comment:</p>
            <form className="w-full" onSubmit={handleSubmit(handleComment)}>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                type="text"
                {...register("comment")}
                placeholder="Add comment..."
                className="p-4 outline-none rounded-lg w-full"
              ></textarea>
              <div className="text-right ">
                <button className="cursor-pointer bg-blue text-white px-6 rounded-full inline-block">
                  Comment
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      {gradeModal && (
        <PopUpModal
          isOpen={gradeModal}
          setOpen={handleGradeModelOpen}
          id={data?.id}
        />
      )}
    </div>
  );
}

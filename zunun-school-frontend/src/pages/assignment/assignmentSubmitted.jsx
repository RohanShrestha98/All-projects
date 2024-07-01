import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SubmissionStatus from "../../containers/assisgnment/upload/submissionStatus";
import UploadTop from "../../containers/assisgnment/upload/uploadTop";
import FeedbackStatus from "../../containers/assisgnment/upload/feedbackStatus";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { useQueryData } from "../../hooks/useQueryData";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";

const AssignmentSubmitted = () => {
  const location = useLocation();
  const { data: assignmentList } = location.state;
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const navigate = useNavigate();
  const useEventRessignMutation = () =>
    useMutate(["reassign-assignment"], "api/v1/assignment/reassign/");
  const { mutateAsync: mutateReassignAsync } = useEventRessignMutation();
  const { data: assignmentDetails } = useQueryData(
    ["student-assignment-details"],
    `api/v1/assignment/detail/${assignmentList?.id}`,
    [],
  );

  const handleDelete = async data => {
    try {
      const response = await mutateReassignAsync([
        "patch",
        `${data.id}/`,
        data,
      ]);
      if (response.success) {
        toast.success("Assignment Delete Successfully!");
        navigate("/assignment");
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };
  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);

  return (
    <div>
      <UploadTop
        title={assignmentDetails?.data?.assignment?.title}
        openDate={assignmentDetails?.data?.assignment?.openDate}
        dueDate={assignmentDetails?.data?.assignment?.dueDate}
      />
      {assignmentList?.submissionStatus !== "GRADED" && (
        <div className="flex gap-4 mb-7 md:px-3">
          <NavLink
            to={"/assignment/upload"}
            state={{ isEdit: true, updateData: assignmentDetails }}
            className="text-[15px] cursor-pointer font-medium flex justify-center items-center rounded-[100px] text-white bg-cyan py-2 px-6 sm:px-4"
          >
            Edit Submission
          </NavLink>
          <div
            onClick={() => handleDelete(assignmentList)}
            className="text-[15px] cursor-pointer font-medium flex justify-center items-center rounded-[100px] text-white bg-cyan py-2 px-6 sm:px-4"
          >
            Remove Submission
          </div>
        </div>
      )}

      <div className="md:px-6">
        <SubmissionStatus
          isGraded={!location.state?.isEdit ?? false}
          data={assignmentDetails?.data}
        />
        {!location.state?.isEdit && (
          <FeedbackStatus data={assignmentDetails?.data} />
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmitted;

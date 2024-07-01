import React from "react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadTop from "../../containers/assisgnment/upload/uploadTop";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryData } from "../../hooks/useQueryData";
import { useForm } from "react-hook-form";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { useFileUploadMutation } from "../../hooks/useMutateData";
import Uploader from "../../components/UI/uploader";

const AssignmentUpload = () => {
  const [text, setText] = useState("");
  // const [file, setFile] = useState([]);
  const [assignment, setAssignment] = useState();
  const [assignmentUploading, setAssignmentUploading] = useState(false);
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const loaction = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, setValue, reset } = useForm();
  const {
    data: assignmentList,
    updateData,
    isEdit,
  } = loaction !== null && loaction.state && loaction.state;

  const { data: assignmentDetails } = useQueryData(
    ["assignment-details"],
    `api/v1/assignment/detail/${
      !isEdit ? assignmentList?.id : updateData?.data?.id
    }`,
    [],
  );
  const useSubmitAssignmentMutation = () =>
    useMutate(["assignment-submit"], "api/v1/assignment/submit/");
  const { mutateAsync } = useSubmitAssignmentMutation();
  // const useFileUploadMutation = () =>
  //   useMutate(["upload-file"], "api/v1/file/upload/");
  // const { mutateAsync: uploadMutateAsync } = useFileUploadMutation();
  const fileUploadMUtation = useFileUploadMutation();

  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);

  const handleSetValue = value => {
    if (value === "<p><br></p>") {
      setText("");
    } else {
      setText(value);
    }
    setValue("submissionText", text);
  };

  useEffect(() => {
    setValue("submissionText", updateData?.data?.submissionText);
  }, [updateData]);

  // const handleUploadFile = files => {
  //   setFile(files);
  // };

  const handleAssignmentUpload = async e => {
    const file = e.target.files[0];
    setAssignmentUploading(true);
    try {
      const response = await fileUploadMUtation.mutateAsync([
        "post",
        ``,
        {
          file: file,
        },
      ]);
      setAssignment(response?.data);
      setAssignmentUploading(false);
    } catch (err) {
      toast.error(err?.toString());
      setAssignmentUploading(false);
    }
  };

  const handleCreate = async data => {
    const postData = {
      ...data,
      assignmentFiles: [assignment] ?? updateData?.data?.files,
    };
    try {
      const response = await mutateAsync([
        "patch",
        `${assignmentDetails?.data?.id}/`,
        postData,
      ]);
      if (response?.success) {
        {
          isEdit
            ? toast.success("Assignment Updated Successfully!")
            : toast.success("Assignment Submited Successfully!");
        }
        reset();
        navigate("/assignment");
      }
    } catch (err) {
      toast.error(err?.response?.data?.errors?.submissiontextssss);
    }
  };

  return (
    <div>
      <UploadTop
        title={assignmentDetails?.data?.assignment?.title}
        openDate={assignmentDetails?.data?.assignment?.openDate}
        dueDate={assignmentDetails?.data?.assignment?.dueDate}
      />
      <div className="md:px-6 sm:pt-0">
        <div className="font-semibold text-lg mb-4">Assignment Description</div>
        <div className="font-medium text-[15px] text-gray-4">
          {assignmentDetails?.data?.assignment?.description}
        </div>
        <div className="font-[800] text-[22px] my-7">Add Submission</div>
        <div className="font-normal text-[15px] mb-4">
          Online text <span className="text-red">*</span>
        </div>
        <form onSubmit={handleSubmit(handleCreate)}>
          <ReactQuill
            className="bg-white rounded-lg"
            theme="snow"
            defaultValue={
              isEdit && updateData && updateData?.data?.submissionText
            }
            onChange={e => handleSetValue(e)}
          />
          <div className="font-normal text-[15px] mt-7">
            File Submission <span className="text-red">*</span>
          </div>
          <div className="my-4">
            <Uploader
              id="assignment"
              isUploading={assignmentUploading}
              file={assignment}
              handleChange={handleAssignmentUpload}
            />
          </div>
          <div className="flex justify-end ">
            <button className="bg-cyan rounded-[100px] py-2 text-white px-4 text-center">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentUpload;

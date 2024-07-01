import React, { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
const PopUpModal = ({ isOpen, setOpen, id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const useGradeMutation = () =>
    useMutate(["grade"], "api/v1/assignment/grade/");
  const { mutateAsync: mutateGradeAsync } = useGradeMutation();
  const handleGrade = async data => {
    const patchData = {
      gradePoint: parseInt(data.gradePoint),
      feedback: data.feedback,
    };
    try {
      const response = await mutateGradeAsync(["patch", `${id}`, patchData]);
      if (response.success) {
        toast.success("Assignment Graded Successfully!");
        navigate("/assignment/list");
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };
  const gradePoint = watch("gradePoint");

  return (
    <>
      <Modal
        open={isOpen}
        title="Grade Assignment"
        onOk={handleOk}
        onCancel={setOpen}
        footer={[]}
      >
        <form onSubmit={handleSubmit(gradePoint <= 100 && handleGrade)}>
          <input
            type="number"
            {...register("gradePoint")}
            className="w-full h-9 border px-4 border-gray outline-none rounded-md mt-4 "
            placeholder="Enter marks ..."
          />
          {gradePoint > 100 && (
            <p className="text-red text-sm">
              You cannot give more than 100 marks
            </p>
          )}
          <textarea
            {...register("feedback")}
            type="text"
            cols="30"
            rows="8"
            className="w-full mt-2 border border-gray outline-none rounded-md px-4 py-2"
            placeholder="Add a comment ..."
          ></textarea>
          <button className="w-full border border-blue mt-4 py-2 text-white font-semibold rounded-md bg-blue hover:bg-white hover:text-blue">
            Grade
          </button>
        </form>
      </Modal>
    </>
  );
};
export default PopUpModal;

import { useForm } from "react-hook-form";
import React from "react";
import { Drawer } from "antd";

import { useMutate } from "../../hooks/useMutateData";

import toast from "../../utils/toast";
import { Button } from "../../components/UI/button";

const AddRemarks = ({ open, setOpen, studentId }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onClose = () => {
    reset();
    setOpen(false);
  };

  const useCreateRemarksMutation = () =>
    useMutate(["create-remarks"], "api/v1/grading-remarks/create/");

  const { mutateAsync, isLoading } = useCreateRemarksMutation();

  const handleAssignCourse = async data => {
    const postData = {
      ...data,
      id: studentId,
    };
    try {
      const response = await mutateAsync(["post", "", postData]);
      if (response.success) {
        setOpen(false);
        toast.success("Create Remarks successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors.remaks);
    }
  };

  return (
    <Drawer
      title="Create Remarks"
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={handleSubmit(data => handleAssignCourse(data))}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col">
          <label className="text-cyan">Logical Thinking</label>
          <input
            {...register("logicalThinking")}
            placeholder="Enter logical thinking remarks"
            className="border border-gray-8 px-3 py-2  rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-cyan">Communication</label>
          <input
            {...register("communication")}
            placeholder="Enter communication remarks"
            className="border border-gray-8 px-3 py-2  rounded-lg"
          />
        </div>

        <div className="flex gap-2 mt-20">
          <Button
            type="outlined"
            className="w-1/2 flex items-center justify-center"
            onClick={() =>
              reset({
                communication: "",
                logicalThinking: "",
              })
            }
          >
            Clear
          </Button>

          <Button type="primary" className=" w-1/2" htmlType="submit">
            {isLoading ? "Updating..." : "Create Remarks"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AddRemarks;

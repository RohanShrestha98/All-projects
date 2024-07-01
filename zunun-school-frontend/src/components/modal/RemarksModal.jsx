import React from "react";
import { Modal } from "antd";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { useForm } from "react-hook-form";
import { useQueryData } from "../../hooks/useQueryData";
const RemarksModal = ({
  setIsModalOpen,
  isModalOpen,
  studentId,
  defaultValue,
  edit,
}) => {
  const useGradingRemarksMutation = () =>
    useMutate(["grading-remarks"], "api/v1/grading-remarks/create/");
  const useGradingRemarksUpdateMutation = () =>
    useMutate(["grading-remarks"], "api/v1/grading-remarks/update/");
  const { data, isError, isLoading, isFetching } = useQueryData(
    ["remarks-list"],
    `api/v1/grading-remarks/list/`,
    "",
  );
  const { mutateAsync } = useGradingRemarksMutation();
  const { mutateAsync: updateMutateAsync } = useGradingRemarksUpdateMutation();
  const { handleSubmit, register } = useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCreate = async data => {
    const newData = Object.entries(data);
    const postData = [];

    const communicationData = newData?.filter(item => {
      return item?.[0].slice(0, 13) === "communication";
    });
    const logicalThinkingData = newData?.filter(item => {
      return item?.[0].slice(0, 15) === "logicalThinking";
    });

    newData?.slice(0, 16)?.map((item, index) => {
      return postData?.push({
        gradingRemarksId: index + 1,
        communication: communicationData[index][1],
        logicalThinking: logicalThinkingData[index][1],
      });
    });
    const formData = { id: studentId, data: postData };

    try {
      const response = await mutateAsync(["post", "", formData]);
      if (response.success) {
        setIsModalOpen(false);
        toast.success("Remarks Added Successfully!");
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };
  const handleUpdate = async data => {
    const newData = Object.entries(data);
    const postData = [];

    const communicationData = newData?.filter(item => {
      return item?.[0].slice(0, 13) === "communication";
    });
    const logicalThinkingData = newData?.filter(item => {
      return item?.[0].slice(0, 15) === "logicalThinking";
    });

    newData?.slice(0, 16)?.map((item, index) => {
      return postData?.push({
        gradingRemarksId: index + 1,
        communication: communicationData[index][1],
        logicalThinking: logicalThinkingData[index][1],
      });
    });
    const formData = { id: studentId, data: postData };

    try {
      const response = await updateMutateAsync(["patch", "", formData]);
      if (response.success) {
        setIsModalOpen(false);
        toast.success("Remarks Updated Successfully!");
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title={edit ? "Update Remarks" : "Create Remarks"}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[]}
        width={"780px"}
      >
        <form
          onSubmit={handleSubmit(edit ? handleUpdate : handleCreate)}
          className="my-6"
        >
          <div>
            {!edit
              ? data?.data?.map((item, index) => {
                  return (
                    <div key={item.id} className="mt-2 flex justify-between">
                      <p className="font-medium text-base mb-[-2px] line-clamp-1 ">
                        {item?.title}
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          {...register(`logicalThinking${index + 1}`)}
                          className="border px-2 w-[220px] border-gray-dark3 rounded"
                          placeholder="Logical thinking..."
                        />
                        <input
                          type="text"
                          {...register(`communication${index + 1}`)}
                          className="border px-2 w-[220px] border-gray-dark3 rounded"
                          placeholder="Communication..."
                        />
                      </div>
                    </div>
                  );
                })
              : defaultValue?.map((item, index) => {
                  return (
                    <div key={item.id} className="mt-2 flex justify-between">
                      <p className="font-medium text-base mb-[-2px] line-clamp-1 ">
                        {item?.title}
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          {...register(`logicalThinking${index + 1}`)}
                          className="border px-2 w-[220px] border-gray-dark3 rounded"
                          placeholder="Logical thinking..."
                          defaultValue={item?.logicalThinking}
                        />
                        <input
                          type="text"
                          {...register(`communication${index + 1}`)}
                          className="border px-2 w-[220px] border-gray-dark3 rounded"
                          placeholder="Communication..."
                          defaultValue={item?.communication}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-cyan px-6 py-1 text-white font-semibold rounded-md border border-cyan hover:text-cyan hover:bg-white">
              {edit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default RemarksModal;

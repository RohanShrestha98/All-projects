import React from "react";
import { Modal } from "antd";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { useForm } from "react-hook-form";
const CustomModel = ({ setIsModalOpen, isModalOpen, data }) => {
  const useEventUpdateMutation = () =>
    useMutate(["grading-criteria"], "api/v1/grading-criteria/update/");
  const { mutateAsync } = useEventUpdateMutation();
  const { handleSubmit, register } = useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async data => {
    const newData = Object.entries(data);
    const array = [];

    newData?.map((item, index) => {
      return array?.push({
        id: index + 1,
        point: parseInt(item[1]),
      });
    });
    const formData = { data: array };

    try {
      const response = await mutateAsync(["patch", "", formData]);
      if (response.success) {
        setIsModalOpen(false);
        toast.success("Grading criteria updated successfully!");
      }
    } catch (err) {
      toast.error(err.response.data.errors.error);
    }
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        title="Update Grading Criteria"
        onOk={handleOk}
        onCancel={handleOk}
        footer={[]}
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="mt-6">
          <div>
            {data?.data?.map((item, index) => {
              return (
                <div key={item.id} className="mt-2 flex justify-between">
                  <p className="font-medium text-base mb-[-2px]">
                    {item?.title}
                  </p>
                  <input
                    type="text"
                    {...register(`point${index + 1}`)}
                    className="border px-2 border-gray-dark3 rounded"
                    defaultValue={item?.point ?? 0}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-cyan px-6 py-1 text-white font-semibold rounded-md border border-cyan hover:text-cyan hover:bg-white">
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default CustomModel;

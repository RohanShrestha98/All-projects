import React from "react";
import { Modal } from "antd";
import { TruncateText } from "../../utils/truncateText";
const EventDetailsModal = ({ open, setOpen, data }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const startDate = new Date(data?.startDate).toLocaleString();
  const endDate = new Date(data?.endDate).toLocaleString();

  return (
    <>
      <Modal
        open={open}
        title={TruncateText(data?.title, 40)}
        footer={false}
        onCancel={handleCancel}
      >
        <div className="flex items-center gap-2">
          <p className="min-w-[80px] font-bold text-black">Start Date :</p>
          <p>{startDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="min-w-[80px] font-bold text-black">End Date :</p>
          <p>{endDate}</p>
        </div>
        <div className="mt-4 ">
          <p className="font-semibold text-base mb-1">Description</p>
          <p>{TruncateText(data?.description, 500)}</p>
        </div>
      </Modal>
    </>
  );
};
export default EventDetailsModal;

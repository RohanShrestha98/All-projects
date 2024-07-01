import React from "react";
import { Modal } from "antd";
import { useQueryData } from "../../hooks/useQueryData";
import { useState } from "react";
import { TruncateText } from "../../utils/truncateText";
const AcknowledgedModal = ({ open, setOpen, id }) => {
  const [active, setActive] = useState("acknowledged");
  const { data } = useQueryData(
    ["event-assigned"],
    `api/v1/event/details/${id}`,
    [],
  );

  const handleCancel = () => {
    setOpen(false);
  };
  const startDate = new Date(data?.data?.startDate).toLocaleString();
  const endDate = new Date(data?.data?.endDate).toLocaleString();

  return (
    <>
      <Modal
        open={open}
        title={TruncateText(data?.data?.title, 40)}
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
        <div className="mt-2">
          <p className="font-semibold text-base">Description</p>
          <p>{TruncateText(data?.data?.description, 100,400)}</p>
        </div>
        <div className="flex gap-4 items-center pt-4 pb-2 border-b border-gray-6">
          <p
            onClick={() => setActive("acknowledged")}
            className={`font-semibold cursor-pointer ${
              active === "acknowledged" ? "text-blue" : ""
            }`}
          >
            Acknowledged by
          </p>
          <p
            onClick={() => setActive("notacknowledged")}
            className={`font-semibold cursor-pointer ${
              active === "notacknowledged" ? "text-blue" : ""
            }`}
          >
            Not Acknowledged by
          </p>
        </div>
        <div className="min-h-[200px]">
          {active === "acknowledged"
            ? data?.data?.acknowledgedBy?.map(item => {
                return (
                  <li
                    className="list-decimal text-black-gray font-semibold"
                    key={item?.id}
                  >
                    {item?.username}
                  </li>
                );
              })
            : data?.data?.unAcknowledgedBy?.map(item => {
                return (
                  <li
                    className="list-decimal my-1 text-black-gray font-semibold"
                    key={item?.id}
                  >
                    {item?.username}
                  </li>
                );
              })}
        </div>
      </Modal>
    </>
  );
};
export default AcknowledgedModal;

import { Modal } from "antd";
import React from "react";
import LoadingSvg from "../../assets/allSvg";
import { useModalStore } from "../../store/useModalStore";

export const CustomModal = ({
  message,
  note,
  buttonName,
  clickHandler,
  isSubmitting = false,
}) => {
  const { isConfirmModalOpen, toggleConfirmModal } = useModalStore();
  return (
    <Modal
      footer={false}
      closeIcon={false}
      open={isConfirmModalOpen}
      className="py-3 ">
      <div className="flex flex-col gap-7 ">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">{message}</h3>
          {note && <p className="italic text-xs">{note}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => !isSubmitting && clickHandler()}
            className={`bg-red text-white rounded-lg py-2 flex gap-2 items-center justify-center ${
              isSubmitting && "cursor-wait"
            }`}>
            {buttonName}
            {isSubmitting && <LoadingSvg />}
          </button>
          <button
            onClick={toggleConfirmModal}
            className="rounded-lg py-2 text-red border border-red text-xs">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

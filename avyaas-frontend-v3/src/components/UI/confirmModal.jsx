import React from "react";
import { Modal } from "antd";

const ConfirmModal = ({
  title = "",
  isOpen,
  desc,
  setOpen,
  btnName,
  btnClassName,
  handleConfirm,
}) => {
  return (
    <Modal open={isOpen} title={null} closable={false} footer={null}>
      {title && (
        <div
          className={`text-center text-red font-bold text-xl border-b border-b-gray-lighter pb-4`}>
          {title}
        </div>
      )}

      <div className="mt-4 mb-5 font-bold text-[17px] text-center">{desc}</div>
      <div className="flex justify-between items-center">
        <div
          onClick={() => setOpen(false)}
          className="bg-blue-lighter text-cyan font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%] ">
          Cancel
        </div>
        <div
          onClick={async () => {
            await handleConfirm();
          }}
          className={btnClassName}>
          {btnName}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

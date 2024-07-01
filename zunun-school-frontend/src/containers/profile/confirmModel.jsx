import React from "react";
import { Modal } from "antd";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";

const ConfirmModel = ({
  title,
  isOpen,
  desc,
  setOpen,
  btnName,
  className,
  handleConfirm,
}) => {
  const width = useWindowsDimensions();

  return (
    <Modal
      className="logout-modal"
      style={{ top: width > "428" ? "72px" : "calc(100vh - 199.27px)" }}
      open={isOpen}
      closable={false}
      footer={null}
    >
      <div
        className={`text-center ${btnName === "Sync" ? "" : "text-red"} 
              font-bold text-xl border-b border-b-gray-lighter pb-4`}
      >
        {title}
      </div>
      <div className="mt-4 mb-5 font-bold text-[17px] text-center">{desc}</div>
      <div className="flex justify-between items-center">
        <div
          onClick={() => setOpen(false)}
          className="bg-blue-lighter text-cyan font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%] "
        >
          Cancel
        </div>
        <div
          onClick={async id => {
            await handleConfirm(id && id);
          }}
          className={`bg-cyan text-white border hover:border font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%] ${className}`}
        >
          {btnName}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModel;

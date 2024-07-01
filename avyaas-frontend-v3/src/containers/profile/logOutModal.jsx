import React from "react";
import { Modal } from "antd";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";

const LogOutModal = (props) => {
  const width = useWindowsDimensions();

  return (
    <Modal
      className="logout-modal"
      style={{ top: width > "428" ? "72px" : "calc(100vh - 199.27px)" }}
      open={props.isOpen}
      closable={false}
      footer={null}>
      <div
        className="text-center text-red 
              font-bold text-xl border-b border-b-gray-lighter pb-4">
        Logout
      </div>
      <div className="mt-4 mb-5 font-bold text-[17px] text-center">
        Are you sure you want to logout?
      </div>
      <div className="flex justify-between items-center">
        <div
          onClick={() => props.setOpen(false)}
          className="bg-blue-lighter text-cyan font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%] ">
          Cancel
        </div>
        <div className="bg-cyan text-white font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%] ">
          Yes, logout
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;

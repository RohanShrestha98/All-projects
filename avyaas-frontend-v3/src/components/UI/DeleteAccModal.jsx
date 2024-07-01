import React from "react";
import { Modal } from "antd";

const DeleteAccModal = ({ isOpen, setOpen }) => {
  return (
    <Modal open={isOpen} closable={false} footer={null}>
      <div
        className={`text-center text-red font-bold text-xl border-b border-b-gray-lighter pb-4`}
      >
        Request for Account Deletion
      </div>
      <div className="mt-4 mb-5  text-[17px] text-center ">
        <p>
          Send a request to delete your account and personally identifiable
          information (Name) that is stored on our system. You will receive an
          email to verify your request. Once the request is verified we will
          take care of deleting your Name account. If you just want to check
          what Name account we have stored, you can{" "}
          <u className="text-theme-color cursor-pointer">request your data</u>.
        </p>
        <h5 className="text-base ">
          Note: Your request for account deletion will be fulfilled within 3
          days.
        </h5>
      </div>
      <div className="flex justify-end gap-3 items-center">
        <div
          onClick={() => setOpen(false)}
          className="font-medium border border-black text-center cursor-pointer text-[15px] rounded  px-4 py-1 "
        >
          Cancel
        </div>
        <button
          className="bg-red border border-red hover:text-red hover:bg-white px-4 py-1 rounded cursor-pointer text-white"
          type="submit"
        >
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteAccModal;

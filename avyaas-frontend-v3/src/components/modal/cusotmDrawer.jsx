import { Drawer } from "antd";
import React from "react";
import LoadingSvg from "../../assets/allSvg";
import { useModalStore } from "../../store/useModalStore";

export const CustomDrawer = ({
  message,
  buttonName,
  note,
  isSubmitting = false,
  clickHandler,
}) => {
  const { isCustomDrawerOpen, toggleCustomDrawer } = useModalStore();
  return (
    <Drawer
      size={50}
      onClose={toggleCustomDrawer}
      open={isCustomDrawerOpen}
      placement="bottom"
      className="header-none p-0  "
      closable={false}
      footer={
        <div className="grid grid-cols-2 rounded-t-lg py-1 text-xs font-semibold gap-2 ">
          <button
            onClick={() => !isSubmitting && clickHandler()}
            className={`bg-red text-white rounded-lg py-2 flex gap-2 items-center justify-center ${
              isSubmitting && "cursor-wait"
            }`}>
            {buttonName}
            {isSubmitting && <LoadingSvg />}
          </button>
          <button
            onClick={() => toggleCustomDrawer()}
            className="rounded-lg py-2 text-red border border-red">
            Cancel
          </button>
        </div>
      }>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{message}</h3>
        {note && <p className="italic text-xs">{note}</p>}
      </div>
    </Drawer>
  );
};

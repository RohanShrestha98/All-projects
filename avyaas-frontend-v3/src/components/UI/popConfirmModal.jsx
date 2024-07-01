import React from "react";
import { Popconfirm } from "antd";
const PopConfirmModal = ({
  title,
  description,
  confirmLoading,
  handleConfirm,
  handleCancel,
  children,
  okText,
  placement,
}) => {
  return (
    <Popconfirm
      placement={placement}
      title={title}
      description={description}
      onConfirm={handleConfirm}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
      okText={okText}
      icon={""}>
      {children}
    </Popconfirm>
  );
};
export default PopConfirmModal;

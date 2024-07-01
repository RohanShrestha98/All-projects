import { Modal } from "antd";
import React from "react";
import { useModalStore } from "../../store/useModalStore";

export const CourseEnrollModal = ({ name, description, clickHandler }) => {
  const { isCourseEnrollModalOpen, toggleCourseEnrollModal } = useModalStore();
  return (
    <Modal
      onOk={toggleCourseEnrollModal}
      onCancel={toggleCourseEnrollModal}
      title={name}
      centered
      closeIcon={false}
      open={isCourseEnrollModalOpen}
      className="md:px-12"
      width={800}
      footer={[
        <button
          key="back"
          onClick={() => toggleCourseEnrollModal()}
          className="rounded-lg py-2 px-4  mr-4 bg-red hover:bg-white hover:text-red text-white border border-red">
          Cancel
        </button>,
        <button
          key="submit"
          onClick={() => clickHandler()}
          className="bg-theme-color hover:bg-white hover:text-theme-color px-4 text-white border border-theme-color  rounded-lg py-2">
          Enroll
        </button>,
      ]}>
      <p>{description}</p>
    </Modal>
  );
};

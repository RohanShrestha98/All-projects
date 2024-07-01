import React from "react";
import { Modal } from "antd";
import { TruncateText } from "../../utils/truncateText";
const AssignmentDetailsModel = ({ isOpen, setOpen, data }) => {
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <>
      <Modal
        open={isOpen}
        title="Assignment Details"
        onOk={handleOk}
        onCancel={setOpen}
        footer={[]}
      >
        <p className="font-semibold text-xl mt-8 mb-4">
          {TruncateText(data?.title, 80)}
        </p>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Open Date</p>
          <p>{data?.openDate?.slice(0, 10)}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold">End Date</p>
          <p>{data?.dueDate?.slice(0, 10)}</p>
        </div>
        <p className="font-semibold mt-4">Description</p>
        <p>{data?.description}</p>
        <p className="font-semibold mt-4">
          {data?.sections?.length
            ? " Assigned Section"
            : data?.students?.length
            ? " Assigned Student"
            : ""}
        </p>
        <p>
          {data?.sections
            ? data?.sections?.map(item => {
                return <p key={item.id}> {item?.name} </p>;
              })
            : data?.students?.map(item => {
                return <p key={item.id}> {item?.name} </p>;
              })}
        </p>
      </Modal>
    </>
  );
};
export default AssignmentDetailsModel;

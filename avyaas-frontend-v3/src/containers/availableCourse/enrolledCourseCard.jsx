import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrow, CrossSvg } from "../../assets/allSvg";
import { useModuleStore } from "../../store/useModuleStore";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";
import { useModalStore } from "../../store/useModalStore";

const EnrolledCourseCard = ({ assignCourse, setSelectedModuleId }) => {
  const navigate = useNavigate();
  const { setCurrentModule } = useModuleStore();
  const { toggleCustomDrawer, toggleConfirmModal } = useModalStore();
  const width = useWindowsDimensions();
  return (
    <>
      {width > 768 ? (
        <div className="relative border border-gray-8 rounded-md flex flex-col gap-4">
          <button
            onClick={() => {
              setSelectedModuleId(assignCourse);
              toggleConfirmModal();
            }}
            className="absolute top-1 right-1 rounded-full p-[2px] bg-white">
            <CrossSvg className="text-red-5" />
          </button>
          <img
            className="rounded-t-md"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            alt=""
          />
          <p className="text-[#4D4D4D] px-4 tracking-tight font-bold pb-10">
            {assignCourse?.title ?? "No name"}
          </p>
          <button
            onClick={() => {
              delete assignCourse?.description;
              setCurrentModule(assignCourse);
              navigate("/");
            }}
            className="absolute bottom-2 right-1">
            <CircleArrow className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            delete assignCourse?.description;
            setCurrentModule(assignCourse?.id);
            navigate("/");
          }}
          className="relative border cursor-pointer border-gray-8 rounded-md flex items-center p-3 gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedModuleId(assignCourse?.id);
              toggleCustomDrawer();
            }}
            className="absolute top-1 right-1 rounded-full p-[2px] bg-red-4">
            <CrossSvg className="text-red-5" />
          </button>
          <img
            className="rounded-md h-[102px] w-[102px]"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            alt=""
          />
          <p className="text-[#4D4D4D] tracking-tight font-bold pr-4">
            {assignCourse?.title ?? "No name"}
          </p>
        </div>
      )}
    </>
  );
};

export default EnrolledCourseCard;

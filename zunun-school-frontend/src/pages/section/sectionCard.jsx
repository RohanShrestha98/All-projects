import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";

import {
  AssignmentSvg,
  AssistantTeacherSvg,
  BooksSvg,
  OptionVerticalSvg,
  SectionSvg,
  StudentSvg,
  TeacherSvg,
} from "../../assets/icons/allSvg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from "../../utils/toast";
import { useMutate } from "../../hooks/useMutateData";
import { useState } from "react";
import AddSection from "./addSection";
import ConfirmModel from "../../containers/profile/confirmModel";
import { usePermissionContext } from "../../context/permissionContext";
import { TruncateText } from "../../utils/truncateText";

function SectionCard({ data }) {
  const [open, setOpen] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const { permissions } = usePermissionContext().permissions;
  const sectionPermission = permissions
    .filter(each => each.url.path.includes("section"))
    .map(each => each.url.path);

  const useSectionDeleteMutation = () =>
    useMutate(["section"], "api/v1/section/delete/");
  const mutateDeleteAsync = useSectionDeleteMutation().mutateAsync;
  const handleDeleteSection = async id => {
    try {
      const response = await mutateDeleteAsync(["delete", id]);
      if (response.success) {
        toast.success("Section deleted successfully!");
      }
      setConfirmModel(false);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-1" onClick={() => setOpen(!open)}>
          <EditOutlined className="text-cyan" /> Edit
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex items-center gap-1 "
          onClick={() => setConfirmModel(true)}
        >
          {" "}
          <DeleteOutlined className="text-red" />
          Delete
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl flex flex-col  p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start gap-3">
          <div className="bg-zinc-100 flex justify-center items-center rounded-md">
            <SectionSvg className={"h-4 w-4 m-1 text-slate-700"} />
          </div>
          <p className="text-sm font-bold line-clamp-1 text-gray-4">
            {" "}
            {TruncateText(data?.name, 30, 200)}
          </p>
        </div>
        {(sectionPermission.includes("/section/update/") ||
          permissions[0].name === "Any") && (
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            className="flex justify-end"
          >
            <p onClick={e => e.preventDefault()}>
              <OptionVerticalSvg className={"h-5 w-5 hover:cursor-pointer"} />
            </p>
          </Dropdown>
        )}
      </div>
      <p className="my-2 text-xs font-medium text-slate-500 line-clamp-1">
        {TruncateText(data?.description, 40, 200)}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2 text-slate-600">
        <div className="col-span-full flex gap-2">
          <Link
            to="./student"
            state={{ idx: data.id, name: data.name, grade: data?.grade }}
            className="bg-zinc-100 flex flex-col basis-1/3 justify-center gap-1 hover:bg-sky-100 hover:cursor-pointer items-center p-2 py-4 rounded-lg"
          >
            <StudentSvg className="h-5 w-5" />
            <p className="text-xs">Students</p>
          </Link>
          <Link
            to="./course"
            state={{ id: data.id, name: data.name }}
            className="bg-zinc-100 flex flex-col basis-1/3 justify-center gap-1 hover:bg-sky-100 hover:cursor-pointer items-center p-2 py-4 rounded-lg"
          >
            <BooksSvg className="h-5 w-5" />
            <p className="text-xs">Courses</p>
          </Link>
          <Link
            to="./assignment"
            state={{ id: data?.id, name: data?.name }}
            className="bg-zinc-100 flex flex-col basis-1/3 justify-center gap-1 hover:bg-sky-100 hover:cursor-pointer items-center p-2 py-4 rounded-lg"
          >
            <AssignmentSvg className="h-5 w-5" />
            <p className="text-xs">Assignment</p>
          </Link>
        </div>
        <div className="col-span-full flex gap-2">
          <Link
            to="./teacher"
            state={{ id: data.id, name: data.name, role: 3 }}
            className="bg-zinc-100 flex flex-col basis-1/2 justify-center gap-1 hover:bg-sky-100 hover:cursor-pointer items-center p-2 py-4 rounded-lg "
          >
            <TeacherSvg className="h-5 w-5" />
            <p className="text-xs">Teacher</p>
          </Link>
          <Link
            to="./teacher"
            state={{ id: data?.id, name: data?.name, role: 4 }}
            className="bg-zinc-100 flex flex-col basis-1/2 justify-center gap-1 hover:bg-sky-100 hover:cursor-pointer items-center p-2 py-4 rounded-lg "
          >
            <AssistantTeacherSvg className="h-5 w-5" />
            <p className="text-xs">Assistant Teacher</p>
          </Link>
        </div>
      </div>

      {confirmModel && (
        <ConfirmModel
          title={"Delete Assignment"}
          isOpen={confirmModel}
          setOpen={setConfirmModel}
          desc={"Are you sure you want to delete this assignment?"}
          btnName={"Delete"}
          className={"bg-red hover:text-red hover:bg-white "}
          handleConfirm={() => handleDeleteSection(data.id)}
        />
      )}
      <AddSection open={open} setOpen={setOpen} data={data} edit={true} />
    </div>
  );
}

export default SectionCard;

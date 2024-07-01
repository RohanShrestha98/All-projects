import React, { useState } from "react";
import { Tabs } from "antd";
import NextMaterial from "./nextMaterial";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoPlaySkipForwardCircleOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import AddNotes from "./addNote";
import ChatComponent from "../../chat/chat";
import { ShimmerBadge } from "react-shimmer-effects";

const MaterialRightSidebar = ({
  refetch,
  initial,
  selectedChapterId,
  setSelectedChapterId,
}) => {
  const [edit, setEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [askTeacherClick, setAskTeacherClick] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2  pb-1 px-1 font-medium">
          <IoPlaySkipForwardCircleOutline size={16} />
          <span>Up Next</span>
        </div>
      ),
      children: (
        <NextMaterial
          selectedChapterId={selectedChapterId}
          initial={initial}
          setSelectedChapterId={setSelectedChapterId}
          refetch={refetch}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2  pb-1 px-1 font-medium">
          <RiPlayListAddLine size={12} />
          <span
            onClick={() => {
              setOpenForm(false);
              setEdit(false);
            }}
          >
            Add Notes
          </span>
        </div>
      ),
      children: (
        <AddNotes
          openForm={openForm}
          setOpenForm={setOpenForm}
          edit={edit}
          setEdit={setEdit}
        />
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => setAskTeacherClick(!askTeacherClick)}
          className="flex items-center gap-2  pb-1 px-1 font-medium"
        >
          <AiOutlineUser size={12} />
          <span>Ask a teacher</span>
        </div>
      ),
      children: (
        <ChatComponent askTeacherClick={askTeacherClick} width={"w-full"} />
      ),
    },
  ];

  return (
    <div className=" border border-gray-8 rounded-lg  px-4 pb-6">
      {initial ? (
        <div className="flex gap-2">
          <ShimmerBadge />
          <ShimmerBadge />
          <ShimmerBadge />
        </div>
      ) : (
        <>
          <Tabs
            defaultActiveKey="1"
            items={items}
            tabBarStyle={{ borderBottom: "none" }}
          />
        </>
      )}
    </div>
  );
};

export default MaterialRightSidebar;

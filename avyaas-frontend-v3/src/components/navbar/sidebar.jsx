import React, { useState } from "react";
import googlePlay from "../../assets/googlePlay.svg";
import appStore from "../../assets/appStore.svg";
import { Link, NavLink } from "react-router-dom";
import {
  BookmarkSvg,
  DiscussionSvg,
  HomeSvg,
  ListSvg,
  LiveSvg,
  ProfileSvg,
  StarSvg,
  ExamSvg,
  YoutubeSvg,
  SubjectsSvg,
  Logout,
} from "../../assets/allSvg";
import { useAuthStore } from "../../store/useAuthStore";
import ConfirmModal from "../UI/confirmModal";

const sidebarItems = [
  {
    heading: "",
    subContents: [{ title: "Home", link: "/", Icon: HomeSvg }],
  },
  {
    heading: "Study Module",
    subContents: [
      { title: "Subjects", link: "/subjects", Icon: SubjectsSvg },
      // { title: "QBank", link: "/qBank", Icon: ListSvg },
      { title: "Tests", link: "/tests", Icon: ExamSvg },
      { title: "Live", link: "/live", Icon: LiveSvg },
    ],
  },
  {
    heading: "My Account",
    subContents: [
      { title: "Me", link: "/profile", Icon: ProfileSvg },
      { title: "Bookmarks", link: "/bookmarks", Icon: BookmarkSvg },
      { title: "View Plans", link: "/subscriptionPlans", Icon: StarSvg },
      { title: "Discussion", link: "/discussion", Icon: DiscussionSvg },
      // { title: "Logout", link: "/logout", Icon: Logout },
    ],
  },
];

const Sidebar = () => {
  const { logout } = useAuthStore();
  const [confirmModal, setConfirmModal] = useState(false);
  return (
    <div className="flex flex-col gap-2 mt-2 w-full overflow-x-auto no-scrollbar">
      {sidebarItems?.map((item, id) => (
        <div key={id} className="flex items-center gap-2 sm:p-4 w-full">
          <div className="text-sm flex flex-col gap-2 w-full lg:w-fit">
            <p className="px-2 text-[#7a8b94] text-xs underline lg:hidden whitespace-nowrap mt-4">
              {item.heading}
            </p>
            {item?.subContents?.map(({ title, link, Icon }, id) => {
              return (
                <NavLink
                  key={id}
                  to={link}
                  exact="true"
                  className={({ isActive }) =>
                    // `rounded-md hover:bg-[#E8EDF7] p-2 ${
                    `rounded-md font-medium hover:bg-light-red p-2  ${
                      isActive
                        // ? "text-theme-color bg-[#E8EDF7]"
                        ? "text-theme-red bg-light-red"
                        : "text-gray-dark"
                    }`
                  }>
                  <div className="flex items-center gap-1">
                    <Icon className="text-start h-5 w-5" />
                    <p className="xlg:text-sm  font-medium">{title}</p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
      <div
        onClick={() => setConfirmModal(true)}
        className="flex gap-1 cursor-pointer rounded-md hover:bg-[#E8EDF7] p-3">
        <Logout className="h-5 w-5" />
        <p className=" font-medium xlg:text-sm text-gray-dark">Logout</p>
      </div>
      <div className="mt-4 pl-2 text-xs">
        <p className="text-xs uppercase mb-2 text-[#7a8b94] font-bold">
          Download app
        </p>
        <div className="flex flex-col gap-2">
          <Link to="https://play.google.com/store">
            <img src={googlePlay} alt="googleplay" className="" />
          </Link>
          <Link t="https://www.apple.com/store">
            <img src={appStore} alt="appstore" className="" />
          </Link>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmModal}
        setOpen={setConfirmModal}
        desc={"Are you sure you want to logout?"}
        btnName={"Logout"}
        btnClassName="bg-[#ef4444] text-white font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%]"
        handleConfirm={() => logout()}
      />
    </div>
  );
};

export default Sidebar;

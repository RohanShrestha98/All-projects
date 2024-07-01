import React, { useState } from "react";
import longestStreak from "../../images/longest_streak.svg";
import currentStreak from "../../images/current_streak.svg";
import { useNavigate } from "react-router-dom";
import StatsOverview from "./statsOverview";
import MobileHeader from "../../components/navbar/mobileHeader";
import medical from "../../images/medical.svg";
import {
  DownArrowSvg,
  InfoSvg,
  UserSvg,
  LogoutSvg,
  DeleteSvg,
} from "../../assets/allSvg";
import { useAuthStore } from "../../store/useAuthStore";
import ConfirmModal from "../../components/UI/confirmModal";
import QBankOverview from "./qBankOverview";
import DeleteAccModal from "../../components/UI/DeleteAccModal";

const streaksItems = [
  {
    id: 1,
    title: "Longest",
    days: 125,
    img: longestStreak,
  },
  {
    id: 2,
    title: "Current",
    days: 12,
    img: currentStreak,
  },
];

const meItems = [
  {
    id: 1,
    icon: <UserSvg />,
    title: "My Profile",
    link: "/viewProfile",
  },
  {
    id: 2,
    icon: <InfoSvg />,
    title: "About",
    link: "/profile/aboutProfile",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  return (
    <div>
      <MobileHeader headerName={"Me"} noArrow={true} />
      <div className="flex flex-col gap-10 md:gap-6 md:px-3 md:pb-4">
        <div className="bg-[#F7F7F7] justify-between items-center py-4 px-3 rounded-xl hidden md:flex ">
          <div className="flex gap-2">
            <img src={medical} alt="" />
            <div className="flex flex-col  text-[#212121] font-medium text-base">
              <p>Medical PG</p>
              <p className="text-xs text-[#666] mt-[7px]">
                Subscription till 28 Nov 2023
              </p>
            </div>
          </div>
          <DownArrowSvg />
        </div>

        <div className=" gap-4 grid grid-cols-2 md:grid-cols-1">
          {meItems.map((item) => {
            return (
              <div
                onClick={() => navigate(item.link)}
                className="flex cursor-pointer items-center gap-6 border border-[#F7F7F7] rounded-xl py-4 px-6 shadow"
                key={item.id}
              >
                <p className="bg-theme-color rounded-full text-white p-2 md:p-[5px] text-[24px]">
                  {item.icon}
                </p>
                <p className="text-[#333333] text-[17px] md:text-sm">
                  {item.title}
                </p>
              </div>
            );
          })}
          <div
            onClick={() => setDeleteAccountModal(true)}
            className="flex cursor-pointer items-center gap-6 border border-[#F7F7F7] rounded-xl py-4 px-6 shadow"
          >
            <p className="bg-theme-red rounded-full text-white p-2 md:p-[5px] text-[24px]">
              <DeleteSvg />
            </p>
            <p className="text-[#333333] text-[17px] md:text-sm">
              Delete Account
            </p>
          </div>
          <div
            onClick={() => setConfirmModal(true)}
            className="flex cursor-pointer items-center gap-6 border border-[#F7F7F7] rounded-xl py-4 px-6 shadow"
          >
            <p className="bg-theme-color rounded-full text-white p-2 md:p-[5px] text-[24px]">
              <LogoutSvg />
            </p>
            <p className="text-[#333333] text-[17px] md:text-sm">Logout</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[#4B4B4B] font-medium text-base md:text-xs mb-4">
            Streaks
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-2">
            {streaksItems.map(({ id, title, days, img }) => {
              return (
                <div
                  className={`flex items-center justify-between rounded-xl px-6 md:px-4 py-2 md:py-3 text-white
                    ${id === 1 ? "bg-[#E5AB19]" : "bg-[#8dcc8d]"}`}
                  key={id}
                >
                  <div>
                    <p className="text-sm md:text-[10px]">{title}</p>
                    <p className="text-xl md:text-sm">{days} Days</p>
                  </div>
                  <img className="md:h-[45px]" src={img} alt="image" />
                </div>
              );
            })}
          </div>
        </div>
        <StatsOverview />
        <QBankOverview />
      </div>
      <ConfirmModal
        isOpen={confirmModal}
        setOpen={setConfirmModal}
        desc={"Are you sure you want to logout?"}
        btnName={"Logout"}
        btnClassName="bg-[#ef4444] text-white font-medium text-center cursor-pointer text-[15px] rounded-[100px] py-2 w-[46%]"
        handleConfirm={() => logout()}
      />
      <DeleteAccModal
        isOpen={deleteAccountModal}
        setOpen={setDeleteAccountModal}
      />
    </div>
  );
}

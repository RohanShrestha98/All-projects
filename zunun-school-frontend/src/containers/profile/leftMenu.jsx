import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShimmerButton } from "react-shimmer-effects";
import userImg from "../../assets/images/user.png";
import userActiveImg from "../../assets/images/user.svg";
import bellImg from "../../assets/images/bell.svg";
import bellActiveImg from "../../assets/images/bellActive.png";
import helpcenterImg from "../../assets/images/helpcenter.png";
import helpcenterActiveImg from "../../assets/images/helpcenterActive.png";
import languageImg from "../../assets/images/language.png";
import languageActiveImg from "../../assets/images/languageActive.png";
import lockImg from "../../assets/images/lock.png";
import lockActiveImg from "../../assets/images/lockActive.png";
import securityImg from "../../assets/images/security.png";
import logoutImg from "../../assets/images/logout.png";
import LogOutModal from "./logOutModal";

const navItems = [
  {
    title: "User Profile",
    link: "/profile",
    image: userImg,
    activeImg: userActiveImg,
  },
  {
    title: "Notification",
    link: "/notificationSetting",
    image: bellImg,
    activeImg: bellActiveImg,
  },
  {
    title: "Security",
    link: "/security",
    image: securityImg,
    activeImg: userActiveImg,
  },
  {
    title: "Privacy Policy",
    link: "/privacy",
    image: lockImg,
    activeImg: lockActiveImg,
  },
  {
    title: "Language",
    link: "/language",
    image: languageImg,
    activeImg: languageActiveImg,
  },
  {
    title: "Help Center",
    link: "/helpcenter",
    image: helpcenterImg,
    activeImg: helpcenterActiveImg,
  },
];

const LeftMenu = ({ initial }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className=" w-[200px] bg-[#fafaf7] shadow p-3 rounded-lg">
      {navItems.map(({ title, link, image, activeImg }, id) => {
        if (initial) {
          return <ShimmerButton key={id} />;
        } else {
          return (
            <NavLink key={id} to={link} exact="true">
              {({ isActive }) =>
                isActive ? (
                  <div className="mb-5 bg-white shadow-sm  rounded-[10px] p-3 text-blue-light">
                    <img
                      src={activeImg}
                      alt="img"
                      className="w-3.5 h-3.5 inline-block"
                    />
                    <span className="ml-2 text-sm font-semibold">{title}</span>
                  </div>
                ) : (
                  <div className="mb-5 text-black-gray p-3">
                    <img
                      src={image}
                      alt="img"
                      className="w-3.5 h-3.5 inline-block"
                    />
                    <span className="ml-2 text-sm font-semibold">{title}</span>
                  </div>
                )
              }
            </NavLink>
          );
        }
      })}
      {initial ? (
        <ShimmerButton />
      ) : (
        <div
          className="mb-5 text-black-gray p-3 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img src={logoutImg} alt="img" className="w-3.5 h-3.5 inline-block" />
          <span className="ml-2 text-sm font-semibold text-red-1">Logout</span>
        </div>
      )}
      <LogOutModal isOpen={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default LeftMenu;

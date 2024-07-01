/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShimmerButton } from "react-shimmer-effects";
import userImg from "../../images/user.png";
import userActiveImg from "../../images/user.svg";
import bellImg from "../../images/bell.svg";
import bellActiveImg from "../../images/bellActive.png";
import helpcenterImg from "../../images/helpcenter.png";
import helpcenterActiveImg from "../../images/helpcenterActive.png";
import languageImg from "../../images/language.png";
import languageActiveImg from "../../images/languageActive.png";
import lockImg from "../../images/lock.png";
import lockActiveImg from "../../images/lockActive.png";
import securityImg from "../../images/security.png";
import logoutImg from "../../images/logout.png";
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
    link: "/helpCenter",
    image: helpcenterImg,
    activeImg: helpcenterActiveImg,
  },
];

const LeftMenu = ({ initial }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mt-10 w-full">
      {navItems.map(
        ({ title, link, image, activeImg, isLogout = false }, id) => {
          if (initial) {
            return <ShimmerButton key={id} />;
          } else {
            return (
              <NavLink key={id} to={link} exact="true">
                {({ isActive, isPending }) =>
                  isActive ? (
                    <div className="mb-5 bg-white rounded-[10px] p-3 text-blue-light">
                      <img
                        src={activeImg}
                        alt="img"
                        className="w-3.5 h-3.5 inline-block"
                      />
                      <span className="ml-2 text-sm font-semibold">
                        {title}
                      </span>
                    </div>
                  ) : (
                    <div className="mb-5 text-black-gray p-3">
                      <img
                        src={image}
                        alt="img"
                        className="w-3.5 h-3.5 inline-block"
                      />
                      <span className="ml-2 text-sm font-semibold">
                        {title}
                      </span>
                    </div>
                  )
                }
              </NavLink>
            );
          }
        }
      )}
      {initial ? (
        <ShimmerButton />
      ) : (
        <div
          className="mb-5 text-black-gray p-3 cursor-pointer"
          onClick={() => setModalOpen(true)}>
          <img src={logoutImg} alt="img" className="w-3.5 h-3.5 inline-block" />
          <span className="ml-2 text-sm font-semibold text-red-1">Logout</span>
        </div>
      )}
      <LogOutModal isOpen={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default LeftMenu;

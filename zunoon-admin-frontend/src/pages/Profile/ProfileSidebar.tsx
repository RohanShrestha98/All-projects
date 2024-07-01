import React, { useEffect, useRef, useState } from "react";

import { Link, useLocation, Outlet } from "react-router-dom";

import { PATH } from "../../constants/routes";

import "./ProfileSidebar.scss";
import { useTranslation } from "react-i18next";

type SidebarNavItemsType = {
  display: string;
  icon: React.ReactElement;
  to: string;
  section: string;
};


const ProfileSidebar = () => {
  const {t} = useTranslation();
  const sidebarNavItems: SidebarNavItemsType[] = [
    
    {
      display: "profile",
      icon: <i className="bx bx-user"></i>,
      to: "/profile",
      section: "",
    },
    // {
    //   display: "Setting",
    //   icon: <i className="bx bx-home"></i>,
    //   to: PATH.SETTING,
    //   section: "setting",
    // },
    // {
    //   display: "Schools",
    //   icon: <i className="bx bx-buildings"></i>,
    //   to: PATH.SCHOOL,
    //   section: "schools"
    // },
    {
      display: "profile_security",
      icon: <i className="bx bx-lock"></i>,
      to: PATH.SECURITY,
      section: "security",
    },
  ];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [filteredSidebarItems] = useState<SidebarNavItemsType[]>(sidebarNavItems);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[2];

    const activeItem = filteredSidebarItems.findIndex(item => {
      if (curPath) {
        if (item.section === curPath) return true;
        else return false;
      } else {
        return 1;
      }
    });
    setActiveIndex(curPath?.length === 0 ? 0 : activeItem);
  }, [location, filteredSidebarItems]);

  function renderSidebarLists() {
    return filteredSidebarItems.map((item, index) => {
      return (
        <Link to={item.to} key={index}>
          <div className={`profile_menu_item_wrapper ${activeIndex === index ? "active" : ""}`}>
            <div className={`profile_menu_item_icon ${activeIndex === index ? "active" : ""}`}>
              {item.icon}
            </div>
            <div className={`profile_menu_item_text ${activeIndex === index ? "active" : ""}`}>
              {t(item.display)}
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="profile_section ">
      <div className="profile_sidebar ">
        <div ref={sidebarRef} className="profile_menu">
          {renderSidebarLists()}
        </div>
      </div>
      <div className="profile_main ">{<Outlet />}</div>
    </div>
  );
};

export default ProfileSidebar;

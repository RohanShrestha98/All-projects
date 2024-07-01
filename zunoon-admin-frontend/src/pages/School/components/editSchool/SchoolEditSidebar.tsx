import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, Outlet } from "react-router-dom";
import "./SchoolEditSidebar.scss";
import { PATH } from "../../../../constants/routes";
import { useTranslation, withTranslation } from "react-i18next";

type SidebarNavItemsType = {
  display: string;
  icon: React.ReactElement;
  to: string;
  section: string;
};

const SchoolEditSidebar = () => {
  const { t } = useTranslation();
  const sidebarNavItems: SidebarNavItemsType[] = [
    {
      display: "basic",
      icon: <Icon icon="ep:school" />,
      to: PATH.BASIC,
      section: "basic",
    },
    {
      display: "address",
      icon: <Icon icon="grommet-icons:location" />,
      to: PATH.ADDRESS,
      section: "address",
    },
    {
      display: "contact",
      icon: <Icon icon="cil:contact" />,
      to: PATH.CONTACT,
      section: "contact",
    },
    {
      display: "feature",
      icon: <Icon icon="ic:outline-featured-play-list" />,
      to: PATH.FEATURE,
      section: "feature",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [filteredSidebarItems] = useState<SidebarNavItemsType[]>(sidebarNavItems);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[3];
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
          <div className={`school_edit_menu_item_wrapper ${activeIndex === index ? "active" : ""}`}>
            <div className={`school_edit_menu_item_icon ${activeIndex === index ? "active" : ""}`}>
              {item.icon}
            </div>
            <div className={`school_edit_menu_item_text ${activeIndex === index ? "active" : ""}`}>
              {t(item.display)}
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="school_edit_section ">
      <div className="school_edit_sidebar ">
        <div ref={sidebarRef} className="school_edit_menu">
          {renderSidebarLists()}
        </div>
      </div>
      <div className="school_edit_main ">{<Outlet />}</div>
    </div>
  );
};

export default withTranslation()(SchoolEditSidebar);

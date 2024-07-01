import React, { useEffect, useRef, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { PATH } from "../../constants/routes";
import { SYSTEM_ACCESS_ID } from "../../constants/accessId";

import "./Sidebar.scss";
import logo from "../../assets/images/zunun.png";
import { withTranslation } from "react-i18next";

import { getPermissions, setAccessList } from "../../utils/storage";

type sidebarNavItemType = {
  to: string;
  display: string;
  section: string;
  accessId: string;
  icon: React.ReactElement;
};

const sidebarNavItems: sidebarNavItemType[] = [
  {
    display: "sidebar_dashboard",
    icon: <i className="bx bx-home"></i>,
    to: PATH.DASHBOARD,
    section: "",
    accessId: SYSTEM_ACCESS_ID.DASHBOARD,
  },
  {
    display: "sidebar_staffs",
    icon: <i className="bx bx-user"></i>,
    to: PATH.STAFF,
    section: "staffs",
    accessId: SYSTEM_ACCESS_ID.ACCOUNT,
  },
  {
    display: "sidebar_schools",
    icon: <i className="bx bx-buildings"></i>,
    to: PATH.SCHOOL,
    section: "schools",
    accessId: SYSTEM_ACCESS_ID.SCHOOL,
  },
  {
    display: "sidebar_grades",
    icon: <i className="bx bx-book-reader"></i>,
    to: PATH.GRADE,
    section: "grades",
    accessId: SYSTEM_ACCESS_ID.GRADE,
  },
  {
    display: "sidebar_careers",
    icon: <i className="bx  bxs-graduation"></i>,
    to: PATH.CAREER,
    section: "careers",
    accessId: SYSTEM_ACCESS_ID.CAREER,
  },
  {
    display: "sidebar_courses",
    icon: <i className="bx bx-book"></i>,
    to: PATH.COURSE,
    section: "courses",
    accessId: SYSTEM_ACCESS_ID.COURSE,
  },
  {
    display: "sidebar_course_levels",
    icon: <i className="bx bx-category"></i>,
    to: PATH.LEVEL_TYPE,
    section: "levelCategory",
    accessId: SYSTEM_ACCESS_ID.LEVEL_TYPE,
  },
  {
    display: "sidebar_units",
    icon: <i className="bx bx-book-open"></i>,
    to: PATH.UNIT,
    section: "units",
    accessId: SYSTEM_ACCESS_ID.UNIT,
  },
  {
    display: "sidebar_skills",
    icon: <i className="bx bx-brain"></i>,
    to: PATH.SKILL,
    section: "skills",
    accessId: SYSTEM_ACCESS_ID.SKILL,
  },
  {
    display: "sidebar_indicator",
    icon: <i className="bx bxs-book-content"></i>,
    to: PATH.INDICATOR,
    section: "indicators",
    accessId: SYSTEM_ACCESS_ID.INDICATOR,
  },
  {
    display: "sidebar_lesson",
    icon: <i className="bx bx-align-middle "></i>,
    to: PATH.LESSON,
    section: "lessons",
    accessId: SYSTEM_ACCESS_ID.LESSON,
  },
  {
    display: "sidebar_content",
    icon: <i className="bx bx-file"></i>,
    to: PATH.CONTENT,
    section: "contents",
    accessId: SYSTEM_ACCESS_ID.CONTENT,
  },
  {
    display: "ability_categories",
    icon: <i className="bx bx-category"></i>,
    to: PATH.ABILITY,
    section: "ability",
    accessId: SYSTEM_ACCESS_ID.ABILITY,
  },
];

const Sidebar = ({ t }) => {
  const currentYear = new Date().getFullYear();
  // const [activeIndex, setActiveIndex] = useState<number>(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
    // setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const [filteredSidebarItems, setFilteredSidebarItems] = useState([]);

  useEffect(() => {
    const permissions = getPermissions();

    const accessibleSides = [
      ...new Set(permissions?.map(each => each.url.path.split("/")[1])),
      SYSTEM_ACCESS_ID.DASHBOARD,
    ];

    setAccessList(accessibleSides);

    if (permissions && permissions[0].name === "Any") {
      setFilteredSidebarItems(sidebarNavItems);
      setAccessList(["Any"]);
    } else {
      setFilteredSidebarItems(
        sidebarNavItems.filter(item => accessibleSides.includes(item.accessId)),
      );
    }
  }, []);

  function renderSidebarLists(t) {
    const curPath = window.location.pathname.split("/")[1];

    return filteredSidebarItems.map((item, index) => {
      return (
        <Link to={item.to} key={index}>
          <div className={`sidebar_menu_item ${curPath.includes(item.to) || (!curPath && item.to === "/") ? "active" : ""}`}>
            <div className={`sidebar_menu_item_icon ${curPath.includes(item.to) || (!curPath && item.to === "/") ? "active" : ""}`}>
              {item.icon}
            </div>
            <div className={`sidebar_menu_item_text ${curPath.includes(item.to) || (!curPath && item.to === "/") ? "active" : ""}`}>
              {t(item.display)}
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar_logo">
          <Link className="zunun" to="/">
            <img className="sidebar_logo_image" src={logo} alt="logo" />
          </Link>
        </div>
        <div ref={sidebarRef} className="sidebar_menu">
          {renderSidebarLists(t)}
        </div>
      </div>
      <div className="sidebar_footer">
        <p>© {currentYear} Zunun. All Rights Reserved</p>
        <p>
          Powered by{" "}
          <a target={"_blank"} rel="noreferrer" href="https://ayata.com.np/">
            Ayata Inc.
          </a>
        </p>
      </div>
    </div>
  );
};

export default withTranslation()(Sidebar);

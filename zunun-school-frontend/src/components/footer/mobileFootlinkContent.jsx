import React from "react";
import {
  MdOutlineHome,
  MdOutlineAssessment,
  MdOutlineNotes,
} from "react-icons/md";
import { CiCalendar, CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", link: "/", Image: MdOutlineHome },
  { title: "My Course", link: "/courses", Image: MdOutlineNotes },
  { title: "Assignment", link: "/assignment", Image: MdOutlineAssessment },
  { title: "Calendar", link: "/calendar", Image: CiCalendar },
  { title: "Profile", link: "/profile", Image: CiUser },
];

const MobileFootlinkContents = () => {
  return (
    <>
      {navItems.map(({ link, title, Image }, id) => {
        return (
          <NavLink key={id} to={link} exact="true">
            {({ isActive }) =>
              isActive ? (
                <div>
                  <div className="flex justify-center">
                    <Image className="fill-cyan" />
                  </div>
                  <div className="font-semibold text-[10px] text-cyan">
                    {title}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <Image className="fill-gray-dark2" />
                  </div>
                  <div className="font-semibold text-[10px] text-gray-dark2">
                    {title}
                  </div>
                </div>
              )
            }
          </NavLink>
        );
      })}
    </>
  );
};

export default MobileFootlinkContents;

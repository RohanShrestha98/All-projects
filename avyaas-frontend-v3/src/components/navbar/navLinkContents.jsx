import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", link: "/" },
  { title: "My Course", link: "/courses" },
  { title: "Assignment", link: "/assignment" },
  { title: "Calendar", link: "/calendar" },
  { title: "Notifications", link: "/notification" },
];

const NavLinkContents = ({ isOpen }) => {
  return (
    <div className={isOpen ? " flex-col" : " sm:hidden flex gap-9"}>
      {navItems.map(({ title, link }, id) => (
        <NavLink
          key={id}
          to={link}
          exact="true"
          className={({ isActive }) =>
            isActive ? "text-theme-color" : "text-gray-dark"
          }
        >
          <span className="flex items-center lg:space-y-10">
            <p className="text-[16px] ">{title}</p>
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinkContents;

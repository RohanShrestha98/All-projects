import React from "react";
import { NavLink } from "react-router-dom";

const footItems = [
  { title: "Privacy Policy" },
  { title: "Terms of Use" },
  { title: "Legal" },
  { title: "Blog", link: "/blog" },
];

const FootLinkContnents = () => {
  return (
    <div className="flex sm:flex-col  gap-4  sm:space-x-0">
      {footItems.map(({ title, link }, id) => (
        <NavLink
          key={id}
          to={link}
          exact="true"
          className={({ isActive }) =>
            isActive ? "text-blue-light" : "text-gray-dark"
          }
        >
          <span className="sm:mb-3">
            <p className="text-sm text-black-gray font-medium">{title}</p>
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default FootLinkContnents;

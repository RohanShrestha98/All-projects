import React from "react";
import profileImg from "../../images/profile.png";
import userIcon from "../../images/user.png";
import logoutImg from "../../images/logout.png";
import { NavLink } from "react-router-dom";

const NavDropDown = ({ handleDropdownOpen, handleLogoutOpen }) => {
  return (
    <div className="shadow-md rounded-md bg-white">
      <div className="border-b border-gray-16">
        <div className="flex items-center gap-2 py-2 px-4">
          <img src={profileImg} alt="image" />
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-black-gray">
              Andrew Andrew
            </div>
            <div className="font-normal text-sm text-gray-slate">Student</div>
          </div>
        </div>
      </div>
      <NavLink to="/profile" onClick={() => handleDropdownOpen(false)}>
        <div className="border-b border-gray-16">
          <div className="flex items-center gap-2 py-2 px-4">
            <img src={userIcon} alt="image" />
            <div className="font-medium text-[15px]">Profile</div>
          </div>
        </div>
      </NavLink>
      <div
        onClick={() => {
          handleLogoutOpen(true);
          handleDropdownOpen(false);
        }}
        className="cursor-pointer flex items-center gap-2 py-2 px-4">
        <img src={logoutImg} alt="image" />
        <div className="font-medium text-[15px] text-red">Logout</div>
      </div>
    </div>
  );
};

export default NavDropDown;

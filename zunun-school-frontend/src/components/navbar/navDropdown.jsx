import React from "react";
import userIcon from "../../assets/images/user.png";
import person from "../../assets/images/person.svg";
import logoutImg from "../../assets/images/logout.png";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

const NavDropDown = props => {
  const { auth } = useAuthContext();

  return (
    <div className="shadow-md rounded-md bg-white">
      <div className="border-b border-gray-16">
        <div className="flex items-center gap-2 py-2 px-4">
          <img
            src={auth?.user?.file?.url || person}
            alt="image"
            className={`w-8 h-8 rounded-full object-cover object-top  ${
              auth?.user?.file?.url ? "" : "p-1 border  border-gray-dark3"
            } `}
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-black-gray">
              {auth?.user?.username}
            </div>
            <div className="font-normal text-sm text-gray-slate">
              {auth?.user?.role?.name}
            </div>
          </div>
        </div>
      </div>
      <NavLink to="/profile" onClick={() => props.handleDropdownOpen(false)}>
        <div className="border-b border-gray-16">
          <div className="flex items-center gap-2 py-2 px-4">
            <img src={userIcon} alt="image" />
            <div className="font-medium text-[15px]">Profile</div>
          </div>
        </div>
      </NavLink>
      <div
        onClick={() => {
          props.handleLogoutOpen(true);
          props.handleDropdownOpen(false);
        }}
        className="cursor-pointer flex items-center gap-2 py-2 px-4"
      >
        <img src={logoutImg} alt="image" />
        <div className="font-medium text-[15px] text-red">Logout</div>
      </div>
    </div>
  );
};

export default NavDropDown;

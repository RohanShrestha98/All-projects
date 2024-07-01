import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bell from "../../assets/bell.svg";
import ronaldo from "../../images/ronaldo.webp";
import { LeftArrowSvg } from "../../assets/allSvg";

export default function MobileHeader({
  headerName,
  noProfile,
  className,
  noArrow,
}) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0  z-10">
      <div
        className={`${
          className ? className : "flex items-center justify-between"
        }  md:shadow font-semi-bold h-[52px]  md:px-4 md:mb-4  bg-white`}
      >
        <div className={`flex items-center gap-2 md:mb-0 cursor-pointer `}>
          {!noArrow && (
            <div
              onClick={() => navigate(-1)}
              className="hover:bg-light-theme rounded-full"
            >
              <LeftArrowSvg />
            </div>
          )}
          <h1 className="text-[#1A0203] font-medium text-base">{headerName}</h1>
        </div>
        {!noProfile ? (
          <div className={` gap-2 items-center hidden md:flex   `}>
            <NavLink to="/notification">
              <img
                src={bell}
                alt="logo"
                className="w-7 h-7 max-h-[20px] max-w-[20px]"
              />
            </NavLink>
            <NavLink to="/profile">
              <img
                src={ronaldo}
                alt="profile"
                className="w-9 h-9 max-h-[30px] max-w-[30px] rounded-full"
              />
            </NavLink>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

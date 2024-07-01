import React from "react";
import { NavLink } from "react-router-dom";
import {
  ExamSvg,
  HomeSvg,
  ListSvg,
  LiveSvg,
  YoutubeSvg,
} from "../../assets/allSvg";

const navItems = [
  { title: "Home", link: "/", Image: <HomeSvg /> },
  { title: "Videos", link: "/subjects", Image: <YoutubeSvg /> },
  { title: "Live", link: "/live", Image: <LiveSvg /> },
  { title: "QBank", link: "/qBank", Image: <ListSvg /> },
  { title: "Tests", link: "/tests", Image: <ExamSvg /> },
];

const MobileFootlinkContents = () => {
  return (
    <div className="flex gap-10 px-3 md:gap-12 md:justify-evenly md:w-full">
      {navItems.map(({ link, title, Image }, id) => {
        return (
          <NavLink key={id} to={link} className={"w-1/5"} exact="true">
            {({ isActive }) =>
              isActive ? (
                <div className="flex flex-col items-center">
                  <div className="flex justify-center">
                    <p className="text-theme-color text-[24px]">{Image}</p>
                  </div>
                  <div className="font-semibold text-[10px] text-theme-color">
                    {title}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex justify-center ">
                    <p className="text-[#5A5A5A] text-[24px]">{Image}</p>{" "}
                  </div>
                  <div className="font-semibold text-[10px] text-[#4D4D4D]">
                    {title}
                  </div>
                </div>
              )
            }
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileFootlinkContents;

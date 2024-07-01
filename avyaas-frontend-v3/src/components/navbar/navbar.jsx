import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo1.png";
import bell from "../../assets/bell.svg";
import ronaldo from "../../images/ronaldo.webp";
import { Select } from "antd";
import { DownArrowSvg, UpArrowSvg } from "../../assets/allSvg";
import { useCourseAvailable } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";

const Navbar = () => {
  const { currentModule, setCurrentModule } = useModuleStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  let enrolled = true;

  const { data } = useCourseAvailable();

  const courseOptions = data?.data?.map((item) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });

  const handleCurrentCourse = (e) => {
    const filterCurrentCourse = data?.data?.find((item) => item?.id === e);
    delete filterCurrentCourse.description;

    setCurrentModule(filterCurrentCourse);
  };

  const handleDropdownVisibleChange = (visible) => {
    setOpenDropdown(visible);
  };

  return (
    <div className="sticky top-0 sm:static bg-white md:hidden">
      <nav className="flex justify-between px-32 lg:px-14  md:px-7 sm:px-4 items-center  lg:overflow-x-scroll sm:overflow-x-auto sticky w-full h-16 bg-white z-40 ">
        <div className="flex gap-20 items-center justify-center flex-shrink-0 sm:hidden lg:gap-6">
          <NavLink to="/">
            <img src={logo1} alt="logo" className="w-24 h-14 pl-2" />
          </NavLink>
        </div>
        <div className="flex sm:justify-between sm:w-full items-center gap-4 xl:gap-3 lg:ml-3 sm:ml-0">
          <Select
            suffixIcon={openDropdown ? <UpArrowSvg /> : <DownArrowSvg />}
            variant="borderless"
            placeholder="Switch Course"
            dropdownStyle={{ minWidth: "fit-content", wordBreak: "break-all" }}
            onChange={(e) => {
              handleCurrentCourse(e);
            }}
            defaultValue={currentModule?.id}
            options={courseOptions}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            className="flex-1 home md:hidden"
          />
          <div className="flex gap-2 items-center ">
            <NavLink to="/notification">
              <img
                src={bell}
                alt="logo"
                className="w-7 h-7 min-h-[28px] min-w-[28px]"
              />
            </NavLink>
            <NavLink to="/profile">
              <img
                src={ronaldo}
                alt="profile"
                className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-full"
              />
            </NavLink>
          </div>
        </div>
      </nav>

      {enrolled && location?.pathname !== "/tests/quiz" && (
        <div
          className={`justify-center bg-light-red flex items-center gap-8 md:gap-4 p-4 md:p-2 sm:p-6 sm:flex-col sm:hidden text-sm font-thin`}
        >
          <div className="flex flex-col gap-1 items-center">
            <p className="text-center text-theme-color text-base font-semibold">
              Introducing best{" "}
              <span className="text-theme-red">Subscription Plans!</span>
            </p>
            <p className="text-center text-theme-color text-sm font-normal">
              Take Your {currentModule?.title} Preparation to Next Level &
              Discover more today !!
            </p>
          </div>
          <button
            onClick={() => navigate("/subscriptionPlans")}
            className="rounded-md px-4 font-medium py-1 bg-theme-red whitespace-nowrap text-white">
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

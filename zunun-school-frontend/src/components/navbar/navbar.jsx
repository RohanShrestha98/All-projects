import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/blogImg1.png";
import uk_flag from "../../assets/flags/uk.webp";
import spain_flag from "../../assets/flags/spain.webp";
import NavLinkContnents from "./navLinkContents";
import NavDropDown from "./navDropdown";
import LogOutModal from "../../containers/profile/logOutModal";
import { useAuthContext } from "../../context/authContext";

const Navbar = ({ pathName, setPathName }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [langDropDown, setLangDropDown] = useState(false);
  const languages = [
    {
      id: 1,
      name: "english",
      flag: uk_flag,
      code: "en",
    },
    {
      id: 2,
      name: "spanish",
      flag: spain_flag,
      code: "es",
    },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const { auth } = useAuthContext();

  const dropRef = useRef();
  const arrowRef = useRef();

  const handleOpenDropdown = value => {
    setOpenDropdown(value);
  };

  const handleLogoutOpen = value => {
    setOpenLogout(value);
  };

  useEffect(() => {
    const checkOutsideClick = e => {
      if (
        openDropdown &&
        (dropRef.current || arrowRef.current) &&
        !dropRef.current.contains(e.target) &&
        !arrowRef.current.contains(e.target)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkOutsideClick);

    return () => {
      document.removeEventListener("mousedown", checkOutsideClick);
    };
  }, [openDropdown]);

  return (
    <div className="relative sm:static mb-1">
      <nav className="flex justify-between px-[104px] items-center  lg:overflow-x-scroll overflow-x-scroll  md:px-8 fixed  w-full shadow-sm bg-white z-40 sm:px-6 h-20">
        <div className="flex gap-20 items-center  flex-shrink-0 sm:hidden lg:gap-6">
          <NavLink to="/" onClick={() => setPathName("/")}>
            <div className="flex items-stretch">
              <img src={logo} alt="logo" className="h-14" />
            </div>
          </NavLink>
          <NavLinkContnents setPathName={setPathName} pathName={pathName} />
        </div>
        <div className="flex items-center gap-4 xl:gap-3 lg:ml-3 sm:ml-0">
          <NavLink to="/notification">
            <BsBell size={20} />
          </NavLink>
          <NavLink to="/profile" className="w-9 h-9">
            <img
              src={auth?.user?.file?.url || profile}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover object-top"
            />
          </NavLink>
          <div
            ref={arrowRef}
            className="sm:hidden cursor-pointer"
            onClick={() => handleOpenDropdown(!openDropdown)}
          >
            <MdKeyboardArrowDown size={20} />
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg text-black-gray">Andrew Name</div>
            <div className="font-medium text-[15px] text-gray-7">
              Good Morning 👋
            </div>
          </div>
        </div>
      </nav>
      {openDropdown && (
        <div
          ref={dropRef}
          className="sm:hidden fixed top-16 mt-1 right-[102px] z-[1000] md:right-3"
        >
          <NavDropDown
            handleLogoutOpen={handleLogoutOpen}
            handleDropdownOpen={handleOpenDropdown}
          />
        </div>
      )}
      {openLogout && (
        <LogOutModal isOpen={openLogout} setOpen={handleLogoutOpen} />
      )}
    </div>
  );
};

export default Navbar;

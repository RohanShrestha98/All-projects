import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import MyFooter from "../components/footer/myFooter";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const theme = useContext(ThemeContext);
  const [pathName, setPathName] = useState(window.location.pathname);
  const [langDropDown, setLangDropDown] = useState(false);

  // useEffect(() => {
  //   document.title = auth?.user?.schoolName;
  // }, []);

  return (
    <div className="h-screen   flex flex-col overflow-auto justify-between space-y-24 relative">
      <div className="">
        {theme.view.viewNav && (
          <Navbar
            setPathName={setPathName}
            setLangDropDown={setLangDropDown}
            langDropDown={langDropDown}
            pathName={pathName}
          />
        )}
        <div
          className={`md:px-10 sm:px-0 lg:px-20 px-[102px] mt-[120px] sm:mt-2 ${
            !theme.view.viewTab ? "pb-2" : "pb-2 sm:pb-[140px]"
          }`}
        >
          <Outlet />
        </div>
      </div>
      {/* <div className={`md:px-0 px-[102px] ${!theme.view.viewTab ? "pb-10" : "pb-48 sm:pb-[140px]"} sm:`}>{props.children}</div> */}
      {theme.view.viewTab && (
        <div className="w-full z-10  bottom-0">
          <MyFooter setPathName={setPathName} />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

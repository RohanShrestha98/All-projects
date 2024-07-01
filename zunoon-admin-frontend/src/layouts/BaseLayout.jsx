import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import { Outlet } from "react-router-dom";

import "./BaseLayout.scss";

export default function BaseLayout() {
  const [langDropDown, setLangDropDown] = useState(false);
  return (
    <div
      className="main"
      onClick={() => {
        langDropDown && setLangDropDown(false);
      }}
    >
      <Sidebar />
      <div className="navbar_wrapper">
        <Navbar langDropDown={langDropDown} setLangDropDown={setLangDropDown} />
      </div>
      <div className="pages_wrapper">
        <Outlet />
      </div>
    </div>
  );
}

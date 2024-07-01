import { Outlet } from "react-router-dom";
import SideBar from "../myComponents/SideBar";
import Header from "../myComponents/Header";

export default function AdminPannelLayout() {
  return (
    <div className="flex ">
      <div className="w-[20%]">
        <SideBar />
      </div>
      <div className="w-[80%]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

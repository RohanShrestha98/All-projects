import { Outlet } from "react-router-dom";
import NavBar from "../myComponents/NavBar";

export default function UserPannelLayout() {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
}

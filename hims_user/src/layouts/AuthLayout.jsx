import { Outlet } from "react-router-dom";
import authBackground from "../assets/authbackground.svg";
import logo from "../assets/logo.svg";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-1 md:inline-block bg-white ">
      <div className="p-10 h-screen overflow-hidden bg-blue-100 no-scrollbar md:hidden">
        <div className="flex items-center gap-2">
          <img className="w-[52px] h-[52px]" src={logo} alt="" />
          <p className="font-semibold text-lg text-gray-600">
            Health Information Desk
          </p>
        </div>
        <img className="-mt-10" src={authBackground} alt="" />
      </div>
      <div className="md:w-[96vw]  h-screen overflow-auto md:overflow-hidden no-scrollbar  ">
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar";
import Navbar from "../components/Shared/Navbar";

export default function DashboardLayput() {
  return (
    <div className="flex justify-between">
      <div className={`w-[18%]  h-screen`}>
        <Sidebar />
      </div>
      <div className={`w-[82%] border h-screen overflow-hidden`}>
        <Navbar />
        <div className="bg-gray-50 p-4 h-full">
          <div className="bg-white rounded-lg p-4 h-[91%] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Header from "../components/Header";
import DashboardHospital from "./DashboardHospital";
import DashboardVital from "./DashboardVital";
import DashboardMedication from "./DashboardMedication";
import DashboardStaffHospital from "./DashboardStaffHospital";
import { useProfileInfoData } from "../hooks/useQueryData";

export default function Dashboard() {
  const [active, setActive] = useState("hospitals");
  const { data } = useProfileInfoData();
  const isVerifiedUser = data?.results?.[0]?.user?.is_verified_as_staff;
  return (
    <div className="">
      <Header title={"Home"} />
      <div className="bg-white rounded-md  shadow px-6 sm:bg-transparent sm:shadow-none sm:px-0 overflow-auto ">
        <div className=" overflow-auto md:block inline-block ">
          <div className="flex  border items-center justify-between overflow-auto no-scrollbar mb-2 md:overflow-auto gap-2 h-10  p-1 mt-4  rounded-full bg-white">
            <div
              onClick={() => setActive("hospitals")}
              className={`h-full line-clamp-1  px-4 py-1 flex w-full justify-center min-w-[140px] sm:min-w-[110px] sm:text-sm md:min-w-1/2  rounded-full cursor-pointer ${
                active === "hospitals" ? "bg-[#265CC0] text-white" : ""
              } `}
            >
              {isVerifiedUser ? <p>My Hospitals</p> : <p>Hospitals</p>}
            </div>
            <div
              onClick={() => setActive("vitals")}
              className={`h-full line-clamp-1  px-4 py-1 flex w-full justify-center sm:min-w-[110px] sm:text-sm min-w-[140px] md:min-w-1/2  rounded-full cursor-pointer ${
                active === "vitals" ? "bg-[#265CC0] text-white" : ""
              } `}
            >
              Vitals
            </div>
            <div
              onClick={() => setActive("documents")}
              className={`h-full line-clamp-1  px-4 py-1 flex w-full justify-center sm:min-w-[110px] sm:text-sm min-w-[200px] md:min-w-1/2  rounded-full cursor-pointer ${
                active === "documents" ? "bg-[#265CC0] text-white" : ""
              } `}
            >
              Medications
            </div>
          </div>
        </div>
        {active === "hospitals" && !isVerifiedUser ? (
          <DashboardHospital />
        ) : active === "hospitals" && isVerifiedUser ? (
          <DashboardStaffHospital />
        ) : active === "vitals" ? (
          <DashboardVital />
        ) : (
          active === "documents" && <DashboardMedication />
        )}
      </div>
    </div>
  );
}

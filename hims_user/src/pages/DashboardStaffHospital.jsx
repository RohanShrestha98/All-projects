import { TbEmergencyBed } from "react-icons/tb";
import { LuBed } from "react-icons/lu";
import { TbAmbulance } from "react-icons/tb";
import { OxygenCylinder } from "../assets/icons/AllSvg";
import CustomSlicker from "../components/CustomSlicker";

export default function DashboardStaffHospital() {
  const dashboardCount = [
    {
      id: 1,
      title: "Available Beds",
      count: 35,
      icon: <LuBed />,
    },
    {
      id: 2,
      title: "ICU Room",
      count: 10,
      icon: <TbEmergencyBed />,
    },
    {
      id: 3,
      title: "Oxygen Cylinder",
      count: 20,
      icon: <OxygenCylinder />,
    },
    {
      id: 4,
      title: "Available Ambulance",
      count: 10,
      icon: <TbAmbulance />,
    },
  ];
  const dailyCapacity = [
    { count: 101, department: "Ward" },
    { count: 107, department: "Emergency" },
    { count: 101, department: "Emergency" },
    { count: 100, department: "Out Patients" },
    { count: 101, department: "Emergency" },
    { count: 102, department: "Emergency" },
    { count: 103, department: "Emergency" },
    { count: 104, department: "Lab Test" },
    { count: 101, department: "Emergency" },
    { count: 102, department: "Emergency" },
    { count: 103, department: "Emergency" },
    { count: 104, department: "Lab Test" },
  ];
  return (
    <div className="h-[75vh] overflow-auto no-scrollbar">
      <h1 className="font-semibold text-[#265cc0] text-lg mb-2">
        Teaching Hospital
      </h1>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {dashboardCount?.map((item) => {
          return (
            <div
              className="flex  rounded-md  bg-[#FFFAFA] py-6 px-5 items-center gap-3"
              key={item?.id}
            >
              <div className="bg-white rounded-md w-8 h-8 flex items-center text-red-600 text-xl  justify-center">
                {item?.icon}
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {item?.count}
                </p>
                <p className="text-xs font-medium text-gray-400">
                  {item?.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="font-medium text-gray-500 text-xl mb-2">Services</h1>

      <div className="bg-[#F2F4F7]" id="daily-capacity">
        <CustomSlicker rows={2} slidesToShow={4}>
          {dailyCapacity?.map((item, id) => {
            return (
              <div key={id} className="bg-[#F6F7F9] rounded-md my-2">
                <section className="bg-[#FCFCFD] h-[138px] flex flex-col items-center justify-center rounded-md">
                  <p className="text-[#E64400] text-[24px]">{item?.count}</p>
                  <p className="text-[#005A80] text-[18px]">
                    {item?.department}
                  </p>
                </section>
              </div>
            );
          })}
        </CustomSlicker>
      </div>
    </div>
  );
}

import { FaDroplet } from "react-icons/fa6";
import { FaWeight } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import bloodpressure from "../assets/bloodpressure.svg";
import { useNoticeData, useVitalData } from "../hooks/useQueryData";
import { useState } from "react";
import UpdateVitalModal from "../modals/UpdateVitalModal";
import loading from "../assets/loading.webp";
import NoDataPage from "../components/UI/NoDataPage";

export default function DashboardVital() {
  const { data, isLoading } = useNoticeData();
  const { data: vitalData } = useVitalData();
  const [openUpdateVitalModal, setOpenUpdateVitalModal] = useState(false);
  const [updateVitalData, setUpdateVitalData] = useState();
  const vitals = vitalData?.results?.[0];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dashboard = [
    {
      id: 1,
      name: "Blood Group",
      reading: vitals?.blood_group,
      registerName: "blood_group",
      icon: <FaDroplet size={18} />,
      color: "#FA5A7D",
      status: vitals ? "Update" : "Add",
    },
    {
      id: 2,
      name: "Body Weight",
      reading: vitals?.body_weight,
      registerName: "body_weight",
      icon: <FaWeight size={18} />,
      color: "#FF947A",
      status: vitals ? "Update" : "Add",
    },
    {
      id: 3,
      name: "Temperature",
      reading: vitals?.body_temperature,
      registerName: "body_temperature",
      icon: <FaTemperatureHigh size={18} />,
      color: "#3CD856",
      status: vitals ? "Update" : "Add",
    },
    {
      id: 4,
      name: "Blood Pressure",
      reading: vitals?.sys,
      registerName: "sys",
      color: "#BF83FF",
      status: vitals ? "Update" : "Add",
    },
  ];

  return (
    <div className="flex md:flex-col justify-between gap-6 mt-4 h-[76vh] sm:h-full overflow-auto no-scrollbar">
      <div className=" w-3/5 md:w-full flex gap-2 justify-between ">
        <div className="w-full">
          <h1 className="text-lg font-semibold text-gray-600">
            {" "}
            Vital Details
          </h1>
          <div className="grid grid-cols-4 w-full lg:grid-cols-2 gap-2 mt-2">
            {dashboard?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className={`${
                    item?.id === 1
                      ? "bg-[#FFE2E5]"
                      : item?.id === 2
                      ? "bg-[#FFF4DE]"
                      : item?.id === 3
                      ? "bg-[#DCFCE7]"
                      : "bg-[#F3E8FF]"
                  } w-full  p-4 rounded-lg  `}
                >
                  <div
                    className={` ${
                      item?.id === 1
                        ? "bg-[#FA5A7D]"
                        : item?.id === 2
                        ? "bg-[#FF947A]"
                        : item?.id === 3
                        ? "bg-[#3CD856]"
                        : "bg-[#BF83FF]"
                    } text-white flex items-center justify-center  text-lg rounded-full w-[36px] h-[36px]`}
                  >
                    {item?.id === 4 ? (
                      <img className="w-[18px]" src={bloodpressure} />
                    ) : (
                      <> {item?.icon}</>
                    )}
                  </div>
                  <p className="text-[#151D48] text-base font-semibold mt-2">
                    {item?.reading ?? 0}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {item?.name}
                  </p>
                  <p
                    onClick={() => {
                      setUpdateVitalData(item);
                      setOpenUpdateVitalModal(true);
                    }}
                    className="text-sm cursor-pointer font-semibold text-blue-600"
                  >
                    {item?.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute">
        {openUpdateVitalModal && (
          <UpdateVitalModal
            isOpen={openUpdateVitalModal}
            setIsOpen={setOpenUpdateVitalModal}
            edit={vitals ? true : false}
            vitalData={updateVitalData}
          />
        )}
      </div>

      <div className="w-2/5 lg:w-1/2 md:w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg text-gray-600">Recent Notices </p>
        </div>
        <div className="py-4 flex flex-col mt-2 gap-3 h-[68vh] sm:h-full sm:gap-1 md:h-full overflow-auto  no-scrollbar">
          {isLoading ? (
            <div className="h-[80vh] flex  items-center justify-center">
              <img className="w-20 h-20" src={loading} alt="" />
            </div>
          ) : data?.results ? (
            data?.results?.map((item) => {
              const utcDate = new Date(item?.created_at);
              const day = utcDate.getUTCDate();
              const monthIndex = utcDate.getUTCMonth();
              const monthName = monthNames[monthIndex];
              return (
                <div
                  key={item?.id}
                  className={`flex items-start gap-2 p-4 sm:p-0 sm:py-2 cursor-pointer rounded-lg `}
                >
                  <div className="bg-[#265CC0] min-w-[70px] text-white p-1 flex flex-col text-center text-sm rounded-[6px]">
                    {monthName?.slice(0, 3)}
                    <span className="text-2xl font-medium">{day}</span>
                  </div>
                  <div className="w-full border-[#4a4949]">
                    <h2 className="text-sm font-semibold text-[#333333]">
                      {item?.title}
                    </h2>
                    <div>
                      <p className="text-xs text-[#5D5D5D] line-clamp-1">
                        {item?.description}
                      </p>
                      <span className="text-xs text-[#265CC0]">
                        Published By: {item?.published_by}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoDataPage />
          )}
        </div>
      </div>
    </div>
  );
}

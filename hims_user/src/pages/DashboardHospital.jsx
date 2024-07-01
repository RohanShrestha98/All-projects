import logo from "../assets/logo.svg";
import { useHospitalData } from "../hooks/useQueryData";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useState } from "react";
import Map from "./Map";
import NoDataPage from "../components/UI/NoDataPage";
import loading from "../assets/loading.webp";

export default function DashboardHospital() {
  const { data, isLoading } = useHospitalData();
  const [active, setActive] = useState("list");
  return (
    <div className=" sm:mt-2 h-[76vh] overflow-auto sm:h-full no-scrollbar">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-600">Hospitals</h1>
        <div className="flex  border items-center justify-between overflow-auto no-scrollbar mb-2 md:overflow-auto gap-2 h-10  p-1 mt-4  rounded-full bg-white">
          <div
            onClick={() => setActive("list")}
            className={`h-full line-clamp-1  px-4 py-1 flex w-full justify-center min-w-[90px] sm:min-w-[90px] sm:text-sm md:min-w-1/2  rounded-full cursor-pointer ${
              active === "list" ? "bg-[#265CC0] text-white" : ""
            } `}
          >
            <p>Lists</p>
          </div>
          <div
            onClick={() => setActive("map")}
            className={`h-full line-clamp-1  px-4 py-1 flex w-full justify-center sm:min-w-[90px] sm:text-sm min-w-90px] md:min-w-1/2  rounded-full cursor-pointer ${
              active === "map" ? "bg-[#265CC0] text-white" : ""
            } `}
          >
            Map
          </div>
        </div>
      </div>
      {active === "list" ? (
        <div>
          {isLoading ? (
            <div className="h-[80vh] flex  items-center justify-center">
              <img className="w-20 h-20" src={loading} alt="" />
            </div>
          ) : data?.length ? (
            <div className="flex flex-col gap-4 sm:gap-3 mt-4">
              {data?.map((item) => {
                return (
                  <div
                    className="flex  px-4 py-2 justify-between rounded-md shadow sm:shadow-sm sm:px-0 items-center"
                    key={item?.id}
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={item?.logo ?? logo}
                        className="w-20 h-20 sm:h-12 sm:w-12"
                        alt=""
                      />
                      <div>
                        <p className="text-base font-semibold text-gray-600 sm:text-gray-500 sm:text-sm line-clamp-1">
                          {item?.title}
                        </p>
                        <div className="flex items-center gap-1">
                          <IoLocation className="text-gray-500 sm:text-gray-400 sm:text-xs" />
                          <p className="text-sm font-medium sm:text-xs text-gray-500 sm:text-gray-400">
                            {item?.district}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaPhone className="text-gray-500 sm:text-gray-400 text-xs sm:text-[10px] ml-[2px]" />
                          <p className="text-xs sm:font-light font-normal text-gray-500 sm:text-gray-400">
                            {item?.emergency_contact}
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      href={`https://${item?.domain}.${
                        import.meta.env.VITE_DOMAIN
                      }.com/`}
                      className="bg-blue-700 ml-6 text-white px-4 rounded-full cursor-pointer py-1 sm:text-xs sm:font-semibold sm:px-3"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoDataPage />
          )}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="h-[80vh] flex  items-center justify-center">
              <img className="w-20 h-20" src={loading} alt="" />
            </div>
          ) : data?.length ? (
            <Map data={data} />
          ) : (
            <NoDataPage />
          )}
        </>
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useNoticeData } from "../hooks/useQueryData";
import { useState } from "react";
import useWindowsDimensions from "../hooks/customHooks/windowsDimesnions";
import NoDataPage from "../components/UI/NoDataPage";
import loading from "../assets/loading.webp";

export default function Notices() {
  const { data, isLoading } = useNoticeData();
  const [selectedData, setSelectedData] = useState();
  const navigate = useNavigate();
  const width = useWindowsDimensions();
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

  return (
    <>
      <Header title={"Notices & Announcement"} />
      <div className="w-full bg-white rounded-md  px-4 sm:px-0 py-4">
        {isLoading ? (
          <div className="h-[80vh] flex  items-center justify-center">
            <img className="w-20 h-20" src={loading} alt="" />
          </div>
        ) : data?.results?.length ? (
          <div className="w-full bg-white rounded-md  px-4 sm:px-0 py-4">
            <div className="flex md:flex-col justify-between gap-6">
              <div className="w-2/5 lg:w-1/2 md:w-full mt-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-blue-700">Recent Notices</p>
                  <p className="text-blue-700 font-semibold text-sm cursor-pointer">
                    See all
                  </p>
                </div>
                <div className="py-4 flex flex-col mt-2 gap-3 h-[76vh] md:h-full overflow-auto no-scrollbar px-2 sm:px-0">
                  {data?.results?.map((item, index) => {
                    const utcDate = new Date(item?.created_at);
                    const day = utcDate.getUTCDate();
                    const monthIndex = utcDate.getUTCMonth();
                    const monthName = monthNames[monthIndex];
                    return (
                      <div
                        key={item?.id}
                        onClick={() => {
                          width < 768
                            ? navigate("/noitce-details", {
                                state: {
                                  data: item,
                                },
                              })
                            : setSelectedData(item);
                        }}
                        className={`flex items-start gap-2 p-4 cursor-pointer rounded-lg ${
                          (selectedData?.idx === item?.idx ||
                            (!selectedData && index === 0)) &&
                          "bg-blue-50"
                        }`}
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
                  })}
                </div>
              </div>
              <div className="w-3/5 sm:hidden  py-2  no-scrollbar overflow-auto lg:w-1/2 md:w-full">
                <h2 className="font-semibold mb-2 text-blue-700">
                  Description Board
                </h2>
                <div className="bg-gray-50 rounded-md h-[72vh] p-4 md:hidden">
                  <h1 className="text-[#072D4B] font-semibold font-md mt-2">
                    {selectedData?.title ?? data?.results?.[0]?.title}
                  </h1>
                  <p className="text-gray-500 ">
                    {selectedData?.description ??
                      data?.results?.[0]?.description}
                  </p>
                  {selectedData?.uploaded_file && (
                    <a
                      href={selectedData?.uploaded_file}
                      target="__blank"
                      className="text-sm font-medium underline"
                    >
                      Click to View
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoDataPage />
        )}
      </div>
    </>
  );
}

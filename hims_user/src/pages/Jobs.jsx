import { useState } from "react";
import Header from "../components/Header";
import {
  useProgramsAttendanceData,
  useProgramsData,
} from "../hooks/useQueryData";
import { toast } from "react-toastify";
import { useApplyJobMutation } from "../hooks/useMutateData";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import useWindowsDimensions from "../hooks/customHooks/windowsDimesnions";
import { FaRegFileAlt } from "react-icons/fa";
import NoDataPage from "../components/UI/NoDataPage";
import loading from "../assets/loading.webp";
import JoinProgramModal from "../modals/JoinProgramModal";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

export default function Jobs() {
  const { data, isLoading } = useProgramsData();
  const [selectedJob, setSelectedJob] = useState();
  const [joinProgram, setJoinProgram] = useState();
  const { data: selectedData } = useProgramsAttendanceData({
    idx: selectedJob?.idx || data?.results?.[0]?.idx,
  });
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const applyJobMutation = useApplyJobMutation();
  const width = useWindowsDimensions();
  const fileData = selectedData?.results;

  const extractNameFromUrl = (url) => {
    const getUrlName = url?.split("/ck/");
    return getUrlName?.[1];
  };

  const handleApplyForJob = async () => {
    const postData = {
      job: selectedJob?.id || data?.results?.[0]?.id,
    };
    try {
      const result = await applyJobMutation.mutateAsync(["post", "", postData]);
      if (result?.status === 201) {
        setOpenConfirmModal(false);
        navigate("/programs");
        toast.success("Job applied Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.job?.[0]);
    }
  };

  const groupBySection = Object.groupBy(
    fileData ?? [],
    (item) => item?.section
  );
  return (
    <div>
      <Header title={"Programs"} />
      <div className="p-4 sm:p-0 bg-white rounded-md">
        <div className="text-end mb-4">
          <button
            onClick={() => setJoinProgram(true)}
            className="bg-blue-500 rounded text-white px-6  hover:text-blue-500 border hover:bg-white border-blue-500 py-1"
          >
            Join
          </button>
        </div>
        {isLoading ? (
          <div className="h-[80vh] flex  items-center justify-center">
            <img className="w-20 h-20" src={loading} alt="" />
          </div>
        ) : data?.results?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-1  gap-4 ">
            <div className="flex flex-col w-full gap-2 h-[84vh] md:h-full sm:pb-4 overflow-auto no-scrollbar">
              {data?.results?.map((item, index) => {
                return (
                  <div
                    key={item?.id}
                    onClick={() => {
                      width < 768
                        ? navigate("/job-details", {
                            state: {
                              data: item,
                              selectedData: selectedData,
                            },
                          })
                        : setSelectedJob(item);
                    }}
                    className={`flex items-start overflow-auto no-scrollbar shadow ${
                      selectedJob?.idx === item.idx ||
                      (index === 0 && !selectedJob)
                        ? "bg-blue-50 border sm:border sm:border-transparent sm:bg-white border-blue-500"
                        : "bg-white border border-transparent"
                    }  px-4 sm:px-3 cursor-pointer w-full py-4 rounded-md min-h-[120px]`}
                  >
                    <div className="flex flex-col gap-1 w-full h-full">
                      <h1
                        className={`text-md font-semibold  ${
                          selectedJob?.idx === item.idx ||
                          (index === 0 && !selectedJob)
                            ? "text-blue-600 "
                            : "text-gray-600"
                        }`}
                      >
                        {item?.title}
                      </h1>
                      <p className="text-gray-500 font-light text-xs">
                        <b>Start date : </b>
                        {item?.start_date?.slice(0, 10)}
                      </p>
                      <p className="text-gray-500 font-light text-xs">
                        <b>End date : </b>
                        {item?.end_date?.slice(0, 10)}
                      </p>
                      <p className="text-gray-500 font-light text-xs">
                        <b>Created by : </b>
                        {item?.created_by?.first_name === ""
                          ? "Super"
                          : item?.created_by?.first_name}
                        {item?.created_by?.last_name === ""
                          ? "Admin"
                          : item?.created_by?.last_name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-[84vh]  sm:h-full overflow-auto no-scrollbar sm:px-3 md:hidden shadow bg-white px-6 py-4 rounded-md">
              <p className="text-[#7D7D7D] font-semibold">About</p>
              <div className="bg-[#F2F2F2] p-4 rounded-md">
                <h1 className="text-[15px] font-semibold text-gray-500">
                  Topic Name
                </h1>
                <h2 className="text-sm mb-2">
                  {" "}
                  {selectedJob?.title || data?.results?.[0]?.title}
                </h2>
                <h1 className="text-[15px] font-semibold text-gray-500">
                  Start
                </h1>
                <h2 className="text-sm mb-2">
                  {" "}
                  {moment(selectedJob?.start_date).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  ) ||
                    moment(data?.results?.[0]?.start_date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                </h2>
                <h1 className="text-[15px] font-semibold text-gray-500">End</h1>
                <h2 className="text-sm">
                  {" "}
                  {moment(selectedJob?.end_date).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  ) ||
                    moment(data?.results?.[0]?.end_date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                </h2>
              </div>
              <p className="text-[#7D7D7D] font-semibold mt-4">Description</p>
              <div className="bg-[#F2F2F2] px-4 py-2 rounded-md">
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedJob?.description ||
                      data?.results?.[0]?.description,
                  }}
                ></div>
              </div>
              <p className="text-[#7D7D7D] font-semibold mt-4">Files</p>

              {fileData?.length ? (
                <div className="mt-2">
                  {groupBySection?.["Agenda"] && (
                    <p className="text-[#7D7D7D] font-semibold">Agenda</p>
                  )}
                  {groupBySection?.["Agenda"]?.map((item) => {
                    const fileName = extractNameFromUrl(item?.file);
                    return (
                      <a
                        href={item?.file}
                        target="_blank"
                        rel="noreferrer"
                        key={item?.id}
                        className="flex justify-between w-full mt-2 bg-[#F2F2F2] px-3 py-2 rounded gap-1 items-center text-gray-700"
                      >
                        <div className="flex text-gray-700 items-center gap-2">
                          <FaRegFileAlt size={18} className="text-gray-600" />
                          <p className="line-clamp-2 font-base  text-sm">
                            {fileName ?? "-"}
                          </p>
                        </div>
                        <LuDownload className=" min-w-[18px] " size={18} />
                      </a>
                    );
                  })}
                  {groupBySection?.["PowerPoint"] && (
                    <p className="text-[#7D7D7D] font-semibold mt-1">
                      PowerPoint
                    </p>
                  )}
                  {groupBySection?.["PowerPoint"]?.map((item) => {
                    const fileName = extractNameFromUrl(item?.file);
                    return (
                      <a
                        href={item?.file}
                        target="_blank"
                        key={item?.id}
                        className="flex justify-between w-full mt-2 bg-[#F2F2F2] px-3 py-2 rounded gap-1 items-center text-gray-700"
                        rel="noreferrer"
                      >
                        <div className="flex text-gray-700 items-center gap-2">
                          <FaRegFileAlt size={18} className="text-gray-600" />
                          <p className="line-clamp-2 font-base  text-sm">
                            {fileName ?? "-"}
                          </p>
                        </div>
                        <LuDownload className=" min-w-[18px] " size={18} />
                      </a>
                    );
                  })}
                  {groupBySection?.["Reference Document"] && (
                    <p className="text-[#7D7D7D] font-semibold mt-1">
                      Reference Document
                    </p>
                  )}
                  {groupBySection?.["Reference Document"]?.map((item) => {
                    const fileName = extractNameFromUrl(item?.file);
                    return (
                      <a
                        href={item?.file}
                        target="_blank"
                        key={item?.id}
                        className="flex justify-between w-full mt-2 bg-[#F2F2F2] px-3 py-2 rounded gap-1 items-center text-gray-700"
                        rel="noreferrer"
                      >
                        <div className="flex text-gray-700 items-center gap-2">
                          <FaRegFileAlt size={18} className="text-gray-600" />
                          <p className="line-clamp-2 font-base  text-sm">
                            {fileName ?? "-"}
                          </p>
                        </div>
                        <LuDownload className=" min-w-[18px] " size={18} />
                      </a>
                    );
                  })}
                  {groupBySection?.["Other"] && (
                    <p className="text-[#7D7D7D] font-semibold mt-1">Other</p>
                  )}
                  {groupBySection?.["Other"]?.map((item) => {
                    const fileName = extractNameFromUrl(item?.file);
                    return (
                      <a
                        href={item?.file}
                        target="_blank"
                        key={item?.id}
                        className="flex justify-between w-full mt-2 bg-[#F2F2F2] px-3 py-2 rounded gap-1 items-center text-gray-700"
                        rel="noreferrer"
                      >
                        <div className="flex text-gray-700 items-center gap-2">
                          <FaRegFileAlt size={18} className="text-gray-600" />
                          <p className="line-clamp-2 font-base  text-sm">
                            {fileName ?? "-"}
                          </p>
                        </div>
                        <LuDownload className=" min-w-[18px] " size={18} />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-400">
                  No files to show
                </p>
              )}
            </div>
          </div>
        ) : (
          <NoDataPage />
        )}
      </div>

      {openConfirmModal && (
        <ConfirmModal
          messeges={"Are you sure you want to apply for this job?"}
          setIsOpen={setOpenConfirmModal}
          handleChange={() => {
            handleApplyForJob();
          }}
          isOpen={openConfirmModal}
        />
      )}
      {joinProgram && (
        <JoinProgramModal setIsOpen={setJoinProgram} isOpen={joinProgram} />
      )}
    </div>
  );
}

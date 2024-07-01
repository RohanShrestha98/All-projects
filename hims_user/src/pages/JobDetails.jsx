import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import { useApplyJobMutation } from "../hooks/useMutateData";
import { FaRegFileAlt } from "react-icons/fa";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

export default function JobDetails() {
  const location = useLocation();
  const data = location?.state?.data;
  const selectedData = location?.state?.selectedData;
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const applyJobMutation = useApplyJobMutation();

  const fileData = selectedData?.results;
  const handleApplyForJob = async () => {
    const postData = {
      job: data?.id,
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

  const extractNameFromUrl = (url) => {
    const getUrlName = url?.split("/ck/");
    return getUrlName?.[1];
  };
  const groupBySection = Object.groupBy(
    fileData ?? [],
    (item) => item?.section
  );
  return (
    <div>
      <Header title={` ${data?.title}`} isBack={true} />
      <div className="h-full min-h-screen  px-4 py-4  sm:px-0 overflow-auto no-scrollbar bg-white">
        <p className="text-[#7D7D7D] font-semibold">About</p>
        <div className="bg-[#F2F2F2] p-4 rounded-md">
          <h1 className="text-[15px] font-semibold text-gray-500">
            Topic Name
          </h1>
          <h2 className="text-sm mb-2"> {data?.title}</h2>
          <h1 className="text-[15px] font-semibold text-gray-500">Start</h1>
          <h2 className="text-sm mb-2">
            {" "}
            {moment(data?.start_date).format("MMMM Do YYYY, h:mm:ss a")}
          </h2>
          <h1 className="text-[15px] font-semibold text-gray-500">End</h1>
          <h2 className="text-sm">
            {" "}
            {moment(data?.end_date).format("MMMM Do YYYY, h:mm:ss a")}
          </h2>
        </div>
        <p className="text-[#7D7D7D] font-semibold mt-4">Description</p>
        <div className="bg-[#F2F2F2] px-4 py-2 rounded-md">
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: data?.description,
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
                <div
                  onClick={() => {
                    window.location.href(item?.file);
                  }}
                  // href={item?.file}
                  // target="_blank"
                  // rel="noreferrer"
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
                </div>
              );
            })}
            {groupBySection?.["PowerPoint"] && (
              <p className="text-[#7D7D7D] font-semibold mt-1">PowerPoint</p>
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
                <div
                  onClick={() => {
                    window.location.href = item?.file;
                  }}
                  // href={item?.file}
                  // target="_blank"
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
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm font-medium text-gray-400">No files to show</p>
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
    </div>
  );
}

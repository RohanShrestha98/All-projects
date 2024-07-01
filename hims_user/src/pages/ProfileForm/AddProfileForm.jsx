import { FaCheck, FaRegUser } from "react-icons/fa";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdModelTraining } from "react-icons/md";
import { LiaCertificateSolid } from "react-icons/lia";

import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Document from "./Document";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Training from "./Training";
import Certificate from "./Certificate";
import { useAuthContext } from "../../context/authContext";
export default function AddProfileForm() {
  const profileForm = [
    {
      id: 1,
      name: "Personal Info",
      icon: <FaRegUser size={13} />,
    },
    {
      id: 2,
      name: "Document",
      icon: <HiOutlineClipboardDocument />,
    },
    {
      id: 3,
      name: "Work Experience",
      icon: <HiOutlineBuildingOffice2 />,
    },
    {
      id: 4,
      name: "Education",
      icon: <HiOutlineAcademicCap />,
    },
    {
      id: 5,
      name: "Trainings",
      icon: <MdModelTraining />,
    },
    {
      id: 6,
      name: "Certificates",
      icon: <LiaCertificateSolid />,
    },
  ];
  const { auth } = useAuthContext();
  const authUser = auth?.user;
  const [activeForm, setActiveForm] = useState();
  useEffect(() => {
    setActiveForm(
      !authUser?.has_filled_profile_info
        ? 1
        : !authUser?.has_filled_documents && authUser?.has_filled_profile_info
        ? 2
        : !authUser?.has_filled_work_experience &&
          authUser?.has_filled_documents &&
          authUser?.has_filled_profile_info
        ? 3
        : !authUser?.has_filled_education_info &&
          authUser?.has_filled_documents &&
          authUser?.has_filled_work_experience &&
          authUser?.has_filled_profile_info
        ? 4
        : !authUser?.has_filled_training &&
          authUser?.has_filled_documents &&
          authUser?.has_filled_work_experience &&
          authUser?.has_filled_profile_info &&
          authUser?.has_filled_education_info
        ? 5
        : 6
    );
  }, [authUser]);
  return (
    <div className="flex sm:flex-col  h-screen">
      <div className=" hidden sm:flex sm:justify-center ml-[5%] w-[90%] p-2 pl-20 overflow-auto mt-4">
        {profileForm?.map((item) => {
          return (
            <div
              key={item?.id}
              className="flex gap-2 cursor-pointer"
            >
              <div className="flex  items-center">
                <div
                  className={`border rounded-full  flex justify-center  items-center w-10 h-10 ${
                    activeForm === item?.id
                      ? "border-[#265CC0] text-[#265CC0]"
                      : activeForm > item?.id
                      ? "bg-[#265CC0] text-white border-[#265CC0]"
                      : "text-gray-500"
                  }`}
                >
                  {activeForm > item?.id ? <FaCheck size={13} /> : item?.icon}
                </div>
                {item?.id !== 6 && (
                  <div
                    className={`border border-t w-10 ${
                      activeForm > item?.id ? "border-[#265CC0]" : ""
                    }`}
                  ></div>
                )}
              </div>

              <div
                className={`mt-2 text-sm md:hidden  ${
                  activeForm === item?.id
                    ? "text-[#265CC0] font-medium "
                    : "text-gray-600 "
                }`}
              >
                {item?.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="min-w-[22%] md:min-w-[10%] sm:hidden border-r h-screen p-6 md:p-4">
        <div className="flex items-center gap-2  mb-8">
          <img src={logo} className="w-8 h-8 object-cover" alt="" />
          <h1 className="text-gray-900 md:hidden font-semibold text-base">
            Health Information Desk
          </h1>
        </div>
        <div className="flex flex-col">
          {profileForm?.map((item) => {
            return (
              <div
                key={item?.id}
                // onClick={() => setActiveForm(item?.id)}
                className="flex gap-2 cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`border rounded-full  flex justify-center  items-center w-9 h-9 ${
                      activeForm === item?.id
                        ? "border-[#265CC0] text-[#265CC0]"
                        : activeForm > item?.id
                        ? "bg-[#265CC0] text-white border-[#265CC0]"
                        : "text-gray-500"
                    }`}
                  >
                    {activeForm > item?.id ? <FaCheck size={12} /> : item?.icon}
                  </div>
                  {item?.id !== 6 && (
                    <div
                      className={`border border-l h-8 ${
                        activeForm > item?.id ? "border-[#265CC0]" : ""
                      }`}
                    ></div>
                  )}
                </div>
                <div
                  className={`mt-2 text-sm md:hidden  ${
                    activeForm === item?.id
                      ? "text-[#265CC0] font-medium "
                      : "text-gray-600 "
                  }`}
                >
                  {item?.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-[78%] md:w-[90%] sm:w-screen sm:h-full  h-screen px-8 py-6 md:px-6 sm:px-4 overflow-auto">
        <h1 className="text-[#265CC0] sm:mb-1 sm:text-gray-800 sm:text-2xl sm:text-center font-semibold text-xl">
          {activeForm === 1
            ? "Personal Info"
            : activeForm === 2
            ? "Document"
            : activeForm === 3
            ? "Work Experience"
            : activeForm === 4
            ? "Education"
            : activeForm === 5
            ? "Trainings"
            : "Certificate"}
        </h1>
        <p className="text-center hidden sm:flex text-gray-500 mb-2">
          Fill in the data for profile. It will take a couple of minutes.
        </p>
        {activeForm === 1 ? (
          <PersonalInfo setActiveForm={setActiveForm} activeForm={activeForm} />
        ) : activeForm === 2 ? (
          <Document setActiveForm={setActiveForm} activeForm={activeForm} />
        ) : activeForm === 3 ? (
          <WorkExperience
            setActiveForm={setActiveForm}
            activeForm={activeForm}
          />
        ) : activeForm === 4 ? (
          <Education setActiveForm={setActiveForm} activeForm={activeForm} />
        ) : activeForm === 5 ? (
          <Training setActiveForm={setActiveForm} activeForm={activeForm} />
        ) : (
          <Certificate setActiveForm={setActiveForm} activeForm={activeForm} />
        )}
      </div>
    </div>
  );
}

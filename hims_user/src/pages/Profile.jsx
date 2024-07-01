import Header from "../components/Header";
import profile from "../assets/profile.svg";
import { CgProfile } from "react-icons/cg";
import { AiOutlineEdit } from "react-icons/ai";
import { LuLogOut, LuPhone } from "react-icons/lu";
import ProfileInfoModal from "../modals/ProfileInfoModal";
import { useState } from "react";
import ContactInfoModal from "../modals/ContactInfoModal";
import {
  useCertificationData,
  useContactDetailData,
  useDocumentData,
  useEducationData,
  useExperienceData,
  useHospitalData,
  useProfileInfoData,
} from "../hooks/useQueryData";
import { MdVerified } from "react-icons/md";
import EducationModal from "../modals/EducationModal";
import ExperienceModal from "../modals/ExperienceModal";
import { FaRegTrashCan } from "react-icons/fa6";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import {
  useCertificateMutation,
  useContactDetailsMutation,
  useEducationInfoMutation,
  useExperienceInfoMutation,
  useProfileDocumentMutation,
} from "../hooks/useMutateData";
import { BsQrCodeScan } from "react-icons/bs";
import QRCodeModal from "../modals/QrCodeModal";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiGraduationCapLine } from "react-icons/ri";
import moment from "moment";
import loading from "../assets/loading.webp";
import Cookies from "universal-cookie";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import CertificateModal from "../modals/CertificateModal";
import DocumentModal from "../modals/DocumentModal";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useProfileInfoData();
  const { data: certificateData, isLoading: certificateLoading } =
    useCertificationData();
  const { data: contactDetailsData, isLoading: contactLoading } =
    useContactDetailData({ id: "" });
  const { data: educationData, isLoading: educationLoading } =
    useEducationData();
  const { data: documentData, isLoading: documentLoading } = useDocumentData();
  const { data: experienceData, isLoading: experienceLoading } =
    useExperienceData();
  const [openContact, setOpenContact] = useState(false);
  const [openQRCode, setOpenQRCode] = useState(false);
  const [openContactConfirmModal, setOpenContactConfirmModal] = useState(false);
  const [openEducationConfirmModal, setOpenEducationConfirmModal] =
    useState(false);
  const [openExperienceConfirmModal, setOpenExperienceConfirmModal] =
    useState(false);
  const [openCertificateConfirmModal, setOpenCertificateConfirmModal] =
    useState(false);
  const [openDocumentConfirmModal, setOpenDocumentConfirmModal] =
    useState(false);
  const [edit, setEdit] = useState(false);
  const [editEducation, setEditEducation] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editCertificate, setEditCertificate] = useState(false);
  const [editDocument, setEditDocument] = useState(false);
  const [editExperienceData, setEditExperienceData] = useState();
  const [editCertificateData, setEditCertificateData] = useState();
  const [editDocumentData, setEditDocumentData] = useState();
  const [editEducationData, setEditEducationData] = useState();
  const [educationModal, setEducationModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [certificateModal, setCertificateModal] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);
  const [editContactData, setEditContactData] = useState();
  const personalInfo = data?.results?.[0];
  const contactInfo = contactDetailsData?.results?.[0];
  const [isOpen, setIsOpen] = useState(false);
  const cookies = new Cookies({ path: "/" });
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();


  const currentDate = moment();
  const birthDateAD = moment(personalInfo?.details?.birth_date, "YYYY");
  const diff = currentDate.diff(birthDateAD, "years");

  const personalDetails = [
    {
      id: 9,
      name: "First Name",
      desc: personalInfo?.details?.user?.first_name,
    },
    {
      id: 10,
      name: "Last Name",
      desc: personalInfo?.details?.user?.last_name,
    },
    {
      id: 4,
      name: "Birth Date",
      desc: personalInfo?.details?.birth_date,
    },
    {
      id: 5,
      name: "Age",
      desc: diff,
    },
  ];
  const permanentDetails = [
    {
      id: 9,
      name: "Tole",
      desc: personalInfo?.permanent_address?.tole,
    },
    {
      id: 10,
      name: "Ward No",
      desc: personalInfo?.permanent_address?.ward_no,
    },
    {
      id: 4,
      name: "Municipality",
      desc: personalInfo?.permanent_address?.municipality,
    },
  ];
  const currentDetails = [
    {
      id: 9,
      name: "Tole",
      desc: personalInfo?.current_address?.tole,
    },
    {
      id: 10,
      name: "Ward No",
      desc: personalInfo?.current_address?.ward_no,
    },
    {
      id: 4,
      name: "Municipality",
      desc: personalInfo?.current_address?.municipality,
    },
  ];
  const contactDetails = [
    {
      id: 9,
      name: "Phone Number",
      desc: contactInfo?.phone_number,
    },
    {
      id: 10,
      name: "Email",
      desc: contactInfo?.email,
    }
  ];

  const contactDetail = contactDetailsData?.results;
  const education = educationData?.results;
  const experience = experienceData?.results;

  const contactDetailsMutation = useContactDetailsMutation();
  const educationMutation = useEducationInfoMutation();
  const experienceMutation = useExperienceInfoMutation();
  const certificateMutation = useCertificateMutation();
  const documentMutation = useProfileDocumentMutation();

  const { data: hospitalData } = useHospitalData();

  const handleContactDelete = async () => {
    try {
      const result = await contactDetailsMutation.mutateAsync([
        "delete",
        `${editContactData?.idx}/`,
        "",
      ]);
      if (result?.status === 204) {
        toast.success(`Contact deleted  successfully`);
        openContactConfirmModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleEducationDelete = async () => {
    try {
      const result = await educationMutation.mutateAsync([
        "delete",
        `${editEducationData?.idx}/`,
        "",
      ]);
      if (result?.status === 204) {
        toast.success(`Education deleted  successfully`);
        openEducationConfirmModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleExperienceDelete = async () => {
    try {
      const result = await experienceMutation.mutateAsync([
        "delete",
        `${editExperienceData?.idx}/`,
        "",
      ]);
      if (result?.status === 204) {
        toast.success(`Experience deleted  successfully`);
        setOpenExperienceConfirmModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleCertificateDelete = async () => {
    try {
      const result = await certificateMutation.mutateAsync([
        "delete",
        `${editCertificateData?.idx}/`,
        "",
      ]);
      if (result?.status === 204) {
        toast.success(`Certificate deleted  successfully`);
        setOpenCertificateConfirmModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleDocumentDelete = async () => {
    try {
      const result = await documentMutation.mutateAsync([
        "delete",
        `${editDocumentData?.idx}/`,
        "",
      ]);
      if (result?.status === 204) {
        toast.success(`Document deleted  successfully`);
        setOpenDocumentConfirmModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <Header title={"Profile"} />
      <div className="w-full bg-white rounded-md flex md:flex-col justify-between gap-2 px-4 sm:px-0 py-6">
        <div className="w-1/3 lg:w-1/2  md:w-full flex flex-col items-center mt-2 px-4 sm:px-0 border-r md:border-none border-gray-200">
          <img
            src={personalInfo?.details?.user?.avatar_url ?? profile}
            className="w-32 h-32 object-cover rounded-full mb-2"
            alt=""
          />
          <div
            onClick={() => setOpenQRCode(true)}
            className="bg-white -mt-10 ml-20 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <BsQrCodeScan size={24} className="text-blue-700 cursor-pointer" />
          </div>
          <h1 className="text-xl font-bold text-gray-950  ">
            {personalInfo?.details?.user?.first_name}
            <span className="ml-2">
              {personalInfo?.details?.user?.last_name}
            </span>
          </h1>
          <p className="text-gray-500 text-sm -mt-1">MMS Doctor</p>
          <div className="flex items-center justify-between w-full py-3 border-b-[2px] border-gray-100">
            <div className="flex gap-1 items-center">
              <CgProfile className="text-blue-600" size={20} />
              <p className="font-semibold text-base text-gray-700">
                Personal info
              </p>
            </div>
            <AiOutlineEdit
              onClick={() => {
                setOpen(true);
              }}
              className="text-blue-600 cursor-pointer"
              size={20}
            />
          </div>
          <div className="w-full flex flex-col gap-2 py-4">
            {isLoading ? (
              <div className="h-[300px] flex  items-center justify-center">
                <img className="w-12 h-12" src={loading} alt="" />
              </div>
            ) : (
              personalDetails?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between"
                  >
                    <h1 className="font-semibold text-gray-800 text-sm">
                      {item?.name}
                    </h1>
                    <p className="text-xs text-gray-500">{item?.desc}</p>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b-[2px] border-gray-100">
            <p className="font-semibold text-base text-gray-700">
              Permanent Address
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 py-4">
            {isLoading ? (
              <div className="h-[300px] flex  items-center justify-center">
                <img className="w-12 h-12" src={loading} alt="" />
              </div>
            ) : (
              permanentDetails?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between"
                  >
                    <h1 className="font-semibold text-gray-800 text-sm">
                      {item?.name}
                    </h1>
                    <p className="text-xs text-gray-500">{item?.desc}</p>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b-[2px] border-gray-100">
            <p className="font-semibold text-base text-gray-700">
              Current Address
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 py-4">
            {contactLoading ? (
              <div className="h-[300px] flex  items-center justify-center">
                <img className="w-12 h-12" src={loading} alt="" />
              </div>
            ) : (
              contactDetails?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between"
                  >
                    <h1 className="font-semibold text-gray-800 text-sm">
                      {item?.name}
                    </h1>
                    <p className="text-xs text-gray-500">{item?.desc}</p>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b-[2px] border-gray-100">
            <p className="font-semibold text-base text-gray-700">
              Contact Details
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 py-4">
            {contactLoading ? (
              <div className="h-[300px] flex  items-center justify-center">
                <img className="w-12 h-12" src={loading} alt="" />
              </div>
            ) : (
              currentDetails?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between"
                  >
                    <h1 className="font-semibold text-gray-800 text-sm">
                      {item?.name}
                    </h1>
                    <p className="text-xs text-gray-500">{item?.desc}</p>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex items-center justify-between w-full py-2 border-b-[2px] border-gray-100">
            <p className="font-semibold text-base text-gray-700">
              User Type
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 py-4">
            {contactLoading ? (
              <div className="h-[300px] flex  items-center justify-center">
                <img className="w-12 h-12" src={loading} alt="" />
              </div>
            ) : (
              <div
                className="flex items-center justify-between"
              >
                <h1 className="font-semibold text-gray-800 text-sm">
                  User
                </h1>
                <p className="text-xs text-gray-500">{personalInfo?.user_type ?? "-"}</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-2/3 lg:w-1/2 px-4 lg:px-2 md:px-0 md:w-full">
          <h1 className="font-medium text-gray-500 text-lg pb-2 border-b border-gray-200">
            Profile Details
          </h1>
          <div className="h-full overflow-auto no-scrollbar pb-4">

            <div className=" rounded-md px-4 sm:px-0 py-2 mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <RiGraduationCapLine className="text-[#265CC0]" />
                  <p className="text-[#150B3D] text-base font-bold">
                    Education
                  </p>
                </div>
                <p
                  onClick={() => {
                    setEditEducation(false);
                    setEditEducationData();
                    setEducationModal(true);
                  }}
                  className="text-xl flex justify-center items-center font-semibold hover:opacity-80 w-8 h-8 text-center text-blue-800 cursor-pointer rounded-full bg-gray-200"
                >
                  +
                </p>
              </div>
              {educationLoading ? (
                <div className="h-[100px] flex  items-center justify-center">
                  <img className="w-12 h-12" src={loading} alt="" />
                </div>
              ) : (
                education?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex shadow px-3 mb-3 mt-2 items-start rounded-md justify-between py-3"
                    >
                      <div>
                        <div className="flex gap-2">
                          <h2 className="text-xs font-medium">Institute name:</h2>
                          <h1 className="font-bold text-gray-800 mb-1 text-xs">
                            {item?.institute_name}
                          </h1>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Field of Study :</h2>
                          <p className="text-xs text-gray-500">
                            {item?.field_of_study}
                          </p>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Level of education :</h2>
                          <p className="text-xs text-gray-500">
                            {item?.level_of_education}{" "}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Country :</h2>
                          <p className="text-xs text-gray-500">
                            {item?.country}{" "}
                          </p>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Percentage :</h2>
                          <span className="text-xs text-gray-500">({item?.percentage})</span>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Start date :</h2>
                          <span className="text-xs text-gray-500">({item?.start_date})</span>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">End date :</h2>
                          <span className="text-xs text-gray-500">({item?.end_date})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineEdit
                          onClick={() => {
                            setEditEducation(true);
                            setEditEducationData(item);
                            setEducationModal(true);
                          }}
                          className="text-blue-600 cursor-pointer"
                          size={20}
                        />
                        <FaRegTrashCan
                          onClick={() => {
                            setOpenEducationConfirmModal(true);
                            setEditEducationData(item);
                          }}
                          className="text-red-600 cursor-pointer"
                          size={16}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="rounded-md px-4 py-2 mt-6 sm:px-0">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <HiOutlineShoppingBag className="text-[#265CC0]" />
                  <p className="text-[#150B3D] text-base font-bold">
                    Work Experiences
                  </p>
                </div>
                <p
                  onClick={() => {
                    setEditExperienceData();
                    setEditExperience(false);
                    setExperienceModal(true);
                  }}
                  className="text-xl flex justify-center items-center font-semibold hover:opacity-80 w-8 h-8 text-center text-blue-800 cursor-pointer rounded-full bg-gray-200"
                >
                  +
                </p>
              </div>
              {experienceLoading ? (
                <div className="h-[100px] flex  items-center justify-center">
                  <img className="w-12 h-12" src={loading} alt="" />
                </div>
              ) : (
                experience?.map((item) => {
                  const hospitalLabel = hospitalData?.filter(
                    (hos) => hos.id === item.hospital
                  );
                  const startDate = moment(item?.start_date);
                  const endDate = moment(item?.end_date);
                  const formatStartDate = moment(item?.start_date).format(
                    "MMM Do YY"
                  );
                  const formatEndDate = moment(item?.end_date).format(
                    "MMM Do YY"
                  );
                  const currentDate = moment();
                  return (
                    <div
                      key={item?.id}
                      className="flex shadow px-3 mb-3 mt-2 rounded-md  justify-between py-3"
                    >
                      <div>
                        <h1 className="font-bold flex items-center gap-2 text-gray-800  text-md">
                          {hospitalLabel?.[0]?.title} <span>
                            {item?.is_verified && (
                              <MdVerified className="text-green-600" />
                            )}
                          </span>
                        </h1>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Position :</h2>
                          <span className="text-xs text-gray-500">{item?.position??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Location :</h2>
                          <span className="text-xs text-gray-500">{item?.location??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Date of Enrollment :</h2>
                          <span className="text-xs text-gray-500">{item?.start_date??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Date of Discussion Enrollment :</h2>
                          <span className="text-xs text-gray-500">{item?.date_of_decision??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Date of Attendance :</h2>
                          <span className="text-xs text-gray-500">{item?.date_of_attendance??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Category :</h2>
                          <span className="text-xs text-gray-500">{item?.category??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Sub-Category :</h2>
                          <span className="text-xs text-gray-500">{item?.subcategory??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Hospital :</h2>
                          <span className="text-xs text-gray-500">{item?.hospital??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Level :</h2>
                          <span className="text-xs text-gray-500">{item?.level??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Position :</h2>
                          <span className="text-xs text-gray-500">{item?.position??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Country :</h2>
                          <span className="text-xs text-gray-500">{item?.country??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Responsibility :</h2>
                          <span className="text-xs text-gray-500">{item?.responsibility??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Sub-Responsibility :</h2>
                          <span className="text-xs text-gray-500">{item?.subresponsibility??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Employment type :</h2>
                          <span className="text-xs text-gray-500">{item?.employment_type??"-"}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Date :</h2>
                          <p className="text-xs text-gray-500 flex items-center  gap-1">
                            <p>{formatStartDate??"-"}</p>
                            <p>
                              {item?.currently_working || !item?.end_date
                                ? "Present"
                                : formatEndDate}
                            </p>
                            (
                            {item?.currently_working || !item?.end_date
                              ? currentDate.diff(startDate, "days")
                              : endDate.diff(startDate, "days")}{" "}
                            days)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineEdit
                          onClick={() => {
                            setEditExperienceData(item);
                            setEditExperience(true);
                            setExperienceModal(true);
                          }}
                          className="text-blue-600 cursor-pointer"
                          size={22}
                        />
                        <FaRegTrashCan
                          onClick={() => {
                            setOpenExperienceConfirmModal(true);
                            setEditExperienceData(item);
                          }}
                          className="text-red-600 cursor-pointer"
                          size={18}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="rounded-md px-4 py-2 mt-6 sm:px-0">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <HiOutlineShoppingBag className="text-[#265CC0]" />
                  <p className="text-[#150B3D] text-base font-bold">
                    Certification
                  </p>
                </div>
                <p
                  onClick={() => {
                    setEditCertificateData();
                    setEditCertificate(false);
                    setCertificateModal(true);
                  }}
                  className="text-xl flex justify-center items-center font-semibold hover:opacity-80 w-8 h-8 text-center text-blue-800 cursor-pointer rounded-full bg-gray-200"
                >
                  +
                </p>
              </div>
              {certificateLoading ? (
                <div className="h-[100px] flex  items-center justify-center">
                  <img className="w-12 h-12" src={loading} alt="" />
                </div>
              ) : (
                certificateData?.results?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex shadow px-3 mb-3 mt-2 rounded-md  justify-between py-3"
                    >
                      <div>
                        <h1 className="font-bold flex items-center gap-2 text-gray-800  text-md">
                          {item?.title}
                        </h1>

                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Organization Name :</h2>
                          <span className="text-xs text-gray-500">{item?.organization}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Certification Number :</h2>
                          <span className="text-xs text-gray-500">{item?.number}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Certification Date :</h2>
                          <span className="text-xs text-gray-500">{item?.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineEdit
                          onClick={() => {
                            setEditCertificateData(item);
                            setEditCertificate(true);
                            setCertificateModal(true);
                          }}
                          className="text-blue-600 cursor-pointer"
                          size={22}
                        />
                        <FaRegTrashCan
                          onClick={() => {
                            setOpenCertificateConfirmModal(true);
                            setEditCertificateData(item);
                          }}
                          className="text-red-600 cursor-pointer"
                          size={18}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="rounded-md px-4 py-2 mt-6 sm:px-0">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <HiOutlineShoppingBag className="text-[#265CC0]" />
                  <p className="text-[#150B3D] text-base font-bold">
                    Documents
                  </p>
                </div>
                <p
                  onClick={() => {
                    setEditDocumentData();
                    setEditDocument(false);
                    setDocumentModal(true);
                  }}
                  className="text-xl flex justify-center items-center font-semibold hover:opacity-80 w-8 h-8 text-center text-blue-800 cursor-pointer rounded-full bg-gray-200"
                >
                  +
                </p>
              </div>
              {documentLoading ? (
                <div className="h-[100px] flex  items-center justify-center">
                  <img className="w-12 h-12" src={loading} alt="" />
                </div>
              ) : (
                documentData?.results?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex shadow px-3 mb-3 mt-2 rounded-md  justify-between py-3"
                    >
                      <div>
                        <h1 className="font-bold flex items-center gap-2 text-gray-800  text-md">
                          Citizenship
                        </h1>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Citizenship Number :</h2>
                          <span className="text-xs text-gray-500">{item?.citizenship?.[0]?.citizenship_number}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Organization Type :</h2>
                          <span className="text-xs text-gray-500">{item?.citizenship?.[0]?.citizenship_type}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">Issued Date :</h2>
                          <span className="text-xs text-gray-500">{item?.citizenship?.[0]?.issue_date}</span>
                        </div>
                        <h1 className="font-bold flex items-center gap-2 mt-4 text-gray-800  text-md">
                          Council Registration
                        </h1>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">License Type :</h2>
                          <span className="text-xs text-gray-500">{item?.council_registration?.[0]?.license_type}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">License Number :</h2>
                          <span className="text-xs text-gray-500">{item?.council_registration?.[0]?.license_number}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <h2 className="text-xs font-medium">PIS Number :</h2>
                          <span className="text-xs text-gray-500">{item?.council_registration?.[0]?.pis_number}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineEdit
                          onClick={() => {
                            setEditDocumentData(item);
                            setEditDocument(true);
                            setDocumentModal(true);
                          }}
                          className="text-blue-600 cursor-pointer"
                          size={22}
                        />
                        <FaRegTrashCan
                          onClick={() => {
                            setOpenDocumentConfirmModal(true);
                            setEditDocumentData(item);
                          }}
                          className="text-red-600 cursor-pointer"
                          size={18}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div
              className="rounded-md cursor-pointer p-4 mt-6 hidden shadow-md  items-center sm:flex gap-2 text-red-600"
              onClick={() => setIsOpen(true)}
            >
              <LuLogOut size={20} />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <ConfirmModal
          messeges={"Are you sure you want to logout?"}
          setIsOpen={setIsOpen}
          handleChange={() => {
            setAuth({});
            cookies.remove("refreshToken");
            cookies.remove("userDetails");
            toast.success("Logout success");
            navigate("/");
          }}
          isOpen={isOpen}
        />
      )}
      {open && (
        <ProfileInfoModal
          editData={personalInfo}
          isOpen={open}
          setIsOpen={setOpen}
        />
      )}
      {openContact && (
        <ContactInfoModal
          edit={edit}
          editContact={editContactData}
          isOpen={openContact}
          setIsOpen={setOpenContact}
        />
      )}
      {educationModal && (
        <EducationModal
          edit={editEducation}
          editEducationData={editEducationData}
          isOpen={educationModal}
          setIsOpen={setEducationModal}
        />
      )}
      {experienceModal && (
        <ExperienceModal
          edit={editExperience}
          editExperienceData={editExperienceData}
          isOpen={experienceModal}
          setIsOpen={setExperienceModal}
        />
      )}
      {certificateModal && (
        <CertificateModal
          edit={editCertificate}
          editData={editCertificateData}
          isOpen={certificateModal}
          setIsOpen={setCertificateModal}
        />
      )}
      {documentModal && (
        <DocumentModal
          edit={editDocument}
          editData={editDocumentData}
          isOpen={documentModal}
          setIsOpen={setDocumentModal}
        />
      )}
      {openContactConfirmModal && (
        <ConfirmModal
          isOpen={openContactConfirmModal}
          setIsOpen={setOpenContactConfirmModal}
          messeges={"Are you sure you wanna delete this contact"}
          handleChange={handleContactDelete}
        />
      )}
      {openEducationConfirmModal && (
        <ConfirmModal
          isOpen={openEducationConfirmModal}
          setIsOpen={setOpenEducationConfirmModal}
          messeges={"Are you sure you wanna delete this education"}
          handleChange={handleEducationDelete}
        />
      )}
      {openExperienceConfirmModal && (
        <ConfirmModal
          isOpen={openExperienceConfirmModal}
          setIsOpen={setOpenExperienceConfirmModal}
          messeges={"Are you sure you wanna delete this experience"}
          handleChange={handleExperienceDelete}
        />
      )}
      {openCertificateConfirmModal && (
        <ConfirmModal
          isOpen={openCertificateConfirmModal}
          setIsOpen={setOpenCertificateConfirmModal}
          messeges={"Are you sure you wanna delete this certificate"}
          handleChange={handleCertificateDelete}
        />
      )}
      {openDocumentConfirmModal && (
        <ConfirmModal
          isOpen={openDocumentConfirmModal}
          setIsOpen={setOpenDocumentConfirmModal}
          messeges={"Are you sure you wanna delete this document"}
          handleChange={handleDocumentDelete}
        />
      )}
      {openQRCode && (
        <QRCodeModal
          isOpen={openQRCode}
          setIsOpen={setOpenQRCode}
          qrCode={personalInfo?.details?.qr_code}
        />
      )}
    </div>
  );
}

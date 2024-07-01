import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerTitle,
} from "react-shimmer-effects";
import profileImg from "../../../assets/images/profile2.png";
import Stepper from "./stepper";
import Student from "./student";
import Address from "./address";
import Identification from "./identification";
import Family from "./family";
import EducationHistory from "./educationHistory";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import { message } from "antd";
import { BiArrowBack } from "react-icons/bi";
import { useFileUploadMutation } from "../../../hooks/useMutateData";
import toast from "../../../utils/toast";
import Uploader from "../../../components/UI/uploader";
// import { LoadingSpinnerSvg } from "../../../assets/icons/allSvg";

const EditProfile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPreviousClick, setIsPreviousClick] = useState(false);
  const [resErrors, setResErrors] = useState({});
  const location = useLocation();
  const isLoading = location?.state?.isLoading;
  const isError = location?.state?.isError;
  const fileUploadMUtation = useFileUploadMutation();
  const [profileUpload, setProfileUpload] = useState(false);
  const [profileImage, setProfileImage] = useState();

  if (isError) {
    return message.error("Error in fetching data");
  }

  const dataList = useMemo(
    () => location?.state?.data && location?.state?.data,
    [location?.state?.data],
  );


  const [data, setData] = useState({
    student: {
      id: dataList && dataList?.student?.id,
      birthplace: dataList && dataList?.student?.birthplace,
      cellular: dataList && dataList?.student?.cellular,
      dob: dataList && dataList?.student?.dob,
      email: dataList && dataList?.student?.email,
      homePhone: dataList && dataList?.student?.homePhone,
      firstName: dataList && dataList?.student?.firstName,
      surname: dataList && dataList?.student?.surname,
      gender: dataList && dataList?.student?.gender?.toLowerCase(),
      username: dataList && dataList?.student?.username,
      minEducId: dataList && dataList?.student?.minEducId,
      role: dataList && dataList?.student?.role?.id,
      file: profileImage,
      isActive: dataList && dataList?.student?.isActive,
    },

    grade: dataList && {
      value: dataList?.grade?.id,
      label: dataList?.grade?.name,
    },

    address: {
      address1: dataList && dataList?.address?.address1,
      address2: dataList && dataList?.address?.address2,
      country: dataList && dataList?.address?.country,
      department: dataList && dataList?.address?.department,
      municipality: dataList && dataList?.address?.municipality,
      village: dataList && dataList?.address?.village,
    },
    identification: {
      birthCertificate: dataList && dataList?.identification?.birthCertificate,
      document: dataList && dataList?.identification?.document,
      documentId: dataList && dataList?.identification?.documentId,
    },
    family: {
      additionalPhone: dataList && dataList?.family?.additionalPhone,
      fathersName: dataList && dataList?.family?.fathersName,
      fathersPhone: dataList && dataList?.family?.fathersPhone,
      homeAddress: dataList && dataList?.family?.homeAddress,
      manager: dataList && dataList?.family?.manager,
      mothersName: dataList && dataList?.family?.mothersName,
      mothersPhone: dataList && dataList?.family?.mothersPhone,
      personInCharge: dataList && dataList?.family?.personInCharge,
    },
    educationHistory: {
      certificate: dataList && dataList?.educationHistory?.certificate,
      lastEstablishment:
        dataList && dataList?.educationHistory?.lastEstablishment,
      lastGrade: dataList && dataList?.educationHistory?.lastGrade,
    },
  });

  const handleProfileUpload = async e => {
    const file = e.target.files[0];
    setProfileUpload(true);
    try {
      const response = await fileUploadMUtation.mutateAsync([
        "post",
        ``,
        {
          file: file,
        },
      ]);
      setProfileImage(response?.data);
      setData({ ...data, student: { ...data?.student, file: response?.data } });
      setProfileUpload(false);
    } catch (err) {
      toast.error(err?.toString());
      setProfileUpload(false);
    }
  };
  const width = useWindowsDimensions();
  const navigate = useNavigate();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);

  return (
    <>
      <div className="flex items-center my-10 ml-0 md:pl-6 sm:my-0 sm:pt-[28px] sm:bg-white sm:pb-3 sm:shadow-md sm:fixed sm:top-0 sm:w-full sm:z-[1000]">
        <button
          className=" flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={16} />
        </button>
        <div className="ml-4 font-bold text-2xl sm:text-xl">
          {location?.state?.edit ? "Edit Profile" : "Add Student"}
        </div>
      </div>
      <div className="sm:mt-20 ml-4 sm:p-6 flex md:flex-col md:ml-0 md:gap-4">
        <div className="w-[20%] md:w-[100%]">
          <div className="flex justify-center">
            {isLoading ? (
              <ShimmerCircularImage size={150} />
            ) : (
              <img
                src={dataList?.student?.file?.url??profileImage?.url ?? profileImg}
                alt="img"
                className="mb-[14px] min-w-20  min-h-20 rounded-full  object-cover"
              />
            )}
          </div>
          <div className="flex justify-center items-center">
            {isLoading ? (
              <ShimmerText line={1} />
            ) : (
              <>
                <Uploader
                  accept="image/*"
                  id="profile"
                  // name="identification.document"
                  isUploading={profileUpload}
                  file={profileImage}
                  className={
                    "font-medium text-white w-28 h-10 items-center justify-center flex text-[15px] bg-cyan rounded-[100px] cursor-pointer"
                  }
                  // handleRemoveFile={handleRemoveDocument}
                  handleChange={handleProfileUpload}
                />
                {/* <div
                  className="mb-10 font-medium text-[15px] w-[130px]
                h-[29px]
                text-cyan border flex justify-center items-center
                border-cyan rounded-[100px] cursor-pointer"
                >
                  {location?.state?.edit ? "Change Photo" : "Upload Photo"}
                </div> */}
              </>
            )}
          </div>
          {/* <div className="flex justify-center items-center md:hidden">
            {isLoading ? (
              <ShimmerText line={1} />
            ) : (
              location?.state?.edit && (
                <div
                  className="mb-10 font-medium text-[15px] w-[176px] h-[42px]
                text-white gap-[10px] flex justify-center items-center
                bg-cyan rounded-[100px] cursor-pointer"
                >
                  Update Profile
                </div>
              )
            )}
          </div> */}
        </div>
        <div className="ml-20 md:ml-10 w-[60%] md:w-[80%] sm:ml-0 sm:w-full">
          {isLoading ? (
            <ShimmerTitle line={1} />
          ) : (
            <Stepper
              isLoading={isLoading}
              activeStep={activeStep}
              resErrors={resErrors}
            />
          )}
          <p className="text-cyan text-xs font-semibold  rounded-sm inline-block  italic">
            Note:Fields with asterisk (*) are required field
          </p>
          {activeStep === 1 ? (
            <Student
              add={location?.state?.add}
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setData={setData}
              nextStep={() => setActiveStep(2)}
            />
          ) : activeStep === 2 ? (
            <Address
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(1)}
              nextStep={() => setActiveStep(3)}
            />
          ) : activeStep === 3 ? (
            <Identification
              data={data}
              isLoading={isLoading}
              resErrors={resErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(2)}
              nextStep={() => setActiveStep(4)}
            />
          ) : activeStep === 4 ? (
            <Family
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(3)}
              nextStep={() => setActiveStep(5)}
            />
          ) : (
            <EducationHistory
              add={location?.state?.add}
              edit={location?.state?.edit}
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setResErrors={setResErrors}
              setData={setData}
              profileImage={profileImage}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(4)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;

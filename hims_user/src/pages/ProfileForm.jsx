import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { RiBuildingLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { RiBuildingFill } from "react-icons/ri";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import {
  useEducationInfoMutation,
  useExperienceInfoMutation,
  useProfileInfoMutation,
} from "../hooks/useMutateData";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";
import { toast } from "react-toastify";
import { useFormStatusData, useHospitalData } from "../hooks/useQueryData";
import { RiShieldUserLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { LuFlag } from "react-icons/lu";

export default function ProfileForm() {
  const [error, setError] = useState();
  const { data: formStatusData } = useFormStatusData();
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActive(
      !formStatusData?.has_filled_profile_info
        ? "profile"
        : !formStatusData?.has_filled_education_info &&
          formStatusData?.has_filled_profile_info
        ? "education"
        : !formStatusData?.has_filled_work_experience &&
          formStatusData?.has_filled_education_info &&
          formStatusData?.has_filled_profile_info &&
          "experiences"
    );
  }, [formStatusData]);

  const profileInfoMutation = useProfileInfoMutation();
  const educationInfoMutation = useEducationInfoMutation();
  const experienceInfoMutation = useExperienceInfoMutation();
  const [employmentType, setEmploymentType] = useState();
  const [hospitalList, setHospitalList] = useState();
  const [materialStatus, setMaterialStatus] = useState();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    mode: "onChange",
  });
  const watchCurrentlyWorking = watch("currently_working");

  const { data } = useHospitalData();
  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    const postData = {
      currently_working: data?.currently_working,
      employment_type: data?.employment_type,
      hospital: data?.hospital,
      location: data?.location,
      position: data?.position,
      start_date: data?.start_date,
    };
    try {
      const result =
        active === "profile"
          ? await profileInfoMutation.mutateAsync(["post", "", data])
          : active === "education"
          ? await educationInfoMutation.mutateAsync(["post", "", data])
          : await experienceInfoMutation.mutateAsync([
              "post",
              "",
              watchCurrentlyWorking === true ? postData : data,
            ]);
      if (result?.status === 201) {
        setIsLoading(false);
        (!formStatusData?.has_filled_work_experience ||
          !formStatusData?.has_filled_education_info ||
          !formStatusData?.has_filled_profile_info) &&
        active === "profile"
          ? (setActive("education"),
            setError(),
            toast.success("Profile added Successfully"))
          : active === "education"
          ? (setActive("experiences"),
            setError(),
            toast.success("Experiences added Successfully"))
          : (navigate("/"), toast.success("Experriences added Successfully"));
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data);
      toast.error(error?.response?.data?.[0]);
    }
  };

  const hospitalOption = data?.map((item) => {
    return {
      value: item?.id,
      label: item?.title,
    };
  });

  const materialOption = [
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Divorced",
      label: "Divorced",
    },
    {
      value: "Widowed",
      label: "Widowed",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  const workExperience = [
    {
      value: "Full-Time",
      label: "Full-Time",
    },
    {
      value: "Part-Time",
      label: "Part-Time",
    },
    {
      value: "Contract",
      label: "Contract",
    },
    {
      value: "Temporary",
      label: "Temporary",
    },
    {
      value: "Travel Nurse",
      label: "Travel Nurse",
    },
    {
      value: "Internship",
      label: "Internship",
    },
    {
      value: "Volunteer",
      label: "Volunteer",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  const handleEmploymentTypeChange = (data) => {
    setEmploymentType(data);
    setValue("employment_type", data?.value);
  };
  const handleHospitalChange = (data) => {
    setHospitalList(data);
    setValue("hospital", data?.value);
  };
  const handleMaterialStatusChange = (data) => {
    setMaterialStatus(data);
    setValue("marital_status", data?.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-16 mb-6">
        <div
          className={`w-12 cursor-pointer h-12 flex justify-center items-center rounded-full ${
            active === "profile"
              ? "bg-[#265CC0] text-white "
              : "bg-gray-50 text-gray-500"
          }  text-center`}
        >
          {active === "profile" ? <FaUser /> : <FaRegUser />}
        </div>
        <div className="border-b w-14"></div>
        <div
          className={`w-12 cursor-pointer h-12 flex justify-center items-center rounded-full ${
            active === "education"
              ? "bg-[#265CC0] text-white "
              : "bg-gray-50 text-gray-500"
          }  text-center`}
        >
          {active === "education" ? (
            <HiAcademicCap />
          ) : (
            <HiOutlineAcademicCap />
          )}
        </div>
        <div className="border-b w-14"></div>
        <div
          className={`w-12 cursor-pointer h-12 flex justify-center items-center rounded-full ${
            active === "experiences"
              ? "bg-[#265CC0] text-white "
              : "bg-gray-50 text-gray-500"
          }  text-center`}
        >
          {active === "experiences" ? <RiBuildingFill /> : <RiBuildingLine />}
        </div>
      </div>
      <h1 className="text-center text-[#242731] font-bold text-2xl">
        {active === "profile"
          ? "Profile info"
          : active === "education"
          ? "Education info"
          : "Experience info"}
      </h1>
      <p className="text-center text-sm font-normal mt-1 text-gray-400">
        Fill in the data for profile. It will take a couple of minutes.
      </p>
      <div className="flex justify-center mt-4">
        {active === "profile" ? (
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className=" flex flex-col gap-2 w-[400px] h-96 px-4"
          >
            <InputField
              register={register}
              isIcon={true}
              iconName="user"
              registerName="insurance_number"
              type="number"
              required={true}
              icon={<RiShieldUserLine />}
              placeholder="Insurance Number"
            />
            {error?.insurance_number && (
              <p className="text-red-600 text-xs">
                {error?.insurance_number?.[0]}
              </p>
            )}
            <InputField
              register={register}
              isIcon={true}
              required={true}
              icon={<IoLocationOutline />}
              iconName="user"
              registerName="location"
              type="text"
              placeholder="Location"
            />
            {error?.location && (
              <p className="text-red-600 text-xs">{error?.location?.[0]}</p>
            )}
            <InputField
              register={register}
              isIcon={true}
              required={true}
              registerName="experience"
              type="number"
              iconName="user"
              icon={<HiOutlineShoppingBag />}
              placeholder="Experience"
            />
            {error?.experience && (
              <p className="text-red-600 text-xs">{error?.experience?.[0]}</p>
            )}
            <InputField
              register={register}
              isIcon={true}
              registerName="nationality"
              type="text"
              icon={<CiGlobe />}
              required={true}
              iconName="phone"
              placeholder="Nationality"
            />
            {error?.nationality && (
              <p className="text-red-600 text-xs ">{error?.nationality?.[0]}</p>
            )}
            <InputField
              className={"mt-1"}
              isIcon={true}
              register={register}
              registerName="country"
              type="text"
              iconName="user"
              icon={<LuFlag />}
              required={true}
              placeholder="Country"
            />
            {error?.country && (
              <p className="text-red-600 text-xs">{error?.country?.[0]}</p>
            )}
            <InputField
              className={"mt-1"}
              isIcon={true}
              register={register}
              registerName="birth_date"
              type="date"
              required={true}
              iconName="user"
              max={new Date()}
              placeholder="Birth Of Date"
            />
            {error?.birth_date && (
              <p className="text-red-600 text-xs ">{error?.birth_date?.[0]}</p>
            )}
            <CustomSelect
              options={materialOption}
              register={register}
              value={materialStatus}
              required={true}
              name={"marital_status"}
              placeholder={"Select matrial status"}
              handleChange={(data) => handleMaterialStatusChange(data)}
            />
            {error?.marital_status && (
              <p className="text-red-600 text-xs ">
                {error?.marital_status?.[0]}
              </p>
            )}
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              handleButtonClick={() => {}}
              buttonName={"Add profile info"}
              className={"rounded-lg hover:opacity-80 "}
            />{" "}
          </form>
        ) : active === "education" ? (
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className=" flex flex-col gap-2 w-[400px] h-96 px-4"
          >
            <InputField
              register={register}
              registerName="field_of_study"
              iconName="user"
              isIcon={true}
              type="text"
              placeholder="Field of Study"
            />
            {error?.field_of_study && (
              <p className="text-red-600 text-xs">
                {error?.field_of_study?.[0]}
              </p>
            )}
            <InputField
              register={register}
              isIcon={true}
              iconName="user"
              registerName="start_date"
              type="date"
              placeholder="Start date"
            />
            {error?.start_date && (
              <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
            )}
            <InputField
              register={register}
              isIcon={true}
              iconName="user"
              registerName="end_date"
              type="date"
              placeholder="End date"
            />
            {error?.end_date && (
              <p className="text-red-600 text-xs">{error?.end_date?.[0]}</p>
            )}
            <InputField
              register={register}
              isIcon={true}
              iconName="user"
              registerName="institute_name"
              type="text"
              placeholder="Institute name"
            />
            {error?.institute_name && (
              <p className="text-red-600 text-xs">
                {error?.institute_name?.[0]}
              </p>
            )}
            <InputField
              register={register}
              isIcon={true}
              iconName="user"
              registerName="level_of_education"
              type="text"
              placeholder="Level of education"
            />
            {error?.level_of_education && (
              <p className="text-red-600 text-xs">
                {error?.level_of_education?.[0]}
              </p>
            )}
            <InputField
              register={register}
              isIcon={true}
              registerName="percentage"
              type="number"
              iconName="user"
              placeholder="Percentage"
            />
            {error?.percentage && (
              <p className="text-red-600 text-xs">{error?.percentage?.[0]}</p>
            )}
            <div className="flex item justify-between gap-8 mt-6 h-10 w-full ">
              <Button
                handleButtonClick={() => {}}
                isLoading={isLoading}
                isDisabled={isLoading}
                buttonName={"Add education info"}
                className={"rounded-lg hover:opacity-80"}
              />
            </div>
            <div
              onClick={() => navigate("/")}
              className="text-end cursor-pointer text-sm hover:underline text-blue-700 font-semibold mr-1"
            >
              {" "}
              Skip
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className=" flex flex-col gap-2 w-[400px] h-96 px-4"
          >
            <CustomSelect
              options={hospitalOption}
              value={hospitalList}
              register={register}
              name={"hospital"}
              placeholder={"Select hospital"}
              handleChange={(data) => handleHospitalChange(data)}
            />
            {error?.hospital && (
              <p className="text-red-600 text-xs">{error?.hospital?.[0]}</p>
            )}
            <CustomSelect
              options={workExperience}
              value={employmentType}
              register={register}
              name={"employment_type"}
              placeholder={"Select employment type"}
              handleChange={(data) => handleEmploymentTypeChange(data)}
            />
            {error?.employment_type && (
              <p className="text-red-600 text-xs">
                {error?.employment_type?.[0]}
              </p>
            )}
            <div className="flex items-center justify-between w-full">
              <p className="text-sm my-1 ml-1 font-semibold">
                Currently working
              </p>
              <input type="checkbox" {...register("currently_working")} />
            </div>
            {error?.currently_working && (
              <p className="text-red-600 text-xs">
                {error?.currently_working?.[0]}
              </p>
            )}
            <InputField
              register={register}
              isIcon={true}
              iconName="user"
              registerName="position"
              type="text"
              placeholder="Position"
            />
            {error?.position && (
              <p className="text-red-600 text-xs">{error?.position?.[0]}</p>
            )}
            <InputField
              register={register}
              isIcon={true}
              registerName="location"
              type="text"
              iconName="phone"
              placeholder="Location"
            />
            {error?.location && (
              <p className="text-red-600 text-xs">{error?.location?.[0]}</p>
            )}
            <InputField
              register={register}
              isIcon={true}
              registerName="start_date"
              type="date"
              iconName="user"
              placeholder="Start date"
            />
            {error?.start_date && (
              <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
            )}
            {watchCurrentlyWorking !== true && (
              <InputField
                register={register}
                isIcon={true}
                registerName="end_date"
                type="date"
                iconName="user"
                placeholder="End date"
              />
            )}

            {error?.end_date && (
              <p className="text-red-600 text-xs">{error?.end_date?.[0]}</p>
            )}
            <div className="flex item justify-between gap-8 mt-6 h-10 w-full ">
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                handleButtonClick={() => {}}
                buttonName={"Add experience info"}
                className={" rounded-xl hover:opacity-80"}
              />
            </div>
            <div
              onClick={() => navigate("/")}
              className="text-end cursor-pointer text-sm hover:underline text-blue-700 font-semibold mr-1"
            >
              {" "}
              Skip
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

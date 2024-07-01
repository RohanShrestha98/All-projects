/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useExperienceInfoMutation } from "../hooks/useMutateData";
import CustomSelect from "../components/CustomSelect";
import { useHospitalData } from "../hooks/useQueryData";
import { useState } from "react";
import NepaliToEnglishDateConverter from "../components/NepaliToEnglishDateConverter";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(128, 128, 128, 0.5)", // Adjust the alpha value for transparency
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff", // Set the modal background color
  },
};

export default function ExperienceModal({
  isOpen,
  setIsOpen,
  edit,
  editExperienceData,
}) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hospitalList, setHospitalList] = useState();
  const [employmentType, setEmploymentType] = useState();
  const { data } = useHospitalData();
  
  const hospitalOption = data?.map((item) => {
    return {
      value: item?.id,
      label: item?.title,
    };
  });

  const defaultHospital = hospitalOption?.filter(
    (item) => item?.value === editExperienceData?.hospital
  );



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

  const defaultEmployeeType = workExperience?.filter(
    (item) => item?.label === editExperienceData?.employment_type
  );

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      hospital: editExperienceData?.hospital,
      employment_type: editExperienceData?.employment_type,
      position: editExperienceData?.position,
      location: editExperienceData?.location,
      start_date: editExperienceData?.start_date,
      end_date: editExperienceData?.end_date,
    },
  });

    
  // useEffect(() => {
  //   if (watch("start_date")) {
  //     let date = new NepaliDate(new Date(watch("start_date"))).format(
  //       "YYYY-MM-DD"
  //     );
  //     setNPStartDate(ConvertDateFormat(date));
  //   }
  // }, [watch("start_date")]);

  // useEffect(() => {
  //   if (watch("end_date")) {
  //     let date = new NepaliDate(new Date(watch("end_date"))).format(
  //       "YYYY-MM-DD"
  //     );
  //     setNPEndDate(ConvertDateFormat(date));
  //   }
  // }, [watch("end_date")]);
  const experienceMutation = useExperienceInfoMutation();
  const handleHospitalChange = (data) => {
    setHospitalList(data);
    setValue("hospital", data?.value);
  };
  const handleEmploymentTypeChange = (data) => {
    setEmploymentType(data);
    setValue("employment_type", data?.value);
  };

  const watchCurrentlyWorking = watch("currently_working");

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
      const result = await experienceMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `${editExperienceData?.idx}/` : "",
        watchCurrentlyWorking === true ? postData : data,
      ]);
      if (result?.status === edit ? 200 : 201) {
        setIsLoading(false);
        toast.success(`Experience ${edit ? "edited" : "added"}  successfully`);
        setIsOpen(false);
        reset();
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data);
    }
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-[560px] sm:w-full rounded-xl"
        >
          <p className="text-center text-gray-700 font-semibold text-lg mb-4">
            {edit ? "Update " : "Add "} Experience Details
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
            <div>
              <CustomSelect
                options={hospitalOption}
                value={hospitalList}
                defaultValue={defaultHospital}
                placeholder={"Select hospital"}
                register={register}
                label={"Hospital"}
                name={"hospital"}
                handleChange={(data) => handleHospitalChange(data)}
              />
              {error?.hospital && (
                <p className="text-red-600 text-xs">{error?.hospital?.[0]}</p>
              )}
            </div>
            <div>
              <CustomSelect
                options={workExperience}
                value={employmentType}
                label={"Employment type"}
                placeholder={"Select employment type"}
                defaultValue={defaultEmployeeType}
                register={register}
                name={"employment_type"}
                handleChange={(data) => handleEmploymentTypeChange(data)}
              />
              {error?.employment_type && (
                <p className="text-red-600 text-xs">
                  {error?.employment_type?.[0]}
                </p>
              )}
            </div>
            <div>
              <InputField
                register={register}
                label={"Position"}
                registerName="position"
                type="text"
                placeholder="Position"
              />
              {error?.position && (
                <p className="text-red-600 text-xs">{error?.position?.[0]}</p>
              )}
            </div>
            <div>
              <InputField
                register={register}
                registerName="location"
                type="text"
                label={"Location"}
                placeholder="Location"
              />
              {error?.location && (
                <p className="text-red-600 text-xs">{error?.location?.[0]}</p>
              )}
            </div>
            <div>
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
            </div>
            
            <div></div>
            </div>
              
            <div>
              <NepaliToEnglishDateConverter max={new Date()} label="Start Date" registerName={`start_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.start_date && (
                <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
              )}
            </div>
                {
                  !watchCurrentlyWorking &&
                  <div>
                  <NepaliToEnglishDateConverter  max={new Date()}
                    min={watch("start_date")} label="End Date" registerName={`end_date`}
                    register={register} watch={watch} setValue={setValue}/>
                  {error?.end_date && (
                    <p className="text-red-600 text-xs">{error?.end_date?.[0]}</p>
                  )}
                </div>
                }
          {/* </div> */}
          <div className="flex justify-end">
            <div className="grid w-1/2 sm:w-full sm:gap-2 grid-cols-2 gap-4 mt-6">
              <Button
                handleButtonClick={() => setIsOpen(false)}
                className={"bg-red-500 hover:opacity-80 rounded-lg"}
                buttonName={"Cancel"}
              />

              <Button
                type={"submit"}
                isDisabled={isLoading}
                isLoading={isLoading}
                buttonName={edit ? "Update" : "Add"}
                className={"hover:opacity-80 rounded-lg"}
                handleButtonClick={() => { }}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

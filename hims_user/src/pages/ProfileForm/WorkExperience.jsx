/* eslint-disable react/prop-types */
import { set, useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import { useState } from "react";
import {
  useExperienceCategoryData,
  useExperienceSubCategoryData,
  useHospitalData,
  useLevelData,
  usePostData,
  useResponsibilityData,
  useServiceData,
  useSubResponsibilityData,
} from "../../hooks/useQueryData";
import ConvertToOptions from "../../utils/ConvertToOptions";
import { toast } from "react-toastify";
import { useWorkExperienceMutation } from "../../hooks/useMutateData";
import { MdDelete } from "react-icons/md";
import NepaliToEnglishDateConverter from "../../components/NepaliToEnglishDateConverter";

export default function WorkExperience({ setActiveForm, activeForm }) {
  const { register, handleSubmit, setValue ,watch} = useForm();
  const [technical, setTechnical] = useState(1);
  const [selectedService, setSelectedService] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [selectedHospital, setSelectedHospital] = useState();
  const [selectedResponsibility, setSelectedResponsibility] = useState();
  const [selectedSubResponsibility, setSelectedSubResponsibility] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [selectedWorkExperience, setSelectedWorkExperience] = useState();
  const [selectedPost, setSelectedPost] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const { data: serviceData, isLoading: serviceLoading } = useServiceData();
  const { data: hospitalData, isLoading: hospitalLoading } = useHospitalData();
  const { data: levelData, isLoading: levelLoading } = useLevelData();
  const { data: postData, isLoading: postLoading } = usePostData();
  const { data: responsibilityData, isLoading: responsibilityLoading } =
    useResponsibilityData();
  const { data: experienceCategoryData, isLoading: experienceCategoryLoading } =
    useExperienceCategoryData({
      service: selectedService?.id,
    });
  const { data: subRespinsibilityData, isLoading: subRespinsibilityLoading } =
    useSubResponsibilityData({
      responsibility: selectedResponsibility?.id,
    });


  const {
    data: experienceSubCategoryData,
    isLoading: experienceSubCategoryLoading,
  } = useExperienceSubCategoryData({
    category: selectedCategory?.id,
  });
  const serviceOption =
    !serviceLoading && serviceData?.length && ConvertToOptions(serviceData);
  const levelOption =
    !levelLoading && levelData?.length && ConvertToOptions(levelData);
  const postOption =
    !postLoading && postData?.length && ConvertToOptions(postData);
  const hospitalOption =
    !hospitalLoading && hospitalData?.length && ConvertToOptions(hospitalData);
  const responsibilityOption =
    !responsibilityLoading &&
    responsibilityData?.length &&
    ConvertToOptions(responsibilityData);
  const subRespinsibilityOption =
    !subRespinsibilityLoading &&
    subRespinsibilityData?.length &&
    ConvertToOptions(subRespinsibilityData);
  const categoryOption =
    !experienceCategoryLoading &&
    experienceCategoryData?.length &&
    ConvertToOptions(experienceCategoryData);
  const subCategoryOption =
    !experienceSubCategoryLoading &&
    experienceSubCategoryData?.length &&
    ConvertToOptions(experienceSubCategoryData);

  const [addPreviouslyWorkedCount, setAddPreviouslyWorkedCount] = useState(1);
  const [previouslyWorked, setPreviouslyWorked] = useState([]);

  const handleAddPreviouslyWorked = () => {
    setPreviouslyWorked([...previouslyWorked, ""]);
    setAddPreviouslyWorkedCount(addPreviouslyWorkedCount + 1);
  };

  const handleRemovePreviouslyWorked = (index) => {
    const list = [...previouslyWorked];
    list.splice(index, 1);
    setPreviouslyWorked(list);
    setAddPreviouslyWorkedCount(addPreviouslyWorkedCount - 1);
  };

  const workExperienceMutation = useWorkExperienceMutation();

  const onSubmitHandler = async (data) => {
    const transformObject = (inputObject) => {
      const outputObject = {
        hospital: selectedHospital?.id,
        position: selectedPost?.id,
        start_date: data?.start_date,
        subcategory: selectedSubCategory?.id,
        employment_type: selectedWorkExperience?.value,
        subresponsibility: selectedSubResponsibility?.id,
        level: selectedLevel?.id,
        is_technical: technical === 1 ? true : false,
        middle_name: data?.middle_name,
        country: "Nepal",
      };

      if (data?.date_of_attendance)
        outputObject.date_of_attendance = data?.date_of_attendance;
      if (data?.date_of_decision)
        outputObject.date_of_decision = data?.date_of_decision;
      if (previouslyWorked?.length) outputObject.previous = [];

      for (let i = 1; i <= previouslyWorked?.length; i++) {
        const hospitalKey = `_${i}hospital_p`;
        const subResponsibilityKey = `_${i}sub_responsibility_p`;
        const postKey = `_${i}post_p`;
        const startDateKey = `_${i}start_date_p`;
        const endDateKey = `_${i}end_date_p`;
        const subCategoryKey = `_${i}sub_category_p`;
        const employmentTypeKey = `_${i}employment_type_p`;
        const levelKey = `_${i}level_p`;
        const technicalKey = `_${i}technical_p`;

        const previous = {};
        if (data[hospitalKey]) previous.hospital = data[hospitalKey];
        if (data[subResponsibilityKey])
          previous.subresponsibility = data[subResponsibilityKey];
        if (data[postKey]) previous.position = data[postKey];
        if (data[startDateKey]) previous.start_date = data[startDateKey];
        if (data[endDateKey]) previous.end_date = data[endDateKey];
        if (data[subCategoryKey]) previous.subcategory = data[subCategoryKey];
        if (data[employmentTypeKey])
          previous.employment_type = data[employmentTypeKey];
        if (data[levelKey]) previous.level = data[levelKey];
        if (data[technicalKey]) previous.is_technical = data[technicalKey];
        previous.country = "Nepal";
        outputObject.previous.push(previous);
      }
      return outputObject;
    };
    setIsLoading(true);

    const transformedObject = transformObject(data);
    try {
      const result = await workExperienceMutation.mutateAsync([
        "post",
        "",
        transformedObject,
      ]);
      if (result?.status === 201) {
        setIsLoading(false);
        toast.success(`Work experience added successfully`);
        setActiveForm(activeForm + 1);
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data);
    }
  };

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

  const tecnicalList = [
    {
      id: 1,
      name: "Technical",
    },
    {
      id: 2,
      name: "Non Technical",
    },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full flex flex-col gap-4"
    >
      <fieldset className="border rounded-xl mt-6 p-5">
        <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
          Currently Working
        </legend>
        <div>
              <NepaliToEnglishDateConverter max={new Date()} label="Date of Enrollment" registerName={`start_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.start_date && (
                <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
              )}
            </div>
        <div>
              <NepaliToEnglishDateConverter label="Date of Decision of Enrollment" registerName={`date_of_decision`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.date_of_decision && (
                <p className="text-red-600 text-xs">{error?.date_of_decision?.[0]}</p>
              )}
            </div>
        <div>
              <NepaliToEnglishDateConverter label="Date of Attendance" registerName={`date_of_attendance`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.date_of_attendance && (
                <p className="text-red-600 text-xs">{error?.date_of_attendance?.[0]}</p>
              )}
            </div>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={serviceOption}
            value={selectedService}
            // defaultValue={defaultHospital}
            placeholder={"Select Service"}
            register={register}
            label={"Service"}
            name={"service"}
            handleChange={(option) => setSelectedService(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={categoryOption}
            value={selectedCategory}
            // defaultValue={defaultHospital}
            placeholder={"Select Category"}
            register={register}
            label={"Category"}
            name={"category"}
            handleChange={(option) => setSelectedCategory(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={subCategoryOption}
            value={selectedSubCategory}
            // defaultValue={defaultHospital}
            placeholder={"Select Sub Category"}
            register={register}
            label={"Sub-Category"}
            name={"subCategory"}
            handleChange={(option) => setSelectedSubCategory(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={workExperience}
            value={selectedWorkExperience}
            // defaultValue={defaultHospital}
            required
            placeholder={"Select Employment Type"}
            register={register}
            label={"Employment Type"}
            name={"employment_type"}
            handleChange={(option) => setSelectedWorkExperience(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={levelOption}
            value={selectedLevel}
            // defaultValue={defaultHospital}
            placeholder={"Select  Level"}
            register={register}
            label={"Level"}
            name={"level"}
            handleChange={(option) => setSelectedLevel(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={hospitalOption}
            value={selectedHospital}
            // defaultValue={defaultHospital}
            placeholder={"Select hospital"}
            register={register}
            label={"Hospital"}
            name={"hospital"}
            handleChange={(option) => setSelectedHospital(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={postOption}
            value={selectedPost}
            // defaultValue={defaultHospital}
            placeholder={"Select Post"}
            register={register}
            label={"Post"}
            name={"post"}
            handleChange={(option) => setSelectedPost(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={responsibilityOption}
            value={selectedResponsibility}
            // defaultValue={defaultHospital}
            placeholder={"Select Responsibility"}
            register={register}
            label={"Responsibility"}
            name={"responsibility"}
            handleChange={(option) => setSelectedResponsibility(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={subRespinsibilityOption}
            value={selectedSubResponsibility}
            // defaultValue={defaultHospital}
            placeholder={"Select Sub Responsibility"}
            register={register}
            label={"Sub-Responsibility"}
            name={"subResponsibility"}
            handleChange={(option) => setSelectedSubResponsibility(option)}
          />
          <div className="flex gap-2 mt-4 items-center">
            {tecnicalList?.map((item) => {
              return (
                <div
                  key={item?.id}
                  onClick={() => setTechnical(item?.id)}
                  className="flex items-center cursor-pointer gap-1"
                >
                  <input
                    checked={technical === item?.id}
                    className="h-4 w-4"
                    type="radio"
                  />
                  <p className="text-sm">{item?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </fieldset>
      <div className="flex justify-end ">
        <div
          onClick={handleAddPreviouslyWorked}
          className="border cursor-pointer px-4 py-1 text-sm font-medium hover:bg-blue-500 hover:text-white rounded-md text-blue-500 border-blue-500"
        >
          + Add Previously Worked
        </div>
      </div>
      {previouslyWorked?.map((_, index) => {
        return (
          <fieldset
            key={index}
            className="border relative rounded-xl mgt-2 p-5"
          >
            <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
              Previously Worked {index + 1}
            </legend>
            <span
              className="absolute -top-5 right-0 cursor-pointer bg-white px-1"
              onClick={() => handleRemovePreviouslyWorked(index)}
            >
              <MdDelete color="red" size={20} />
            </span>
            <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="date"
                label="Start Date (A.D)"
                registerName={`_${index + 1}start_date_p`}
                register={register}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="date"
                label="End Date (A.D)"
                registerName={`_${index + 1}end_date_p`}
                register={register}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={workExperience}
                // defaultValue={defaultHospital}
                placeholder={"Select Employment Type"}
                register={register}
                label={"Employment Type"}
                name={"employment_type"}
                handleChange={(option) =>
                  setValue(`_${index + 1}employment_type_p`, `${option?.value}`)
                }
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={serviceOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Service"}
                register={register}
                label={"Service"}
                name={"service_p"}
                handleChange={(option) => {
                  setValue(`_${index + 1}service_p`, `${option?.id}`);
                  setSelectedService(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={categoryOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Category"}
                register={register}
                label={"Category"}
                name={"category"}
                handleChange={(option) => {
                  setValue(`_${index + 1}category_p`, `${option?.id}`);
                  setSelectedCategory(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={subCategoryOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Sub Category"}
                register={register}
                label={"Sub-Category"}
                name={"sub_category"}
                handleChange={(option) => {
                  setValue(`_${index + 1}sub_category_p`, `${option?.id}`);
                  setSelectedSubCategory(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={postOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Post"}
                register={register}
                label={"Post"}
                name={"post"}
                handleChange={(option) => {
                  setValue(`_${index + 1}post_p`, `${option?.id}`);
                  setSelectedPost(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={levelOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Level"}
                register={register}
                label={"Level"}
                name={"level"}
                handleChange={(option) => {
                  setValue(`_${index + 1}level_p`, `${option?.id}`);
                  setSelectedLevel(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={hospitalOption}
                // defaultValue={defaultHospital}
                placeholder={"Select hospital"}
                register={register}
                label={"Hospital"}
                name={"hospital"}
                handleChange={(option) => {
                  setValue(`_${index + 1}hospital_p`, `${option?.id}`);
                  setSelectedHospital(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={responsibilityOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Responsibility"}
                register={register}
                label={"Responsibility"}
                name={"responsibility"}
                handleChange={(option) => {
                  setValue(`_${index + 1}responsibility_p`, `${option?.id}`);
                  setSelectedResponsibility(option);
                }}
              />
              <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={subRespinsibilityOption}
                // defaultValue={defaultHospital}
                placeholder={"Select Sub Responsibility"}
                register={register}
                label={"Sub-Responsibility"}
                name={"sub_responsibility_p"}
                handleChange={(option) => {
                  setValue(
                    `_${index + 1}sub_responsibility_p`,
                    `${option?.id}`
                  );
                  setSelectedSubResponsibility(option);
                }}
              />
            </div>
            <div className="flex gap-2 mt-4 items-center">
              {tecnicalList?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="flex items-center cursor-pointer gap-1"
                  >
                    <input
                      className="h-4 w-4"
                      {...register(`_${index + 1}technical_p`)}
                      type="radio"
                    />
                    <p className="text-sm">{item?.name}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      <div className="flex justify-end gap-x-2">
        {/* <div className=" w-40">
          <Button
            handleButtonClick={() => setActiveForm(activeForm - 1)}
            isFilled={false}
            className={"border bg-white  rounded-lg"}
            buttonName={"Back"}
          />
        </div> */}
        <div className="w-40">
          <Button
            handleButtonClick={() => setActiveForm(activeForm + 1)}
            isFilled={false}
            className={"border bg-white  rounded-lg"}
            buttonName={"Skip"}
          />
        </div>
        <div className=" w-40">
          <Button
            isLoading={isLoading}
            handleButtonClick={() => {}}
            className={"bg-blue-500  hover:opacity-80 rounded-lg"}
            buttonName={"Next"}
          />
        </div>
      </div>
    </form>
  );
}

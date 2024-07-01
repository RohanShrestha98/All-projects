/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useState } from "react";
import { useEducationMutation } from "../../hooks/useMutateData";
import { toast } from "react-toastify";
import NepaliToEnglishDateConverter from "../../components/NepaliToEnglishDateConverter";

export default function Education({ setActiveForm, activeForm }) {
  const { register, handleSubmit ,watch ,setValue} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [addEducationCount, setAddEducationCount] = useState(1);
  const [education, setEducation] = useState(
    Array(addEducationCount).fill(true)
  );

  const handleAddEducation = () => {
    setEducation([...education, ""]);
    setAddEducationCount(addEducationCount + 1);
  };

  const educationMutation = useEducationMutation();
  const onSubmitHandler = async (data) => {
    const transformObject = (inputObject) => {
      const multipleEducation = [];

      for (let i = 1; i <= education?.length; i++) {
        const fieldOfStudyKey = `_${i}field_of_study`;
        const startDateKey = `_${i}start_date`;
        const endDateKey = `_${i}end_date`;
        const instituteNameKey = `_${i}institute_name`;
        const levelOfEducationKey = `_${i}level_of_education`;
        const percentageKey = `_${i}percentage`;
        const descriptionKey = `_${i}description`;

        const educationMultiple = {
          field_of_study: inputObject[fieldOfStudyKey],
          institute_name: inputObject[instituteNameKey],
          start_date: inputObject[startDateKey],
          end_date: inputObject[endDateKey],
          level_of_education: inputObject[levelOfEducationKey],
          percentage: inputObject[percentageKey],
          description: inputObject[descriptionKey],
          country: "Nepal",
        };
        multipleEducation.push(educationMultiple);
      }
      return multipleEducation;
    };

    const transformedObject = transformObject(data);
    setIsLoading(true);
    try {
      const result = await educationMutation.mutateAsync([
        "post",
        "",
        transformedObject,
      ]);
      if (result?.status === 201) {
        setIsLoading(false);
        toast.success(`Education added successfully`);
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
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full flex flex-col gap-4"
    >
      <div className="flex justify-end -mt-7">
        <div
          onClick={handleAddEducation}
          className="border cursor-pointer px-4 py-1 text-sm font-medium hover:bg-blue-500 hover:text-white rounded-md text-blue-500 border-blue-500"
        >
          + Add Education
        </div>
      </div>
      {education?.map((_, index) => {
        return (
          <fieldset key={index} className="border rounded-xl mt-6 p-5">
            <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
              Education {index + 1}
            </legend>
            <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="text"
                label="Degree"
                registerName={`_${index + 1}level_of_education`}
                placeholder={"Enter your degree name"}
                register={register}
                required={true}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="text"
                label="School/Campus"
                placeholder={"Enter your school/campus name"}
                registerName={`_${index + 1}schoolCampus`}
                register={register}
                required={true}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="text"
                label="Field of Study"
                placeholder={"Enter your field of study"}
                registerName={`_${index + 1}field_of_study`}
                register={register}
                required={true}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="text"
                label="University"
                placeholder={"Enter your University"}
                registerName={`_${index + 1}institute_name`}
                register={register}
                required={true}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="number"
                label="Percentage"
                placeholder={"Enter your Percentage"}
                registerName={`_${index + 1}percentage`}
                register={register}
              />
            </div>
            <div>
              <NepaliToEnglishDateConverter max={new Date()} label="Start Date" registerName={`_${index + 1}start_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.start_date && (
                <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
              )}
            </div>
                  <div>
                  <NepaliToEnglishDateConverter  max={new Date()}
                    min={watch(`_${index + 1}start_date`)} label="End Date" registerName={`_${index + 1}end_date`}
                    register={register} watch={watch} setValue={setValue}/>
                  {error?.end_date && (
                    <p className="text-red-600 text-xs">{error?.end_date?.[0]}</p>
                  )}
                </div>
            <label htmlFor="" className={"text-gray-500 font-medium text-sm"}>
              Description {<span className="text-red-600 font-bold">*</span>}
            </label>
            <textarea
              placeholder="Enter your description"
              cols="20"
              {...register(`_${index + 1}description`)}
              className="outline-none border min-h-[100px] w-full rounded-md px-3 py-2"
              rows="6"
            ></textarea>
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

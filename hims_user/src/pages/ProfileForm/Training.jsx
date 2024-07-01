/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import { useState } from "react";
import { useTrainingMutation } from "../../hooks/useMutateData";
import { toast } from "react-toastify";
import NepaliToEnglishDateConverter from "../../components/NepaliToEnglishDateConverter";

export default function Training({ setActiveForm, activeForm }) {
  const { register, handleSubmit ,watch, setValue} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [licenseType, setLicenseType] = useState();
  const trainingMutation = useTrainingMutation();

  const licenseTypeList = [
    {
      value: "Nepal Medical Council",
      label: "Nepal Medical Council",
    },
    {
      value: "Nepal Nursing Council",
      label: "Nepal Nursing Council",
    },
    {
      value: "Nepal Health Proffessional Council",
      label: "Nepal Health Proffessional Council",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const onSubmitHandler = async (data) => {
    const postData = {
      title: data?.title,
      institution: data?.institution,
      start_date: data?.start_date,
      end_date: data?.end_date,
      organization_training: {
        ktc: data?.ktc,
        others: data?.others,
        license: licenseType?.value,
        tims: data?.tims,
      },
    };

    setIsLoading(true);
    try {
      const result = await trainingMutation.mutateAsync(["post", "", postData]);
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
      <fieldset className="border rounded-xl mt-6 p-5">
        <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
          Specialized Training
        </legend>
        <div>
              <NepaliToEnglishDateConverter max={new Date()} label="Start Date" registerName={`start_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.start_date && (
                <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
              )}
            </div>
                  <div>
                  <NepaliToEnglishDateConverter  max={new Date()}
                    min={watch(`start_date`)} label="End Date" registerName={`end_date`}
                    register={register} watch={watch} setValue={setValue}/>
                  {error?.end_date && (
                    <p className="text-red-600 text-xs">{error?.end_date?.[0]}</p>
                  )}
                </div>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="Field of Training"
            placeholder="Enter your field of training"
            registerName={"institution"}
            register={register}
            required={true}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="Title of Training"
            placeholder="Enter title of training"
            registerName={"title"}
            register={register}
            required={true}
          />
        </div>
      </fieldset>
      <fieldset className="border rounded-xl mt-6 p-5">
        <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
          Organization Providing Training
        </legend>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={licenseTypeList}
            value={licenseType}
            required
            // defaultValue={defaultHospital}
            placeholder={"Select License"}
            register={register}
            label={"License Type"}
            name={"license_type"}
            handleChange={(option) => setLicenseType(option)}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="TIMS"
            placeholder="Enter your TIMS number"
            registerName={"tims"}
            register={register}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="KTC"
            placeholder="Enter your KTC number"
            registerName={"ktc"}
            register={register}
            x
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="Others( Training Number)"
            placeholder="Enter your training number"
            registerName={"others"}
            register={register}
          />
        </div>
      </fieldset>
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

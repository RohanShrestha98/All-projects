/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useCertificationMutation } from "../../hooks/useMutateData";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NepaliToEnglishDateConverter from "../../components/NepaliToEnglishDateConverter";

export default function Certificate() {
  const { register, handleSubmit,watch, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [addCertificateCount, setAddCertificateCount] = useState(1);
  const [certificate, setCertificate] = useState(
    Array(addCertificateCount).fill(true)
  );

  const handleAddCertificate = () => {
    setCertificate([...certificate, ""]);
    setAddCertificateCount(addCertificateCount + 1);
  };
  const certificationMutation = useCertificationMutation();
  const naviagte = useNavigate();

  const onSubmitHandler = async (data) => {
    const transformObject = (inputObject) => {
      const multipleCertificate = [];

      for (let i = 1; i <= certificate?.length; i++) {
        const titleKey = `_${i}title`;
        const numberKey = `_${i}number`;
        const dateKey = `_${i}date`;
        const organizationKey = `_${i}organization`;

        const certificateMultiple = {
          title: inputObject[titleKey],
          number: inputObject[numberKey],
          date: inputObject[dateKey],
          organization: inputObject[organizationKey],
        };
        multipleCertificate.push(certificateMultiple);
      }
      return multipleCertificate;
    };

    const transformedObject = transformObject(data);
    setIsLoading(true);
    try {
      const result = await certificationMutation.mutateAsync([
        "post",
        "",
        transformedObject,
      ]);
      if (result?.status === 201) {
        setIsLoading(false);
        toast.success(`Certificate added successfully`);
        naviagte("/");
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
          onClick={handleAddCertificate}
          className="border cursor-pointer px-4 py-1 text-sm font-medium hover:bg-blue-500 hover:text-white rounded-md text-blue-500 border-blue-500"
        >
          + Add Certificate
        </div>
      </div>
      {certificate?.map((_, index) => {
        return (
          <fieldset key={index} className="border rounded-xl mt-6 p-5">
            <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
              Certificates {index + 1}
            </legend>
            <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
            <div>
              <InputField
                register={register}
                label="Certificate Name"
                required={true}
                registerName={`_${index + 1}title`}
                type="text"
                placeholder="Enter title"
              />
              {error?.title && (
                <p className="text-red-600 text-xs">{error?.title?.[0]}</p>
              )}
            </div>
            
            <div>
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="text"
                label="Organization Name"
                placeholder="Enter your name of organization"
                registerName={`_${index + 1}organization`}
                register={register}
              />
              {error?.organization && (
                <p className="text-red-600 text-xs">
                  {error?.organization?.[0]}
                </p>
              )}
            </div>
            <div>
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="number"
                label="Certification Number"
                placeholder="Enter your certification number"
                registerName={`_${index + 1}number`}
                register={register}
              />
              {error?.number && (
                <p className="text-red-600 text-xs">{error?.number?.[0]}</p>
              )}
            </div>
            </div>
            <div>
              <NepaliToEnglishDateConverter label="Certification Date" registerName={`_${index + 1}date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.date && (
                <p className="text-red-600 text-xs">{error?.date?.[0]}</p>
              )}
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
            handleButtonClick={() => naviagte("/")}
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
            buttonName={"Submit"}
          />
        </div>
      </div>
    </form>
  );
}

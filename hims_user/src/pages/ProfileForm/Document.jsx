/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useAddressData } from "../../hooks/useQueryData";
import { toast } from "react-toastify";
import { useProfileDocumentMutation } from "../../hooks/useMutateData";
import NepaliToEnglishDateConverter from "../../components/NepaliToEnglishDateConverter";

export default function Document({ setActiveForm, activeForm }) {
  const { register, handleSubmit,watch,setValue } = useForm();

  const [addressType, setAddressType] = useState();
  const [addressName, setAddressName] = useState();
  const [provinceOptions, setProvinceOptions] = useState();
  const [districtOptions, setDistrictOptions] = useState();
  const [citizenshipType, setCitizenshipType] = useState();
  const [licenseType, setLicenseType] = useState();
  const [district, setDistrict] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { data: addressData } = useAddressData(addressType, addressName);

  const citizenshipTypeList = [
    {
      value: "Descent",
      label: "Descent",
    },
    {
      value: "Birth",
      label: "Birth",
    },
    {
      value: "Naturalized ",
      label: "Naturalized",
    },
    {
      value: "Honorary ",
      label: "Honorary ",
    },
  ];
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

  useEffect(() => {
    const options = addressData?.details.map(({ title, id }) => ({
      value: id,
      label: title,
    }));

    if (addressType === "province") setDistrictOptions(options);
    else setProvinceOptions(options);
  }, [addressData, addressType]);

  const profileDocumentMutation = useProfileDocumentMutation();

  const onSubmitHandler = async (data) => {
    const postData = {
      citizenship: {
        citizenship_number: data?.citizenship_number,
        issue_date: data?.issue_date,
        disrtict: district?.value,
        citizenship_type: citizenshipType?.value,
      },
      council_registration: {
        license_type: licenseType?.value,
        license_number: data?.license_number,
        pis_number: data?.pis_number,
      },
    };
    setIsLoading(true);
    try {
      const result = await profileDocumentMutation.mutateAsync([
        "post",
        "",
        postData,
      ]);
      if (result?.status === 200) {
        setIsLoading(false);
        toast.success(`Personal info added successfully`);
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
          Citizenship
        </legend>
        <div>
              <NepaliToEnglishDateConverter label="Issue Date" registerName={`issue_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.issue_date && (
                <p className="text-red-600 text-xs">{error?.issue_date?.[0]}</p>
              )}
            </div>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="Citizenship Number*"
            placeholder="Enter your citizenship number"
            registerName={"citizenship_number"}
            register={register}
            required={true}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={provinceOptions}
            placeholder={"Select Province"}
            register={register}
            label={"Province"}
            name={"province"}
            handleChange={(option) => {
              setAddressType("province");
              setAddressName(option?.label);
            }}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={districtOptions}
            value={district}
            placeholder={"Select District"}
            register={register}
            required
            label={"District"}
            name={"district"}
            handleChange={(option) => setDistrict(option)}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={citizenshipTypeList}
            value={citizenshipType}
            required
            // defaultValue={defaultHospital}
            placeholder={"Select Citizenship Type"}
            register={register}
            label={"Citizenship Type"}
            name={"citizenshipType*"}
            handleChange={(option) => setCitizenshipType(option)}
          />
        </div>
      </fieldset>
      <fieldset className="border rounded-xl mt-4 p-5">
        <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
          Council Registration
        </legend>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={licenseTypeList}
            value={licenseType}
            // defaultValue={defaultHospital}
            placeholder={"Select License"}
            register={register}
            label={"License Type"}
            name={"license_type"}
            required={true}
            handleChange={(option) => setLicenseType(option)}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="License Number"
            placeholder="Enter your license number"
            registerName={"license_number"}
            register={register}
            required={true}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="PIS Number"
            placeholder="Enter your pis number"
            registerName={"pis_number"}
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
            handleButtonClick={() => {}}
            isLoading={isLoading}
            className={"bg-blue-500  hover:opacity-80 rounded-lg"}
            buttonName={"Next"}
          />
        </div>
      </div>
    </form>
  );
}

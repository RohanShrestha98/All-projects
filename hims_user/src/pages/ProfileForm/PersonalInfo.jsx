/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useAddressData } from "../../hooks/useQueryData";
import { toast } from "react-toastify";
import { usePersonalInfoMutation } from "../../hooks/useMutateData";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import NepaliToEnglishDateConverter from "../../components/NepaliToEnglishDateConverter";

export default function PersonalInfo({ setActiveForm, activeForm }) {
  const { register, handleSubmit, watch,setValue } = useForm();
  const [addressType, setAddressType] = useState();
  const [addressName, setAddressName] = useState();
  const [provinceOptions, setProvinceOptions] = useState();
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [error, setError] = useState();
  const [districtOptions, setDistrictOptions] = useState();
  const [municipalityOptions, setMunicipalityOptions] = useState();
  const [userType, setUserType] = useState();
  const [permanentMunicipality, setPermanentMunicipality] = useState();
  const [currentMunicipality, setCurrentMunicipality] = useState();
  const navigate = useNavigate();

  const userTypeList = [
    {
      value: "General User",
      label: "General User",
    },
    {
      value: "Official Goverment User",
      label: "Official Goverment User",
    },
    {
      value: "Contractual Goverment User",
      label: "Contractual Goverment User",
    },
    {
      value: "Private Health Care Worker",
      label: "Private Health Care Worker",
    },
  ];
  const { data: addressData } = useAddressData(addressType, addressName);

  useEffect(() => {
    const options = addressData?.details.map(({ title, id }) => ({
      value: id,
      label: title,
    }));

    if (addressType === "province") setDistrictOptions(options);
    else if (addressType === "district") setMunicipalityOptions(options);
    else setProvinceOptions(options);
  }, [addressData, addressType]);

  const personalInfoMutation = usePersonalInfoMutation();

  useEffect(() => {
    var currentDate = moment();
    var birthDateAD = moment(watch("birth_date"), "YYYY");
    var diff = currentDate.diff(birthDateAD, "years");
    setAge(diff);
  }, [watch("birth_date")]);

  const onSubmitHandler = async (data) => {
    const postData = {
      details: {
        birth_date: data?.birth_date,
        first_name: data?.first_name,
        last_name: data?.last_name,
        // middle_name: data?.middle_name !== "" && data?.middle_name,
      },
      permanent_address: {
        municipality: permanentMunicipality?.value,
        ward_no: data?.ward_no_p,
        tole: data?.tole_p,
      },
      current_address: {
        municipality: sameAsPermanent
          ? permanentMunicipality?.value
          : currentMunicipality?.value,
        ward_no: sameAsPermanent ? data?.ward_no_p : data?.ward_no_c,
        tole: sameAsPermanent ? data?.tole_p : data?.tole_c,
      },
      user_type: userType?.value,
    };
    setIsLoading(true);
    try {
      const result = await personalInfoMutation.mutateAsync([
        "post",
        "",
        postData,
      ]);
      if (result?.status === 200) {
        setIsLoading(false);
        toast.success(`Personal info added successfully`);
        if (userType?.value === "General User") {
          navigate("/");
        } else {
          setActiveForm(activeForm + 1);
        }
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
        <legend className="font-semibold whitespace-nowrap  text-gray-700 bg-white px-2">
          Personal Details
        </legend>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            registerName={"first_name"}
            register={register}
            required={true}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="Middle Name"
            placeholder="Enter your middle name"
            registerName={"middle_name"}
            register={register}
            required={false}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            registerName={"last_name"}
            register={register}
            required={true}
          />
          </div>

            <div>
              <NepaliToEnglishDateConverter label="Date of Birth" registerName={`birth_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.birth_date && (
                <p className="text-red-600 text-xs">{error?.birth_date?.[0]}</p>
              )}
            </div>
          <div>
            <label
              htmlFor=""
              className={`text-sm mb-1 text-gray-600  font-semibold`}
            >
              Age
            </label>
            <div className="border w-full flex items-center px-3 text-gray-600 bg-[#f2f2f2] h-10  rounded-md">
              {age === isNaN ? 0 : age}
            </div>
        </div>
      </fieldset>
      <fieldset className="border rounded-xl mt-4 p-5">
        <h1 className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
          Permanent Address
        </h1>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
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
            placeholder={"Select District"}
            register={register}
            label={"District"}
            name={"district"}
            handleChange={(option) => {
              setAddressType("district");
              setAddressName(option?.label);
            }}
          />
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={municipalityOptions}
            required
            value={permanentMunicipality}
            placeholder={"Select Municipality"}
            register={register}
            label={"Municipality"}
            name={"municipality"}
            handleChange={(option) => setPermanentMunicipality(option)}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="Ward Number"
            placeholder="Enter your ward number"
            registerName={"ward_no_p"}
            register={register}
            required={true}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="Tole"
            placeholder="Enter your tole"
            registerName={"tole_p"}
            register={register}
            required={true}
          />
        </div>
      </fieldset>
      <div className="mt-4">
        <div
          onClick={() => setSameAsPermanent(!sameAsPermanent)}
          className="flex justify-end  font-semibold text-sm mb-2 cursor-pointer text-[#265CC0]"
        >
          Same as permanent
        </div>
        <fieldset className="border rounded-xl  p-5">
          <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
            Current Address
          </legend>
          <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
            <CustomSelect
              labelClassname="text-gray-500 font-medium text-sm"
              options={provinceOptions}
              // defaultValue={defaultHospital}
              placeholder={"Select Province"}
              register={register}
              disabled={sameAsPermanent}
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
              placeholder={"Select District"}
              register={register}
              disabled={sameAsPermanent}
              label={"District"}
              name={"district"}
              handleChange={(option) => {
                setAddressType("district");
                setAddressName(option?.label);
              }}
            />
            <CustomSelect
              labelClassname="text-gray-500 font-medium text-sm"
              options={municipalityOptions}
              value={
                sameAsPermanent ? permanentMunicipality : currentMunicipality
              }
              disabled={sameAsPermanent}
              placeholder={"Select Municipality"}
              register={register}
              label={"Municipality"}
              name={"municipality"}
              handleChange={(option) => setCurrentMunicipality(option)}
            />
            <InputField
              labelClassname="text-gray-500 font-medium text-sm"
              type="number"
              label="Ward Number"
              placeholder="Enter your ward number"
              registerName={"ward_no_c"}
              disabled={sameAsPermanent}
              register={register}
            />
            <InputField
              labelClassname="text-gray-500 font-medium text-sm"
              type="text"
              disabled={sameAsPermanent}
              label="Tole"
              placeholder="Enter your tole"
              registerName={"tole_c"}
              register={register}
            />
          </div>
        </fieldset>
      </div>
      {/* <div className="border rounded-xl mt-4 p-5">
        <h1 className="-mt-8 w-36  font-semibold whitespace-nowrap text-gray-700 bg-white ">
          Contact Details
        </h1>
        <div className="grid grid-cols-3 gap-3 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="number"
            label="Phone Number"
            placeholder="Enter your phone number"
            registerName={"phoneNumber"}
            register={register}
            required={true}
          />
          <InputField
            labelClassname="text-gray-500 font-medium text-sm"
            type="text"
            label="Email"
            placeholder="Enter your email"
            registerName={"email"}
            register={register}
            required={true}
          />
        </div>
      </div> */}
      <fieldset className="border rounded-xl mt-4 p-5">
        <legend className="font-semibold whitespace-nowrap text-gray-700 bg-white px-2">
          User Type
        </legend>
        <div className="grid grid-cols-3 gap-4 my-4 lg:grid-cols-2 sm:grid-cols-1">
          <CustomSelect
            labelClassname="text-gray-500 font-medium text-sm"
            options={userTypeList}
            value={userType}
            // defaultValue={defaultHospital}
            placeholder={"Select user type"}
            register={register}
            label={"User Type"}
            name={"user_type"}
            handleChange={(option) => setUserType(option)}
          />
        </div>
      </fieldset>
      <div className="flex justify-end">
        <div className=" w-40">
          <Button
            type={"submit"}
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

/* eslint-disable react/prop-types */
import InputField from "../components/InputField";
import Modal from "react-modal";
import CustomSelect from "../components/CustomSelect";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useProfileDocumentMutation } from "../hooks/useMutateData";
import { useAddressData } from "../hooks/useQueryData";
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
    backgroundColor: "#fff",
  },
};

export default function DocumentModal({ isOpen, setIsOpen, edit, editData }) {
  const { register, handleSubmit ,watch,setValue} = useForm();
  const [addressType, setAddressType] = useState();
  const [addressName, setAddressName] = useState();
  const [provinceOptions, setProvinceOptions] = useState();
  const [districtOptions, setDistrictOptions] = useState();
  const [citizenshipType, setCitizenshipType] = useState();
  const [licenseType, setLicenseType] = useState();
  const [district, setDistrict] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
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

  const filterCitizenType = citizenshipTypeList?.filter((item)=>item?.label === editData?.citizenship?.[0]?.citizenship_type)
  function closeModal() {
    setIsOpen(false);
  }

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
        citizenship_number: data?.citizenship_number??editData?.citizenship?.[0]?.citizenship_number,
        issue_date: data?.issue_date??editData?.citizenship?.[0]?.issue_date,
        disrtict: district?.value??editData?.citizenship?.[0]?.disrtict,
        citizenship_type: citizenshipType?.value??editData?.citizenship?.[0]?.citizenship_type,
      },
      council_registration: {
        license_type: licenseType?.value ?? editData?.council_registration?.[0]?.license_type,
        license_number: data?.license_number ?? editData?.council_registration?.[0]?.license_number,
        pis_number: data?.pis_number??editData?.council_registration?.[0]?.pis_number,
      },
    };
    setIsLoading(true);
    try {
      const result = await profileDocumentMutation.mutateAsync([
        edit?"patch":"post",
        edit?`${editData?.idx}/`:"",
        postData,
      ]);
      if (result?.status === edit ? 200 : 201) {
        setIsLoading(false);
        setIsOpen(false);
        toast.success(`Document  ${edit ? "edited" : "added"}  successfully`);
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
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className=" w-[560px] flex flex-col gap-4"
        >
          <p className="text-center text-gray-700 font-semibold text-lg ">
            {edit ? "Update " : "Add "} Document
          </p>
          <fieldset className="border rounded-xl  p-5">
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
            <div className="grid grid-cols-2 gap-4  ">
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="number"
                label="Citizenship Number"
                placeholder="Enter your citizenship number"
                registerName={"citizenship_number"}
                register={register}
                defaultValue={editData?editData?.citizenship?.[0]?.citizenship_number:""}
                required={true}
              />
              {
                !editData && <CustomSelect
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
              }
              {
                !editData && <CustomSelect
                labelClassname="text-gray-500 font-medium text-sm"
                options={districtOptions}
                value={district}
                placeholder={"Select District"}
                defaultValue={filterCitizenType?.[0]}
                register={register}
                required
                label={"District"}
                name={"district"}
                handleChange={(option) => setDistrict(option)}
              />
              }
              
              
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
            <div className="grid grid-cols-2 gap-4 my-4 ">
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
                defaultValue={ editData?.council_registration?.[0]?.license_type}
                handleChange={(option) => setLicenseType(option)}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="number"
                label="License Number"
                placeholder="Enter your license number"
                registerName={"license_number"}
                defaultValue={ editData?.council_registration?.[0]?.license_number}
                register={register}
                required={true}
              />
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="number"
                label="PIS Number"
                defaultValue={ editData?.council_registration?.[0]?.pis_number}
                placeholder="Enter your pis number"
                registerName={"pis_number"}
                register={register}
              />
            </div>
          </fieldset>
          <div className="flex justify-end gap-x-2">
            <div className=" w-40">
              <Button
                type={"submit"}
                isDisabled={isLoading}
                isLoading={isLoading}
                buttonName={edit ? "Update" : "Add"}
                className={"hover:opacity-80 rounded-lg"}
                handleButtonClick={() => {}}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

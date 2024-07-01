/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { useProfileInfoMutation } from "../hooks/useMutateData";
import { toast } from "react-toastify";
import CustomSelect from "../components/CustomSelect";
import { useState } from "react";
import profile from "../assets/profile.svg";
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

export default function ProfileInfoModal({ isOpen, setIsOpen, editData }) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const [materialStatus, setMaterialStatus] = useState();
  const [profileImg, setProfileImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setValue,watch } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: editData?.user?.first_name,
      last_name: editData?.user?.last_name,
      insurance_number: editData?.insurance_number,
      location: editData?.location,
      experience: editData?.experience,
      birth_date: editData?.birth_date,
      marital_status: editData?.marital_status,
    },
  });
  const [error, setError] = useState();

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

  const defaultMaterialStatus = materialOption?.filter(
    (item) => item?.label === editData?.marital_status
  );
  const profileMutation = useProfileInfoMutation();

  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    const formData = await new FormData();
    formData.append("insurance_number", data?.insurance_number);
    formData.append("location", data?.location);
    formData.append("experience", data?.experience);
    formData.append("birth_date", data?.birth_date);
    formData.append(
      "marital_status",
      defaultMaterialStatus?.[0]?.value || materialStatus?.value
    );
    formData.append("user.first_name", data?.first_name);
    formData.append("user.last_name", data?.last_name);
    formData.append("user.avatar", profileImg?.[0] || "");
    try {
      const result = await profileMutation.mutateAsync([
        "patch",
        `${editData?.idx}/`,
        formData,
      ]);
      setIsLoading(false);
      if (result?.status === 200) {
        toast.success("Profile updated successfully");
        setIsOpen(false);
        reset();
      } else {
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
  const handleMaterialStatusChange = (data) => {
    setMaterialStatus(data);
    setValue("material_Status", data?.value);
  };

  const fileList =
    Object &&
    Object?.keys(profileImg !== undefined && profileImg)
      .filter((key) => !isNaN(parseInt(key)))
      .map((key) => {
        const file = profileImg !== undefined && profileImg[key];
        const imageUrl = URL.createObjectURL(file);
        return (
          <div key={key} className="w-full object-cover h-full rounded-full">
            <img
              src={
                location?.state?.data?.images[0]
                  ? location?.state?.data?.images[0]
                  : imageUrl
              }
              alt={file.name}
              className="w-full object-fill h-full"
            />
          </div>
        );
      });

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
          className="w-[660px]   sm:w-full  rounded-xl"
        >
          <p className="text-center text-gray-700 font-semibold text-lg mb-4">
            Edit Personal Info
          </p>
          <div className="flex justify-center sm:flex-col sm:items-center gap-2">
            <div className="w-1/4 sm:w-full gap-2  flex flex-col items-center">
              {fileList?.length !== 0 ? (
                <div className="h-28 w-28 border rounded-full overflow-hidden p-2">
                  {" "}
                  {fileList?.[0]}
                </div>
              ) : (
                <img
                  src={editData?.user?.avatar_url ?? profile}
                  className="h-28 w-28 rounded-full p-2 overflow-hidden border"
                  alt=""
                />
              )}

              <div className="border rounded-md flex items-center justify-center">
                <label
                  htmlFor="addMedication"
                  className=" text-sm  py-1 cursor-pointer rounded-md text-white w-28 text-center bg-[#265cc0]  hover:opacity-80   font-semibold"
                >
                  {fileList?.length !== 0 ? (
                    <p>Change File</p>
                  ) : (
                    <p>Choose File</p>
                  )}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setProfileImg(e.target.files);
                  }}
                  className="hidden"
                  id="addMedication"
                />
              </div>
            </div>
            <div className="w-3/4">
            <div className="grid sm:h-[300px] sm:overflow-auto  grid-cols-2 sm:grid-cols-1 sm:w-full gap-2">
              <div>
                <InputField
                  register={register}
                  registerName="first_name"
                  label="First name"
                  haslabel={true}
                  required={true}
                  type="text"
                  placeholder="Enter your first name"
                />
                {error?.first_name && (
                  <p className="text-red-600 text-xs">
                    {error?.first_name?.[0]}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  register={register}
                  registerName="last_name"
                  label="Last name"
                  haslabel={true}
                  required={true}
                  type="text"
                  placeholder="Enter your last name"
                />
                {error?.last_name && (
                  <p className="text-red-600 text-xs">
                    {error?.last_name?.[0]}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  register={register}
                  registerName="insurance_number"
                  label="Insurance No."
                  haslabel={true}
                  type="text"
                  placeholder="Enter your insurance no."
                />
                {error?.insurance_number && (
                  <p className="text-red-600 text-xs">
                    {error?.insurance_number?.[0]}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  register={register}
                  registerName="location"
                  label="Location"
                  haslabel={true}
                  type="text"
                  placeholder="Enter your Location"
                />
                {error?.location && (
                  <p className="text-red-600 text-xs">{error?.location?.[0]}</p>
                )}
              </div>

              <div>
                <InputField
                  register={register}
                  registerName="experience"
                  label="Experience"
                  haslabel={true}
                  type="text"
                  placeholder="Enter your experience"
                />
                {error?.experience && (
                  <p className="text-red-600 text-xs">
                    {error?.experience?.[0]}
                  </p>
                )}
              </div>
              <div>
                <CustomSelect
                  options={materialOption}
                  register={register}
                  value={materialStatus}
                  defaultValue={defaultMaterialStatus}
                  placeholder={"Select matrial status"}
                  label={"Matrial status"}
                  name={"marital_status"}
                  handleChange={(data) => handleMaterialStatusChange(data)}
                />
                {error?.marital_status && (
                  <p className="text-red-600 text-xs">
                    {error?.marital_status?.[0]}
                  </p>
                )}
              </div>
           
           
            </div>
            <div>
              <NepaliToEnglishDateConverter label="Birth Date" registerName={`birth_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.birth_date && (
                <p className="text-red-600 text-xs">{error?.birth_date?.[0]}</p>
              )}
            </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="grid w-1/2 sm:w-full grid-cols-2 gap-4 mt-6">
              <Button
                handleButtonClick={() => setIsOpen(false)}
                className={"bg-red-500 hover:opacity-80 rounded-lg"}
                buttonName={"Cancel"}
              />

              <Button
                type={"submit"}
                isDisabled={isLoading}
                isLoading={isLoading}
                buttonName={"Update"}
                className={" hover:opacity-80 rounded-lg"}
                handleButtonClick={() => {}}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

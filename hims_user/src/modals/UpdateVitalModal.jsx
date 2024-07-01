/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useVitalMutation } from "../hooks/useMutateData";
import { useState } from "react";
import CustomSelect from "../components/CustomSelect";
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

export default function UpdateVitalModal({
  isOpen,
  setIsOpen,
  vitalData,
  edit,
}) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const [error, setError] = useState();
  const { register, handleSubmit, reset, setValue } = useForm({
    mode: "onChange",
  });
  const [bloodGroupData, setBloodGroupData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const vitalMutation = useVitalMutation();
  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    try {
      const result = await vitalMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? "update_my_vital/" : "",
        data,
      ]);
      setIsLoading(false);
      if (edit ? result?.status === 200 : result?.status === 201) {
        setIsOpen(false);
        toast.success(
          edit ? "Vital update Successfully" : "Vital added Successfully"
        );
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      setError(Object.values(error?.response?.data)?.[0]);
    }
  };
  function closeModal() {
    reset();
    setIsOpen(false);
  }
  const bloodGroup = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
    },
  ];
  const handleBloodGroupChange = (data) => {
    setBloodGroupData(data);
    setValue("blood_group", data?.value);
  };

  const defaultBloodGroup = bloodGroup?.filter(
    (item) => item?.value === vitalData?.reading
  );
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
          className="w-[300px] rounded-xl"
        >
          <p className="text-center text-gray-700 font-semibold text-lg mb-4">
            {edit ? "Update " : "Add "}
            {vitalData?.name}
          </p>
          <div className="flex flex-col gap-1">
            {vitalData?.registerName === "blood_group" ? (
              <CustomSelect
                options={bloodGroup}
                value={bloodGroupData}
                defaultValue={defaultBloodGroup}
                placeholder={"Select Blood Group"}
                register={register}
                name={"blood_group"}
                label={"Blood Group"}
                handleChange={(data) => handleBloodGroupChange(data)}
              />
            ) : (
              <div>
                <label
                  htmlFor=""
                  className="ml-1 text-sm mb-2 text-gray-600  font-semibold "
                >
                  {vitalData?.name}{" "}
                </label>
                <div className="flex items-center justify-between w-full gap-2">
                  {/* <div
                    onClick={() => setChangeValue(changeValue - 1)}
                    className="bg-gray-100 cursor-pointer h-10 min-w-[40px] flex items-center justify-center rounded-full"
                  >
                    -
                  </div> */}
                  <InputField
                    register={register}
                    defaultValue={vitalData?.reading}
                    registerName={vitalData?.registerName}
                    haslabel={true}
                    // value={changeValue}
                    // handleOnChange={(e) => {
                    //   setChangeValue(e.target.value);
                    // }}
                    type="number"
                    placeholder={`Enter your ${vitalData?.name}`}
                  />
                  {/* <div
                    onClick={() => setChangeValue(changeValue + 1)}
                    className="bg-gray-100 cursor-pointer h-10 min-w-[40px] flex items-center justify-center rounded-full"
                  >
                    +
                  </div> */}
                </div>
              </div>
            )}

            <p className="text-red-600 text-xs">{error}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
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
              className={" hover:opacity-80 rounded-lg"}
              handleButtonClick={() => {}}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

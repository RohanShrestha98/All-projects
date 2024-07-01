/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContactDetailsMutation } from "../hooks/useMutateData";
import { useState } from "react";
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

export default function ContactInfoModal({
  isOpen,
  setIsOpen,
  editContact,
  edit,
}) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      phone_number: editContact?.phone_number || "",
      email: editContact?.email || "",
    },
  });
  const contactDetailsMutation = useContactDetailsMutation();
  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    try {
      const result = await contactDetailsMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `${editContact?.idx}/` : "",
        data,
      ]);
      if (edit ? result?.status === 200 : result?.status === 201) {
        setIsLoading(false);
        setIsOpen(false);
        toast.success("Contact added Successfully");
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
    reset();
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
          className="w-[400px] sm:w-full rounded-xl"
        >
          <p className="text-center text-gray-700 font-semibold text-lg mb-4">
            {edit ? "Update " : "Add "}Contact Details
          </p>
          <div className="flex flex-col gap-1">
            <InputField
              register={register}
              registerName="phone_number"
              label="Phone Number"
              haslabel={true}
              type="number"
              placeholder="Enter your phone number"
            />
            {error?.phone_number && (
              <p className="text-red-600 text-xs">{error?.phone_number?.[0]}</p>
            )}
            <InputField
              register={register}
              registerName="email"
              label="Email"
              haslabel={true}
              type="email"
              placeholder="Enter your email"
            />
            {error?.email && (
              <p className="text-red-600 text-xs">{error?.email?.[0]}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              handleButtonClick={() => setIsOpen(false)}
              className={"bg-red-500 hover:opacity-80 rounded-lg"}
              buttonName={"Cancel"}
            />

            <Button
              type={"submit"}
              isLoading={isLoading}
              isDisabled={isLoading}
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

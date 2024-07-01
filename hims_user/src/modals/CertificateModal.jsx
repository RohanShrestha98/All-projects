/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCertificationMutation } from "../hooks/useMutateData";
import { useState } from "react";
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

export default function CertificateModal({
  isOpen,
  setIsOpen,
  edit,
  editData,
}) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset ,watch,setValue} = useForm({
    mode: "onChange",
    defaultValues: {
      title: editData?.title,
      date: editData?.date,
      organization: editData?.organization,
      number: editData?.number,
    },
  });
  const certificateMutation = useCertificationMutation();

  const onSubmitHandler = async (data) => {
    const postData = [
      {
        ...data,
        number: parseInt(data?.number),
      },
    ];
    setIsLoading(true);

    try {
      const result = await certificateMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `${editData?.idx}/` : "",
        postData,
      ]);
      if (result?.status === edit ? 200 : 201) {
        setIsLoading(false);
        toast.success(`Certificate ${edit ? "edited" : "added"}  successfully`);
        setIsOpen(false);
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
          className="w-[560px] sm:w-full rounded-xl"
        >
          <p className="text-center text-gray-700 font-semibold text-lg mb-4">
            {edit ? "Update " : "Add "} Certificate
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
            <div>
              <InputField
                register={register}
                label="Certificate Name"
                required={true}
                registerName="title"
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
                registerName={`organization`}
                register={register}
              />
              {error?.organization && (
                <p className="text-red-600 text-xs">
                  {error?.organization?.[0]}
                </p>
              )}
            </div>
            </div>
            <div>
              <NepaliToEnglishDateConverter label="Certification Date" registerName={`date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.date && (
                <p className="text-red-600 text-xs">{error?.date?.[0]}</p>
              )}
            </div>
            <div>
              <InputField
                labelClassname="text-gray-500 font-medium text-sm"
                type="number"
                label="Certification Number"
                placeholder="Enter your certification number"
                registerName={`number`}
                register={register}
              />
              {error?.number && (
                <p className="text-red-600 text-xs">{error?.number?.[0]}</p>
              )}
            </div>
          <div className="flex justify-end">
            <div className="grid w-1/2 sm:w-full sm:gap-2 grid-cols-2 gap-4 mt-6">
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

/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMedicationMutation } from "../hooks/useMutateData";
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

export default function AddDocumentModal({
  isOpen,
  setIsOpen,
  data: editData,
  edit,
}) {
  let subtitle;
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const [medication, setMedication] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: editData?.title || "",
      description: editData?.description || "",
    },
  });

  const medicationMutation = useMedicationMutation();
  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    const formData = await new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("document", medication ?? editData?.document);
    try {
      const result = await medicationMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `${editData?.idx}/` : "",
        formData,
      ]);
      if (edit ? result?.status === 200 : result?.status === 201) {
        setIsLoading(false);
        setIsOpen(false);
        toast.success("Medication added Successfully");
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
            {edit ? "Update " : "Add "}Document
          </p>
          <div className="flex flex-col gap-1">
            <InputField
              register={register}
              registerName="title"
              label="Title"
              haslabel={true}
              type="text"
              placeholder="Enter your title"
            />
            {error?.title && (
              <p className="text-red-600 text-xs">{error?.title?.[0]}</p>
            )}
            <div>
              <p className="ml-1 text-sm mb-1 text-gray-600  font-semibold ">
                Upload Medication
              </p>
              <div className=" py-4 min-h-[108px] border rounded-md flex items-center justify-center">
                {!medication && edit ? (
                  <>
                    <a
                      target="_blank"
                      href={editData?.document}
                      className="bg-gray-300 px-4 py-6 rounded-md"
                      rel="noreferrer"
                    >
                      File
                    </a>
                    <label
                      htmlFor="addMedication"
                      className=" text-sm mb-1 ml-4 text-gray-600  font-semibold"
                    >
                      Choose File
                    </label>
                  </>
                ) : medication && edit ? (
                  <p className="border py-8 px-1 bg-gray-200 rounded-lg">
                    {medication?.name}
                  </p>
                ) : medication ? (
                  <p className="border py-8 px-1 bg-gray-200 rounded-lg">
                    {medication?.name}
                  </p>
                ) : (
                  <label
                    htmlFor="addMedication"
                    className=" text-sm mb-1 text-gray-600  font-semibold"
                  >
                    <p>Choose File</p>
                  </label>
                )}
                <input
                  type="file"
                  onChange={(e) => setMedication(e.target.files[0])}
                  className="hidden"
                  accept="image/*,.pdf,.docs,.doc"
                  id="addMedication"
                />
              </div>
            </div>
            <InputField
              register={register}
              registerName="description"
              label="Description"
              haslabel={true}
              placeholder="Enter your description"
            />
            {error?.description && (
              <p className="text-red-600 text-xs">{error?.description?.[0]}</p>
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

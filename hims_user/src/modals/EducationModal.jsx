/* eslint-disable react/prop-types */
import Modal from "react-modal";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEducationInfoMutation } from "../hooks/useMutateData";
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

export default function EducationModal({
  isOpen,
  setIsOpen,
  editEducationData,
  edit,
}) {
  let subtitle;
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      field_of_study: editEducationData?.field_of_study,
      start_date: editEducationData?.start_date,
      end_date: editEducationData?.end_date,
      description: editEducationData?.description,
      institute_name: editEducationData?.institute_name,
      level_of_education: editEducationData?.level_of_education,
      percentage: editEducationData?.percentage,
    },
  });

  const educationMutation = useEducationInfoMutation();

  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    try {
      const result = await educationMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `${editEducationData?.idx}/` : "",
        edit ? data : [data],
      ]);
      if (result?.status === edit ? 200 : 201) {
        setIsLoading(false);
        toast.success(`Education ${edit ? "edited" : "added"}  Successfully`);
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

 

  // useEffect(() => {
  //   if (watch("start_date")) {
  //     let date = new NepaliDate(new Date(watch("start_date"))).format(
  //       "YYYY-MM-DD"
  //     );
  //     setNPStartDate(ConvertDateFormat(date));
  //   }
  // }, [watch("start_date")]);

  // useEffect(() => {
  //   if (watch("end_date")) {
  //     let date = new NepaliDate(new Date(watch("end_date"))).format(
  //       "YYYY-MM-DD"
  //     );
  //     setNPEndDate(ConvertDateFormat(date));
  //   }
  // }, [watch("end_date")]);

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
            {edit ? "Update " : "Add "} Education Details
          </p>
          <div>
              <NepaliToEnglishDateConverter max={new Date()} label="Start Date" registerName={`start_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.start_date && (
                <p className="text-red-600 text-xs">{error?.start_date?.[0]}</p>
              )}
            </div>
          <div>
              <NepaliToEnglishDateConverter  max={new Date()}
                min={watch("start_date")} label="End Date" registerName={`end_date`}
                register={register} watch={watch} setValue={setValue}/>
              {error?.end_date && (
                <p className="text-red-600 text-xs">{error?.end_date?.[0]}</p>
              )}
            </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
            <div>
              <InputField
                register={register}
                label={"Field of Study"}
                registerName="field_of_study"
                iconName="user"
                type="text"
                placeholder="Field of Study"
              />
              {error?.field_of_study && (
                <p className="text-red-600 text-xs">
                  {error?.field_of_study?.[0]}
                </p>
              )}
            </div>
            <div>
              <InputField
                register={register}
                iconName="user"
                label={"Institute name"}
                registerName="institute_name"
                type="text"
                placeholder="Institute name"
              />
              {error?.institute_name && (
                <p className="text-red-600 text-xs">
                  {error?.institute_name?.[0]}
                </p>
              )}
            </div>
            <div>
              <InputField
                register={register}
                iconName="user"
                label={"Level of education"}
                registerName="level_of_education"
                type="text"
                placeholder="Level of education"
              />
              {error?.level_of_education && (
                <p className="text-red-600 text-xs">
                  {error?.level_of_education?.[0]}
                </p>
              )}
            </div>
            <div>
              <InputField
                register={register}
                registerName="percentage"
                type="number"
                label={"Percentage"}
                iconName="user"
                placeholder="Percentage"
              />
              {error?.percentage && (
                <p className="text-red-600 text-xs">{error?.percentage?.[0]}</p>
              )}
            </div>
          </div>
          <div className="w-full  mt-2 rounded-lg">
            <label
              htmlFor=""
              className={`text-sm mb-1 text-gray-600  font-semibold`}
            >
              Description
              {<span className="text-red-600 font-bold">*</span>}
            </label>
            <textarea
              {...register("description")}
              className="h-full w-full border rounded-md p-2 text-sm border-gray-dark3  outline-none"
              cols="20"
              rows="5"
              placeholder="Enter Description"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <div className="grid w-1/2 sm:w-full grid-cols-2 sm:gap-2 gap-4 mt-6">
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
          </div>
        </form>
      </Modal>
    </div>
  );
}

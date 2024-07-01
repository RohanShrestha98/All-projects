import React, { useState } from "react";
import { CircleSvg, DotCicleSvg } from "../../assets/allSvg";
import MobileHeader from "../../components/navbar/mobileHeader";
import { DynamicFooter } from "../../components/footer/dynamicFooter";
import InputField from "../../components/inputField/inputField";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../components/UI/select";
import TextEditor from "../../components/UI/textEditor";
import Button from "../../components/UI/button";
import {
  useDiscussionMutation,
  usePollMutation,
} from "../../hooks/useMutateData";
import { message } from "antd";
import { useModuleStore } from "../../store/useModuleStore";
import { useSubjectData } from "../../hooks/useQueryData";
import { convertToSelectOptions } from "../../utils/convertToSelectOptions";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const optionData = [
  {
    id: "optionA",
    title: "Option A",
  },
  {
    id: "optionB",
    title: "Option B",
  },
  {
    id: "optionC",
    title: "Option C",
  },
  {
    id: "optionD",
    title: "Option D",
  },
];

export default function AddDiscussion() {
  const [isPollActive, setIsPollActive] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { currentModule } = useModuleStore();
  const { data: subjectData } = useSubjectData(currentModule?.id);
  const pollMutation = usePollMutation();
  const discussionMutation = useDiscussionMutation();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      subject: "",
      discussion: "",
    },
  });


  const handleReset = () => {
    reset();
    setValue("subject", null, { shouldDirty: false });
    setSelectedSubject(null);
  };

  const onPollSubmitHandler = (data) => {
    const pollData = {
      question: data?.title,
      subjectID: data?.subject,
      courseID: currentModule?.id,
      options: [data?.optionA, data?.optionB, data?.optionC, data?.optionD],
    };

    pollMutation.mutateAsync(["post", "", pollData], {
      onSuccess: () => {
        message.success("Poll created successfully", [2]);
        handleReset();
        navigate("/discussion");
      },
      onError: (error) => {
        let errorMessage = error?.response?.data?.error
          ? error?.response?.data?.message?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  const onDiscussionSubmitHandler = (data) => {
    const discussionData = {
      query: data?.discussion,
      subjectID: data?.subject,
      title: data?.title,
      userID: user?.user?.id,
      courseID: currentModule?.id,
    };

    discussionMutation.mutateAsync(["post", "", discussionData], {
      onSuccess: () => {
        message.success("Discussion created successfully", [2]);
        handleReset();
        navigate("/discussion");
      },
      onError: (error) => {
        let errorMessage = error?.response?.data?.error
          ? error?.response?.data?.message?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  return (
    <div className="tracking-tight pb-5">
      <MobileHeader
        headerName={isPollActive ? "Add Poll" : "Add Discussion"}
        noProfile={true}
      />
      <div className="">
        <p className="md:px-3 text-[#4B4B4B] text-sm md:text-xs">
          Select your question type
        </p>
        <div className="md:px-3">
          <div className="grid grid-cols-3 md:grid-cols-2 gap-4 md:gap-3 mt-4">
            <div
              onClick={() => setIsPollActive(true)}
              className={`flex items-start sm:items-center gap-4 md:gap-2 border  rounded-2xl px-4 md:px-3 py-3 md:py-2 cursor-pointer
                                ${
                                  isPollActive
                                    ? "border-theme-color"
                                    : "border-[#CCC]"
                                }
                                ${
                                  isPollActive && <DotCicleSvg hasCircleLine />
                                }`}>
              <div>
                {isPollActive ? (
                  <DotCicleSvg hasCircleLine width="24" height="24" />
                ) : (
                  <CircleSvg
                    hasCircleLine
                    width="24"
                    height="24"
                    color={"#BFBFBF"}
                  />
                )}
              </div>

              <div
                className={`${
                  isPollActive && <DotCicleSvg hasCircleLine />
                }`}></div>
              <div>
                <p className="text-[#4D4D4D] text-sm font-bold">Poll</p>
                <p className="sm:hidden text-[#999999] text-xs md:text-[10px] leading-4 ">
                  When you need a solution for problems
                </p>
              </div>
            </div>
            <div
              className={`flex items-start sm:items-center gap-4 md:gap-2 border  rounded-2xl px-4 md:px-3 py-3 md:py-2 cursor-pointer 
                            ${
                              !isPollActive
                                ? "border-theme-color"
                                : "border-[#CCC]"
                            }
                            ${!isPollActive && <DotCicleSvg hasCircleLine />}`}
              onClick={() => setIsPollActive(false)}>
              <div>
                {isPollActive ? (
                  <CircleSvg
                    hasCircleLine
                    width="24"
                    height="24"
                    color={"#BFBFBF"}
                  />
                ) : (
                  <DotCicleSvg hasCircleLine width="24" height="24" />
                )}
              </div>
              <div>
                <p className="text-[#4D4D4D] text-sm font-bold">Discussion</p>
                <p className="sm:hidden text-[#999999] text-xs leading-4 trac">
                  When you want to share something
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(
            isPollActive ? onPollSubmitHandler : onDiscussionSubmitHandler
          )}
          className="md:px-3 mt-6 flex flex-col gap-6 md:gap-4">
          <div className="space-y-2 input_field">
            <InputField
              required={true}
              {...register("title", { required: true, minLength: 4 })}
              className="  text-[#4C4C4C] text-sm  w-full"
              placeholder={`This is a ${isPollActive ? "poll" : "discussion"}`}
              name="title"
              label="Add an Interesting Title"
            />
            {errors?.title?.type === "required" && (
              <p>This field is required</p>
            )}
            {errors?.title?.type === "minLength" && (
              <p>Must be of 4 characters length</p>
            )}
          </div>
          <div className="space-y-2 input_field">
            <Controller
              name="subject"
              control={control}
              rules={{
                required: true,
              }}
              render={() => {
                return (
                  <CustomSelect
                    id="subject"
                    label="Choose a subject"
                    className={"md:text-xs"}
                    handleChange={(value) => {
                      setSelectedSubject(value);
                      setValue("subject", value);
                      clearErrors("subject");
                    }}
                    placeholder="Select a subject"
                    options={convertToSelectOptions(subjectData?.data)}
                    value={selectedSubject}
                  />
                );
              }}
            />
            {errors?.subject?.type === "required" && (
              <p>This field is required</p>
            )}
          </div>
          <div className="space-y-6">
            {isPollActive ? (
              <div className="flex flex-col gap-5 md:gap-4 md:mb-4">
                {optionData.map((item) => {
                  return (
                    <div
                      className="flex flex-col gap-3 md:gap-[6px] input_field"
                      key={item.id}>
                      <InputField
                        {...register(item?.id, { required: true })}
                        label={item.title}
                        placeholder={item?.title}
                        className="  text-[#4C4C4C] text-sm rounded-lg w-full"
                      />
                      {errors?.[item?.id]?.type === "required" && (
                        <p>This field is required</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2 input_field">
                <Controller
                  control={control}
                  name="discussion"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextEditor
                      label="Write your discussion"
                      placeholder="Write here..."
                      value={field?.value}
                      errorMessage={errors?.description?.message}
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("discussion", value);
                      }}
                      readOnly={false}
                      showBorder={true}
                    />
                  )}
                />
                {errors?.discussion?.type === "required" && (
                  <p>This field is required</p>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end md:hidden">
            <Button
            type="submit"
              className="bg-theme-color  rounded-lg text-white py-3 px-[48px]"
              buttonName={
                isPollActive ? "Post your poll" : "Post your discussion"
              }
            />
          </div>
        </form>
      </div>
      <DynamicFooter
        buttonName={"Post your poll"}
        className={"w-full"}
        noArrow={true}
      />
    </div>
  );
}

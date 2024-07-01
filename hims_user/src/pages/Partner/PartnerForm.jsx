/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { usePartnerMutation } from "../../hooks/useMutateData";
import { useState } from "react";
import {
  usePartnerFormData,
  usePartnerFormTitleData,
} from "../../hooks/useQueryData";
import SearchSelectField from "../../components/UI/SearchSelectField";
import { FieldTypes } from "../../utils/constants";
import Header from "../../components/Header";
import { toast } from "react-toastify";

const validationSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  department: z.string().trim().min(1, "Department is required").max(255),
  item: z.string().trim().min(1, "Item is required").max(255),
});

export default function PartnerForm() {
  const location = useLocation();
  const state = location?.state;

  const navigate = useNavigate();
  const { data: partnerFormsData } = usePartnerFormTitleData();

  const [selectedPartnerForm, setSelectedPartnerForm] = useState(
    state
      ? {
          label: state?.form?.equipment?.title,
          value: state?.form?.equipment?.id,
        }
      : null
  );

  const { data } = usePartnerFormData({
    title: selectedPartnerForm?.value?.toString() ?? "",
  });

  const [stateData, setStateData] = useState(
    state?.data
      ? Object.entries(state?.data).map(([key, value]) => ({
          key,
          value,
        }))
      : []
  );

  const {
    setValue,
    setError,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: state
      ? {
          item: state?.form.equipment?.title,
          department: state?.department?.title,
          sub_department: state?.sub_department?.title,
        }
      : undefined,
  });
  const createPartnerMutation = usePartnerMutation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formDataObject = {};
    const formData = new FormData(e?.target);
    formData.append("form", data?.[0]?.id?.toString() ?? "");

    if (!state) {
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
    }
    if (state) {
      formData.delete("form");
      stateData?.forEach((value, key) => {
        formDataObject[key] = value;
      });
    }
    try {
      const result = await createPartnerMutation.mutateAsync([
        !state ? "post" : "put",
        !state ? "" : `${state?.idx}/`,
        !state ? formDataObject : formData,
      ]);
      if (result?.status === 200) {
        // setIsOpen(false);
        toast.success(
          !state
            ? "Partner created Successfully"
            : "Partner update Successfully"
        );
        navigate("/partner");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setError(Object.values(error?.response?.data)?.[0]);
    }
  };

  return (
    <div className="bg-grayBackground">
      <Header title={!state ? "Create Partner" : "Update Partner"} />

      <div className="space-y-4">
        <form
          onSubmit={onSubmitHandler}
          className="rounded bg-white  px-6 pt-4 pb-10 shadow"
        >
          <SearchSelectField
            label="Partner Forms"
            required
            placeholder="Select Partner Form"
            name="title"
            className="w-1/2"
            options={partnerFormsData?.map(({ title }) => ({
              value: title,
              label: title,
            }))}
            value={selectedPartnerForm}
            changeHandler={(option) => {
              setValue("title", option?.value?.toString() ?? "");
              setSelectedPartnerForm(option);
            }}
            errorMessage={errors.item?.message}
          />
          <div className="mt-5 grid grid-cols-2 gap-6">
            {data?.[0]?.attribute?.map((form, i) => {
              return (
                <div
                  className="text-sm flex items-center font-medium text-grayHeading"
                  key={i}
                >
                  {form.element === "Checkboxes" ? (
                    <div className="flex flex-col items-start gap-y-2 rounded">
                      <label
                        htmlFor={form.label}
                        className="flex gap-1 text-sm font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary peer-disabled:opacity-50"
                      >
                        <span>{form.label}</span>

                        {form.required ? (
                          <span className="text-danger">*</span>
                        ) : null}
                      </label>
                      {form?.options?.map((option, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded"
                        >
                          <input
                            multiple={false}
                            type="checkbox"
                            name={form?.label
                              ?.replace(/\s(?=\S)/g, "_")
                              .trim()
                              .toLowerCase()}
                            id={option.label}
                            value={option.value}
                            defaultChecked={
                              stateData?.find(
                                (data) =>
                                  data?.key ===
                                  form?.label
                                    ?.replace(/\s(?=\S)/g, "_")
                                    .trim()
                                    .toLowerCase()
                              )?.value === option.value
                            }
                          />
                          <label className="text-sm" htmlFor={form.label}>
                            {option.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : form.element === "Dropdown" ? (
                    <SearchSelectField
                      label={form.label}
                      required={form.required}
                      defaultValue={{
                        label: stateData?.find(
                          (data) =>
                            data?.key ===
                            form?.label
                              ?.replace(/\s(?=\S)/g, "_")
                              .trim()
                              .toLowerCase()
                        )?.value,
                        value: stateData?.find(
                          (data) =>
                            data?.key ===
                            form?.label
                              ?.replace(/\s(?=\S)/g, "_")
                              .trim()
                              .toLowerCase()
                        )?.value,
                      }}
                      placeholder={`Select ${form.label}`}
                      name={form?.label
                        .replace(/\s(?=\S)/g, "_")
                        .trim()
                        .toLowerCase()}
                      options={form?.options?.map((option) => ({
                        value: option.value,
                        label: option.text,
                      }))}
                      changeHandler={(option) => {
                        setValue(form?.label, option?.value?.toString() ?? "");
                      }}
                      className="w-full"
                    />
                  ) : form.element === "Image" ? (
                    <div className="mt-5 w-full flex flex-col items-start gap-y-2 rounded-lg">
                      <label
                        htmlFor={form.text}
                        className="flex gap-1 text-sm font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary peer-disabled:opacity-50"
                      >
                        <span>{form.text}</span>

                        {form.required ? (
                          <span className="text-danger">*</span>
                        ) : null}
                      </label>
                      {stateData?.find(
                        (data) =>
                          data?.key ===
                          form?.text
                            ?.replace(/\s(?=\S)/g, "_")
                            .trim()
                            .toLowerCase()
                      )?.value && (
                        <div>
                          <img
                            src={
                              typeof stateData?.find(
                                (data) =>
                                  data?.key ===
                                  form?.text
                                    ?.replace(/\s(?=\S)/g, "_")
                                    .trim()
                                    .toLowerCase()
                              )?.value === "string"
                                ? stateData?.find(
                                    (data) =>
                                      data?.key ===
                                      form?.text
                                        ?.replace(/\s(?=\S)/g, "_")
                                        .trim()
                                        .toLowerCase()
                                  )?.value
                                : URL.createObjectURL(
                                    stateData?.find(
                                      (data) =>
                                        data?.key ===
                                        form?.text
                                          ?.replace(/\s(?=\S)/g, "_")
                                          .trim()
                                          .toLowerCase()
                                    )?.value
                                  )
                            }
                            alt={form?.text}
                            className="w-1/2"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        required={form.required}
                        name={form?.text
                          ?.replace(/\s(?=\S)/g, "_")
                          .trim()
                          .toLowerCase()}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setStateData((prev) =>
                              prev?.find(
                                (data) =>
                                  data?.key ===
                                  form?.text
                                    ?.replace(/\s(?=\S)/g, "_")
                                    .trim()
                                    .toLowerCase()
                              )
                                ? prev?.map((data) =>
                                    data?.key ===
                                    form?.text
                                      ?.replace(/\s(?=\S)/g, "_")
                                      .trim()
                                      .toLowerCase()
                                      ? {
                                          key: data?.key,
                                          value: file,
                                        }
                                      : data
                                  )
                                : [
                                    ...prev,
                                    {
                                      key: form?.text
                                        ?.replace(/\s(?=\S)/g, "_")
                                        .trim()
                                        .toLowerCase(),
                                      value: file,
                                    },
                                  ]
                            );
                          }
                        }}
                        id={form?.text}
                        accept="image/*"
                        className="peer w-full rounded border border-grayBorderDark px-3 py-2 text-[14.5px] placeholder:italic placeholder:text-grayText hover:border-grayText focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  ) : form.element === "FileUpload" ? (
                    <div className="flex w-full flex-col items-start gap-y-2 rounded-lg">
                      <label
                        htmlFor={form.label}
                        className="flex gap-1 text-sm font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary peer-disabled:opacity-50"
                      >
                        <span>{form.label}</span>

                        {form.required ? (
                          <span className="text-danger">*</span>
                        ) : null}
                      </label>
                      {stateData?.find(
                        (data) =>
                          data?.key ===
                          form?.label
                            ?.replace(/\s(?=\S)/g, "_")
                            .trim()
                            .toLowerCase()
                      )?.value && (
                        <div>
                          <a
                            href={
                              stateData?.find(
                                (data) =>
                                  data?.key ===
                                  form?.label
                                    ?.replace(/\s(?=\S)/g, "_")
                                    .trim()
                                    .toLowerCase()
                              )?.value
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary"
                          >
                            View File
                          </a>
                        </div>
                      )}
                      <input
                        type="file"
                        required={form.required}
                        name={form?.label
                          ?.replace(/\s(?=\S)/g, "_")
                          .trim()
                          .toLowerCase()}
                        id={form?.text}
                        accept={
                          form?.fileType === "image"
                            ? "image/*"
                            : ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        }
                        className="peer w-full rounded border border-grayBorderDark px-3 py-2 text-[14.5px] placeholder:italic placeholder:text-grayText hover:border-grayText focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  ) : form?.element === "RadioButtons" ? (
                    <div className="flex flex-col items-start gap-y-2 rounded">
                      <label
                        htmlFor={form.label}
                        className="flex gap-1 text-sm font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary peer-disabled:opacity-50"
                      >
                        <span>{form.label}</span>
                        {form.required ? (
                          <span className="text-danger">*</span>
                        ) : null}
                      </label>

                      {form?.options?.map((option, i) => {
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 rounded"
                          >
                            <input
                              type="radio"
                              name={form?.label
                                ?.replace(/\s(?=\S)/g, "_")
                                .trim()
                                .toLowerCase()}
                              id={option.text}
                              defaultChecked={
                                stateData?.find(
                                  (data) =>
                                    data?.key ===
                                    form?.label
                                      ?.replace(/\s(?=\S)/g, "_")
                                      .trim()
                                      .toLowerCase()
                                )?.value === option.text
                              }
                              value={option.text}
                              required={form.required}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="w-full">
                      <InputField
                        registerName={form?.label
                          ?.replace(/\s(?=\S)/g, "_")
                          .trim()
                          .toLowerCase()}
                        label={form.label}
                        register={register}
                        defaultValue={
                          stateData?.find(
                            (data) =>
                              data?.key ===
                              form?.label
                                ?.replace(/\s(?=\S)/g, "_")
                                .trim()
                                .toLowerCase()
                          )?.value ??
                          form?.options?.[0]?.value ??
                          []
                        }
                        required={form.required}
                        type={
                          FieldTypes.find((type) => type.label === form.element)
                            ?.value
                        }
                        placeholder={
                          form?.element !== "DatePicker" &&
                          `Enter ${form.label}`
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <div className="mt-8 w-60 flex justify-end gap-2">
              <Button
                variant="secondary"
                color="danger"
                type="reset"
                buttonName={"Clear"}
                className=" py-1 rounded-lg hover:opacity-80 bg-red-600"
                handleButtonClick={() => {
                  reset();
                }}
              />
              <Button
                type={"submit"}
                buttonName={!state ? "Create" : "Update"}
                className={" hover:opacity-80 rounded-lg "}
                handleButtonClick={() => {}}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

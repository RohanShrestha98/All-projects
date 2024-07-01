/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useToast } from "../../contexts/ToastContext";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useInventoryMutation } from "../../hooks/useMutateData";
import { useState } from "react";
import {
  useAllDepartmentData,
  useDepartmentItemsData,
  useFetchAllDynamicFormData,
  useHospitalSubDepartmentsAllList,
} from "../../hooks/useQueryData";
import SearchSelectField from "../../components/UI/SearchSelectField";
import { FieldTypes } from "../../utils/constants";
import Header from "../../components/Header";
import { toast } from "react-toastify";
// import SubHeading from "../Shared/SubHeading";

const validationSchema = z.object({
  department: z.string().trim().min(1, "Department is required").max(255),
  item: z.string().trim().min(1, "Item is required").max(255),
});

export default function InventoryForm() {
  const location = useLocation();
  const state = location?.state;
  const [selectedDepartment, setSelectedDepartment] = useState(
    state
      ? {
          label: state?.form?.department?.title,
          value: state?.form?.department?.id,
        }
      : null
  );

  const [selectedItem, setSelectedItem] = useState(
    state
      ? {
          label: state?.form?.equipment?.title,
          value: state?.form?.equipment?.id,
        }
      : null
  );

  const navigate = useNavigate();
  const { data: departmentData } = useAllDepartmentData();
  const { data: itemsData } = useDepartmentItemsData({
    department: selectedDepartment?.value?.toString() ?? "",
  });

  const { data: dynamicFormData } = useFetchAllDynamicFormData({
    department: selectedDepartment?.value?.toString() ?? "",
    item: selectedItem?.value?.toString() ?? "",
  });
  const { data: subDepartmentData } = useHospitalSubDepartmentsAllList();

  const [stateData, setStateData] = useState(
    state?.data
      ? Object.entries(state?.data).map(([key, value]) => ({
          key,
          value,
        }))
      : []
  );

  const [selectedSubDepartment, setSelectedSubDepartment] = useState(
    state
      ? {
          label: state?.sub_department?.title,
          value: state?.sub_department?.id,
        }
      : null
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
  const createInventoryMutation = useInventoryMutation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedDepartment)
      return setError("department", {
        type: "manual",
        message: "Department is required",
      });
    if (!selectedItem)
      return setError("item", {
        type: "manual",
        message: "Item is required",
      });
    const formDataObject = {};
    const formData = new FormData(e?.target);
    formData.append("department", selectedDepartment?.value);
    formData.append("sub_department", selectedSubDepartment?.value ?? "");
    formData.append("equipment", selectedItem?.value);
    formData.delete("item");
    formData.append("form", dynamicFormData?.[0]?.id?.toString() ?? "");

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
      const result = await createInventoryMutation.mutateAsync([
        !state ? "post" : "put",
        !state ? "" : `${state?.idx}/`,
        !state ? formDataObject : formData,
      ]);
      if (result?.status === 200) {
        // setIsOpen(false);
        toast.success(
          !state
            ? "Inventory created Successfully"
            : "Inventory update Successfully"
        );
        navigate("/inventory");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setError(Object.values(error?.response?.data)?.[0]);
    }
  };

  const defaultdepartment = departmentData?.filter(
    (item) => item?.idx === state?.department?.idx
  );

  const defaultDepartmentOption = {
    value: defaultdepartment?.[0]?.idx,
    label: defaultdepartment?.[0]?.department?.title,
  };
  const defaultItem = dynamicFormData?.filter(
    (item) => item?.equipment?.idx === state?.form?.equipment?.idx
  );

  const defaultItemOption = {
    value: defaultItem?.[0]?.equipment?.idx,
    label: defaultItem?.[0]?.equipment?.title,
  };

  return (
    <div className="bg-grayBackground">
      <Header title={!state ? "Create Inventory" : "Update Inventory"} />

      <div className="space-y-4">
        <form
          onSubmit={onSubmitHandler}
          className="rounded bg-white  px-6 pt-4 pb-10 shadow"
        >
          <div className="flex items-start justify-between gap-x-6 mb-6">
            {itemsData?.length ? (
              <SearchSelectField
                label="Service Item"
                required
                placeholder="Select Service Item"
                name="item"
                className="w-1/2"
                options={itemsData?.map(({ title, id }) => ({
                  value: id,
                  label: title,
                }))}
                value={selectedItem}
                defaultValue={state && defaultItemOption}
                changeHandler={(option) => {
                  setValue("item", option?.value?.toString() ?? "");
                  setSelectedItem(option);
                }}
                errorMessage={errors.item?.message}
              />
            ) : null}
            <SearchSelectField
              label="Department"
              placeholder="Select Department"
              name="department"
              className="w-1/2"
              options={departmentData?.map(({ department, id }) => ({
                value: id,
                label: department?.title,
              }))}
              defaultValue={state && defaultDepartmentOption}
              value={selectedDepartment}
              changeHandler={(option) => {
                setValue("department", option?.value?.toString() ?? "");
                setSelectedDepartment(option);
              }}
              errorMessage={errors.department?.message}
            />
            <SearchSelectField
              label="Sub Department"
              placeholder="Select Sub Department"
              name="sub_department"
              className="w-1/2"
              options={subDepartmentData?.map(({ id, title }) => {
                return {
                  value: id,
                  label: title,
                };
              })}
              value={selectedSubDepartment}
              changeHandler={(option) => {
                setValue("sub_department", option?.value?.toString() ?? "");
                setSelectedSubDepartment(option);
              }}
              errorMessage={errors.sub_department?.message}
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-6">
            {dynamicFormData?.[0]?.attribute?.map((form, i) => {
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
                  setSelectedDepartment();
                  setSelectedItem();
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

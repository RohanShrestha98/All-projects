import React, { useEffect } from "react";
import { DatePicker, Input, Radio, Select } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { useQueryData } from "../../../hooks/useQueryData";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
dayjs.extend(utc);

const Student = ({ nextStep, isLoading, data, setData, add }) => {
  const width = useWindowsDimensions();
  const { auth } = useAuthContext();
  const { changeLayout } = useChangeLayout();
  const { data: gradeData } = useQueryData(
    ["grade"],
    "api/v1/grade/list/",
    "",
    auth?.user?.role?.id !== 5,
  );
  const gradeListOptions = [];
  gradeData?.data?.map(item => {
    return gradeListOptions?.push({
      label: item?.name,
      value: item?.id,
    });
  });
  const location = useLocation();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const saveData = data => {
    setData({ ...data });
    nextStep();
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Student Information
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  First Name <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.firstName"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter first name"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.firstName?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Surname <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.surname"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter surname"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.surname?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Email <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email!",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.email?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
                {errors?.student?.email?.type === "pattern" && (
                  <p className="text-sm text-red">
                    {errors?.student?.email?.message}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Username <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.username"
                  control={control}
                  rules={{
                    required: true,
                    validate: value => {
                      if (value === value?.toLowerCase()) {
                        return true;
                      } else {
                        return "Username must be in lowercase";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                      placeholder="Enter username"
                    />
                  )}
                />
                {errors?.student?.username?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
                {errors?.student?.username?.type === "validate" && (
                  <p className="text-sm text-red">
                    {errors?.student?.username?.message}
                  </p>
                )}
              </>
            )}
          </div>
          {add && (
            <div className="flex flex-col">
              {isLoading ? (
                <ShimmerThumbnail line={1} height={40} />
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                      Password
                    </label>
                  </div>
                  <Controller
                    name="student.password"
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, one number, and one special character",
                      },
                    }}
                    render={({ field }) => (
                      <Input.Password
                        placeholder="Enter the password"
                        onChange={e => {
                          const trimmedValue = e.target.value.trimStart();
                          field.onChange(trimmedValue);
                          field.value = trimmedValue;
                        }}
                        value={field.value}
                      />
                    )}
                  />
                  {errors?.student?.password?.type === "required" && (
                    <p className="text-sm text-red">Required</p>
                  )}
                  {errors?.student?.password?.type === "pattern" && (
                    <p className="text-sm text-red">
                      {errors?.student?.password?.message}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <div>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                Grade <span className="text-red">*</span>
              </label>
              <Controller
                name="grade"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    onChange={grade => {
                      field.onChange(grade);
                      field.value = grade;
                    }}
                    style={{
                      width: "100%",
                      marginTop: "7px",
                    }}
                    disabled={
                      location?.state?.edit && auth?.user?.role?.id === 5
                    }
                    value={field.value}
                    options={gradeListOptions}
                    placeholder="Select grade"
                  />
                )}
              />
              {errors?.grade?.type === "required" && (
                <p className="text-sm text-red">Required</p>
              )}
            </div>
          )}
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Home Phone
                </label>
                <Controller
                  name="student.homePhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="es"
                      onChange={phone => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Cellular <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.cellular"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="es"
                      onChange={phone => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.cellular?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Date of Birth <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.dob"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      disabledDate={d => !d || d?.isAfter(new Date())}
                      ref={field.ref}
                      value={field?.value && dayjs(field?.value)}
                      onChange={date => {
                        date && field?.onChange(dayjs(date)?.local()?.format());
                      }}
                      format="DD/MM/YYYY"
                    />
                  )}
                />
                {errors?.student?.dob?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Birth Place <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.birthplace"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                      placeholder="Enter birthplace"
                    />
                  )}
                />
                {errors?.student?.birthplace?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  MinEduc Id <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.minEducId"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      disabled={
                        location?.state?.edit && auth?.user?.role?.id === 5
                      }
                      value={field.value}
                      placeholder="Enter ministry education Id"
                    />
                  )}
                />
                {errors?.student?.minEducId?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Gender <span className="text-red">*</span>
                </label>
                <Controller
                  name="student.gender"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Radio.Group
                      ref={field.ref}
                      name="radiogroup"
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      defaultValue={
                        `${data?.student?.gender?.toLowerCase()}` || "male"
                      }
                      value={field.value}
                    >
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Radio.Group>
                  )}
                />
                {errors?.student?.gender?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Active
                </label>
                <Controller
                  name="student.isActive"
                  control={control}
                  rules={{
                    required: false,
                  }}
                  defaultValue={true}
                  render={({ field }) => (
                    <Radio.Group
                      ref={field.ref}
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                      defaultValue={"student.isActive"}
                      name="radiogroup"
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  )}
                />
                {errors?.student?.isActive?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-8">
          {isLoading ? (
            <div className="flex col-end-9 col-span-2 justify-center items-center rounded-full">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 px-6 py-2 text-white rounded-full bg-blue-light "
            >
              Next <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Student;

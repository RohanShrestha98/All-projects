import React, { useEffect, useState } from "react";
import { Input, Radio, Select } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowRight2 } from "react-icons/im";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { useRoleData, useRoleByUserData } from "../../hooks/useQueryData";
import { convertToSelectOptions } from "../../utils/convertToSelectOptions";
import { Button } from "../../components/UI/button";

dayjs.extend(utc);

const UserForm = ({
  resErrors,
  onSubmitHandler,
  isLoading,
  isEditForm,
  roleId,
  setRoleId,
  editDefaultValues,
}) => {
  const { data: roleList } = useRoleData();
  const [addStaffClick, setAddStaffClick] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm(
    isEditForm
      ? {
          defaultValues: editDefaultValues,
        }
      : {
          defaultValues: {
            firstName: "",
            surname: "",
            username: "",
            password: "",
            email: "",
            cellular: "",
            birthplace: "",
            head: "",
            isActive: true,
            role: {},
          },
        },
  );
  const {
    data: heads,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRoleByUserData({
    role: roleId - 1,
  });

  const headOptions =
    isSuccess &&
    heads?.pages?.[0]?.data?.map(item => {
      return {
        value: item.id,
        label: `${
          item?.firstName && item?.surname
            ? item?.firstName + " " + item?.surname
            : item?.username
        }`,
      };
    });

  const [head, setHead] = useState(
    headOptions
      ? headOptions?.find(item => item?.value === editDefaultValues?.head)
      : [],
  );

  const handleRoleChange = value => {
    setValue("role", value);
    setRoleId?.(value);
    setValue("head", null);
    setHead(null);
  };

  const handleHeadChange = data => {
    setValue("head", data?.value);
    setHead({ label: data?.label, value: data?.value });
  };

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <div className="flex flex-col">
          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <Input
                    placeholder="Enter first name"
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
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
                Surname
              </label>
              <Controller
                name="surname"
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <Input
                    placeholder="Enter surname"
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
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
                Username <span className="text-red">*</span>
              </label>
              <Controller
                name="username"
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
                    placeholder="Enter username"
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
                    }}
                    value={field.value}
                  />
                )}
              />

              {resErrors?.username && (
                <p className="text-sm text-red">{resErrors?.username}</p>
              )}
              {errors?.username?.type === "required" && (
                <p className="text-sm text-red">Required</p>
              )}
              {errors?.username?.type === "validate" && (
                <p className="text-sm text-red">{errors?.username?.message}</p>
              )}
            </>
          )}
        </div>
        {!isEditForm && (
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Password <span className="text-red">*</span>
                </label>
                <Controller
                  name="password"
                  placeholder="Enter password"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input.Password
                      placeholder="Enter password"
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.password?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
                {resErrors?.password && (
                  <p className="text-sm text-red">{resErrors?.password}</p>
                )}
              </>
            )}
          </div>
        )}

        <div className="flex flex-col">
          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                Email <span className="text-red">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    placeholder="Enter email address"
                    type="email"
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
                    }}
                    value={field.value}
                  />
                )}
              />
              {resErrors?.email && (
                <p className="text-sm text-red">{resErrors?.email}</p>
              )}
              {errors?.email?.type === "required" && (
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
                Cellular <span className="text-red">*</span>
              </label>
              <Controller
                name="cellular"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    defaultCountry="es"
                    onChange={phone => {
                      field.onChange(phone);
                      field.value = phone;
                    }}
                    value={field.value}
                  />
                )}
              />
              {resErrors?.cellular && (
                <p className="text-sm text-red">{resErrors?.cellular}</p>
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
                Birth Place
              </label>
              <Controller
                name="birthplace"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Enter birthplace"
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
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
                Role <span className="text-red">*</span>
              </label>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: true,
                }}
                render={() => {
                  return (
                    <Select
                      allowClear
                      options={convertToSelectOptions(roleList)}
                      placeholder="Select role"
                      onChange={data => {
                        handleRoleChange(data);
                      }}
                      defaultValue={
                        editDefaultValues ? editDefaultValues?.role : []
                      }
                    />
                  );
                }}
              />
              {addStaffClick && watch("role")?.length && (
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
                Head <span className="text-red">*</span>
              </label>
              <Controller
                name="head"
                control={control}
                rules={{
                  required: roleId === 1 ? false : true,
                }}
                render={() => {
                  return (
                    <Select
                      allowClear
                      labelInValue
                      notFoundContent={
                        isFetchingNextPage
                          ? "Loading more..."
                          : hasNextPage
                          ? "Load More"
                          : "No data"
                      }
                      // onPopupScroll={handlePopupScroll}
                      options={headOptions}
                      placeholder="Select head"
                      onChange={data => {
                        handleHeadChange(data);
                      }}
                      defaultValue={
                        editDefaultValues
                          ? [
                              {
                                value: editDefaultValues?.head?.id,
                                label: editDefaultValues?.head?.name,
                              },
                            ]
                          : []
                      }
                    />
                  );
                }}
              />
              {errors?.head?.type === "required" && (
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
                IsActive
              </label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Radio.Group
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
                    }}
                    value={field.value}
                    defaultValue={true}
                  >
                    <Radio value={true}>True</Radio>
                    <Radio value={false}>False</Radio>
                  </Radio.Group>
                )}
              />
            </>
          )}
        </div>
      </div>
      <div
        className="flex justify-end mt-3"
        onClick={() => setAddStaffClick(true)}
      >
        {isLoading ? (
          <div className="flex justify-center items-center rounded-full">
            <ShimmerButton size="md" />
          </div>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="flex justify-center items-center gap-2 px-6"
          >
            Submit <ImArrowRight2 />
          </Button>
        )}
      </div>
    </form>
  );
};

export default UserForm;

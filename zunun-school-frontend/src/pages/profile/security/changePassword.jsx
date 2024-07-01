import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LockOutlined } from "@ant-design/icons";
import InputFileld from "../../../components/inputFiled/inputField";

const loginSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .max(50, "Too Long!"),

  newPassword: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .max(50, "Too Long!"),

  confirmNewPassword: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New and Confirm Passwords must match",
    ),
});

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmitHandler = () => {};

  return (
    <div className="bg-white w-3/5 lg:w-full p-6 border-none rounded-md">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col space-y-4"
      >
        <span className="text-sm font-semibold">
          Once changed,your new password will be in effect next time you login.{" "}
        </span>
        <div className="rounded-md space-y-2">
          <span>Current Password </span>
          <InputFileld
            {...register("currentPassword")}
            name="currentPassword"
            type="password"
            placeholder="Current password"
            prefixIcon={<LockOutlined />}
          />
          <p className="text-red text-sm">{errors?.currentPassword?.message}</p>
        </div>
        <div className="rounded-md space-y-2">
          <span>New Password </span>
          <InputFileld
            {...register("newPassword")}
            name="newPassword"
            type="password"
            placeholder="New password"
            prefixIcon={<LockOutlined />}
          />
          <p className="text-red text-sm">{errors?.newPassword?.message}</p>
        </div>
        <div className="rounded-md space-y-2">
          <span>Confirm New Password </span>
          <InputFileld
            {...register("confirmNewPassword")}
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            prefixIcon={<LockOutlined />}
          />
          <p className="text-red text-sm">
            {errors?.confirmNewPassword?.message}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => reset()}
            type="reset"
            className="py-2 text-gray rounded-full bg-gray-100 border"
          >
            Clear
          </button>
          <button
            type="submit"
            className="py-2 text-white rounded-full bg-blue-light border border-blue hover:bg-white hover:text-blue"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

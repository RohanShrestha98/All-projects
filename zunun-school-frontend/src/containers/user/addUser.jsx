/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { message } from "antd";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import "react-international-phone/style.css";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { useNavigate } from "react-router-dom";
import { useUserMutation } from "../../hooks/useMutateData";
import UserForm from "./userForm";
import { usePermissionsByRole } from "../../hooks/useQueryData";
import { BiArrowBack } from "react-icons/bi";
dayjs.extend(utc);

const AddUser = () => {
  const navigate = useNavigate();
  const userMutation = useUserMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [resErrors, setResErrors] = useState("");
  const [roleId, setRoleId] = useState();

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, [500]);
  }, []);

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const { data: defaultPermissions, isLoading: defaultPermissionsLoading } =
    usePermissionsByRole({ roleId });

  const onSubmitHandler = data => {
    userMutation.mutate(["post", "create", data], {
      onSuccess: (data, variables) => {
        message.success("User Created Successfully", [2]);
        navigate("/user/assignPermission", {
          state: {
            userId: data && data.userId,
            defaultPermissionsLoading: defaultPermissionsLoading,
            defaultPermissions: defaultPermissions && defaultPermissions?.data,
          },
        });
      },
      onError: error => {
        let errorMessage = error?.response?.data?.errors
          ? Object?.values(error?.response?.data?.errors).join(", ")
          : error?.message?.toString();
        message.error(errorMessage, [2]);
        setResErrors(error?.response?.data?.errors);
      },
    });
  };

  return (
    <div className="w-full space-y-10">
      <h3 className="flex items-center gap-4">
        <button
          className=" flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={16} />
        </button>
        Add Staff
      </h3>
      <UserForm
        resErrors={resErrors}
        roleId={roleId}
        setRoleId={setRoleId}
        isLoading={isLoading}
        onSubmitHandler={onSubmitHandler}
        isEditForm={false}
      />
    </div>
  );
};

export default AddUser;

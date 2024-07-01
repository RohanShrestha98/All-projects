import React, { useEffect, useState } from "react";
import { message } from "antd";
import { ImArrowLeft2 } from "react-icons/im";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import "react-international-phone/style.css";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserMutation } from "../../hooks/useMutateData";
import UserForm from "./userForm";
dayjs.extend(utc);

const EditUser = () => {
  const navigate = useNavigate();
  const userMutation = useUserMutation();
  const location = useLocation();

  const { userData, userId } = location?.state || {};
  const [roleId, setRoleId] = useState(userData?.role?.id);

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const editDefaultValues = {
    firstName: userData?.firstName,
    surname: userData?.surname,
    username: userData?.username,
    email: userData?.email,
    cellular: userData?.cellular,
    birthplace: userData?.birthplace,
    head: userData?.head,
    isActive: userData?.isActive,
    role: userData?.role?.id,
  };

  const onSubmitHandler = data => {
    userMutation.mutate(["patch", `update/${userId}`, data], {
      onSuccess: () => {
        message.success("User Updated Successfully", [2]);
        navigate("/user");
      },
      onError: error => {
        let errorMessage = error?.response?.data?.errors
          ? Object?.values(error?.response?.data?.errors).join(", ")
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  return (
    <div className="w-full space-y-10">
      <div className="flex items-center justify-between">
        <h3
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border border-blue rounded-md bg-blue text-white hover:text-blue hover:bg-white  cursor-pointer px-3 text-sm py-1"
        >
          <ImArrowLeft2 className="hover:cursor-pointer hover:text-cyan hover:scale-[120%]" />
        </h3>
        <h2 className="text-xl font-semibold">Edit Staff</h2>
        <div></div>
      </div>
      <UserForm
        isLoading={false}
        onSubmitHandler={onSubmitHandler}
        isEditForm={true}
        editDefaultValues={editDefaultValues}
        setRoleId={setRoleId}
        roleId={roleId}
      />
    </div>
  );
};

export default EditUser;

/* eslint-disable no-unused-vars */
import React from "react";
import ronaldo from "../../images/ronaldo.webp";
import MobileHeader from "../../components/navbar/mobileHeader";
import { CameraSvg } from "../../assets/allSvg";
import { DynamicFooter } from "../../components/footer/dynamicFooter";
import InputField from "../../components/inputField/inputField";
import { useAuthStore } from "../../store/useAuthStore";
import { useForm } from "react-hook-form";
import {
  useProfileMutation,
  useProfileImageUploadMutation,
} from "../../hooks/useMutateData";
import { message } from "antd";
import { useModuleStore } from "../../store/useModuleStore";

export default function ViewProfile() {
  const { user, setUser } = useAuthStore();
  const { currentModule } = useModuleStore();
  const profileMutation = useProfileMutation(currentModule?.module_id);
  const profileImageUploadMutation = useProfileImageUploadMutation(
    currentModule?.module_id
  );

  console.log("user", user?.user);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmitHandler = async (data) => {
    try {
      const result = await profileMutation.mutateAsync(["post", "", data]);
      setUser(result?.user);
      message.success("Profile Updated Successfully", [2]);
    } catch (error) {
      let errorMessage = error?.response?.data?.error
        ? error?.response?.data?.message?.toString()
        : error?.message?.toString();
      message.error(errorMessage, [2]);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      try {
        const result = await profileImageUploadMutation.mutateAsync([
          "post",
          "",
          { file: file },
        ]);
        const updatedUser = {
          ...user,
          imageId: result?.imageId,
        };
        setUser(updatedUser);
        message.success("Profile Image Updated Successfully", [2]);
      } catch (error) {
        let errorMessage = error?.response?.data?.error
          ? error?.response?.data?.message?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      }
    }
  };

  return (
    <div>
      <MobileHeader headerName={"My Profile"} noProfile={true} />
      <div className="md:px-3">
        <div className="bg-[#F7F7F7] md:bg-transparent items-center flex md:flex-col justify-between md:gap-3  py-4 md:py-0 px-10 md:px-0 rounded-xl mt-6 mb-7 md:my-5">
          <div className="md:bg-[#F7F7F7] md:p-3 md:w-full md:rounded-xl flex gap-6 md:gap-4 items-center">
            <div className="flex">
              <img
                className="border-white shadow-lg rounded-full border-2 h-16 w-16 md:h-14 md:w-14"
                src={ronaldo}
                alt=""
              />
              <input
                type="file"
                id="profile-image"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handleProfileImageUpload(e)}
                className="hidden"
              />
              <label htmlFor="profile-image">
                <CameraSvg className="bg-[#bcbaba] rounded-full relative justify-end mt-[40px] ms-[-10px] cursor-pointer" />
              </label>
            </div>
            <div className="flex flex-col gap-[6px] md:gap-[2px] ">
              <p className="text-[#333] text-xl md:text-sm font-medium">
                {user?.name}
              </p>
              <p className="text-[11px] md:text-[9px] text-[#667085]">
                {user?.phone}
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-6 md:gap-4 p-6 md:p-0 shadow md:shadow-none rounded-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-4">
            <div className="flex flex-col gap-[6px]">
              <InputField
                {...register("name")}
                className=" rounded-lg shadow-xs  text-base text-[#344054] w-full"
                placeholder="Full name"
                name="name"
                label="Full Name"
                defaultValue={
                  user?.user?.firstName + " " + user?.user?.lastName
                }
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <InputField
                {...register("phone")}
                className=" rounded-lg shadow-xs  text-base text-[#344054] w-full"
                placeholder="+977-9856565653"
                name="phone"
                label="Phone Number"
                defaultValue={user?.user?.phone}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <InputField
              {...register("email")}
              className="rounded-lg shadow-xs text-base text-[#344054] w-full"
              placeholder="email@gmail.com"
              name="email"
              label="Email"
              defaultValue={user?.user?.email}
            />
          </div>
          <div className="flex gap-3 justify-end md:hidden">
            <button
              type="submit"
              className="py-[10px] text-white rounded-lg bg-theme-color leading-5 px-4"
            >
              {" "}
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <DynamicFooter
        buttonName={"Save Changes"}
        noArrow={true}
        className={"justify-end"}
      />
    </div>
  );
}

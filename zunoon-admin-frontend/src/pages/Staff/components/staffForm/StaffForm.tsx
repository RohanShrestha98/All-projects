import React, { useState, useEffect } from "react";
import { BsPatchQuestion } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import http from "../../../../utils/http";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import "./StaffForm.scss";
import config from "../../../../config";
import type { IStaff } from "../../../../@types/staff";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { optionType } from "../../../../@types/option";
import toast from "../../../../utils/toast";
import { TFunction } from "i18next";
import { withTranslation } from "react-i18next";
import { getPermissions } from "../../../../utils/storage";
import PasswordField from "../../../../components/InputField/passwordField";
import { useUserContext } from "../../../../context/UserContextProvider";

const roleApi = config.endpoints.api.role;
const fileUploadApi = config.endpoints.api.file;

type PropsType = {
  t?: TFunction;
  data?: IStaff;
  editform?: boolean;
  handleCancel?: () => void;
  handleClickSubmit?: (data: IStaff) => void;
  handleClickUpdate?: () => (handleCancel) => SubmitHandler<undefined>;
  isLoading?: boolean;
  error?: any;
};

const StaffForm = ({
  t,
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isLoading,
  error,
}: PropsType) => {
  const [roleOptions, setRoleOptions] = useState<optionType[]>([]);
  const [imageUrl, setImageUrl] = useState<string | File>(editform ? data?.file : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [staffPassword, setStaffPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState();
  const { user } = useUserContext();

  const isSuperAdmin = user?.role?.name === "superadmin"



  useEffect(() => {
    async function getData() {
      try {
        const response = await http.GET(roleApi.list, "");
        const filteredRoles = response?.data.map(role => ({
          value: role.id,
          label: role.name.includes("superadmin")
            ? "Super Admin"
            : role.name.includes("admin")
              ? "Admin"
              : role.name.includes("contentdeveloper")
                ? "Content Developer"
                : role.name.includes("contentsupervisor")
                  ? "Content Supervisor"
                  : "Some Role",
        }));
        const superAdminAddStaffRole = [
          {
            label: "Admin",
            value: 2,
          },
          {
            label: "Content Supervisor",
            value: 3,
          },
          {
            label: "Content Developer",
            value: 4,
          },
        ]

        setRoleOptions(isSuperAdmin ? superAdminAddStaffRole : filteredRoles);

        if (editform) {
          const grade = filteredRoles.find(item => item.value === data?.role.id);
          setSelectedRole(grade);
        }
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, []);

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data?.id,
        file: data && data?.file,
        email: data && data?.email,
        phoneNumber: data && data?.phoneNumber,
        role: data && data?.role.id,
        username: data && data?.username,
        password: data && data?.password,
        lastName: data && data?.lastName,
        firstName: data && data?.firstName,
        middleName: data && data?.middleName,
        permissions: data && data.permissions,
        isRoleUpdated: false,
      },
    },
  );

  const watchRole = watch("role");

  const handleReset = () => {
    reset({
      phoneNumber: "",
      email: "",
      file: null,
      username: "",
      password: "",
      lastName: "",
      firstName: "",
      middleName: "",
    });
    setSelectedRole(null);
  };
  const handleClear = () => {
    handleReset();
    setImageUrl("");
  };

  useEffect(() => {
    if (editform) {
      if (data.role.id === watchRole) {
        setValue("isRoleUpdated", false);
      } else {
        setValue("isRoleUpdated", true);
      }
    }
  }, [watchRole]);

  const staffPermissions = getPermissions()
    .filter(each => each.url.path.includes("user"))
    .map(each => each.url.path);

  const handleRoleSelectChange = (roleData, e) => {
    setSelectedRole(roleData);
    setValue("role", roleData.value);

    http.GET(roleApi.rolePerms(roleData.value), "").then(res => {
      const idList = res.data.data.map(obj => obj.id);
      setValue("permissions", idList);
    });
  };

  const handleImageUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "user",
        type: fileType,
        file: file,
      });
      setIsUploading(false);
      setImageUrl(response?.data?.data);
      setValue("file", response?.data?.data, { shouldDirty: true });
    } catch (err) {
      toast.error(err?.message?.toString());
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setValue("password", staffPassword);
  }, [staffPassword]);
  return (
    <form
      className="staff_form_container"
      onSubmit={handleSubmit(editform ? handleClickUpdate()(handleCancel) : handleClickSubmit)}
    >
      <div className="row_container">
        <div className="staff_image">
          <ImageInput
            image={imageUrl?.url}
            isUploading={isUploading}
            staffForm
            editform={editform}
            buttonDisable={staffPermissions.includes("/user/upload-profile-image/")}
            setImage={setImageUrl}
            {...register("file", {
              required: false,
            })}
            onChange={handleImageUpload}
          />
        </div>

        <div className="col_container">
          <div className="row_container">
            <div className={`input_container ${editform && "disabled-input-field"}`}>
              <InputField
                required
                disabled={editform}
                type="text"
                label={t("username")}
                placeholder={t("placeholder_username")}
                {...register("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern:
                    /^(?=.{3,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]*[a-zA-Z0-9][a-zA-Z0-9.]*$/i,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.username?.type === "required" && (
                <p className="error">{t("field_required")}</p>
              )}
              {errors?.username?.type === "maxLength" && (
                <p className="error">{t("username_cannot_exceed_20_characters")}</p>
              )}
              {errors?.username?.type === "minLength" && (
                <p className="error">{t("username_must_have_at_least_3_characters")}</p>
              )}
              {errors?.username?.type === "pattern" && (
                <p className="error">{t("invalid_username")}</p>
              )}
              {error?.username && (
                <p className="error">{t("username_already_exists")}</p>
              )}
            </div>
            <div className="input_container">
              <PasswordField
                icon={<BsPatchQuestion />}
                tooltipText={[
                  t("must_be_8_characters_long"),
                  t("must_contain_at_least_one_capital_letter"),
                  t("must_contain_at_least_one_number"),
                  t("must_contain_at_least_one_special_number"),
                ]}
                required
                label={t("password")}
                placeholder={t("auto_generated_password")}
                {...register("password", {
                  required: false,
                })}
                name="password"
                value={staffPassword}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trim();
                  setStaffPassword(e.target.value);
                }}
                setValue={setStaffPassword}
              />
              {error?.password && (
                <p className="error">{t("insecure_password")}</p>
              )}
            </div>
          </div>
          <div className="row_container">
            <div className="input_container">
              <CustomSelect
                required={true}
                register={register}
                name="role"
                label={t("th_role")}
                placeholder={t("select_a_role_to_assign")}
                value={selectedRole}
                handleChange={(e, data) => {
                  handleRoleSelectChange(e, data);
                }}
                options={roleOptions}
                disabled={false}
              />
              {errors?.role?.type === "required" && <p className="error">{t("field_required")}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="row_container names_row_container">
        <div className="input_container">
          <InputField
            required
            type="text"
            label={t("first_name")}
            placeholder={t("placeholder_first_name")}
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[^\d]+$/i,
            })}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          {errors?.firstName?.type === "pattern" && (
            <p className="error">{t("no_numeric_character")}</p>
          )}
          {errors?.firstName?.type === "required" && <p className="error">{t("field_required")}</p>}
          {errors?.firstName?.type === "maxLength" && (
            <p className="error">
              {t("first_name")} {t("cannot_exceed_20_characters")}
            </p>
          )}
        </div>

        <div className="input_container">
          <InputField
            type="text"
            label={t("middle_name")}
            placeholder={t("placeholder_middle_name")}
            {...register("middleName", {
              maxLength: 20,
              pattern: /^[^\d]+$/i,
            })}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          {errors?.middleName?.type === "pattern" && (
            <p className="error">{t("no_numeric_character")}</p>
          )}
          {errors?.middleName?.type === "maxLength" && (
            <p className="error">{t("middle_name_cannot_exceed_20_characters")}</p>
          )}
        </div>

        <div className="input_container">
          <InputField
            required
            type="text"
            label={t("last_name")}
            placeholder={t("placeholder_last_name")}
            {...register("lastName", {
              required: true,
              maxLength: 20,
              pattern: /^[^\d]+$/i,
            })}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          {errors?.lastName?.type === "pattern" && (
            <p className="error">{t("no_numeric_character")}</p>
          )}
          {errors?.lastName?.type === "required" && <p className="error">{t("field_required")}</p>}
          {errors?.lastName?.type === "maxLength" && (
            <p className="error">{t("last_name_cannot_exceed_20_characters")}</p>
          )}
        </div>
      </div>

      <div className="row_container">
        <div className="input_container">
          <InputField
            required
            type="text"
            label={t("email")}
            disabled={editform && true}
            placeholder={t("placeholder_email")}
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
            })}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          {errors?.email?.type === "pattern" && (
            <p className="error">{t("invalid_email_address")}</p>
          )}
          {error?.email && (
            <p className="error">{t("email_already_exists")}</p>
          )}
          {errors?.email?.type === "required" && <p className="error">{t("field_required")}</p>}
        </div>

        <div className="input_container">
          <InputField
            required
            type="text"
            label={t("phoneNumber")}
            placeholder={t("placeholder_phoneNumber")}
            {...register("phoneNumber", {
              required: true,
              pattern: /^[+-/(/) 0-9]{0,20}$/,
            })}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          {errors?.phoneNumber?.type === "pattern" && <p className="error">{t("invalid_phone")}</p>}
          {errors?.phoneNumber?.type === "required" && (
            <p className="error">{t("field_required")}</p>
          )}
          {error?.phonenumber && (
            <p className="error">{t("phone_number_already_exists")}</p>
          )}
        </div>
      </div>

      <div className="row_container">
        <div className="button_container">
          <div className="cancel_button_wrapper">
            {!editform && (
              <Button
                type="button"
                color="danger"
                buttonName={t("clear")}
                clickHandler={() => handleClear()}
              />
            )}
            {editform && (
              <Button
                type="button"
                color="danger"
                buttonName={t("cancel")}
                clickHandler={() => handleCancel()}
              />
            )}
          </div>
          <div className="submit_button_wrapper">
            <Button
              type="submit"
              color="success"
              disabled={isLoading || isUploading}
              buttonName={
                isLoading
                  ? t("submitting")
                  : editform
                    ? `${t("update")} ${t("staff")}`
                    : `${t("add")} ${t("staff")}`
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(StaffForm);

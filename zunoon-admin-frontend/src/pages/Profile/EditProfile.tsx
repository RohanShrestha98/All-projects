import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";

import http from "../../utils/http";

import MultiSelect from "../../components/MultiSelect/MultiSelect";

import "./Profile.scss";
import { toast } from "react-toastify";
import { setUser } from "../../utils/storage";

import config from "../../config";
import { USER } from "../../constants/storage";
import { useUserContext } from "../../context/UserContextProvider";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
const userApi = config.endpoints.api.user;

const EditProfile = ({ t }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser: setUserInContext } = useUserContext();

  const [roleOptions, setRoleOptions] = useState<any>([]);

  const [selectedRole, setSelectedRole] = useState({
    label:
      user?.role?.name === "superadmin"
        ? "Super admin"
        : user?.role?.name === "admin"
          ? "Admin"
          : user?.role?.name === "contentdeveloper"
            ? "Content developer"
            : "Content supervisor",
    value: user?.role?.id,
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await http.GET(config.endpoints.api.role.list, "");

        const filteredRoles = response?.data.data.map(role => ({
          value: role?.name,
          label: role?.name?.includes("admin")
            ? "Super Admin"
            : role?.name?.includes("school")
              ? "School Manager"
              : role?.name?.includes("content")
                ? "Content Manager"
                : "Some Role",
        }));

        setRoleOptions(filteredRoles);
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, []);

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      id: user && user?.id,
      firstName: user && user?.firstName,
      middleName: user && user?.middleName,
      lastName: user && user?.lastName,
      email: user && user?.email,
      phoneNumber: user && user?.phoneNumber,
      roles: user && user?.role,
      username: user && user?.username,
    },
  });

  const handleRoleChange = (data, e) => {
    setSelectedRole(data);
    setValue("roles", data?.value, { shouldDirty: true });
  };

  const handleReset = () => {
    reset();
  };

  const handleUpdate = data => {
    setIsLoading(false);

    http
      .PATCH(userApi.update(user?.id), {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        roles: data.roles,
      })
      .then(() => {
        toast.success(`${t("profile")} ${t("updated_successfully")}`);
        setUser(USER, data);
        setUserInContext(data);
        navigate(-1)
        handleReset();
      })
      .catch(error => {
        toast.error(error.response.data.errors.error || t("something_went_wrong"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="profile_form_wrapper">
      <div className="page_header">
        <h4 className="page_title">{t("profile")} | {t("profile_edit")}</h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>

      <form className="profile_form_container">
        <div className="row_container">
          <div className="input_container">
            <InputField
              required
              type="text"
              label={t("first_name")}
              placeholder={t("placeholder_first_name")}
              {...register("firstName", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.firstName?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div className="input_container">
            <InputField
              required
              type="text"
              label={t("middle_name")}
              placeholder={t("placeholder_middle_name")}
              {...register("middleName")}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.middleName?.type === "required" && (
              <p className="error">{t("field_required")}</p>
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
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.firstName?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
        </div>
        <div className="row_container">
          <div className="input_container">
            <InputField
              required
              type="tel"
              label={t("phoneNumber")}
              placeholder={t("placeholder_phoneNumber")}
              {...register("phoneNumber", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.phoneNumber?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div
            className="input_container"
            style={{
              opacity: "0.6",
              cursor: "not-allowed",
            }}
          >
            <InputField
              required
              type="text"
              disabled={true}
              label={t("username")}
              placeholder={t("placeholder_phoneNumber")}
              {...register("username")}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
          </div>
        </div>
        <div className="row_container">
          <div
            className="input_container"
            style={{
              opacity: "0.6",
              cursor: "not-allowed",
            }}
          >
            <InputField
              required
              type="text"
              disabled={true}
              label={t("email")}
              placeholder={t("placeholder_phoneNumber")}
              {...register("email")}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
          </div>
          <div className="input_container">
            <div className="field_and_validate">
              <CustomSelect
                id="roles"
                name="roles"
                label="Role"
                options={roleOptions}
                value={selectedRole}
                handleChange={handleRoleChange}
                register={register}
                required={false}
                disabled={true}
              />
              {errors?.roles?.type === "required" && <p className="error">{t("field_required")}</p>}
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="button-group">
            <Button
              type="submit"
              buttonName={isLoading ? `${t("submitting")}` : t("profile_edit")}
              color="success"
              clickHandler={handleSubmit(handleUpdate)}
            />
            <Button
              type="button"
              buttonName={`${t("clear")}`}
              color="danger"
              clickHandler={() => handleReset()}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default withTranslation()(EditProfile);

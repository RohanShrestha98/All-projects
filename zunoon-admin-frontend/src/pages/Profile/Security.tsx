import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import http from "../../utils/http";
import "./Profile.scss";
import config from "../../config";
import { clear, get } from "../../utils/storage";
import { IUser } from "../../@types/userContext";
import toasts from "../../utils/toast";
const sercurityApi = config.endpoints.api.security;

const Security = ({ t }) => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const user = JSON.parse(get("user"));
    setUser(user);
  }, []);

  const handleClickSubmit = data => {
    setIsLoading(false);
    http
      .PATCH(sercurityApi.update(user.id), data)
      .then(() => {
        toasts.success(t("profile_password_updated"));
        setTimeout(() => {
          clear();
          navigate("/login");
        }, 5000);
        handleReset();
      })
      .catch(err => {
        toasts.error(err?.response?.data?.errors?.error || t("something_went_wrong"));
      });
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="profile_form_wrapper">
      <div className="page_header">
        <h4 className="page_title">
          {t("profile_security")} | {t("profile_change_password")}
        </h4>

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
              type="password"
              label={t("old_password")}
              placeholder={t("enter_old_password")}
              {...register("oldPassword", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.oldPassword?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div className="input_container">
            <InputField
              required
              type="password"
              label={t("profile_new_password")}
              placeholder={t("profile_password_placeholder")}
              {...register("newpassword", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.newpassword?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
        </div>
        <div className="row_container">
          <div className="input_container">
            <InputField
              required
              type="password"
              label={t("profile_confirm_password")}
              placeholder={t("profile_confirm_password_placeholder")}
              {...register("confirmPassword", {
                required: true,
                validate: (val: string) => {
                  if (watch("newpassword") != val) {
                    return t("passwords_do_not_match");
                  }
                },
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.confirmPassword?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
            {errors?.confirmPassword?.type === "validate" && (
              //@ts-ignore
              <p className="error">{errors?.confirmPassword?.message}</p>
            )}
          </div>
          <div className="input_container">{""}</div>
        </div>

        <div className="button-container">
          <div className="button-group">
            <Button
              type="submit"
              buttonName={isLoading ? `${t("submitting")}` : t("profile_change_password")}
              color="success"
              clickHandler={handleSubmit(handleClickSubmit)}
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

export default withTranslation()(Security);

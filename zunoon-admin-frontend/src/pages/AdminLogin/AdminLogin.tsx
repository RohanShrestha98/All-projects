import React from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import http from "../../utils/http";
import toast from "../../utils/toast";
import { USER } from "../../constants/storage";
import { setTokens } from "../../services/token";
import { set, setUser } from "../../utils/storage";
import "./AdminLogin.scss";
import zununLogo from "../../assets/images/zununLogo.png";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { PATH } from "../../constants/routes";

declare global {
  interface Array<T> {
    unique(): T[];
  }
}

const AdminLogin = ({ t }) => {
  const navigate = useNavigate();

  const handleLogin = data => {
    async function loginAdmin() {
      try {
        const response = await http.POST(config.endpoints.auth.login, {
          identity: data.identity,
          password: data.password,
        });
        if (response.status === 200) {
          const accessToken = response.data.data.access;
          const refreshToken = response.data.data.refresh;
          setTokens({ accessToken, refreshToken });
          setUser(USER, response.data.data.user);

          Array.prototype.unique = function () {
            const a = this.concat();
            for (let i = 0; i < a.length; ++i) {
              for (let j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j]) a.splice(j--, 1);
              }
            }
            return a;
          };

          const permissions: string[] = [];

          set("userAccess", permissions);
          toast.success(t("success_login"));
          navigate(PATH.DASHBOARD, { replace: true });
        } else {
          toast.error(new Error(t("response_from_admin_not_success")));
        }
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null) {
          const responseError = error as { response: { data: { errors: { error?: string } } } };
          const errorMessage =
            responseError.response?.data?.errors?.error || t("something_went_wrong");
          toast.error(errorMessage);
        } else {
          toast.error(t("something_went_wrong"));
        }
      }
    }
    loginAdmin();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login_page">
      <div className="login_container ">
        <div className="image_container ">
          <img src={zununLogo} alt="zunun" />
        </div>
        <div className="detail_container ">
          <div className="title_container "></div>
          <h3 className="greet">{t("welcome_to_zunun")} !</h3>
          <p>{t("please_sign_in_to_continue")}</p>
          <hr style={{ width: "100%" }} />
          <form onSubmit={handleSubmit(data => handleLogin(data))}>
            <div className="login_detail_container">
              <div className="username_container ">
                <InputField
                  required
                  type="text"
                  label="Username"
                  placeholder="Username"
                  {...register("identity", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.identity?.type === "required" && (
                  <p className="error">{t("field_required")}</p>
                )}
              </div>
              <div className="password_container ">
                <InputField
                  required
                  type="password"
                  label="Password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e && e?.target?.value?.trimStart();
                  }}
                />
                {errors?.password?.type === "required" && (
                  <p className="error">{t("field_required")}</p>
                )}
              </div>
            </div>
            {/* <div className="keep_login_container">
              <input type="checkbox" id="keep_login_checkbox" />
              <label htmlFor="keep_login_checkbox">Keep me logged in</label>
            </div> */}
            <hr className="mt-5" />
            <div className="button_container">
              <button className=" button button_primary button_submit" type="submit">
                {t("login")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(AdminLogin);

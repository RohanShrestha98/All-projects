import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ISchool } from "../../../../../@types/school";
import { withTranslation } from "react-i18next";
import InputField from "../../../../../components/InputField/InputField";
import Button from "../../../../../components/Button/Button";
import { CountryIso2, PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";

const Contact = ({
  t,
  prevStep,
  nextStep,
  data,
  setData,
  resErrors,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const [phone, setPhone] = useState(data?.contact?.cellPhone);
  const [currentCountry, setCurrentCountry] = useState<CountryIso2>("es");
  const phoneValidation = usePhoneValidation(phone, {
    country: currentCountry,
    defaultMaskMinPhoneLength: 10,
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ISchool>({ defaultValues: data });

  const saveData = (data: ISchool) => {
    setData({ ...data });
    if (isPreviousClick) {
      prevStep();
    } else {
      nextStep();
    }
  };

  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <form
        className="school_form_container"
        onSubmit={handleSubmit(saveData)}
        onKeyDown={handleKeyPress}
      >
        <div className="row_container">
          <div className="field_and_validate">
            <InputField
              required
              type="text"
              label={t("contactName")}
              placeholder={t("placeholder_contactName")}
              {...register("contact.contactName", {
                required: !isPreviousClick,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.contact?.contactName?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div className="field_and_validate">
            <InputField
              required
              type="text"
              label={t("email")}
              placeholder={t("placeholder_email")}
              {...register("contact.email", {
                required: !isPreviousClick,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.contact?.email?.type === "pattern" && (
              <p className="error">{`${t("invalid")} ${t("email")}`}</p>
            )}
            {errors?.contact?.email?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
            {resErrors?.email && !dirtyFields?.contact?.email && (
              <p className="error">{resErrors?.email}</p>
            )}
          </div>
        </div>
        <div className=" row_container">
          <div className="field_and_validate">
            <label htmlFor="cellPhone" style={{ marginBottom: "9px" }}>
              {t("cellPhone")} <span style={{ color: "#e91e63" }}>*</span>
            </label>
            <Controller
              name="contact.cellPhone"
              control={control}
              rules={{
                required: !isPreviousClick,
                // validate: value => {
                //   const splittedPhone = value?.split(phoneValidation?.country?.dialCode);
                //   const exactPhone = splittedPhone?.[1]
                //     ?.replaceAll(/[^a-zA-Z0-9 ]/g, "")
                //     ?.replaceAll(" ", "");
                //   if (exactPhone?.length > 13) {
                //     return "Phone number is too long. Enter a valid phone number";
                //   } else if (exactPhone?.length < 3) {
                //     return "Phone number is too short. Enter a valid phone number";
                //   }

                //   return true;
                // },
              }}
              render={({ field }) => (
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  defaultCountry={currentCountry}
                  value={phone}
                  onChange={(phone, country) => {
                    setPhone(phone);
                    setCurrentCountry(country);
                    field.onChange(phone);
                  }}
                  placeholder={t("placeholder_cellPhone")}
                />
              )}
            />
            {/* {errors?.contact?.cellPhone?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )} */}
            {errors?.contact?.cellPhone?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
            {errors?.contact?.cellPhone?.message && (
              <p className="error">{errors?.contact?.cellPhone?.message}</p>
            )}
            {resErrors?.cellPhone && !dirtyFields?.contact?.cellPhone && (
              <p className="error">{resErrors?.cellPhone}</p>
            )}
          </div>
          <div className="field_and_validate">
            <InputField
              label={t("phoneNumber")}
              type="text"
              placeholder={t("placeholder_phoneNumber")}
              {...register("contact.phoneNumber", {
                required: false,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <div className="pull-left">
            <Button
              type="submit"
              color="info"
              buttonName={t("prev")}
              clickHandler={() => {
                setIsPreviousClick(true);
              }}
              disabled={false}
            />
          </div>
          <div className="pull-left">
            <Button
              type="submit"
              color="info"
              buttonName={t("next")}
              clickHandler={() => {
                setIsPreviousClick(false);
              }}
              disabled={false}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default withTranslation()(Contact);

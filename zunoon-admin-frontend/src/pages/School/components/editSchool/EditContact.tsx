import React, { useDeferredValue, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import { withTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import httpMethods from "../../../../utils/http";
import config from "../../../../config";
import { IResError, ISchool } from "../../../../@types/school";
import { toast } from "react-toastify";
import { useSchoolContext } from "../../../../context/SchoolContextProvider";
import { CountryIso2, PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";

const schoolApi = config.endpoints.api.school;

const EditContact = ({ t }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { schoolData, handleSchoolUpdate } = useSchoolContext();
  const [phone, setPhone] = useState(schoolData?.contact?.cellPhone);

  const [currentCountry, setCurrentCountry] = useState<CountryIso2>("es");
  const phoneValidation =
    phone &&
    usePhoneValidation(phone, {
      country: currentCountry,
      defaultMaskMinPhoneLength: 10,
    });

  const [resErrors, setResErrors] = useState<IResError>();
  const deferredErrorVal = useDeferredValue(resErrors);
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: schoolData,
  });

  const isAllDirtyFields =
    dirtyFields?.contact?.contactName ||
    dirtyFields?.contact?.cellPhone ||
    dirtyFields?.contact?.email ||
    dirtyFields?.contact?.phoneNumber === true;

  const handleUpdate = (data: ISchool) => {
    const contactDetails = {
      contactName: data && data.contact?.contactName,
      cellPhone: data && data.contact?.cellPhone,
      phoneNumber: data && data.contact?.phoneNumber,
      email: data && data.contact?.email,
    };
    handleSchoolUpdate({ ...data });
    setIsSubmitting(true);
    async function updateContact() {
      try {
        if (isAllDirtyFields) {
          const response = await httpMethods.PATCH(
            schoolApi.contactUpdate(schoolData.id),
            contactDetails,
          );
          if (response.status === 200) {
            toast.success(`${t("th_phone")} ${t("updated_successfully")}`);
            navigate("../../");
          } else {
            toast.error("Error in updating contact");
          }
        } else {
          toast.error("No changes made to the contact information");
        }
      } catch (error) {
        let errorMessage = JSON.stringify(error?.response?.data?.errors);
        let parsedErrMessage = errorMessage && JSON.parse(errorMessage);
        setResErrors(parsedErrMessage);
        toast.error(errorMessage ? errorMessage : error?.message.toString());
      }
      setIsSubmitting(false);
    }
    updateContact();
  };

  const handleReset = () => {
    reset({
      contact: {
        contactName: "",
        cellPhone: "",
        phoneNumber: "",
        email: "",
      },
    });
    setPhone("");
  };

  return (
    <div className="form_wrapper">
      <div className="page_header">
        <h4 className="page_title">{`${t("school")} | ${t("edit")} ${t("contact")}`}</h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate("../../")}
          />
        </div>
      </div>

      <form className="form_container">
        <div className="row_container">
          <div className="input_container">
            <InputField
              required
              type="text"
              label={t("contactName")}
              placeholder={t("placeholder_contactName")}
              {...register("contact.contactName", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.contact?.contactName?.type === "required" && <p>{t("field_required")}</p>}
          </div>
          <div className="input_container">
            <InputField
              required
              type="text"
              label={t("email")}
              placeholder={t("placeholder_email")}
              {...register("contact.email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trim();
              }}
            />
            {errors?.contact?.email?.type === "pattern" && <p>{`${t("invalid")} ${t("email")}`}</p>}
            {errors?.contact?.email?.type === "required" && <p>{t("field_required")}</p>}
            {deferredErrorVal?.email && isAllDirtyFields && <p>{deferredErrorVal?.email}</p>}
          </div>
        </div>
        <div className=" row_container">
          <div className="input_container">
            <label htmlFor="cellPhone" style={{ marginBottom: "9px" }}>
              {t("cellPhone")} <span className="error">*</span>
            </label>
            <Controller
              name="contact.cellPhone"
              control={control}
              rules={{
                required: true,
                // validate: value => {
                //   const splittedPhone = value?.split(phoneValidation?.country?.dialCode);
                //   const exactPhone = splittedPhone?.[1]
                //     ?.replaceAll(/[^a-zA-Z0-9 ]/g, "")
                //     ?.replaceAll(" ", "");
                //   if (exactPhone?.length > 13) {
                //     return "Phone number is too long. Enter a valid phone number";
                //   } else if (exactPhone?.length < 4) {
                //     return "Phone number is too short. Enter a valid phone number";
                //   }
                //   return true;
                // },
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
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
            {errors?.contact?.cellPhone?.type === "required" && <p>{t("field_required")}</p>}
            {errors?.contact?.cellPhone?.message && <p>{errors?.contact?.cellPhone?.message}</p>}
            {resErrors?.cellPhone && !dirtyFields?.contact?.cellPhone && (
              <p>{resErrors?.cellPhone}</p>
            )}
          </div>
          <div className="input_container">
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
        <div className="button-container">
          <div className="button-group">
            <Button
              type="button"
              buttonName={`${t("clear")}`}
              color="danger"
              clickHandler={() => handleReset()}
            />
            <Button
              type="submit"
              buttonName={isLoading ? `${t("submitting")}` : t("submit")}
              color="info"
              clickHandler={handleSubmit(handleUpdate)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default withTranslation()(EditContact);

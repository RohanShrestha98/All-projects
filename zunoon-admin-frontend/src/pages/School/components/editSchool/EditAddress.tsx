import React, { useMemo, useState } from "react";
import { withTranslation } from "react-i18next";
import InputField from "../../../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import "./EditSchool.scss";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";
import httpMethods from "../../../../utils/http";
import { ISchool } from "../../../../@types/school";
import { toast } from "react-toastify";
import { useSchoolContext } from "../../../../context/SchoolContextProvider";
import { defaultCountries, FlagEmoji } from "react-international-phone";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
const schoolApi = config.endpoints.api.school;

interface ICountryOption {
  value: string;
  label: JSX.Element;
}

const EditAddress = ({ t }) => {
  const { schoolData, handleSchoolUpdate } = useSchoolContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const countryListOptions: ICountryOption[] = useMemo(() => {
    return defaultCountries.map(item => {
      return {
        value: item[2],
        label: (
          <div className="d-flex gap-2 align-content-center ">
            <FlagEmoji
              iso2={item[2]}
              style={{ display: "inline-block", height: "1.4rem", width: "1.4rem" }}
            />
            <span style={{ fontSize: "13px", color: "black" }}>{item[0]}</span>
          </div>
        ),
      };
    });
  }, []);
  const [selectedCountry, setSelectedCountry] = useState(
    countryListOptions?.find(item => item.value === schoolData?.address?.country),
  );

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: schoolData,
    mode: "onChange",
  });

  const isAllDirtyFields =
    dirtyFields?.address?.country ||
    dirtyFields?.address?.address1 ||
    dirtyFields?.address?.address2 ||
    dirtyFields?.address?.municipality ||
    dirtyFields?.address?.department === true;

  const handleCountryChange = (data, e) => {
    setSelectedCountry(data);
    setValue("address.country", data.value, { shouldDirty: true });
  };

  const handleUpdate = (data: ISchool) => {
    const addressDetails = {
      address1: data && data.address?.address1,
      address2: data && data.address?.address2,
      municipality: data && data.address?.municipality,
      department: data && data.address?.department,
      country: data && data.address?.country,
    };
    handleSchoolUpdate({ ...data });
    setIsSubmitting(true);
    async function updateAddress() {
      try {
        if (isAllDirtyFields) {
          const response = await httpMethods.PATCH(
            schoolApi.addressUpdate(schoolData.id),
            addressDetails,
          );
          if (response.status === 200) {
            toast.success(`${t("address")} ${t("updated_successfully")}`);
            navigate("../../");
          } else {
            toast.error("Error in updating address");
          }
        } else {
          toast.error("No changes made to the address information");
        }
      } catch (error) {
        toast.error(error.toString());
      }
      setIsSubmitting(false);
    }
    updateAddress();
  };

  const handleReset = () => {
    reset({
      address: {
        address1: "",
        address2: "",
        municipality: "",
        department: "",
        country: "",
      },
    });
    setSelectedCountry(null);
    setValue("address.country", null);
  };

  return (
    <div className="form_wrapper">
      <div className="page_header">
        <h4 className="page_title">{`${t("school")} | ${t("edit")} ${t("address")}`}</h4>
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
            <CustomSelect
              id="address.country"
              required={true}
              register={register}
              name="address.country"
              label={t("country")}
              placeholder={t("placeholder_country")}
              value={selectedCountry}
              handleChange={(e, data) => {
                handleCountryChange(e, data);
              }}
              options={countryListOptions}
              disabled={false}
            />
            {errors?.address?.country?.type === "required" && <p>{t("field_required")}</p>}
          </div>
          <div className="input_container">
            <InputField
              required
              type="text"
              label={t("municipality")}
              placeholder={t("placeholder_municipality")}
              {...register("address.municipality", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.address?.municipality?.type === "required" && <p>{t("field_required")}</p>}
          </div>
        </div>

        <div className="row_container">
          <div className="input_container">
            <InputField
              required
              type="text"
              label={t("address1")}
              placeholder={t("placeholder_address1")}
              {...register("address.address1", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.address?.address1?.type === "required" && <p>{t("field_required")}</p>}
          </div>
          <div className="input_container">
            <InputField
              type="text"
              label={t("address2")}
              placeholder={t("placeholder_address2")}
              {...register("address.address2", {
                required: false,
                disabled: watch("address.address1") === "",
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
          </div>
        </div>
        <div className="row_container" style={{ width: "50%", paddingRight: "1.9rem" }}>
          <div className="input_container">
            <InputField
              required
              type="text"
              label={`${t("department")}`}
              placeholder={`${t("placeholder_department")}`}
              {...register("address.department", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.address?.department?.type === "required" && <p>{t("field_required")}</p>}
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

export default withTranslation()(EditAddress);

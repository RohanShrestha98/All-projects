import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ISchool } from "../../../../../@types/school";
import { withTranslation } from "react-i18next";
import InputField from "../../../../../components/InputField/InputField";
import Button from "../../../../../components/Button/Button";
import { defaultCountries, FlagEmoji } from "react-international-phone";
import CustomSelect from "../../../../../components/CustomSelect/CustomSelect";

interface ICountryOption {
  value: string;
  label: JSX.Element;
}

const Address = ({ t, prevStep, nextStep, data, setData, isPreviousClick, setIsPreviousClick }) => {
  const countryListOptions: ICountryOption[] | any = useMemo(() => {
    return defaultCountries.map(item => {
      return {
        label: (
          <div className="d-flex gap-2 align-content-center ">
            <FlagEmoji
              iso2={item[2]}
              style={{ display: "inline-block", height: "1.4rem", width: "1.4rem" }}
            />
            <span style={{ fontSize: "13px", color: "rgb(12, 12, 12)" }}>{item[0]}</span>
          </div>
        ),
        value: item[2],
      };
    });
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<any>(
    countryListOptions?.find(item => item.value === data?.address?.country),
  );


  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ISchool>({ defaultValues: data });

  const handleCountryChange = (data, e) => {
    setSelectedCountry(data);
    setValue("address.country", data?.value, { shouldDirty: true });
  };

  const saveData = (data: ISchool) => {
    setData({ ...data });
    isPreviousClick ? prevStep() : nextStep();
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
            <CustomSelect
              id="address.country"
              required={!isPreviousClick}
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
            {errors?.address?.country?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div className="field_and_validate">
            <InputField
              required
              type="text"
              label={t("municipality")}
              placeholder={t("placeholder_municipality")}
              {...register("address.municipality", {
                required: !isPreviousClick,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.address?.municipality?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
        </div>

        <div className="row_container">
          <div className="field_and_validate">
            <InputField
              required
              type="text"
              label={t("address1")}
              placeholder={t("placeholder_address1")}
              {...register("address.address1", {
                required: !isPreviousClick,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.address?.address1?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div className="field_and_validate">
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
        <div className="row_container department_field">
          <div className="field_and_validate">
            <InputField
              required
              type="text"
              label={`${t("department")}`}
              placeholder={`${t("placeholder_department")}`}
              {...register("address.department", {
                required: !isPreviousClick,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.address?.department?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <div className="pull-left">
            <Button
              type="submit"
              color="info"
              buttonName={t("prev")}
              disabled={false}
              clickHandler={() => setIsPreviousClick(true)}
            />
          </div>
          <div className="pull-right">
            <Button
              type="submit"
              color="info"
              buttonName={t("next")}
              disabled={false}
              clickHandler={() => setIsPreviousClick(false)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default withTranslation()(Address);

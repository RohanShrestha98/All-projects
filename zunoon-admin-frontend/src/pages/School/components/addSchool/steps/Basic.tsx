import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPatchQuestion } from "react-icons/bs";
import { ISchool } from "../../../../../@types/school";
import { withTranslation } from "react-i18next";
import InputField from "../../../../../components/InputField/InputField";
import CustomSelect from "../../../../../components/CustomSelect/CustomSelect";
import GenerateListOptions from "../../schoolForm/SelectOptions";
import Button from "../../../../../components/Button/Button";
import ImageInput from "../../../../../components/ImageInput/ImageInput";
import config from "../../../../../config";
import http from "../../../../../utils/http";
import toast from "../../../../../utils/toast";

const fileUploadApi = config.endpoints.api.file;

const Basic = ({ t, nextStep, data, setData, resErrors }) => {
  const { sectorList } = GenerateListOptions();
  const [selectdSector, setSelectedSector] = useState(
    sectorList.find(item => item.value === data?.sector),
  );
  const [selectedColor, setSelectedColor] = useState(data?.color);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ISchool>({
    defaultValues: data,
    mode: "onSubmit",
  });

  const handleSectorChange = (data, e) => {
    setSelectedSector(data);
    setValue("sector", data?.value, { shouldDirty: true });
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
    setValue("color", e.target.value, { shouldDirty: true });
  };

  useEffect(() => {
    handleColorChange;
  }, [selectedColor]);

  const handleScholLogoUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "school",
        type: fileType,
        file: file,
      });
      setIsUploading(false);
      setLogoUrl(response?.data?.data);
      setValue("file", response?.data?.data, { shouldDirty: true });
    } catch (err) {
      toast.error(err?.message?.toString());
      setIsUploading(false);
    }
  };

  const saveData = (data: ISchool) => {
    setData({ ...data });
    nextStep();
  };

  return (
    <>
      <div className="d-flex ">
        <div className="h-50 border-start-1 pt-5">
          <ImageInput
            image={logoUrl?.url}
            setImage={setLogoUrl}
            isUploading={isUploading}
            {...register("file", {
              required: false,
            })}
            onChange={handleScholLogoUpload}
          />
        </div>
        <form className="school_form_container" onSubmit={handleSubmit(saveData)}>
          <div className="col_container">
            <div className="row_container">
              <div className="field_and_validate">
                <InputField
                  required
                  type="text"
                  label={`${t("sidebar_schools")} ${t("name")}`}
                  placeholder={`${t("placeholder_schoolName")}`}
                  {...register("name", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.name?.type === "required" && (
                  <p className="error">{t("field_required")}</p>
                )}
                {resErrors?.name && !dirtyFields?.name && (
                  <p className="error">{resErrors?.name}</p>
                )}
              </div>
              <div className="field_and_validate">
                <InputField
                  icon={<BsPatchQuestion />}
                  tooltipText={[
                    t("must_not_start_with_lowercase"),
                    t("can_not_contain_number"),
                    t("can_not_contain_special_characters"),
                  ]}
                  required
                  type="text"
                  label={`${t("subDomain")} ${t("name")}`}
                  placeholder={`${t("placeholder_subDomain")}`}
                  {...register("subdomain", {
                    required: true,
                    pattern: {
                      value: /^[a-z]+$/,
                      message: t("invalid") + " " + t("subDomain"),
                    },
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.subdomain?.type === "required" && (
                  <p className="error">{t("field_required")}</p>
                )}
                {errors?.subdomain?.type === "pattern" && (
                  <p className="error">{errors.subdomain.message}</p>
                )}
                {resErrors?.subdomain && !dirtyFields?.subdomain && (
                  <p className="error">{resErrors?.subdomain}</p>
                )}
              </div>
            </div>
            <div className="row_container">
              <div className="field_and_validate">
                <InputField
                  required
                  type="text"
                  label={`${t("taxPayerID")}`}
                  placeholder={`${t("placeholder_taxPayerId")}`}
                  {...register("taxPayerID", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.taxPayerID?.type === "required" && (
                  <p className="error">{t("field_required")}</p>
                )}
                {resErrors?.taxPayerID && !dirtyFields?.taxPayerID && (
                  <p className="error">{resErrors?.taxPayerID}</p>
                )}
              </div>
              <div className="field_and_validate">
                <div className="d-flex align-content-center gap-1">
                  <InputField
                    required
                    value={selectedColor ? selectedColor : "#00bad6"}
                    type="text"
                    label={`${t("themeColor")}`}
                    placeholder={`${t("placeholder_color")}`}
                    {...register("color", {
                      required: false,
                      pattern: {
                        value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                        message: t("invalid") + " " + t("color"),
                      },
                    })}
                    onKeyUp={e => {
                      e.target.value = e?.target?.value?.trimStart();
                    }}
                  />
                  <input
                    type="color"
                    value={selectedColor ? selectedColor : "#00bad6"}
                    style={{ height: "40px", width: "50px", marginTop: "auto" }}
                    onChange={handleColorChange}
                  />
                </div>
                {errors?.color?.type === "pattern" && (
                  <p className="error">{errors?.color?.message}</p>
                )}
              </div>
            </div>
            <div className="row_container" style={{ width: "50%", paddingRight: "1.6rem" }}>
              <div className="field_and_validate">
                <CustomSelect
                  id="sector"
                  required={true}
                  register={register}
                  name="sector"
                  label={t("sector")}
                  placeholder={t("placeholder_sector")}
                  value={selectdSector}
                  handleChange={(e, data) => {
                    handleSectorChange(e, data);
                  }}
                  options={sectorList}
                  disabled={false}
                />
                {errors?.sector?.type === "required" && (
                  <p className="error">{t("field_required")}</p>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="pull-left">{""}</div>
            <div className="pull-right">
              <Button type="submit" color="info" buttonName={t("next")} disabled={isUploading} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default withTranslation()(Basic);

import React, { useDeferredValue, useState } from "react";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./EditSchool.scss";
import config from "../../../../config";
import httpMethods from "../../../../utils/http";
import InputField from "../../../../components/InputField/InputField";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import GenerateListOptions from "../schoolForm/SelectOptions";
import Button from "../../../../components/Button/Button";
import ImageInput from "../../../../components/ImageInput/ImageInput";

import { IResError, ISchool } from "../../../../@types/school";
import { toast } from "react-toastify";
import { useSchoolContext } from "../../../../context/SchoolContextProvider";
import { PATH } from "../../../../constants/routes";

const schoolApi = config.endpoints.api.school;
const fileUploadApi = config.endpoints.api.file;

const EditBasic = ({ t }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const { schoolData, handleSchoolUpdate } = useSchoolContext();

  const { sectorList } = GenerateListOptions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let fetchedSectorVal = sectorList.find(item => item.value === schoolData?.sector);
  const [selectdSector, setSelectedSector] = useState(fetchedSectorVal);
  const [selectedColor, setSelectedColor] = useState(schoolData?.color);
  const [resErrors, setResErrors] = useState<IResError>();
  const deferredErrorVal = useDeferredValue(resErrors);
  const [logoUrl, setLogoUrl] = useState<string>(schoolData?.file);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: schoolData,
    mode: "onChange",
  });

  const schoolId = schoolData?.id;

  const handleSectorChange = (data, e) => {
    setSelectedSector(data);
    setValue("sector", data.value, { shouldDirty: true });
  };

  const handleColorChange = e => {
    setSelectedColor(e.target.value);
    setValue("color", e.target.value, { shouldDirty: true });
  };

  const handleUpdate = (data: ISchool) => {
    const basicDetails = {
      file: data && data?.file,
      name: data && data?.name,
      subdomain: data && data?.subdomain,
      taxPayerID: data && data?.taxPayerID,
      sector: data && data?.sector,
      color: data && data?.color,
    };
    handleSchoolUpdate({ ...data });
    setIsSubmitting(true);
    async function updateBasic() {
      try {
        if (isDirty) {
          const response = await httpMethods.PATCH(schoolApi.basicUpdate(schoolId), basicDetails);
          if (response.status === 200) {
            toast.success(`${t("basics")} ${t("updated_successfully")}`);
            navigate("../");
          } else {
            toast.error(`${t("error_in")} ${t("updating")} ${t("basics")}`);
          }
        } else {
          toast.error(`${t("no_changes_made_to_the_basic_information")}`);
        }
      } catch (error) {
        let errorMessage = JSON.stringify(error?.response?.data?.errors);
        let parsedErrMessage = errorMessage && JSON.parse(errorMessage);
        setResErrors(parsedErrMessage);
        toast.error(errorMessage ? errorMessage : error?.message.toString());
      }
      setIsSubmitting(false);
    }
    updateBasic();
  };

  const handleLogoUpdate = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await httpMethods.POST_FILE(fileUploadApi.fileUpload, {
        source: "school",
        type: fileType,
        file: file,
      });
      setIsUploading(false);
      setLogoUrl(response?.data?.data);
      setValue("file", response?.data?.data, { shouldDirty: true });
      //@ts-ignore
      setValue("fileType", response?.data?.data?.fileType?.toString());
    } catch (err) {
      setIsUploading(false);
      toast.error(err?.message?.toString());
    }
  };

  const handleReset = () => {
    reset({
      name: "",
      subdomain: "",
      taxPayerID: "",
      color: "",
      sector: "",
      file: {},
    });
    setSelectedSector(null);
    setSelectedColor("#ffffff");
  };

  return (
    <div className="form_wrapper">
      <div className="page_header">
        <h4 className="page_title">{`${t("school")} | ${t("edit")} ${t("basic")}`}</h4>
        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate(PATH.SCHOOL)}
          />
        </div>
      </div>
      <form className="form_container_basic">
        <div className="outer_row_container">
          <ImageInput
            image={logoUrl?.url}
            setImage={setLogoUrl}
            isUploading={isUploading}
            {...register("file", {
              required: false,
            })}
            onChange={handleLogoUpdate}
          />
          <div className="col_container">
            <div className="row_container">
              <div className="input_container">
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
                {errors?.name?.type === "required" && <p>{t("field_required")}</p>}
                {deferredErrorVal?.name && <p>{deferredErrorVal?.name}</p>}
              </div>
              <div className="input_container">
                <InputField
                  required
                  type="text"
                  label={`${t("subDomain")} ${t("name")}`}
                  placeholder={`${t("placeholder_subDomain")}`}
                  {...register("subdomain", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                  disabled={true}
                />
                {errors?.subdomain?.type === "required" && <p>{t("field_required")}</p>}
                {deferredErrorVal?.subdomain && <p>{deferredErrorVal?.subdomain}</p>}
              </div>
            </div>
            <div className="row_container">
              <div className="input_container">
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
                {errors?.taxPayerID?.type === "required" && <p>{t("field_required")}</p>}
                {deferredErrorVal?.taxPayerID && <p>{deferredErrorVal?.taxPayerID}</p>}
              </div>
              <div className="input_container">
                <div className="d-flex align-content-center gap-1">
                  <InputField
                    required
                    type="text"
                    label={`${t("themeColor")}`}
                    value={`${selectedColor ? selectedColor : schoolData.color}`}
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
                    value={`${selectedColor ? selectedColor : schoolData.color}`}
                    style={{ height: "40px", width: "50px", marginTop: "auto" }}
                    onChange={handleColorChange}
                  />
                </div>
                {errors?.color?.type === "pattern" && <p>{errors?.color?.message}</p>}
              </div>
            </div>
            <div className="row_container" style={{ width: "50%", paddingRight: "1.9rem" }}>
              <div className="input_container">
                <CustomSelect
                  id="sector"
                  required={true}
                  register={register}
                  name="sector"
                  label={t("sector")}
                  placeholder="Select Sector Type"
                  value={selectdSector}
                  handleChange={(e, data) => {
                    handleSectorChange(e, data);
                  }}
                  options={sectorList}
                  disabled={false}
                />
                {errors?.sector?.type === "required" && <p>{t("field_required")}</p>}
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
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withTranslation()(EditBasic);

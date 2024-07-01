import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import http from "../../../../utils/http";
import config from "../../../../config";

type PropsType = {
  data?: any;
  editform?: any;
  handleCancel?: any;
  handleClickSubmit?: any;
  handleClickUpdate?: any;
  isLoading?: boolean;
  t?: Function;
};

const fileUploadApi = config.endpoints.api.file;


const SchoolForm: React.FC<PropsType> = ({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isLoading,
  t,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(editform ? data?.thumbnail : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  console.log("thumbnailUrl", thumbnailUrl)

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
        id: data && data.id,
        name: data && data.name,
        regNumber: data && data.regNumber,
        document: data && data.document,
        file: data && data.file,
        // course: data && data.course,
        address: data && data.address,
        city: data && data.address?.city,
        country: data && data.address?.country,
        landmark: data && data.address?.landmark,
        lat: data && data.address.lat,
        long: data && data.address.long,
        // state: data && data.address.state,
        streetName: data && data.address.streetName,
        contact: data && data.contact,
        primaryEmail: data && data.contact.primaryEmail,
        secondaryEmail: data && data.contact.secondaryEmail,
        secondaryNumber: data && data.contact.secondaryNumber,
        primaryNumber: data && data.contact.primaryNumber,
      },
    },
  );
  const handleReset = () => {
    reset({
      name: "",
      regNumber: "",
      document: "",
      file: "",
      // course: [],
      city: "",
      country: "",
      landmark: "",
      lat: "",
      long: "",
      // state: "",
      streetName: "",
      primaryEmail: "",
      secondaryEmail: "",
      secondaryNumber: "",
      primaryNumber: "",
    });
  };

  //selecting course from data while editform
  // useEffect(() => {
  //   if (editform && data) {
  //     let selectedDataCourse = data.course?.map(course => {
  //       return { value: course.id, label: course.name };
  //     });
  //     setValue(
  //       "course",
  //       selectedDataCourse?.map(course => course?.value)
  //     );
  //     setSelectedCourse(selectedDataCourse);
  //   }
  // }, [data, editform, setValue]);

  //TODO: Implement Course assigning in different modal



  const handleSchoolThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "school",
        type: fileType,
        file: file,
      });
      console.log("response", response)
      setIsUploading(false);
      setThumbnailUrl(response?.data?.data);
      setValue("file", response?.data?.data, { shouldDirty: true });
    } catch (err) {
      toast.error(err?.message?.toString());
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    handleReset();
    setThumbnailUrl("");
  };

  return (
    <>
      <form
        className="school_form_container"
        onSubmit={handleSubmit(editform ? handleClickUpdate()(handleCancel) : handleClickSubmit)}
      >
        <div className="basic_info row_container">
          <div className="staff_image">
            <ImageInput
              image={thumbnailUrl?.url}
              isUploading={isUploading}
              editform={editform}
              setImage={setThumbnailUrl}
              {...register("file", {
                required: false,
              })}
              onChange={handleSchoolThumbnailUpload}
            />
          </div>

          <div className="col_container">
            <div className="row_container">
              <div className="field_and_validate">
                <InputField
                  required
                  type="text"
                  label={t("school_name")}
                  placeholder={t("placeholder_schoolName")}
                  {...register("name", {
                    required: true,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.name?.type === "required" && <p>{t("field_required")}</p>}
              </div>
              <div className="field_and_validate">
                <InputField
                  required
                  label="Registered Number"
                  type="text"
                  placeholder="Enter register no."
                  {...register("regNumber", {
                    required: true,
                    // pattern: /^[0-9]{0,14}$/
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.regNumber?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>

            <div className="row_container">
              <div className="field_and_validate">
                <h5>Document</h5>
                <input
                  type="file"
                  accept="thumbnailUrl/jpeg,thumbnailUrl/gif,thumbnailUrl/png,application/pdf"
                  {...register("document", { required: data ? false : false })}
                />
                {data && data.document && (
                  <a href={data.document}>{data.document.split("/").slice(-1)[0]}</a>
                )}
                {errors?.document?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
          </div>
        </div>
        <h3>Address Info</h3>
        <div className="address_detail info_container ">
          <div className="row_container">
            <div className="field_and_validate">
              <InputField
                required
                type="text"
                label={t("country")}
                placeholder={`${t("enter")} ${t("country_name")}`}
                {...register("country", {
                  required: true,
                  maxLength: 50,
                  pattern: /^[A-Z a-z]+$/i,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.country?.type === "required" && <p>{t("field_required")}</p>}
              {errors?.country?.type === "maxLength" && (
                <p>{t("country_name")} {t("cannot_exceed_20_characters")}</p>
              )}
              {errors?.country?.type === "pattern" && <p>{t("alphabetical_characters_only")}</p>}
            </div>
            <div className="field_and_validate">
              <InputField
                required
                type="text"
                label={t("city")}
                placeholder={`${t("enter")} ${t("city_name")}`}
                {...register("city", {
                  required: true,
                  maxLength: 50,
                  pattern: /^[A-Z a-z0-9]+$/i,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.city?.type === "required" && <p>{t("field_required")}</p>}
              {errors?.city?.type === "maxLength" && <p>{t("city_name")} {t("cannot_exceed_20_characters")}</p>}
              {errors?.city?.type === "pattern" && <p>{t("alphabetical_characters_only")}</p>}
            </div>
            <div className="field_and_validate">
              <InputField
                required
                type="text"
                label={t("street_name")}
                placeholder={`${t("enter")} ${t("street_name")}`}
                {...register("streetName", {
                  maxLength: 50,
                  required: true,
                  pattern: /^[A-Z a-z0-9]+$/i,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.streetName?.type === "required" && <p>{t("field_required")}</p>}
              {errors?.streetName?.type === "maxLength" && (
                <p>{t("street_name")} {t("cannot_exceed_20_characters")}</p>
              )}
              {errors?.streetName?.type === "pattern" && <p>{t("alphabetical_characters_only")}</p>}
            </div>
          </div>
          <div className="row_container"></div>
          <div className="row_container">
            <div className="field_and_validate">
              <InputField
                required
                type="text"
                label={t("landmark")}
                placeholder={`${t("enter")} ${t("landmark")}`}
                {...register("landmark", {
                  maxLength: 50,
                  required: true,
                  // pattern: /^[A-Z a-z']+$/i
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.landmark?.type === "required" && <p>{t("field_required")}</p>}
              {errors?.landmark?.type === "maxLength" && (
                <p>{t("street_name")} {t("cannot_exceed_20_characters")}</p>
              )}
            </div>
            <div className="field_and_validate">
              <InputField
                type="text"
                label={t("latitude")}
                placeholder={`${t("enter")} ${t("latitude")}`}
                {...register("lat", {
                  maxLength: 30,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.lat?.type === "maxLength" && <p>{t("latitude")} {t("cannot_exceed_30_characters")}</p>}
              {errors?.lat?.type === "pattern" && <p>{t("alphabetical_characters_only")}</p>}
            </div>
            <div className="field_and_validate">
              <InputField
                type="text"
                label={t("longitude")}
                placeholder={`${t("enter")} ${t("longitude")}`}
                {...register("long", {
                  maxLength: 30,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.long?.type === "maxLength" && <p>{t("street_name")} {t("cannot_exceed_30_characters")}</p>}
              {errors?.long?.type === "pattern" && <p>{t("alphabetical_characters_only")}</p>}
            </div>
          </div>
        </div>
        <h3>{t("contact_info")}</h3>

        <div className="contact info_container  ">
          <div className="row_container">
            <div className="field_and_validate">
              <InputField
                required
                type="text"
                label={t("email")}
                placeholder={t("placeholder_email")}
                {...register("primaryEmail", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.primaryEmail?.type === "pattern" && <p>{t("invalid_primary_email")}</p>}
              {errors?.primaryEmail?.type === "required" && <p>{t("field_required")}</p>}
            </div>

            <div className="field_and_validate">
              <InputField
                required
                label={t("phoneNumber")}
                type="text"
                placeholder={t("placeholder_phoneNumber")}
                {...register("primaryNumber", {
                  required: true,
                  pattern: /^[0-9]{0,14}$/,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.primaryNumber?.type === "pattern" && <p>{t("invalid_primary_number")}</p>}
              {errors?.primaryNumber?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>
          <div className=" row_container">
            <div className="field_and_validate">
              <InputField
                type="text"
                label={t("secondary_email")}
                placeholder={t("placeholder_secondary_email")}
                {...register("secondaryEmail", {
                  required: false,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trim();
                }}
              />
              {errors?.secondaryEmail?.type === "pattern" && <p>{t("invalid_secondary_email")}</p>}
              {errors?.secondaryEmail?.type === "required" && <p>{t("field_required")}</p>}
            </div>

            <div className="field_and_validate">
              <InputField
                label={t("secondary_phone")}
                type="text"
                placeholder={t("placeholder_secondary_phone")}
                {...register("secondaryNumber", {
                  required: false,
                  pattern: /^[0-9]{0,14}$/,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              {errors?.secondaryNumber?.type === "pattern" && <p>{t("invalid_secondary_phone")}</p>}
              {errors?.secondaryNumber?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>
        </div>

        <div className="button_container ">
          <div className="submit_button_wrapper">
            <Button
              type="submit"
              color="success"
              buttonName={isLoading ? t("submitting") : editform ? "Update School" : "Add School"}
              clickHandler={() => { }}
              disabled={isLoading ? true : false}
            />
          </div>
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
                buttonName={t("clear")}
                clickHandler={() => handleCancel()}
              />
            )}
            <div style={{ height: "50px" }}></div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SchoolForm;

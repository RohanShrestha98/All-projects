import "./ContentFilter.scss";
import CustomCreatableSelect from "../../../../components/CustomSelect/CustomCreatableSelect";
import InputField from "../../../../components/InputField/InputField";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { useState } from "react";
import { optionType } from "../../../../@types/option";
import config from "../../../../config";
import http from "../../../../utils/http";
import toasts from "../../../../utils/toast";
import GenerateListOptions from "../../../School/components/schoolForm/SelectOptions";

const contentApi = config.endpoints.api.content;

const ContentFilter = ({ setFilteredData, setRemoveFilter }) => {
  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    contentTypeOptions,
    fileTypeOptions,
    imageTypeOptions,
    audioTypeOptions,
    videoTypeOptions,
    bookTypeOptions,
  } = GenerateListOptions();
  const { t } = useTranslation();

  const validationSchema = z.object({
    query: z.string().optional(),
    fileType: z.any().optional(),
    keywords: z.any().optional(),
    contentType: z.string().min(1, `${t("content_type_is_required")}`),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    mode: "onSubmit",
    resolver: zodResolver(validationSchema),
  });

  const [selectedFileType, setSelectedFileType] = useState<optionType | null>();
  const [selectedConentType, setSelectedContentType] = useState<optionType | null>();
  const [tags, setTags] = useState([]);

  const handleFileTypeChange = (data, e) => {
    setSelectedFileType(data);
    setValue("fileType", data?.value, { shouldDirty: true });
  };

  const handleContentTypeChange = (data, e) => {
    setSelectedContentType(data);
    setValue("contentType", data?.value, { shouldDirty: true });
  };

  const handleContentFilter = async (data, e) => {
    setRemoveFilter(true);
    e.preventDefault();
    try {
      const response = await http.POST(contentApi.search, {
        query: data?.query,
        fileType: selectedFileType?.value,
        keywords: tags,
        contentType: selectedConentType?.value,
      });
      setFilteredData(response?.data?.data);
    } catch (err) {
      toasts.error(err?.response?.data?.errors?.error);
    }
  };

  const handleReset = () => {
    setSelectedFileType(null);
    setSelectedContentType(null);
    setTags([]);
    setValue("query", "");
    setValue("fileType", null);
    setValue("keywords", null);
    setValue("contentType", null);
  };

  return (
    <form onSubmit={handleSubmit(handleContentFilter)}>
      <div className="query_container">
        <InputField
          required
          type="text"
          label={`${t("query")}`}
          placeholder={`${t("placeholder_query")}`}
          {...register("query")}
          onKeyUp={e => {
            e.target.value = e?.target?.value?.trimStart();
          }}
        />
        {errors?.query?.message && <p className="field_required">{errors?.query?.message}</p>}
      </div>
      <div className="keywords_container">
        <label htmlFor="keywords">
          {t("keywords")} <span>*</span>
        </label>
        <CustomCreatableSelect
          id="keywords"
          register={register}
          name="keywords"
          tags={tags}
          setTags={setTags}
        />
      </div>
      <div className="contentType_container">
        <CustomSelect
          label={t("contentType")}
          id="contentType"
          name="contentType"
          register={register}
          placeholder={`${t("select")}`}
          handleChange={(e, data) => {
            handleContentTypeChange(e, data);
          }}
          options={contentTypeOptions}
          value={selectedConentType}
          required
        />
        {errors?.contentType?.message && (
          <p className="field_required">{t("content_type_is_required")}</p>
        )}
      </div>
      <div className="fileType_container">
        <CustomSelect
          id="fileType"
          name="fileType"
          label={t("fileType")}
          register={register}
          handleChange={(e, data) => {
            handleFileTypeChange(e, data);
          }}
          options={
            selectedConentType?.value === "video"
              ? videoTypeOptions
              : selectedConentType?.value === "audio"
              ? audioTypeOptions
              : selectedConentType?.value === "image"
              ? imageTypeOptions
              : selectedConentType?.value === "book"
              ? bookTypeOptions
              : fileTypeOptions
          }
          value={selectedFileType}
          required={false}
          disabled={selectedConentType?.value === "questionaire"}
        />
      </div>
      <div className="field_required" style={{ fontSize: "11px" }}>
        {t("note_either_query_or_keywords_must_be_supplied")}
      </div>
      <div className="content_filter_button">
        <Button
          type="reset"
          color="danger"
          buttonName={t("reset")}
          clickHandler={() => handleReset()}
        />
        <Button type="submit" color="success" buttonName={t("filter")} clickHandler={() => {}} />
      </div>
    </form>
  );
};

export default ContentFilter;

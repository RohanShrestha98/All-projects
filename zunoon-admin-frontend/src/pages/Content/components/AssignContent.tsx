import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import InputField from "../../../components/InputField/InputField";
import http from "../../../utils/http";
import "./AssignContent.scss";
import config from "../../../config";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import { optionType } from "../../../@types/option";
import { ILessonResponse } from "../../../@types/lesson";
const lessonAPI = config.endpoints.api.lesson;
const contentAPI = config.endpoints.api.content;

const AssignContent = ({ id, t, handleClickSubmit, loading }) => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState<optionType>({
    label: "",
    value: "",
  });
  const [selectedContents, setSelectedContents] = useState([]);

  const [contentOptions, setContentOptions] = useState<optionType[] | null>();

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(lessonAPI.list, "");
      setLessons(response.data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(contentAPI.list, "");
      setContentOptions(
        response.data.data.map((content: any) => ({
          label: content.title ? content.title : `no ${t("title")}`,
          value: content.id,
        })),
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (lessons?.length && lessons !== undefined) {
      const lesson: ILessonResponse = lessons.find((lesson: ILessonResponse) => lesson.id === id)!;
      setSelectedLesson({
        label: lesson.title,
        value: lesson.id,
      });
    }
  }, [id, lessons]);

  const {
    register,
    reset,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      lesson: id,
      content: "",
    },
  });

  const handleMultiSelect = value => {
    setSelectedContents(value);
    const contentIds = value.map(item => item?.value);
    setValue("content", contentIds);
  };

  return (
    <form className="assign_wrapper" onSubmit={handleSubmit(handleClickSubmit)}>
      <div className="lesson_wrapper">
        <label htmlFor="lesson">{t("sidebar_lesson")}</label>
        <div style={{ opacity: 0.6 }}>
          <InputField
            label=""
            type="text"
            placeholder={t("sidebar_lesson")}
            disabled
            //@ts-ignore
            value={selectedLesson?.label}
            {...register("lesson")}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
        </div>
      </div>
      <div className="select_field_container">
        <label htmlFor="content">{t("sidebar_content")}</label>
        <MultiSelect
          options={contentOptions}
          selected={selectedContents}
          handleMultiSelect={handleMultiSelect}
          {...register("content", {
            required: true,
          })}
        />
        {errors?.content?.type === "required" && (
          <p className="error_text">{t("field_required")}</p>
        )}
      </div>

      <div className="button_wrapper">
        <Button
          type="submit"
          color="success"
          buttonName={loading ? t("submitting") : t("assign")}
          disabled={loading}
        />
        <Button type="button" color="danger" clickHandler={() => reset()} buttonName={t("clear")} />
      </div>
    </form>
  );
};

export default withTranslation()(AssignContent);

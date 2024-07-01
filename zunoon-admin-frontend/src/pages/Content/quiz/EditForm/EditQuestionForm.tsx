import React from "react";

import InputField from "../../../../components/InputField/InputField";
import { useForm } from "react-hook-form";

import "./EditQuestionForm.scss";

import Button from "../../../../components/Button/Button";
import { useTranslation } from "react-i18next";

export default function EditQuestionForm({
  question,
  handleQuestionUpdate,
  closeEditQuestionModal,
}) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    question && {
      defaultValues: {
        id: question && question.id,
        quiz: question && question.quiz,
        question: question && question.question,
        link: question && question.link,
        description: question && question.description,
      },
    },
  );
  return (
    <div className="edit_question_container">
      <h6>Quiz Id:{question.id}</h6>
      <form onSubmit={handleSubmit(handleQuestionUpdate)}>
        <div className="row">
          <div className="fieldAndValidate">
            <InputField
              required
              type="text"
              label="Question"
              placeholder={"Enter question"}
              {...register("question", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.question?.type === "required" && <p>{t("field_required")}</p>}
            {errors?.question?.type === "maxLength" && <p>{t("question")} {t("too_long_max_30_characters")}</p>}
            {errors?.question?.type === "minLength" && <p>{t("question")} {t("too_short_min_2_characters")}</p>}
          </div>
        </div>
        <div className="row">
          <div className="fieldAndValidate">
            <InputField
              type="text"
              label="Description"
              placeholder={"Enter description"}
              {...register("description", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.description?.type === "required" && <p>{t("field_required")}</p>}
            {errors?.description?.type === "maxLength" && (
              <p>{t("th_description")} {t("too_long_max_30_characters")}</p>
            )}
            {errors?.description?.type === "minLength" && (
              <p>{t("th_description")} {t("too_short_min_2_characters")}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="fieldAndValidate">
            <InputField
              type="text"
              label="Link"
              placeholder={"Enter Link"}
              {...register("link", {
                required: false,
                minLength: 2,
                maxLength: 30,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.question?.type === "maxLength" && <p>{t("link")} {t("too_long_max_30_characters")}</p>}
            {errors?.question?.type === "minLength" && <p>{t("link")} {t("too_short_min_2_characters")}</p>}
          </div>
        </div>
        <div className="button_container">
          <div className="update_button_wrapper">
            <Button
              buttonName="Update"
              color="success"
              filledButton={true}
              clickHandler={closeEditQuestionModal}
              type="submit"
            />
          </div>
          <div className="close_button_wrapper">
            <Button
              buttonName={t("close")}
              color="danger"
              clickHandler={closeEditQuestionModal}
              type="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

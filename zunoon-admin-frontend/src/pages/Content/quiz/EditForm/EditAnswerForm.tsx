import React from "react";
import InputField from "../../../../components/InputField/InputField";
import { useForm } from "react-hook-form";

import "./EditAnswerForm.scss";
import Button from "../../../../components/Button/Button";
import { useTranslation } from "react-i18next";

export default function EditAnswerForm({ answer, handleAnswerUpdate, closeEditAnswerModal }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    answer && {
      defaultValues: {
        answer: answer && answer.answer,
        link: answer && answer.link,
        description: answer && answer.description,
        id: answer && answer.id,
        is_correct: answer && answer.is_correct,
        question: answer && answer.question,
      },
    },
  );
  return (
    <div className="edit_answer_container">
      <h6>answer Id:{answer?.id}</h6>
      <form onSubmit={handleSubmit(handleAnswerUpdate)}>
        <div className="row">
          <div className="input_field">
            <InputField
              required
              type="text"
              name="answer"
              label={t("answer")}
              placeholder={t("placeholder_answer")}
              {...register("answer", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.answer?.type === "required" && <p>{t("field_required")}</p>}
            {errors?.answer?.type === "maxLength" && <p>{t("answer")} {t("too_long_max_30_characters")}</p>}
            {errors?.answer?.type === "minLength" && <p>{t("answer")} {t("too_short_min_2_characters")}</p>}
          </div>
        </div>
        <div className="row">
          <div className="input_field">
            <InputField
              type="text"
              name="description"
              label={t("th_description")}
              placeholder={t("placeholder_description")}
              {...register("description", {
                required: false,
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
          <div className="input_field">
            <InputField
              type="text"
              name="link"
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
            {errors?.answer?.type === "maxLength" && <p>{t("link")} {t("too_long_max_30_characters")}</p>}
            {errors?.answer?.type === "minLength" && <p>{t("link")} {t("too_short_min_2_characters")}</p>}
          </div>
        </div>
        <div className="button_container">
          <div className="update_button_wrapper">
            <Button
              buttonName="Update"
              color="success"
              filledButton={true}
              clickHandler={closeEditAnswerModal}
              type="submit"
            />
          </div>
          <div className="close_button_wrapper">
            {/* <Button variant="success" onClick={closeEditAnswerModal}>
              Close
            </Button> */}
            <Button
              buttonName="Close"
              color="danger"
              clickHandler={closeEditAnswerModal}
              type="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import GradeForm from "./components/GradeForm/GradeForm";
import http from "../../utils/http";
import toast from "../../utils/toast";
import config from "../../config";

import "./AddGrade.scss";
import { withTranslation } from "react-i18next";
const gradeCategoryApi = config.endpoints.api.gradeCategory;

function AddGradeCategory({ t }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleClickSubmit = data => {
    setIsSubmitting(true);
    http
      .POST(gradeCategoryApi.create, data)
      .then(() => {
        toast.success(`${t("grade_category")} ${t("added_successfully")}!`);
        setTimeout(() => {
          navigate("../");
        }, 1000);
      })
      .catch(error => {
        let resErrors = error?.response?.data?.errors;
        toast.error(Object.values(resErrors)?.toString() || t("error_occured"));
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">
          {t("th_grade")} {t("category")} | {`${t("add")} ${t("th_grade")}  ${t("category")}`}
        </h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>

      <div className="add_grade_form">
        <GradeForm
          editform={false}
          handleClickSubmit={data => handleClickSubmit(data)}
          isSubmitting={isSubmitting}
          gradeCategory={true}
        />
      </div>
    </>
  );
}

export default withTranslation()(AddGradeCategory);

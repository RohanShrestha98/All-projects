import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import GradeForm from "./components/GradeForm/GradeForm";
import http from "../../utils/http";
import toast from "../../utils/toast";
import config from "../../config";

import "./AddGrade.scss";
import { withTranslation } from "react-i18next";
import { useTabContext } from "../../context/TabContextProvider";
const gradeApi = config.endpoints.api.grade;
const gradeCategoryApi = config.endpoints.api.gradeCategory;

function AddGrade({ t }) {
  const { activeTab, setActiveTab } = useTabContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState();
  const location = useLocation();

  const handleClickSubmit = data => {
    const postData = {
      ...data,
      gradeCategory: selectedGradeCategory?.value
    }
    setIsSubmitting(true);
    http
      .POST(location.state?.gradeCategory ? gradeCategoryApi.create : gradeApi.create, postData)
      .then(() => {
        toast.success(`${t("th_grade")} ${t("added_successfully")}`);
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
          {location.state?.gradeCategory ? (
            <>
              {" "}
              {t("th_grade")} {t("category")} | {`${t("add")} ${t("th_grade")}  ${t("category")}`}
            </>
          ) : (
            <>
              {" "}
              {t("th_grade")} | {`${t("add")} ${t("th_grade")} `}{" "}
            </>
          )}
        </h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => {
              setActiveTab(
                location?.pathname?.endsWith("add-grade-category") ? "grade_category" : "grade",
              );
              navigate("../");
            }}
          />
        </div>
      </div>

      <div className="add_grade_form">
        <GradeForm
          editform={false}
          handleClickSubmit={data => handleClickSubmit(data)}
          isSubmitting={isSubmitting}
          setSelectedGradeCategory={setSelectedGradeCategory}
          gradeCategory={location.state?.gradeCategory ? true : false}
        />
      </div>
    </>
  );
}

export default withTranslation()(AddGrade);

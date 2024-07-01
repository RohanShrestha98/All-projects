import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "../../utils/http";
import toast from "../../utils/toast";

import Button from "../../components/Button/Button";
import CourseForm from "./components/courseForm/CourseForm";

import "./AddCourse.scss";

import config from "../../config";
import { withTranslation } from "react-i18next";
const courseApi = config.endpoints.api.course;

const AddCourse = ({ t }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClickSubmit = data => {
    setIsSubmitting(true);
    http
      .POST(courseApi.create, data)
      .then(res => {
        toast.success(` ${t("course")} ${t("added_successfully")}!`);
        navigate("../");
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
        <h4 className="page_title">{`${t("courses")} | ${t("add")} ${t("courses")}`}</h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            color="success"
            buttonName={`< ${t("back")}`}
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>

      <div className="add_course_form">
        <CourseForm
          editform={false}
          handleClickUpdate={() => { }}
          handleClickSubmit={data => handleClickSubmit(data)}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
};

export default withTranslation()(AddCourse);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "../../utils/http";
import toast from "../../utils/toast";

import Button from "../../components/Button/Button";
import LessonForm from "./components/lessonForm/LessonForm";

import "./AddLesson.scss";

import config from "../../config";
import { withTranslation } from "react-i18next";
const lessonApi = config.endpoints.api.lesson;

const AddCourse = ({ t }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSubmit = data => {
    setIsLoading(true);
    // if (!data?.thumbnail?.length) {
    //   delete data.thumbnail;
    // } else {
    //   data.thumbnail = data?.thumbnail[0];
    // }

    http
      .POST_FILE(lessonApi.create, data)
      .then(res => {
        toast.success(` ${t("lesson")} ${t("added_successfully")}!`);
        navigate("../");
        // setTimeout(() => {
        // }, 1000);
      })
      .catch(error => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{`${t("lesson")} | ${t("add")} ${t(
          "lesson"
        )}`}</h4>

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
        <LessonForm
          editform={false}
          handleClickUpdate={() => { }}
          handleClickSubmit={data => handleClickSubmit(data)}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default withTranslation()(AddCourse);

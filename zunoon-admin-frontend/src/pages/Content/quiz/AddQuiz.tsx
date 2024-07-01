import React, { useState /* useRef */ } from "react";
/* import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import http from "../../../utils/http"; */
import AddQuizCollection from "./Add Quiz/AddQuizCollection";

import "./AddQuiz.scss";
import InputField from "./../../../components/InputField/InputField";
import { useTranslation } from "react-i18next";

/* type RefType = HTMLInputElement | null; */

export default function AddQuiz() {
  const {t} = useTranslation();
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");

  /* const locationState = useLocation().state as { id: string }; */

  const handleSubmit = questions => {
    /* e.preventDefault();
    let submitForm = {
      title: quizTitle,
      description: quizDescription,
      contentType: "quiz",
      position: 2,
      master_content: locationState.id,
      is_primary: false,
      contents: questions,
    };
    async function postData() {
      try {
        let response = await http.POST("/content/quiz/create/", submitForm);

        if (response.status === 200) {
          toast.success("Quiz added");
        }
      } catch (error) {
        toast.error(error);
      }
    }
    postData(); */
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "quiz_title":
        setQuizTitle(e.target.value);
        break;
      case "quiz_description":
        setQuizDescription(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h4>{`${t("add")} ${t("quiz")}`}</h4>

      <div className="quiz_detail">
        <div className="quiz_title">
          <InputField
            type="text"
            label={t("quiz_title")}
            name="quiz_title"
            placeholder="Title"
            onChange={handleChange}
            value={quizTitle}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
        </div>
        <div className="quiz_description">
          <InputField
            type="text"
            label={t("quiz_description")}
            name="quiz_description"
            placeholder={t("th_description")}
            onChange={handleChange}
            value={quizDescription}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
        </div>
      </div>
      <div className="quiz_collection">
        <AddQuizCollection postData={handleSubmit} />
      </div>
    </>
  );
}

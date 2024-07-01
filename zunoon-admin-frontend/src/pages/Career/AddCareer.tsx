import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CareerForm from "./components/CareerForm/CareerForm";
import http from "../../utils/http";
import toast from "../../utils/toast";
import config from "../../config";

import "./AddCareer.scss";
import { withTranslation } from "react-i18next";
import { PATH } from "../../constants/routes";
const careerApi = config.endpoints.api.career;

function AddCareer({ t }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClickSubmit = data => {
    setIsSubmitting(true);
    http
      .POST(careerApi.create, data)
      .then(res => {
        toast.success(`${t("th_career")} ${t("added_successfully")}`);
        setTimeout(() => {
          navigate(PATH.CAREER);
        }, 1000);
        setIsSubmitting(false);
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
          {t("th_career")} | {`${t("add")} ${t("th_career")}`}
        </h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate(PATH.CAREER)}
          />
        </div>
      </div>

      <div className="add_career_form">
        <CareerForm
          editform={false}
          handleClickSubmit={data => handleClickSubmit(data)}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}

export default withTranslation()(AddCareer);

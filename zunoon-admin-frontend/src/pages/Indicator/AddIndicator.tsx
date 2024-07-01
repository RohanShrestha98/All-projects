import React, { useState } from "react";
import { withTranslation } from "react-i18next";

import IndicatorForm from "./components/indicatorForm/IndicatorForm";
import Button from "../../components/Button/Button";
import http from "../../utils/http";
import toast from "../../utils/toast";

import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./AddIndicator.scss";

import config from "../../config";
const indicatorApi = config.endpoints.api.indicator;

function AddIndicator({ t }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClickSubmit = data => {
    setIsSubmitting(true);
    http
      .POST_FILE(indicatorApi.create, data)
      .then(res => {
        toast.success(` ${t("th_indicator")} ${t("added_successfully")}`);
        setTimeout(() => {
          navigate("../");
        }, 1000);
        setIsSubmitting(false);
      })
      .catch(error => {
        let resErrors = error?.response?.data?.errors;
        toast.error(Object.values(resErrors)?.toString() || "Error occured");
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{`${t("sidebar_indicator")} | ${t("add")} ${t(
          "sidebar_indicator",
        )}`}</h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>

      <div className="add_unit_form">
        <IndicatorForm
          editform={false}
          handleClickSubmit={data => handleClickSubmit(data)}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}

export default withTranslation()(AddIndicator);

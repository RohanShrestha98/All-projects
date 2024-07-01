import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import LevelForm from "./LevelTypeForm";
import http from "../../utils/http";
import toast from "../../utils/toast";
import config from "../../config";

import { withTranslation } from "react-i18next";
const levelApi = config.endpoints.api.level;
const levelCategoryApi = config.endpoints.api.levelCategory;

function AddLevelCategory({ t }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const handleClickSubmit = data => {
    setIsLoading(true);
    http
      .POST(location.state?.levels ? levelApi.create : levelCategoryApi.create, data)
      .then(res => {
        toast.success(` ${t("level")} ${t("added_successfully")}!`);
        setTimeout(() => {
          navigate("../");
        }, 1000);
      })
      .catch(error => {
        toast.error(error?.response?.data?.errors?.error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">
          {location.state?.levels ? (
            <>
              {" "}
              {t("level")} | {`${t("add")} ${t("level")} `}{" "}
            </>
          ) : (
            <>
              {" "}
              {t("level_type")} | {`${t("add")} ${t("level_type")}`}
            </>
          )}
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
        <LevelForm
          editform={false}
          handleClickSubmit={data => handleClickSubmit(data)}
          isLoading={isLoading}
          levels={location.state?.levels ? true : false}
        />
      </div>
    </>
  );
}

export default withTranslation()(AddLevelCategory);

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import config from "../../config";
import http from "../../utils/http";
import toast from "../../utils/toast";
import UnitForm from "./UnitForm/UnitForm";
import Button from "../../components/Button/Button";
import "./AddUnit.scss";
import UtcDateConverter from "../../utils/utcDateConverter";
import { PATH } from "../../constants/routes";

const unitApi = config.endpoints.api.unit;

const AddUnit = ({ t }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickSubmit = (data: any) => {
    if (data?.courses) {
      data.courses = [data?.courses];
    }
    const utcStartDate = UtcDateConverter(data?.startDate);
    const utcEndDate = UtcDateConverter(data?.endDate);
    data.startDate = new Date(utcStartDate);
    data.index = parseInt(data.index);
    data.endDate = new Date(utcEndDate);
    delete data.grade;
    delete data.career;
    delete data.leveltype;
    http
      .POST(unitApi.create, data)
      .then(() => {
        toast.success(` ${t("th_unit")} ${t("added_successfully")}!`);
        navigate(PATH.UNIT);
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
        <h4 className="page_title">{`${t("unit")} | ${t("add")} ${t("unit")}`}</h4>

        <div className="button_wrapper ">
          <Button
            type="button"
            color="success"
            buttonName={`< ${t("back")}`}
            clickHandler={() => navigate(PATH.UNIT)}
          />
        </div>
      </div>

      <div className="add_course_form">
        <UnitForm
          editform={false}
          handleClickUpdate={() => { }}
          handleClickSubmit={data => handleClickSubmit(data)}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
};

export default withTranslation()(AddUnit);

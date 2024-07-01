import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import http from "../../utils/http";
import toast from "../../utils/toast";
import { withTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import StaffForm from "./components/staffForm/StaffForm";
import "./AddStaff.scss";
import config from "../../config";
import { PATH } from "../../constants/routes";

const userApi = config.endpoints.api.user;

const AddStaff = ({ t }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState()

  const handleClickSubmit = data => {
    const permissions = data && data?.permissions;
    delete data.permissions;

    http
      .POST(userApi.create, data)
      .then(res => {
        toast.success(t("staff_added_successfully"));
        setTimeout(() => {
          navigate(`../${PATH.PERMISSION}`, {
            state: {
              userId: res.data.userId,
              name: `${data.firstName} ${data.middleName} ${data.lastName}`,
              role: data.role,
              permissions,
            },
          });
        }, 1000);
      })
      .catch(error => {
        setError(error?.response?.data?.errors)
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">
          {t("staff")} | {t("add")} {t("staff")}
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

      <div className="add_staff_form ">
        <StaffForm
          error={error}
          editform={false}
          handleClickSubmit={data => handleClickSubmit(data)}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

AddStaff.propTypes = {
  t: PropTypes.func.isRequired, // Add prop validation for the 't' prop
};

export default withTranslation()(AddStaff);

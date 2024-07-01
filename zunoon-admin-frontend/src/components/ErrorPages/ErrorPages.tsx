import React from "react";
import emptyImage from "../../assets/images/empty.png";
import searching from "../../assets/images/searching.png";
import errorImage from "../../assets/images/error.png";
import "./ErrorPages.scss";
import { useTranslation } from "react-i18next";

const ErrorPages = ({ isFetching, data, error }) => {
  const {t} = useTranslation();
  return (
    <>
      {isFetching && (
        <div className="container">
          <div className="contents">
            <img src={searching} alt="no-data" width="75px" style={{ marginTop: "6em" }} />
            <h5>
              <p style={{ fontWeight: 600 }}>{t("requesting")} . . .</p>
            </h5>
          </div>
        </div>
      )}

      {!isFetching && !data && !error && (
        <div className="container">
          <div className="contents">
            <img src={emptyImage} alt="no-data" width="250px" height="200px" />
            <h5>
              <p style={{ fontWeight: 600 }}>{t("no_data_to_show_currently")}</p>
            </h5>
          </div>
        </div>
      )}

      {error && !isFetching && (
        <div className="container">
          <div className="contents">
            <img src={errorImage} alt="no-data" width="250px" height="200px" />
            <h5>
              <strong>{t("oops_something_went_wrong")}</strong>
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPages;

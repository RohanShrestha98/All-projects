import { useEffect, useState } from "react";
import "./tableofcontent.scss";
import Button from "../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import config from "../../config";
import http from "../../utils/http";
import toasts from "../../utils/toast";
import ErrorPages from "../../components/ErrorPages/ErrorPages";
import UnitContentAccordian from "./UnitContentAccordian";
import LevelContentAccordian from "./LevelContentAccordian";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useTranslation } from "react-i18next";
import ConvertArrayToString from "../../utils/convertArrayToString";
import ApproveModal from "../../components/ApproveModal/ApproveModal";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { TruncateText } from "../../utils/truncateText";
import { getPermissions } from "../../utils/storage";

export default function TableOfContent() {
  const { t } = useTranslation();
  const courseApi = config.endpoints.api.course;
  const [tableOfUnit, setTableOfUnit] = useState<any[]>([]);
  const [finalData, setFinalData] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<any>(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const { id, name, isApproved } = state;

  useEffect(() => {
    fetchNewData(`${courseApi.listUnitTableofContent(id)}`);
  }, [fetchNewData, id]);

  useEffect(() => {
    if (fetchedData.unit) {
      setTableOfUnit(fetchedData?.unit);
    }
  }, [fetchedData]);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchLevel() {
      const response = await http.GET(courseApi.listByUnit(id), "");
      setData(response?.data?.data);
      groupTeachers(response?.data?.data);
    }
    fetchLevel();
  }, []);

  const groupTeachers = data => {
    let tempData = {};
    data?.map(each => {
      const levelId = each.level;
      if (levelId in tempData) {
        tempData[levelId].push(each);
      } else {
        tempData[levelId] = [each];
      }
    });
    setFinalData([tempData]);
  };
  const LevelDataKey = finalData && finalData[0] && Object.keys(finalData[0]);

  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const approvePermissions = getPermissions()
    .filter(each => each.url.path.includes("approve"))
    .map(each => each.url.path);

  const handleApproveClick = () => {
    http
      .PATCH(courseApi.approveCourse(id), "")
      .then(() => {
        setShowConfirmModal(false);
        toasts.success(t("course_status_change_successfully"));
        navigate("/courses");
      })
      .catch(error => {
        if (error?.response?.data?.errors?.error === "course must have exactly four units") {
          toasts.error(t("course_must_have_exactly_four_units"))
        }
        else {
          toasts.error(
            error?.response?.data?.errors
              ? capitalizeFirstLetter(
                ConvertArrayToString(Object?.values(error?.response?.data?.errors)),
              )
              : error?.message?.toString(),
          );
        }
      })
      .finally(() => { });
  };

  return (
    <>
      <div className="content_search_title ">
        <div className="content_search_heading">
          <p> {name?.slice(0, 100)}</p>
          {/* {TruncateText(name, 100, 200)} */}
        </div>
        {
          (approvePermissions.includes("/course/approve/") || isAdmin) && <div className="button_wrapper d-flex gap-2">
            {isApproved ? (
              <div className="unApproveButton" onClick={() => setShowConfirmModal(true)}>
                {t("unapprove")}
              </div>
            ) : (
              <div className="approveButton" onClick={() => setShowConfirmModal(true)}>
                {t("approve")}
              </div>
            )}
            <Button
              type="button"
              clickHandler={() => navigate("/courses")}
              buttonName={`<  ${t("back")}`}
              color="success"
            />
          </div>
        }

      </div>
      <div className="table_of_content">
        {data?.length && LevelDataKey && LevelDataKey[0] !== "undefined" ? (
          <>
            {LevelDataKey &&
              LevelDataKey.map(key => {
                return (
                  <LevelContentAccordian
                    key={key}
                    item={key}
                    data={data}
                    tableOfUnit={tableOfUnit}
                  />
                );
              })}
          </>
        ) : (
          <>
            {tableOfUnit &&
              tableOfUnit.map(item => {
                const skillData = item.skill;
                return <UnitContentAccordian skillData={skillData} item={item} level={undefined} />;
              })}
          </>
        )}
        <ErrorPages isFetching={loading} data={data} error={error} />
      </div>
      <ApproveModal
        name={name}
        isApproved={isApproved}
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        handleApprove={handleApproveClick}
      />
    </>
  );
}

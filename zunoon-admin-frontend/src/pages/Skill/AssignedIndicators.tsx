import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import config from "../../config";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import http from "../../utils/http";
import toast from "../../utils/toast";
import Tables from "../../components/Tables/Tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { DragDropTable } from "../../components/DragDrop/DragDropTable";

function AssignedIndicators({ t }) {
  const { fetchedData, loading, error, fetchNewData } = useFetch();
  const [indicators, setIndicators] = useState<any[]>([]);
  const courseApi = config.endpoints.api.course;
  const skillApi = config.endpoints.api.skill;
  const gradeApi = config.endpoints.api.grade;
  const indicatorApi = config.endpoints.api.indicator;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedIndicators, setCheckedIndicators] = useState([]);
  const [disableDrag, setDisableDrag] = useState(true);

  const { state } = useLocation();
  const { id, name } = state;

  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNewData(`${skillApi.listByIndicator(id)}`);
  }, [fetchNewData, id]);

  useEffect(() => {
    setIndicators(fetchedData.data);
  }, [fetchedData]);

  const handleUnassign = data => {
    http
      .POST(skillApi.unassignIndicator, { skill: id, indicators: checkedIndicators })
      .then(() => {
        toast.success("Indicators Unassigned successfully");
        fetchNewData(`${skillApi.listByIndicator(id)}`);
        reset();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  const columns = [
    {
      Header: `${t("indicator")} ${t("th_name")}`,
      accessor: row => `${row.name}`,
      Cell: ({ row }) => {
        const original = row?.original;
        return (
          <div className="profile_container">
            <div className="profile_pic_container ">
              {original.thumbnail ? (
                <img src={`${original.thumbnail}`} alt={`thumbnail ${original.name}`} />
              ) : (
                <FontAwesomeIcon icon={faBook} />
              )}
            </div>
            <CustomTooltip original={original?.name} id={original?.id} />
          </div>
        );
      },
    },
    {
      Header: `${t("th_description")}`,
      accessor: "description",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.description} id={original?.id} />;
      },
    },
  ];

  const handlePositionUpdate = () => {
    http
      .POST(skillApi.updatePosition, {
        skill: id,
        indicators:
          indicators &&
          indicators.map(item => {
            return item.id;
          }),
      })
      .then(() => {
        toast.success(`${t("position")} ${t("updated_successfully")}`);
      })
      .catch(error => {
        toast.error(error);
      });
  };

  const handleSelectedRows = selectedRows => {
    if (checkedIndicators.toString() !== selectedRows.toString())
      setCheckedIndicators(selectedRows);
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_indicator")} {t("assigned_to")} {name}</h4>
        <div className="search_wrapper">
          <Search handleSearch={() => {}} />
        </div>
        <div className="button_wrapper mr-5">
          <div className="arrange_dragdrop">
            <div
              className="arrange_button"
              onClick={() => {
                setDisableDrag(pre => !pre);
                !disableDrag && handlePositionUpdate();
              }}
            >
              <p>{t("arrange")}&nbsp;&nbsp;</p>
              {disableDrag ? (
                <i className="bx bxs-sort-alt" title="Reorder Contents"></i>
              ) : (
                <i className="bx bx-check tick" title="Save Changes"></i>
              )}
            </div>
            <Button
              type="button"
              color="success"
              buttonName={`< ${t("back")}`}
              clickHandler={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
      {checkedIndicators?.length ? (
        <div className="unassign_banner">
          {checkedIndicators?.length} Indicators Selected
          <div className="unassign_button">
            <Button
              type="submit"
              color="danger"
              buttonName={`${t("unassign")}`}
              clickHandler={handleSubmit(data => {
                handleUnassign(data);
              })}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container career_table_container">
        {/* <Tables
          data={indicators}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          handleDelete={() => {}}
          hasCheckBox={true}
          hasActions={false}
          handleClickUpdate={() => {}}
          onSelectRows={handleSelectedRows}
        /> */}

        <DragDropTable
          data={indicators ?? []}
          disableDrag={disableDrag}
          columns={columns}
          setData={setIndicators}
          hasCheckBox={true}
          selectedElementRef={undefined}
          onSelectRows={handleSelectedRows}
        />
      </div>
    </>
  );
}

export default withTranslation()(AssignedIndicators);

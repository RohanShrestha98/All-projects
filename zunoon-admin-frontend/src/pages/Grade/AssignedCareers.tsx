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

function AssignedCareers({ t }) {
  const { fetchedData, loading, error, fetchNewData } = useFetch();
  const [courses, setCourses] = useState<any[]>([]);
  const careerApi = config.endpoints.api.career;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedCareers, setCheckedCareers] = useState([]);

  const { state } = useLocation();
  const { id, name } = state;

  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNewData(careerApi.careerByGrade(id));
  }, [fetchNewData, id]);

  useEffect(() => {
    setCourses(fetchedData.data);
  }, [fetchedData]);

  const handleUnassign = () => {
    http
      .POST(careerApi.unassignCareer, { grade: id, careers: checkedCareers })
      .then(() => {
        toast.success("Career Unassigned successfully");
        fetchNewData(careerApi.careerByGrade(id));
        reset();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  const columns = [
    {
      Header: `${t("th_career")} ${t("th_name")}`,
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
            <CustomTooltip original={original?.name} id={original.id} />
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

  const handleSelectedRows = selectedRows => {
    if (checkedCareers.toString() !== selectedRows.toString()) setCheckedCareers(selectedRows);
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("careers_assigned_to")} {name}</h4>
        <div className="search_wrapper">
          <Search handleSearch={() => {}} />
        </div>
        <div className="button_wrapper mr-5">
          <Button
            type="button"
            color="success"
            buttonName={`< ${t("back")}`}
            clickHandler={() => navigate(-1)}
          />
        </div>
      </div>
      {checkedCareers?.length ? (
        <div className="unassign_banner">
          {checkedCareers?.length} {t("sidebar_careers")} {t("selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="danger"
              buttonName={`${t("unassign")}`}
              clickHandler={handleSubmit(handleUnassign)}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container career_table_container">
        <Tables
          data={courses?.length ? courses : null}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          handleDelete={() => {}}
          hasCheckBox={true}
          hasActions={false}
          handleClickUpdate={() => {}}
          onSelectRows={handleSelectedRows}
        />
      </div>
    </>
  );
}

export default withTranslation()(AssignedCareers);

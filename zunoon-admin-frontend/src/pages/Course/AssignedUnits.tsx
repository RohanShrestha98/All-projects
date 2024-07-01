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
import CustomTooltip from "../../components/Tooltip/CustomTooltip";

function AssignedUnits({ t }) {
  const { fetchedData, loading, error, fetchNewData } = useFetch();
  const [units, setUnits] = useState<any[]>([]);
  const courseApi = config.endpoints.api.course;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedCourses, setCheckedCourses] = useState([]);

  const { state } = useLocation();
  const { id, name } = state;

  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNewData(`${courseApi.listByUnit(id)}`);
  }, [fetchNewData, id]);

  useEffect(() => {
    setUnits(fetchedData.data);
  }, [fetchedData]);

  const handleUnassign = data => {
    http
      .POST(courseApi.unassignUnit, {
        course: id,
        units: checkedCourses,
      })
      .then(() => {
        toast.success(`${t("sidebar_units")} ${t("unassigned_successfully")}`);
        fetchNewData(`${courseApi.listByUnit(id)}`);
        reset();
      })
      .catch(error => {
        toast.error(error?.response?.data?.errors?.error);
      });
  };

  const columns = [
    {
      Header: `${t("unit")} ${t("th_name")}`,
      accessor: row => `${row.name}`,
      Cell: ({ row }) => {
        const original = row?.original;
        return (
          <div className="profile_container">
            <div className="profile_pic_container ">
              {original.thumbnail ? (
                <img src={`${original.thumbnail}`} alt={`thumbnail ${original.name}`} />
              ) : (
                <i className="bx bx-book-open"></i>
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
    {
      Header: `${t("level")}`,
      accessor: "level",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.level} id={original?.id} />;
      },
    },
    {
      Header: `${t("index")}`,
      accessor: "index",
    },
  ];

  const handleSelectedRows = selectedRows => {
    if (checkedCourses.toString() !== selectedRows.toString()) setCheckedCourses(selectedRows);
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_units")} {t("assigned_to")} {name}</h4>
        <div className="search_wrapper">
          <Search handleSearch={() => { }} />
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
      {checkedCourses?.length ? (
        <div className="unassign_banner">
          {checkedCourses?.length} {t("units_selected")}
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
      <div className="table_container assign_unit_table_container">
        <Tables
          data={units}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          handleDelete={() => { }}
          hasCheckBox={true}
          hasActions={false}
          handleClickUpdate={() => { }}
          onSelectRows={handleSelectedRows}
        />
      </div>
    </>
  );
}

export default withTranslation()(AssignedUnits);

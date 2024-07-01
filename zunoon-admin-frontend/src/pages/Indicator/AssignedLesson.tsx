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
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { DragDropTable } from "../../components/DragDrop/DragDropTable";

function AssignedLessons({ t }) {
  const { fetchedData, loading, error, fetchNewData } = useFetch();
  const [lessons, setLessons] = useState<any[]>([]);
  const indicatorApi = config.endpoints.api.indicator;
  const [checkedIndicators, setCheckedIndicators] = useState([]);
  const [disableDrag, setDisableDrag] = useState(true);

  const { state } = useLocation();
  const { id, name } = state;

  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNewData(`${indicatorApi.listByLesson(id)}`);
  }, [fetchNewData, id]);

  useEffect(() => {
    setLessons(fetchedData.data);
  }, [fetchedData]);

  const handleUnassign = () => {
    http
      .POST(indicatorApi.unassignLesson, { indicator: id, lessons: checkedIndicators })
      .then(() => {
        toast.success(`${t(checkedIndicators?.length === 1 ? "dashboard_lesson" : "sidebar_lesson")} ${t("unassigned_successfully")}`);
        fetchNewData(`${indicatorApi.listByLesson(id)}`);
        reset();
      })
      .catch(error => {
        toast.error(error);
      });
  };


  const columns = [
    {
      Header: `${t("lesson")} ${t("th_name")}`,
      accessor: row => `${row.name || row.title}`,
      Cell: ({ row }) => {
        const original = row?.original;
        return (
          <div className="profile_container">
            <div className="profile_pic_container ">
              {original.thumbnail ? (
                <img
                  src={`${original.thumbnail}`}
                  alt={`thumbnail ${original.name || original?.title}`}
                />
              ) : (
                <i className="bx bx-align-middle "></i>
              )}
            </div>
            <CustomTooltip original={original.name || original?.title} id={original?.id} />
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
      .POST(indicatorApi.updatePosition, {
        indicator: id,
        lessons:
          lessons &&
          lessons.map(item => {
            return item.id;
          }),
      })
      .then(() => {
        toast.success(`  ${t("position")} ${t("updated_successfully")}`);
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
        <h4 className="page_title">{t("sidebar_lesson")} {t("assigned_to")} {name}</h4>
        <div className="search_wrapper">
          <Search handleSearch={() => { }} />
        </div>
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
          <div className="button_wrapper mr-5">
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
          {checkedIndicators?.length} {t(checkedIndicators?.length === 1 ? "dashboard_lesson" : "sidebar_lesson")} {t("selected")}
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
        <DragDropTable
          disableDrag={disableDrag}
          data={lessons ?? []}
          columns={columns}
          setData={setLessons}
          hasCheckBox={true}
          selectedElementRef={undefined}
          onSelectRows={handleSelectedRows}
        />
      </div>
    </>
  );
}

export default withTranslation()(AssignedLessons);

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
import { PATH } from "../../constants/routes";
import { DragDropTable } from "../../components/DragDrop/DragDropTable";

function AssignedSkills({ t }) {
  const { fetchedData, loading, error, fetchNewData } = useFetch();
  const [skill, setSkill] = useState<any[]>([]);
  const unitApi = config.endpoints.api.unit;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedSkills, setCheckedSkills] = useState([]);

  const { state } = useLocation();
  const { id, name } = state;
  const [disableDrag, setDisableDrag] = useState(true);

  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchNewData(`${unitApi.skillList(id)}`);
  }, [fetchNewData, id]);

  useEffect(() => {
    setSkill(fetchedData.data);
  }, [fetchedData]);

  const handleUnassign = () => {
    http
      .POST(unitApi.unassignSkill, { unit: id, skills: checkedSkills })
      .then(() => {
        toast.success(`${t("sidebar_skills")} ${t("unassigned_successfully")}`);
        fetchNewData(`${unitApi.skillList(id)}`);
        reset();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  const columns = [
    {
      Header: `${t("th_skill")} ${t("th_name")}`,
      accessor: row => `${row.name}`,
      Cell: ({ row }) => {
        const original = row?.original;
        return (
          <div className="profile_container">
            <div className="profile_pic_container ">
              {original.thumbnail ? (
                <img src={`${original.thumbnail}`} alt={`thumbnail ${original.name}`} />
              ) : (
                <i className="bx bx-brain"></i>
              )}
            </div>
            <CustomTooltip original={original?.name} id={original?.id} />
          </div>
        );
      },
    },
  ];

  const handlePositionUpdate = () => {
    http
      .POST(unitApi.updatePosition, {
        unit: id,
        skills:
          skill &&
          skill.map(item => {
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
    if (checkedSkills.toString() !== selectedRows.toString()) setCheckedSkills(selectedRows);
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_skills")} {t("assigned_to")} {name}</h4>
        <div className="search_wrapper">
          <Search handleSearch={() => {}} />
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
      {checkedSkills?.length ? (
        <div className="unassign_banner">
          {checkedSkills?.length} {t("sidebar_skills")} {t("selected")}
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
        {/* <Tables
          data={skill}
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
          data={skill ?? []}
          disableDrag={disableDrag}
          columns={columns}
          setData={setSkill}
          hasCheckBox={true}
          selectedElementRef={undefined}
          onSelectRows={handleSelectedRows}
        />
      </div>
    </>
  );
}

export default withTranslation()(AssignedSkills);

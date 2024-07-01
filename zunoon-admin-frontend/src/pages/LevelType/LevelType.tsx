import React, { useEffect, useMemo, useRef, useState } from "react";
import "./LevelType.scss";
import Search from "../../components/Search/Search";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { PATH } from "../../constants/routes";
import Tables from "../../components/Tables/Tables";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import http from "../../utils/http";
import config from "../../config";
import LevelTypeForm from "./LevelTypeForm";
import Pagination from "../../components/Pagination/Pagination";
import { Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import toast from "../../utils/toast";
import { useTranslation } from "react-i18next";
import { ILevelType, Ilevel } from "../../@types/courseLevel";

const levelApi = config.endpoints.api.level;
const levelTypeApi = config.endpoints.api.levelCategory;
const globalApi = config.endpoints.api.global;

export default function LevelType() {
  const activeLevelTab = localStorage.getItem("activeLevelTab")
  const { t } = useTranslation();
  const [levelType, setLevelType] = useState<ILevelType[] | null>();
  const [level, setLevel] = useState<Ilevel[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedElementRef = useRef<null | HTMLDivElement>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [totalLevelTypePageNumber, setTotalLevelTypePageNumber] = useState<number>(0);
  const [currentLevelTypePageNumber, setCurrentLevelTypePageNumber] = useState<number>(1);
  const [totalLevelPageNumber, setTotalLevelPageNumber] = useState<number>(0);
  const [currentLevelPageNumber, setCurrentLevelPageNumber] = useState<number>(1);
  const [active, setActive] = useState(activeLevelTab);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<any>();
  const [isDirtyLevels, setIsDirtyLevels] = useState<boolean>(false);



  useEffect(() => {
    localStorage.setItem("activeLevelTab", active)
  }, [active])

  const {
    error: levelTypeError,
    fetchedData: fetchedLevelTypeData,
    fetchNewData: fetchNewLevelTypeData,
    loading: levelTypeLoading,
  } = useFetch();

  const {
    error: levelError,
    fetchedData: fetchedLevelData,
    fetchNewData: fetchNewLevelData,
    loading: levelLoading,
  } = useFetch();

  useEffect(() => {
    active === "level_type"
      ? fetchNewLevelTypeData(levelTypeApi.list)
      : fetchNewLevelData(levelApi.list);
  }, [fetchNewLevelTypeData, fetchNewLevelData]);

  useEffect(() => {
    if (fetchedLevelTypeData?.data || active === "level_type") {
      setLevelType(fetchedLevelTypeData.data);
      setTotalLevelTypePageNumber(fetchedLevelTypeData.totalPage);
      setCurrentLevelTypePageNumber(fetchedLevelTypeData.currentPage);
      setLevel([]);
    }
  }, [fetchedLevelTypeData]);

  useEffect(() => {
    if (fetchedLevelData?.data || active === "level") {
      setLevel(fetchedLevelData.data);
      setTotalLevelPageNumber(fetchedLevelData.totalPage);
      setCurrentLevelPageNumber(fetchedLevelData.currentPage);
      setLevelType([]);
    }
  }, [fetchedLevelData]);

  const handleClose = () => setShowDeleteModal(false);

  const columns = [
    {
      Header: `${t("th_name")}`,
      accessor: "name",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.name} id={original?.id} />;
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
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps.row.original;

        return (
          <>
            <td className="actions">
              <FontAwesomeIcon
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedLevel(original);
                }}
                className="edit_btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                icon={faEdit}
              />
              <FontAwesomeIcon
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedLevel(original);
                }}
                className="trash_btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                icon={faTrashCan}
              />
            </td>
          </>
        );
      },
    },
  ];

  if (active === "level") {
    columns.splice(1, 0, {
      Header: `${t("level_type")}`,
      accessor: "type",
      Cell: ({ row }: { row: any }) => (
        <span style={{ position: "relative", top: "6px" }}>{row?.original?.type?.name || "-"}</span>
      ),
    });
  }

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleClickUpdate = toggleModal => data => {
    console.log("data", data)
    if (!isDirtyLevels && active === "level_type") {
      data.levels = data?.levels.map(item => item.id);
    }
    setIsLoading(true);

    async function pushUpdate() {
      setIsDirtyLevels(false);
      try {
        const response = await http.PATCH(
          active === "level_type" ? levelTypeApi.update(data?.id) : levelApi.update(data?.id),
          data,
        );
        if (response.status === 200) {
          toggleModal();
          active === "level_type"
            ? fetchNewLevelTypeData(levelTypeApi.list)
            : fetchNewLevelData(levelApi.list);
          setReload(pre => !pre);
          toast.success(
            active === "level_type"
              ? `${t("level_type")} ${t("updated_successfully")}`
              : `${t("level")} ${t("updated_successfully")}`,
          );
        } else {
          toast.error(
            new Error(`${t("error_in_updating")} ${active === "level_type" ? "level type" : "level"}`),
          );
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsLoading(false);
    }
    pushUpdate();
  };

  const handleDelete = async id => {
    try {
      const response = await http.REMOVE(
        active === "level_type" ? levelTypeApi.delete(id) : levelApi.delete(id),
      );
      if (response.status === 200) {
        toast.success(
          active === "level_type"
            ? `${t("level_type")} ${t("deleted_successfully")}`
            : `${t("level")} ${t("deleted_successfully")}`,
        );
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            active === "level_type"
              ? setLevelType(items => {
                return items?.filter(item => (item.id !== id ? levelType : null));
              })
              : setLevel(items => {
                return items?.filter(item => (item.id !== id ? level : null));
              });
            active === "level_type"
              ? fetchNewLevelTypeData(levelTypeApi.list)
              : fetchNewLevelData(levelApi.list);

            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_updating")} ${t("level")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return active === "level_type"
          ? fetchNewLevelTypeData(levelTypeApi.list)
          : fetchNewLevelData(levelApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: active,
        });
        if (active === "level_type") {
          setLevelType(response?.data?.data);
          setTotalLevelTypePageNumber(response?.data?.totalPage);
          setCurrentLevelTypePageNumber(response?.data?.currentPage);
        } else {
          setLevel(response?.data?.data);
          setTotalLevelPageNumber(response?.data?.totalPage);
          setCurrentLevelPageNumber(response?.data?.currentPage);
        }
      } catch (err) {
        active === "level_type" ? setLevelType(null) : setLevel(null);
      }
    };
  }, [active]);

  const handlePageChange = (pageNumber: number) => {
    active === "level_type" ? setLevelType([]) : setLevel([]);
    active === "level_type"
      ? fetchNewLevelTypeData(`${levelTypeApi.list}?page=${pageNumber}`)
      : fetchNewLevelData(`${levelApi.list}?page=${pageNumber}`);
  };

  if (active === "level_type" ? levelTypeError : levelError) {
    toast.error(active === "level_type" ? levelTypeError : levelError);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_course_levels")}</h4>
        <div className="d-flex gap-3">
          <div className="search_wrapper ">
            <Search
              handleSearch={handleSearch}
              setTotalPageNumber={
                active === "level_type" ? setTotalLevelTypePageNumber : setTotalLevelPageNumber
              }
              setCurrentPageNumber={
                active === "level_type" ? setCurrentLevelTypePageNumber : setCurrentLevelPageNumber
              }
              setFilteredData={active === "level_type" ? setLevelType : setLevel}
            />
          </div>
          <div className="button_wrapper ">
            {active === "level" ? (
              <Link to={PATH.ADD_LEVEL_TYPE} state={{ levels: true }}>
                <Button
                  clickHandler={() => { }}
                  type="button"
                  buttonName={`${t("add")} ${t("levels")}`}
                  color="success"
                />
              </Link>
            ) : (
              <Link to={PATH.ADD_LEVEL_TYPE}>
                <Button
                  clickHandler={() => { }}
                  type="button"
                  buttonName={`${t("add")} ${t("level_type")}`}
                  color="success"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex levelTab">
        <button
          onClick={() => setActive("level_type")}
          className={active === "level_type" ? "active" : ""}
        >
          {t("level_type")}
        </button>
        <button onClick={() => setActive("level")} className={active === "level" ? "active" : ""}>
          {t("levels")}
        </button>
      </div>
      <div
        className={`${active === "level_type" ? "levelType_table_container" : "level_table_container"
          }`}
      >
        <Tables
          data={active === "level_type" ? levelType : level}
          hasError={
            (active === "level_type" && levelTypeError) || (active === "level" && levelError)
          }
          columns={columns}
          isFetching={
            (active === "level_type" && levelTypeLoading) || (active === "level" && levelLoading)
          }
          isLoading={isLoading}
          formToEdit={<LevelTypeForm />}
          handleDelete={handleDelete}
          selectedElementRef={selectedElementRef}
          handleClickUpdate={() => handleClickUpdate}
          hasActions={false}
          hasCheckBox={false}
        />
      </div>
      {(active === "level_type" && levelType && levelType?.length) ||
        (active === "level" && level && level?.length) ? (
        <div className="pages_container">
          <Pagination
            currentPageNumber={
              active === "level_type" ? currentLevelTypePageNumber : currentLevelPageNumber
            }
            totalPageNumber={
              active === "level_type" ? totalLevelTypePageNumber : totalLevelPageNumber
            }
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

      <Modal
        size="lg"
        show={showEditModal}
        onHide={toggleModal}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{active === "level_type" ? t("update_level_type") : t("update_level")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(
            <LevelTypeForm
              levels={active === "level" ? true : false}
              handleClickUpdate={() => handleClickUpdate}
              setIsDirtyLevels={setIsDirtyLevels}
            />,
            {
              data: selectedLevel,
              editform: 1,
              handleCancel: toggleModal,
              loading: active === "level_type" ? levelTypeLoading : levelLoading,
            },
          )}
        </Modal.Body>
      </Modal>
      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={handleClose}
        id={selectedLevel && selectedLevel?.id}
        name={selectedLevel && selectedLevel?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}

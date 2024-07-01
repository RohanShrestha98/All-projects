import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import http from "../../utils/http";
import toast from "../../utils/toast";
import Button from "../../components/Button/Button";
import Tables from "../../components/Tables/Tables";
import Search from "../../components/Search/Search";
import LessonForm from "./components/lessonForm/LessonForm";
import { PATH } from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Pagination from "../../components/Pagination/Pagination";
import useFetch from "../../hooks/useFetch";
import "./Lesson.scss";
import config from "../../config";
import { withTranslation } from "react-i18next";
import Loader from "../../components/Loader/Loader";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { getPermissions } from "../../utils/storage";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { optionType } from "../../@types/option";

const indicatorApi = config.endpoints.api.indicator;
const lessonApi = config.endpoints.api.lesson;
const globalApi = config.endpoints.api.global;

type LessonType = {
  id: number;
  title: string;
  description: string;
};

function Lesson({ t }) {
  const isAdmin = getPermissions()[0]?.name === "Any";

  const lessonPermissions = getPermissions()
    .filter(each => each.url.path.includes("lesson"))
    .map(each => each.url.path);

  const mutatePermissions = ["/lesson/update/", "/lesson/delete/"];

  const hasMutate = mutatePermissions.some(value => {
    return lessonPermissions.includes(value);
  });

  const dropdownPermissions = [];

  const hasDropDown = dropdownPermissions.some(value => {
    return lessonPermissions.includes(value);
  });

  const [lesson, setLesson] = useState<LessonType[]>([]);
  const selectedElementRef = useRef<null | HTMLDivElement>(null);

  const [reload, setReload] = useState<boolean>(false);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedCourses, setCheckedCourses] = useState([]);
  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const [showAssignLessonModal, setShowAssignLessonModal] = useState<boolean>(false);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [selectedSkills, setSelectedSkills] = useState<optionType | null>();
  const [selectedLesson, setSelectedLesson] = useState<LessonType>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    fetchNewData(lessonApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setLesson(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    }
  }, [reload, fetchedData]);

  const columns: any = [
    {
      Header: `${t("th_lesson_name")}`,
      accessor: row => `${row.title}`,
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.title} id={original?.id} />;
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

  (hasMutate || isAdmin) &&
    columns.push({
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps.row.original;

        return (
          <td className="actions">
            {(lessonPermissions.includes("/lesson/update/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedLesson(original);
                }}
                className="edit_btn"
                style={{
                  marginTop: "0.2rem",
                }}
                icon={faEdit}
              />
            )}
            {(lessonPermissions.includes("/lesson/delete/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedLesson(original);
                }}
                className="trash_btn"
                style={{
                  marginTop: "0.2rem",
                }}
                icon={faTrashCan}
              />
            )}
            {(hasDropDown || isAdmin) && (
              <DropdownButton
                id={`dropdown-variants-info-size-extra-small-no-caret`}
                variant=""
                title=""
                style={{ position: "relative", bottom: "4px" }}
              >
                {(lessonPermissions.includes("") || isAdmin) && (
                  <Dropdown.Item onClick={() => { }}>{t("dropdown_item")}</Dropdown.Item>
                )}
              </DropdownButton>
            )}
          </td>
        );
      },
    });

  const handleSearch = useMemo(() => {
    return async searchText => {
      if (searchText === "") {
        return fetchNewData(lessonApi.list);
      }

      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "unit",
        });

        setLesson(response && response?.data?.data);
      } catch (err) {
        setLesson([]);
      }
    };
  }, []);

  const handleDelete = async id => {
    try {
      const response = await http.REMOVE(lessonApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("dashboard_lesson")} ${t("deleted_successfully")}`);
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setLesson(lesson => {
              return lesson.filter(unit => (unit.id !== id ? unit : null));
            });
            fetchNewData(lessonApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("staff")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickUpdate = toggleModal => data => {
    setIsLoading(true);
    // if (!data?.thumbnail?.length) {
    //   delete data.thumbnail;
    // } else {
    //   if (typeof data.thumbnail === "string") {
    //     delete data.thumbnail;
    //   } else {
    //     data.thumbnail = data.thumbnail[0];
    //   }
    // }

    async function pushUpdate() {
      try {
        const response = await http.PUT_FILE(lessonApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(lessonApi.list);
          setReload(pre => !pre);
          toast.success(`${t("dashboard_lesson")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error(`${t("error_in_updating")} ${t("unit")}`));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsLoading(false);
    }
    pushUpdate();
  };

  const handleClick = () => {
    setShowAssignLessonModal(!showAssignLessonModal);
  };

  const handlePageChange = pageNumber => {
    setLesson([]);
    // fetchNewData(`unit/list/?search=${searchValue}&page=${pageNumber}`);
  };

  const toggleModal = () => {
    setShowAssignLessonModal(pre => !pre);

    if (!showAssignLessonModal) {
      async function fetchData() {
        const response = await http.GET(indicatorApi.list, "");
        setSchoolOptions(
          response.data.data.map((content: any) => ({
            label: content.name ? content.name : "No title",
            value: content.id,
          })),
        );
      }
      fetchData();
    }
  };

  const onAssignedSubmit = data => {
    if (data) {
      http
        .POST(indicatorApi.assignLesson, {
          indicator: data.indicator,
          lessons: checkedCourses,
        })
        .then(() => {
          toast.success(`${t("lesson")} ${t("assigned_successfully")}`);
          setCheckedCourses([]);
          toggleModal();

          const selection = document.querySelectorAll('input[type="checkbox"]');

          selection.forEach((checkbox: HTMLInputElement) => {
            checkbox.checked = false;
          });
        });
    }
  };

  const handleSelectedRows = selectedRows => {
    if (checkedCourses.toString() !== selectedRows.toString()) setCheckedCourses(selectedRows);
  };
  const handleLessonChange = (data, e) => {
    setSelectedSkills(data);
    setValue("indicator", data.value);
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_lesson")}</h4>
        <div className="header_actions">
          <div className="search_wrapper ">
            <Search
              handleSearch={handleSearch}
              setFilteredData={setLesson}
              setTotalPageNumber={setTotalPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
            />
          </div>
          {(lessonPermissions.includes("/lesson/create/") || isAdmin) && (
            <div className="button_wrapper ">
              <Link to={PATH.ADD_LESSON}>
                <Button
                  clickHandler={() => { }}
                  type="button"
                  buttonName={`${t("add")} ${t("sidebar_lesson")}`}
                  color="success"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {checkedCourses?.length ? (
        <div className="unassign_banner">
          {checkedCourses.length} {t("lesson")} {t("selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="success"
              buttonName={`${t("assign_to_indicator")}`}
              clickHandler={toggleModal}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container lesson_table_container">
        <Tables
          data={lesson && lesson}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isLoading}
          formToEdit={<LessonForm />}
          handleDelete={handleDelete}
          selectedElementRef={selectedElementRef}
          handleClickUpdate={() => handleClickUpdate}
          onSelectRows={handleSelectedRows}
          hasCheckBox={true}
          hasActions={false}
        />
      </div>
      {showAssignLessonModal && (
        <div className="sidebarFilterTotal">
          <div
            className="sidebarFilterOverlay"
            onClick={() => setShowAssignLessonModal(false)}
          ></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>{t("assign_lesson_to")} {t("dashboard_indicator")}</h1>
              <FontAwesomeIcon icon={faClose} className="cancel_button" onClick={handleClick} />
            </div>

            <form onSubmit={handleSubmit(onAssignedSubmit)} className="sidebarFilterfilter">
              <div className="school-select">
                <label htmlFor="content">{t("dashboard_skill")}</label>
                <CustomSelect
                  value={selectedSkills}
                  options={schoolOptions}
                  id="indicator"
                  name="indicator"
                  register={register}
                  handleChange={(e, data) => handleLessonChange(e, data)}
                />
              </div>
              <div className="searchButton" style={{ marginTop: "20px" }}>
                <Button type="submit" color="success" buttonName={t("assign")} />
              </div>
            </form>
          </div>
        </div>
      )}
      {lesson?.length ? (
        <div className="pages_container">
          <Pagination totalPageNumber={totalPageNumber} handlePageChange={handlePageChange} />
        </div>
      ) : null}

      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{`${t("update")} ${t("lesson")}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<LessonForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedLesson,
            editform: 1,
            handleCancel: () => setShowEditModal(false),
            loading,
          })}
        </Modal.Body>
      </Modal>

      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={selectedLesson?.id}
        name={selectedLesson?.title}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default withTranslation()(Lesson);

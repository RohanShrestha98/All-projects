import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import { PATH } from "../../constants/routes";
import useFetch from "../../hooks/useFetch";
import Tables from "../../components/Tables/Tables";
import config from "../../config";
import GradeForm from "./components/GradeForm/GradeForm";
import Pagination from "../../components/Pagination/Pagination";
import http from "../../utils/http";
import toast from "../../utils/toast";
import "./Grades.scss";
import { withTranslation } from "react-i18next";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { getPermissions } from "../../utils/storage";
import { IGrade } from "../../@types/grade";
import { useTabContext } from "../../context/TabContextProvider";

const gradeApi = config.endpoints.api.grade;
const gradeCategoryApi = config.endpoints.api.gradeCategory;
const globalApi = config.endpoints.api.global;

function Grades({ t }) {
  const { activeTab, setActiveTab } = useTabContext();
  const [gradeCategory, setGradeCategory] = useState<IGrade[] | null>();
  const [grade, setGrade] = useState<IGrade[] | null>();
  const selectedElementRef = useRef<null | HTMLElement>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<IGrade>();
  const [currentGradePageNumber, setCurrentGradePageNumber] = useState<number>(1);
  const [totalGradePageNumber, setTotalGradePageNumber] = useState<number>(0);
  const [currentGradeCategoryPageNumber, setCurrentGradeCategoryPageNumber] = useState<number>(1);
  const [totalGradeCategoryPageNumber, setTotalGradeCategoryPageNumber] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDirtyGrades, setIsDirtyGrades] = useState<boolean>(false);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState();
  const navigate = useNavigate();
  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const handleClose = () => setShowDeleteModal(false);

  const gradePermissions = getPermissions()
    ?.filter(each => each.url.path.includes("grade"))
    ?.map(each => each.url.path);

  const mutatePermissions = [
    "/grade/update/",
    "/grade/delete/",
    "/grade/careers/",
    "/grade/courses/",
  ];

  const hasMutate = mutatePermissions?.some(value => {
    return gradePermissions?.includes(value);
  });

  const dropdownPermissions = ["/grade/careers/", "/grade/courses/"];

  const hasDropDown = dropdownPermissions?.some(value => {
    return gradePermissions?.includes(value);
  });

  const {
    error: gradeCategoryError,
    fetchedData: fetchedGradeCategoryData,
    fetchNewData: fetchNewGradeCategoryData,
    loading: gradeCategoryLoading,
  } = useFetch();

  const {
    error: gradeError,
    fetchedData: fetchedGradeData,
    fetchNewData: fetchNewGradeData,
    loading: gradeLoading,
  } = useFetch();

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };
  useEffect(() => {
    activeTab === "grade_category"
      ? fetchNewGradeCategoryData(gradeCategoryApi.list)
      : fetchNewGradeData(gradeApi.list);
  }, [fetchNewGradeCategoryData, fetchNewGradeData]);

  useEffect(() => {
    if (fetchedGradeCategoryData.data || activeTab === "grade_category") {
      setGradeCategory(fetchedGradeCategoryData.data);
      setTotalGradeCategoryPageNumber(fetchedGradeCategoryData.totalPage);
      setCurrentGradeCategoryPageNumber(fetchedGradeCategoryData.currentPage);
      setGrade([]);
    }
  }, [fetchedGradeCategoryData]);

  useEffect(() => {
    if (fetchedGradeData.data || activeTab === "grade") {
      setGrade(fetchedGradeData.data ?? null);
      setTotalGradePageNumber(fetchedGradeData.totalPage);
      setCurrentGradePageNumber(fetchedGradeData.currentPage);
      setGradeCategory([]);
    }
  }, [fetchedGradeData]);

  const columns: any = [
    {
      Header: `${t("th_name")}`,
      accessor: row => `${row.name}`,
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
    // {
    //   Header: `${t("grade_category")}`,
    //   accessor: "grade_category",
    //   Cell: ({ row }) => {
    //     const original = row?.original;
    //     return <CustomTooltip original={original?.gradeCategory?.name} id={original?.id} />;
    //   },
    // },
  ];
  const gradeCategoryColumns: any = [
    {
      Header: `${t("th_name")}`,
      accessor: row => `${row.name}`,
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
      Header: `${t("th_grade_category")}`,
      accessor: "grade_category",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.gradeCategory?.name} id={original?.id} />;
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
          <>
            <td className="actions">
              {(gradePermissions?.includes("/grade/update/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    toggleModal();
                    setSelectedGrade(original);
                  }}
                  className="edit_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faEdit}
                />
              )}
              {(gradePermissions?.includes("/grade/delete/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedGrade(original);
                  }}
                  className="trash_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faTrashCan as IconProp}
                />
              )}
              {(hasDropDown || isAdmin) && activeTab === "grade" && (
                <DropdownButton
                  id={`dropdown-variants-info-size-extra-small-no-caret`}
                  variant=""
                  title=""
                  style={{ position: "relative", bottom: "4px" }}
                >
                  {(gradePermissions?.includes("/grade/careers/") || isAdmin) && (
                    <Dropdown.Item
                      onClick={() => {
                        navigate(PATH.ASSIGNED_CAREERS, {
                          state: { id: original.id, name: original.name },
                        });
                      }}
                    >
                      {t("view_assigned_careers")}
                    </Dropdown.Item>
                  )}
                  {(gradePermissions?.includes("/grade/courses/") || isAdmin) &&
                    activeTab === "grade" && (
                      <Dropdown.Item
                        onClick={() => {
                          navigate(PATH.ASSIGNED_COURSES, {
                            state: { id: original.id, name: original.name },
                          });
                        }}
                      >
                        {t("view_assigned_courses")}
                      </Dropdown.Item>
                    )}
                </DropdownButton>
              )}
            </td>
          </>
        );
      },
    });
  (hasMutate || isAdmin) &&
    gradeCategoryColumns.push({
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps.row.original;

        return (
          <>
            <td className="actions">
              {(gradePermissions?.includes("/grade/update/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    toggleModal();
                    setSelectedGrade(original);
                  }}
                  className="edit_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faEdit}
                />
              )}
              {(gradePermissions?.includes("/grade/delete/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedGrade(original);
                  }}
                  className="trash_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faTrashCan as IconProp}
                />
              )}
              {(hasDropDown || isAdmin) && activeTab === "grade" && (
                <DropdownButton
                  id={`dropdown-variants-info-size-extra-small-no-caret`}
                  variant=""
                  title=""
                  style={{ position: "relative", bottom: "4px" }}
                >
                  {(gradePermissions?.includes("/grade/careers/") || isAdmin) && original?.hasCareer && (
                    <Dropdown.Item
                      onClick={() => {
                        navigate(PATH.ASSIGNED_CAREERS, {
                          state: { id: original.id, name: original.name },
                        });
                      }}
                    >
                      {t("view_assigned_careers")}
                    </Dropdown.Item>
                  )}
                  {(gradePermissions?.includes("/grade/courses/") || isAdmin) && !original?.hasCareer &&
                    activeTab === "grade" && (
                      <Dropdown.Item
                        onClick={() => {
                          navigate(PATH.ASSIGNED_COURSES, {
                            state: { id: original.id, name: original.name },
                          });
                        }}
                      >
                        {t("view_assigned_courses")}
                      </Dropdown.Item>
                    )}
                </DropdownButton>
              )}
            </td>
          </>
        );
      },
    });

  const handleDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(
        activeTab === "grade_category" ? gradeCategoryApi.delete(id) : gradeApi.delete(id),
      );
      if (response.status === 200) {
        toast.success(
          activeTab === "grade_category"
            ? `${t("grade_category")} ${t("deleted_successfully")}`
            : `${t("th_grade")} ${t("deleted_successfully")}`,
        );
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            activeTab === "grade_category"
              ? setGradeCategory(items => {
                return items?.filter(item => (item.id !== id ? gradeCategory : null));
              })
              : setGrade(items => {
                return items?.filter(item => (item.id !== id ? grade : null));
              });
            activeTab === "grade_category"
              ? fetchNewGradeCategoryData(gradeCategoryApi.list)
              : fetchNewGradeData(gradeApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("th_grade")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };


  const handleClickUpdate = toggleModal => data => {
    if (!isDirtyGrades) {
      data.grades = data?.grades?.map(item => item.id);
      data.gradeCategory = selectedGradeCategory?.value;
    }
    async function pushUpdate() {
      setIsDirtyGrades(false);
      try {
        const response = await http.PATCH(
          activeTab === "grade_category"
            ? gradeCategoryApi.update(data.id)
            : gradeApi.update(data?.id),
          data,
        );
        if (response.status === 200) {
          toggleModal();
          activeTab === "grade_category"
            ? fetchNewGradeCategoryData(gradeCategoryApi.list)
            : fetchNewGradeData(gradeApi.list);
          toast.success(
            activeTab === "grade"
              ? `${t("th_grade")} ${t("updated_successfully")}`
              : `${t("th_grade_category")} ${t("updated_successfully")}`,
          );
        } else {
          toast.error(
            new Error(
              `${t("error_in_updating")} ${activeTab === "grade_category" ? "grade category" : "grade"
              }`,
            ),
          );
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsSubmitting(false);
    }
    pushUpdate();
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return activeTab === "grade_category"
          ? fetchNewGradeCategoryData(gradeCategoryApi.list)
          : fetchNewGradeData(gradeApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: activeTab,
        });
        if (activeTab === "grade_category") {
          setGradeCategory(response?.data?.data);
          setTotalGradeCategoryPageNumber(response?.data?.totalPage);
          setCurrentGradeCategoryPageNumber(response?.data?.currentPage);
        } else {
          setGrade(response?.data?.data);
          setTotalGradePageNumber(response?.data?.totalPage);
          setCurrentGradePageNumber(response?.data?.currentPage);
        }
      } catch (err) {
        activeTab === "grade_category" ? setGradeCategory(null) : setGrade(null);
      }
    };
  }, [activeTab]);

  const handlePageChange = (pageNumber: number) => {
    activeTab === "grade_category" ? setGradeCategory([]) : setGrade([]);
    activeTab === "grade_category"
      ? fetchNewGradeCategoryData(`${gradeCategoryApi.list}?page=${pageNumber}`)
      : fetchNewGradeData(`${gradeApi.list}?page=${pageNumber}`);
  };

  if (activeTab === "gradeCategory" ? gradeCategoryError : gradeError) {
    toast.error(activeTab === "gradeCategory" ? gradeCategoryError : gradeError);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{`${t("sidebar_grades")}`}</h4>
        <div className="header_actions">
          <div className="search_wrapper">
            <Search
              handleSearch={handleSearch}
              setTotalPageNumber={
                activeTab === "grade_category"
                  ? setTotalGradeCategoryPageNumber
                  : setTotalGradePageNumber
              }
              setCurrentPageNumber={
                activeTab === "grade_category"
                  ? setCurrentGradeCategoryPageNumber
                  : setCurrentGradePageNumber
              }
              setFilteredData={activeTab === "grade_category" ? setGradeCategory : setGrade}
            />
          </div>
          {(gradePermissions?.includes("/grade/create/") || isAdmin) && (
            <div className="button_wrapper">
              {activeTab === "grade" ? (
                <Link to={PATH.ADD_GRADE}>
                  <Button
                    type="button"
                    clickHandler={() => { }}
                    buttonName={`${t("add")} ${t("th_grade")}`}
                    color="success"
                  />
                </Link>
              ) : (
                <Link to={PATH.ADD_GRADE_CATEGORY} state={{ gradeCategory: true }}>
                  <Button
                    type="button"
                    clickHandler={() => { }}
                    buttonName={`${t("add")} ${t("th_grade_category")}`}
                    color="success"
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex levelTab">
        <button
          onClick={() => setActiveTab("grade_category")}
          className={activeTab === "grade_category" ? "active" : ""}
        >
          {`${t("th_grade_categories")}`}
        </button>
        <button
          onClick={() => setActiveTab("grade")}
          className={activeTab === "grade" ? "active" : ""}
        >
          {`${t("sidebar_grades")}`}
        </button>
      </div>
      <div
        className={`${activeTab === "grade_category" ? "gradeCategory_table_container" : "grade_table_container"
          }`}
      >
        <Tables
          data={activeTab === "grade_category" ? gradeCategory : grade}
          hasError={
            (activeTab === "grade_category" && gradeCategoryError) ||
            (activeTab === "grade" && gradeError)
          }
          columns={activeTab === "grade_category" ? columns : gradeCategoryColumns.concat()}
          isFetching={
            (activeTab === "grade_category" && gradeCategoryLoading) ||
            (activeTab === "grade" && gradeLoading)
          }
          isLoading={isSubmitting}
          handleDelete={handleDelete}
          formToEdit={<GradeForm />}
          selectedElementRef={selectedElementRef}
          handleClickUpdate={() => handleClickUpdate}
          hasActions={false}
        />
      </div>
      {(activeTab === "grade_category" && gradeCategory && gradeCategory?.length) ||
        (activeTab === "grade" && grade && grade?.length) ? (
        <div className="pages_container">
          <Pagination
            currentPageNumber={
              activeTab === "grade_category"
                ? currentGradeCategoryPageNumber
                : currentGradePageNumber
            }
            totalPageNumber={
              activeTab === "grade_category" ? totalGradeCategoryPageNumber : totalGradePageNumber
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
          <Modal.Title>{t("update_grade")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(
            <GradeForm
              gradeCategory={activeTab === "grade" ? false : true}
              handleClickUpdate={() => handleClickUpdate}
              setIsDirtyGrades={setIsDirtyGrades}
              setSelectedGradeCategory={setSelectedGradeCategory}
            />,
            {
              data: selectedGrade,
              editform: true,
              handleCancel: toggleModal,
              loading: activeTab === "grade_category" ? gradeCategoryLoading : gradeLoading,
            },
          )}
        </Modal.Body>
      </Modal>

      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={handleClose}
        id={selectedGrade?.id}
        name={selectedGrade?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default withTranslation()(Grades);

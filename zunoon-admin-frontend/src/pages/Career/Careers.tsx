import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import config from "../../config";
import http from "../../utils/http";
import toast from "../../utils/toast";
import useFetch from "../../hooks/useFetch";
import { PATH } from "../../constants/routes";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import Tables from "../../components/Tables/Tables";
import CareerForm from "./components/CareerForm/CareerForm";
import Pagination from "../../components/Pagination/Pagination";
import "./Careers.scss";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import { ICareer } from "../../@types/career";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { getPermissions } from "../../utils/storage";
import { InfiniteScrollSelect } from "../../components/CustomSelect/InfiniteScrollSelect";
import ConvertArrayToString from "../../utils/convertArrayToString";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

const careerApi = config.endpoints.api.career;
const gradeApi = config.endpoints.api.grade;
const globalApi = config.endpoints.api.global;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


function Careers({ t }) {
  const selectedElementRef = useRef<null | HTMLElement>(null);
  const { register, handleSubmit, setValue } = useForm();
  const [careers, setCareers] = useState<ICareer[] | null>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedCareers, setCheckedCareers] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState<any>();
  const [showCareerEditModal, setShowCareerEditModal] = useState<boolean>(false);
  const [showCareerDeleteModal, setShowCareerDeleteModal] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<ICareer>();
  const [showAssignCareerModal, setShowAssignCareerModal] = useState<boolean>(false);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [isAssignedButtonClick, setIsAssignedButtonClick] = useState(false);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const { fetchedData: fetchGradeData, fetchNewData: fetchGradeNewData } = useFetch();

  useEffect(() => {
    fetchGradeNewData(gradeApi.list);
  }, [fetchGradeNewData]);

  useEffect(() => {
    if (fetchGradeData.data) {
      const gradeData = fetchGradeData.data;
      const filterHasCareer = gradeData?.filter((item) => item?.hasCareer)
      const gradeOptions = convertToOptions(filterHasCareer);
      setGradeOptions(gradeOptions);
    }
  }, [fetchGradeData]);


  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const careerPermissions = getPermissions()
    .filter(each => each.url.path.includes("career"))
    .map(each => each.url.path);

  const mutatePermissions = ["/career/update/", "/career/delete/", "/career/courses/"];

  const hasMutate = mutatePermissions.some(value => {
    return careerPermissions.includes(value);
  });

  const dropdownPermissions = ["/career/courses/"];

  const hasDropDown = dropdownPermissions.some(value => {
    return careerPermissions.includes(value);
  });

  const { loading, error, fetchedData, fetchNewData } = useFetch();

  const toggleEditModal = () => {
    setShowCareerEditModal(!showCareerEditModal);
  };

  useEffect(() => {
    fetchNewData(careerApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setCareers(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setCareers(null);
    }
  }, [fetchedData]);

  const navigate = useNavigate();

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
              {(careerPermissions.includes("/career/update/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    toggleEditModal();
                    setSelectedCareer(original);
                  }}
                  className="edit_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faEdit}
                />
              )}
              {(careerPermissions.includes("/career/delete/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowCareerDeleteModal(true);
                    setSelectedCareer(original);
                  }}
                  className="trash_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faTrashCan as IconProp}
                />
              )}
              {(hasDropDown || isAdmin) && (
                <DropdownButton
                  id={`dropdown-variants-info-size-extra-small-no-caret`}
                  variant=""
                  title=""
                  style={{ position: "relative", bottom: "4px" }}
                >
                  {(careerPermissions.includes("/career/courses/") || isAdmin) && (
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
      const response = await http.REMOVE(careerApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("th_career")} ${t("deleted_successfully")}`);
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;

          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setCareers(careers => {
              return careers.filter(career => (career.id !== id ? career : null));
            });
            fetchNewData(careerApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("th_career")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickUpdate = toggleModal => data => {
    setIsSubmitting(true);
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
        const response = await http.PUT_FILE(careerApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(careerApi.list);
          toast.success(`  ${t("th_career")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error("Error in updating career"));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsSubmitting(false);
    }
    pushUpdate();
  };


  const handleMultiSelect = value => {
    setSelectedGrades(value);
    const gradeIds = value.map(item => item?.value);
    setValue("grades", gradeIds);
  };

  const handleSelectedRows = selectedRows => {
    if (checkedCareers.toString() !== selectedRows.toString()) setCheckedCareers(selectedRows);
  };

  const handleSearch = useMemo(() => {
    return async searchText => {
      if (searchText === "") {
        return fetchNewData(careerApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "career",
        });
        setCareers(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        setCareers(null);
      }
    };
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCareers([]);
    fetchNewData(`${careerApi.list}?page=${pageNumber}`);
  };

  const gradeCategoryLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const gradeCategoryResponse = await http.GET(`${gradeCategoryApi.list}?page=${page}`, "");
    if (!gradeCategoryResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const gradeCategoryOptions = convertToOptions(gradeCategoryResponse?.data?.data);
    const filteredOptions = searchQuery
      ? gradeCategoryOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : gradeCategoryOptions;

    const hasMore = gradeCategoryResponse?.data?.totalPage > gradeCategoryResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  useEffect(() => {
    const getGradeByGradeCategory = async () => {
      const gradeByCategoryResponse = selectedGradeCategory?.value && await http.GET(`${gradeApi.list}?gradeCategory=${selectedGradeCategory?.value}`, "");
      const filterHasCareer = gradeByCategoryResponse?.data?.data?.filter((item) => item?.hasCareer)
      const gardeByGradeCategoryOptions = convertToOptions(filterHasCareer)
      setGradeByGradeCategory(gardeByGradeCategoryOptions)
    }
    getGradeByGradeCategory()
  }, [selectedGradeCategory?.value])

  const handleGradeCategorySelect = value => {
    setSelectedGradeCategory(value);
  };

  const onAssignedSubmit = data => {
    if (data) {
      http
        .POST(gradeApi.assignCareer, {
          grades: data?.grades,
          careers: checkedCareers,
        })
        .then(() => {
          setIsAssigned(true);
          setIsAssignedButtonClick(false);
          toast.success(`${t("th_career")} ${t("assigned_successfully")}`);
          setShowAssignCareerModal(false);
          setCheckedCareers([]);
          setSelectedGrades([]);
          setSelectedGradeCategory([]);

          const selection = document.querySelectorAll('input[type="checkbox"]');

          selection.forEach((checkbox: HTMLInputElement) => {
            checkbox.checked = false;
            checkbox.value = "off";
          });
        })
        .catch(error => {
          toast.error(ConvertArrayToString(Object.values(error?.response?.data?.errors)));
        });
    }
  };

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{`${t("sidebar_careers")}`}</h4>
        <div className="header_actions">
          <div className="search_wrapper">
            <Search
              handleSearch={handleSearch}
              setCurrentPageNumber={setCurrentPageNumber}
              setTotalPageNumber={setTotalPageNumber}
              setFilteredData={setCareers}
            />
          </div>
          {(careerPermissions?.includes("/career/create/") || isAdmin) && (
            <div className="button_wrapper">
              <Link to={PATH.ADD_CAREER}>
                <Button
                  type="button"
                  clickHandler={() => {
                    navigate(PATH.CAREER);
                  }}
                  buttonName={`${t("add")} ${t("th_career")}`}
                  color="success"
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      {checkedCareers?.length ? (
        <div className="unassign_banner">
          {checkedCareers?.length} {t("th_career")} {t("selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="success"
              buttonName={`${t("assign_to_grade")}`}
              clickHandler={() => setShowAssignCareerModal(!showAssignCareerModal)}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container career_table_container">
        <Tables
          data={careers}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          handleDelete={handleDelete}
          formToEdit={<CareerForm />}
          hasCheckBox={true}
          hasActions={false}
          selectedElementRef={selectedElementRef}
          handleClickUpdate={() => handleClickUpdate}
          onSelectRows={handleSelectedRows}
          isAssigned={isAssigned}
          setIsAssigned={setIsAssigned}
        />
      </div>
      {showAssignCareerModal && (
        <div className="sidebarFilterTotal">
          <div
            className="sidebarFilterOverlay"
            onClick={() => {
              setShowAssignCareerModal(false)
              setSelectedGradeCategory([])
              setSelectedGrades([])
            }}
          ></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>{t("assign_career_to_grade")}</h1>
              <FontAwesomeIcon
                icon={faClose}
                className="cancel_button"
                onClick={() => {
                  setShowAssignCareerModal(!showAssignCareerModal)
                  setSelectedGradeCategory([])
                  setSelectedGrades([])
                }}
              />
            </div>
            <form onSubmit={handleSubmit(onAssignedSubmit)} className="sidebarFilterfilter">
              <div className="grade_select">
                <InfiniteScrollSelect
                  id="grade_category"
                  register={register}
                  name="grade_category"
                  label={t("th_grade_category")}
                  placeholder={t("select_a_grade_category")}
                  value={selectedGradeCategory}
                  handleChange={handleGradeCategorySelect}
                  loadOptions={gradeCategoryLoadOptions}
                />
              </div>
              <div className="grade_select">
                <CustomSelect
                  id="grade"
                  register={register}
                  name="grade"
                  label={t("th_grade")}
                  placeholder={t("select_a_grade")}
                  isMulti
                  value={selectedGrades}
                  handleChange={handleMultiSelect}
                  options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                />
              </div>
              <div className="searchButton" style={{ marginTop: "20px" }}>
                <Button
                  clickHandler={() => setIsAssignedButtonClick(true)}
                  type="submit"
                  color="success"
                  buttonName={"Assign"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {careers && careers?.length ? (
        <div className="pages_container">
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPageNumber={totalPageNumber}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

      <Modal
        size="lg"
        show={showCareerEditModal}
        onHide={toggleEditModal}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{t("update_career")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<CareerForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedCareer,
            editform: 1,
            handleCancel: toggleEditModal,
            loading,
          })}
        </Modal.Body>
      </Modal>

      <DeleteModal
        isDeactivate={false}
        show={showCareerDeleteModal}
        handleClose={() => setShowCareerDeleteModal(false)}
        id={selectedCareer?.id}
        name={selectedCareer?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default withTranslation()(Careers);

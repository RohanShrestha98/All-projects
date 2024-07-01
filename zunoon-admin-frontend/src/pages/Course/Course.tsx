import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import http from "../../utils/http";
import Button from "../../components/Button/Button";
import Tables from "../../components/Tables/Tables";
import CourseForm from "./components/courseForm/CourseForm";
import { faBook, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import toast from "../../utils/toast";
import { PATH } from "../../constants/routes";
import "../../components/Search/Search.scss";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import config from "../../config";
import { withTranslation } from "react-i18next";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import "./Course.scss";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { getPermissions } from "../../utils/storage";
import { ICourse } from "../../@types/course";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { optionType } from "../../@types/option";
import { handleInfiniteScroll } from "../../utils/handleInfiniteScroll";
import { InfiniteScrollSelect } from "../../components/CustomSelect/InfiniteScrollSelect";

//apis
const courseApi = config.endpoints.api.course;
const careerApi = config.endpoints.api.career;
const gradeApi = config.endpoints.api.grade;
const schoolApi = config.endpoints.api.school;
const globalApi = config.endpoints.api.global;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


function Course({ t }) {
  const [isAssigned, setIsAssigned] = useState<boolean>(false);

  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const coursePermissions = getPermissions()
    .filter(each => each.url.path.includes("course"))
    .map(each => each.url.path);

  const mutatePermissions = ["/course/update/", "/course/delete/", "/course/courses/"];

  const hasMutate = mutatePermissions.some(value => {
    return coursePermissions.includes(value);
  });

  const dropdownPermissions = ["/course/units/"];

  const hasDropDown = dropdownPermissions.some(value => {
    return coursePermissions.includes(value);
  });

  const { register, handleSubmit, setValue, watch } = useForm();

  const [showAssignCourseModal, setShowAssignCourseModal] = useState<boolean>(false);
  const selectedElementRef = useRef<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<ICourse>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [courses, setCourse] = useState<ICourse[] | null>();
  const [levelData, setLevelData] = useState<any>();
  const [filteredGrade, setFilteredGrade] = useState<string>();
  const [filteredCareer, setFilteredCareer] = useState<string>();
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [checkedCourses, setCheckedCourses] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);
  const [gradeOptionsForCourseToGrade, setGradeOptionsForCourseToGrade] = useState<optionType[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<any>();
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<any>();
  const [schoolCurrentPage, setSchoolCurrentPage] = useState(1);
  const [schoolTotalPage, setSchoolTotalPage] = useState(0);
  const [schoolOptions, setSchoolOptions] = useState<optionType[]>([]);


  const handleSelectedRows = selectedRows => {
    if (checkedCourses.toString() !== selectedRows.toString()) setCheckedCourses(selectedRows);
  };

  const [isFormUpdating, setIsFormUpdating] = useState<boolean>(false);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useEffect(() => {
    fetchNewData(courseApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setCourse(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
      groupTeachers(fetchedData.data);
    } else {
      setCourse(null);
    }
  }, [fetchedData, removeFilter]);

  const groupTeachers = data => {
    let tempData = {};
    data &&
      data.map(each => {
        const levelName = each?.levels?.map(level => {
          return level.name;
        });
        if (levelName in tempData) {
          tempData[levelName].push(each);
        } else {
          tempData[levelName] = [each];
        }
      });

    setLevelData(tempData);
  };

  const columns: any = [
    {
      Header: `${t("name")}`,
      accessor: "name",
      Cell: ({ row }) => {
        const original = row?.original;
        return (
          <div className="profile_container">
            <div className="profile_pic_container ">
              {original.thumbnail ? (
                <img src={`${original.thumbnail?.url}`} alt={`thumbnail ${original.name}`} />
              ) : (
                <FontAwesomeIcon icon={faBook} />
              )}
            </div>
            <CustomTooltip
              original={original?.name}
              id={original?.id}
              isApproved={original?.isApproved}
              data={levelData && levelData}
            />
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
      Header: `${t("isOptional")}`,
      accessor: "isOptional",
      Cell: ({ row }) => {
        const original = row?.original;
        return <p>{original?.isOptional ? "Yes" : "No"}</p>;
      },
    },

    {
      Header: `${t("status")}`,
      accessor: "isApproved",
      Cell: ({ row }) => {
        const original = row?.original;
        return (
          <div className={`${original?.isApproved ? "approved" : "notApproved"}`}>
            {original?.isApproved ? <p>{t("approved")}</p> : <p>{t("not_approved")}</p>}
          </div>
        );
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
              {(coursePermissions.includes("/course/update/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowEditModal(true);
                    setSelectedCourse(original);
                  }}
                  className="edit_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faEdit}
                />
              )}
              {(coursePermissions.includes("/course/delete/") || isAdmin) && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedCourse(original);
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
                  {(coursePermissions.includes("/course/units/") || isAdmin) && (
                    <Dropdown.Item
                      onClick={() => {
                        navigate(PATH.ASSIGNED_UNITS, {
                          state: { id: original.id, name: original.name },
                        });
                      }}
                    >
                      {t("view_assigned_unit")}
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              )}
            </td>
          </>
        );
      },
    });

  const handleDelete = async id => {
    try {
      const response = await http.REMOVE(courseApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("th_course")} ${t("deleted_successfully")}`);
        if (selectedElementRef?.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setCourse(courses => {
              return courses.filter(course => (course.id !== id ? course : null));
            });
            fetchNewData(courseApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(t("error_in_deleting_the_course")));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickUpdate = toggleModal => data => {
    async function pushUpdate() {
      try {
        const response = await http.PATCH(courseApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          toast.success(`${t("th_course")} ${t("updated_successfully")}`);
          fetchNewData(courseApi.list);
        } else {
          toast.error(new Error(t("error_in_updating_course")));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }

      setIsFormUpdating(false);
    }
    pushUpdate();
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return fetchNewData(courseApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "course",
        });

        setCourse(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        setCourse(null);
      }
    };
  }, []);

  const watchGrade = watch("grade");

  useEffect(() => {
    if (showAssignCourseModal) {
      async function fetchData() {
        const response = await http.GET(`${gradeApi.list}?page=${gradeCurrentPage}`, "");
        setGradeTotalPage(response?.data?.totalPage);
        setGradeCurrentPage(response?.data?.currentPage);
        const filterHasCareer = response?.data?.data?.filter((item) => {
          return selected.value === "assignToGrade" ? !item?.hasCareer : item?.hasCareer
        })
        const newOptions = convertToOptions(filterHasCareer);
        const combinedOptions = [...gradeOptions, ...newOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setGradeOptions(newOptions)
        setGradeOptionsForCourseToGrade(newOptions);
      }
      fetchData();
    }
  }, [gradeCurrentPage, showAssignCourseModal]);

  useEffect(() => {
    setSelectedCourse(null);
    setValue("course", undefined);
    if (showAssignCourseModal) {
      async function getCourses() {
        try {
          if (watchGrade) {
            const response = await http.GET(
              `${careerApi.careerByGrade(watchGrade)}?page=${careerCurrentPage}`,
              "",
            );
            setCareerTotalPage(response?.data?.totalPage);
            setCareerCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCareerOptions(newOptions);
          } else {
            const response = await http.GET(`${careerApi.list}?page=${careerCurrentPage}`, "");
            setCareerTotalPage(response?.data?.totalPage);
            setCareerCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const combinedOptions = [...newOptions, ...careerOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setCareerOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getCourses();
    }
  }, [watchGrade, careerCurrentPage, showAssignCourseModal]);

  useEffect(() => {
    if (showAssignCourseModal) {
      async function fetchData() {
        const response = await http.GET(`${schoolApi.list}?page=${schoolCurrentPage}`, "");
        setSchoolTotalPage(response?.data?.totalPage);
        setSchoolCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data);
        const combinedOptions = [...schoolOptions, ...newOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setSchoolOptions(uniqueOptions);
      }
      fetchData();
    }
  }, [schoolCurrentPage, showAssignCourseModal]);

  const handlePageChange = (pageNumber: number) => {
    setCourse([]);
    fetchNewData(`${courseApi.list}?page=${pageNumber}`);
  };

  const handleGradeSelectChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value);
    setSelectedCareer([])
  };

  const handleCareerMultiSelect = value => {
    setSelectedCareer(value);
    const careerIds = value.map(item => item?.value);
    setValue("career", careerIds);
  };

  const handleSchoolMultiSelect = value => {
    setSelectedSchools(value);
    const schoolIds = value.map(item => item?.value);
    setValue("schools", schoolIds);
  };

  const assignOptions = [
    {
      value: "assignToGrade",
      label: t("assign_to_grade"),
    },
    {
      value: "assignToCareer",
      label: t("assign_to_career"),
    },
  ];

  const [selected, setSelected] = useState(null);


  const onAssignedSubmit = data => {
    if (data) {
      http
        .POST(
          selected.value === "assignToCareer"
            ? careerApi.assignCourse
            : selected.value === "assignToGrade"
              ? gradeApi.assignCourse
              : schoolApi.assignCourse,
          selected.value === "assignToCareer"
            ? {
              careers: data.career,
              courses: checkedCourses,
            }
            : selected.value === "assignToGrade"
              ? {
                grades: [data.grade],
                courses: checkedCourses,
              }
              : {
                schools: data.schools,
                courses: checkedCourses,
                grade: filteredGrade,
                career: filteredCareer ?? "",
              },
        )
        .then(res => {
          setIsAssigned(res?.data?.success);
          toast.success(`${t("courses")} ${t("assigned_successfully")}`);
          setShowAssignCourseModal(false);
          setCheckedCourses([]);
          setSelectedSchools([]);
          setSelectedGradeCategory([]);
          setSelectedGrade([]);
          const selection = document.querySelectorAll('input[type="checkbox"]');
          selection.forEach((checkbox: HTMLInputElement) => {
            checkbox.checked = false;
          });
        })
        .catch(error => {
          toast.error(Object.values(error?.response?.data?.errors)?.[0]);
        });
    }
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
      const gardeByGradeCategoryOptions = convertToOptions(gradeByCategoryResponse?.data?.data)
      setGradeByGradeCategory(gardeByGradeCategoryOptions)
    }
    getGradeByGradeCategory()
  }, [selectedGradeCategory?.value])

  const handleGradeCategorySelect = value => {
    setSelectedGradeCategory(value);
    setSelectedGrade([])
  };

  const handleChange = selectedOption => {
    setSelected(selectedOption);
    setShowAssignCourseModal(prev => !prev);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("courses")}</h4>
        <div className="header_actions">
          <div className="search_wrapper ">
            <div className="d-flex">
              <Search
                removeFilter={removeFilter}
                handleSearch={handleSearch}
                setRemoveFilter={setRemoveFilter}
                setFilteredData={setCourse}
                setTotalPageNumber={setTotalPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
                setFilteredGrade={setFilteredGrade}
                setFilteredCareer={setFilteredCareer}
              />
            </div>
          </div>
          {(coursePermissions.includes("/course/create/") || isAdmin) && (
            <div className="button_wrapper ">
              <Link to={PATH.ADD_COURSE}>
                <Button
                  buttonName={`${t("add")} ${t("courses")}`}
                  color="success"
                  type="button"
                  clickHandler={() => { }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {checkedCourses && checkedCourses?.length ? (
        <div className="unassign_banner">
          {checkedCourses.length} {t("courses_selected")}
          {filteredGrade ? (
            <div className="unassign_button">
              <Button
                type="submit"
                color="success"
                buttonName={`${t("assign_to_school")}`}
                clickHandler={handleChange}
                iconName="bx bx-unlink"
              />
            </div>
          ) : (
            <div className="unassign_button">
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: 150,
                  }),
                }}
                options={assignOptions}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      ) : null}
      <div className="table_container course_table_container">
        <Tables
          data={courses}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isFormUpdating}
          formToEdit={<CourseForm />}
          handleDelete={handleDelete}
          handleClickUpdate={() => handleClickUpdate}
          selectedElementRef={selectedElementRef}
          hasCheckBox={true}
          onSelectRows={handleSelectedRows}
          hasActions={false}
          isAssigned={isAssigned}
          setIsAssigned={setIsAssigned}
        />
      </div>
      {courses && courses?.length ? (
        <div className="pages_container">
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPageNumber={totalPageNumber}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

      {showAssignCourseModal && (
        <div className="sidebarFilterTotal">
          <div
            className="sidebarFilterOverlay"
            onClick={() => {
              setSelectedGradeCategory([])
              setSelectedGrade([])
              setSelectedCareer([])
              setShowAssignCourseModal(false)
            }}
          ></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>
                {t("assign_course_to")}{" "}
                {selected.value === "assignToCareer"
                  ? "Career"
                  : selected.value === "assignToGrade"
                    ? "Grade"
                    : "School"}
              </h1>
              <FontAwesomeIcon
                icon={faClose}
                className="cancel_button"
                onClick={() => {
                  setSelectedGradeCategory([])
                  setSelectedGrade([])
                  setSelectedCareer([])
                  setShowAssignCourseModal(!showAssignCourseModal)
                }}
              />
            </div>

            <form onSubmit={handleSubmit(onAssignedSubmit)} className="sidebarFilterfilter">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selected.value === "assignToGrade" || selected.value === "assignToCareer" ? (
                  <>
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
                        onMenuScrollToBottom={() =>
                          handleInfiniteScroll(
                            gradeTotalPage,
                            gradeCurrentPage,
                            setGradeCurrentPage,
                          )
                        }
                        value={selectedGrade}
                        handleChange={(e, data) => {
                          handleGradeSelectChange(e, data);
                        }}
                        options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                      />
                    </div>
                    {selected.value === "assignToCareer" && (
                      <div className="level_dropdown">
                        <MultiSelect
                          required={selected.value === "assignToCareer" ? true : false}
                          name="career"
                          isDisabled={!selectedGrade}
                          label={t("th_career")}
                          options={careerOptions}
                          selected={selectedCareer}
                          handleMultiSelect={handleCareerMultiSelect}
                          {...register("career", {
                            required: false,
                          })}
                          onMenuScrollToBottom={() =>
                            handleInfiniteScroll(
                              careerTotalPage,
                              careerCurrentPage,
                              setCareerCurrentPage,
                            )
                          }
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <MultiSelect
                      required={
                        selected.value !== "assignToGrade" && selected.value !== "assignToCareer"
                          ? true
                          : false
                      }
                      name="schools"
                      label="School"
                      options={schoolOptions}
                      selected={selectedSchools}
                      handleMultiSelect={handleSchoolMultiSelect}
                      {...register("schools", {
                        required: true,
                      })}
                      onMenuScrollToBottom={() =>
                        handleInfiniteScroll(
                          schoolTotalPage,
                          schoolCurrentPage,
                          setSchoolCurrentPage,
                        )
                      }
                    />
                  </>
                )}
              </div>
              <div className="searchButton" style={{ marginTop: "20px" }}>
                <Button type="submit" color="success" buttonName={t("assign")} />
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{t("update_course")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<CourseForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedCourse,
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
        id={selectedCourse?.id}
        name={selectedCourse?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}
export default withTranslation()(Course);

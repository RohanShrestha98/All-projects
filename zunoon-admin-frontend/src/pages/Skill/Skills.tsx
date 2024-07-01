import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import toast from "../../utils/toast";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import Tables from "../../components/Tables/Tables";
import { PATH } from "../../constants/routes";
import useFetch from "../../hooks/useFetch";
import SkillForm from "./components/SubjectForm/SkillForm";
import config from "../../config";
import { withTranslation } from "react-i18next";
import "./Skills.scss";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { useForm } from "react-hook-form";
import toasts from "../../utils/toast";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { getPermissions } from "../../utils/storage";
import { handleInfiniteScroll } from "../../utils/handleInfiniteScroll";
import { optionType } from "../../@types/option";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { ICourse } from "../../@types/course";
import { InfiniteScrollSelect } from "../../components/CustomSelect/InfiniteScrollSelect";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

const skillApi = config.endpoints.api.skill;
const unitApi = config.endpoints.api.unit;
const careerApi = config.endpoints.api.career;
const courseApi = config.endpoints.api.course;
const gradeApi = config.endpoints.api.grade;
const globalApi = config.endpoints.api.global;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


type CourseType = {
  id: number;
  name: string;
};

type GradeType = {
  id: number;
  name: string;
};

type SkillType = {
  course: CourseType[];
  description: string;
  grade: GradeType[];
  id: string;
  name: string;
  thumbnail: string;
};

function Skills({ t }) {
  const navigate = useNavigate();
  const isAdmin = getPermissions()[0]?.name === "Any";

  const skillPermissions = getPermissions()
    .filter(each => each.url.path.includes("skill"))
    .map(each => each.url.path);

  const mutatePermissions = ["/skill/update/", "/skill/delete/", "/skill/indicators/"];

  const hasMutate = mutatePermissions.some(value => {
    return skillPermissions.includes(value);
  });

  const dropdownPermissions = ["/skill/indicators/"];

  const hasDropDown = dropdownPermissions.some(value => {
    return skillPermissions.includes(value);
  });

  const selectedElementRef = useRef<null | HTMLElement>(null);

  const [skills, setSkills] = useState<SkillType[] | null>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  /* const [searchValue, setSearchValue] = useState<string>(""); */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillType>();
  const [selectedCareer, setSelectedCareer] = useState<any>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [checkedCourses, setCheckedCourses] = useState([]);
  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const [showAssignSkillModal, setShowAssignSkillModal] = useState<boolean>(false);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();
  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);

  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<optionType | null>();
  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);
  const [isOptional, setIsOptional] = useState<boolean>(false);




  useEffect(() => {
    setSelectedLevel(null);

    if (selectedCourse) {
      const selectedCourseData = courses?.find(course => course.id === selectedCourse?.value);
      if (selectedCourseData?.hasLevel) {
        setNoLevel(false);
        const levelTypeOptions = selectedCourseData?.levels?.[0]?.type;
        setLevelTypeOptions(convertToOptions([levelTypeOptions]));
        const levelOptions = selectedCourseData?.levels;
        setLevelOptions(convertToOptions(levelOptions));
      } else {
        setNoLevel(true);
        setLevelOptions([]);
        setLevelTypeOptions([]);
      }
    } else {
      setNoLevel(true);
      setLevelOptions([]);
      setLevelTypeOptions([]);
    }
  }, [selectedCourse, courses]);



  const handleClick = () => {
    setShowAssignSkillModal(!showAssignSkillModal);
    setSelectedCareer([])
    setSelectedCourse([])
  };
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    fetchNewData(skillApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData?.data) {
      setSkills(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setSkills(null);
    }
  }, [fetchedData, removeFilter]);

  const columns: any = [
    {
      Header: `${t("name")}`,
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
            {(skillPermissions.includes("/skill/update/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedSkill(original);
                }}
                className="edit_btn"
                style={{
                  marginTop: "0.2rem",
                }}
                icon={faEdit}
              />
            )}
            {(skillPermissions.includes("/skill/delete/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedSkill(original);
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
                {(skillPermissions.includes("/skill/indicators/") || isAdmin) && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate(PATH.ASSIGNED_INDICATORS, {
                        state: { id: original.id, name: original.name },
                      });
                    }}
                  >
                    {t("view_assigned_indicators")}
                  </Dropdown.Item>
                )}
              </DropdownButton>
            )}
          </td>
        );
      },
    });

  const handleDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(skillApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("subject")} ${t("deleted_successfully")}`);
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;

          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setSkills(skills => {
              return skills.filter(subject => (subject.id !== id ? subject : null));
            });
            fetchNewData(skillApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error("Error in deleting the subject"));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLevelSelectChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data.value);
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
        const response = await http.PUT_FILE(skillApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(skillApi.list);
          toast.success(`${t("skill")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error("Error in updating subject"));
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
        return fetchNewData(skillApi.list);
      }

      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "skill",
        });

        setSkills(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        toast.error(err?.toString());
      }
    };
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setSkills([]);
    fetchNewData(`${skillApi.list}?page=${pageNumber}`);
  };

  const watchGrade = watch("grade");
  const watchCareer = watch("career");
  const watchCourse = watch("course");

  useEffect(() => {
    setSelectedCourse(null);
    setValue("course", undefined);

    async function getCourses() {
      if (isOptional) {
        const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}&&isOptional=${true}`, "");
        const newOptions = convertToOptions(response?.data?.data) || [];
        setCourseOptions(newOptions);
      }
      else if (watchCareer) {
        const response = await http.GET(
          `${courseApi.listByCareer(watchCareer)}?page=${courseCurrentPage}`,
          "",
        );
        setCourses(response?.data?.data);
        setCourseTotalPage(response?.data?.totalPage);
        setCourseCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        setCourseOptions(newOptions);
      } else if (!watchCareer && watchGrade) {
        const response = await http.GET(
          `${courseApi.listByGrade(watchGrade)}?page=${courseCurrentPage}`,
          "",
        );
        setCourses(response?.data?.data);
        setCourseTotalPage(response?.data?.totalPage);
        setCourseCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        setCourseOptions(newOptions);
      } else {
        const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}`, "");
        const newCourses = [...courses, ...response?.data?.data];
        const uniqueCourse = Array.from(new Set(newCourses.map(item => item.id))).map(value =>
          newCourses.find(option => option.id === value),
        );
        setCourses(uniqueCourse);
        setCourseTotalPage(response?.data?.totalPage);
        setCourseCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        const combinedOptions = [...newOptions, ...courseOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setCourseOptions(uniqueOptions);
      }
    }
    getCourses();
  }, [watchGrade, watchCareer, courseCurrentPage, isOptional]);

  useEffect(() => {
    if (showAssignSkillModal) {
      async function fetchData() {
        const response = await http.GET(`${gradeApi.list}?page=${gradeCurrentPage}`, "");
        setGradeTotalPage(response?.data?.totalPage);
        setGradeCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data);
        const combinedOptions = [...newOptions, ...gradeOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setGradeOptions(uniqueOptions);
      }
      fetchData();
    }
  }, [gradeCurrentPage, showAssignSkillModal]);

  useEffect(() => {
    setSelectedLevel(null);

    if (selectedCourse) {
      const selectedCourseData = courses?.find(course => course.id === selectedCourse?.value);
      if (selectedCourseData?.hasLevel) {
        setNoLevel(false);
        const levelOptions = selectedCourseData?.levels;
        setLevelOptions(convertToOptions(levelOptions));
      } else {
        setNoLevel(true);
        setLevelOptions([]);
      }
    } else {
      setNoLevel(true);
      setLevelOptions([]);
    }
  }, [selectedCourse, courses]);

  useEffect(() => {
    setValue("course", undefined);
    if (showAssignSkillModal) {
      async function getCourses() {
        try {
          if (isOptional) {
            const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}&&isOptional=${true}`, "");
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          }
          else if (watchGrade && !watchCareer) {
            const response = await http.GET(
              `${courseApi.listByGrade(watchGrade)}?page=${courseCurrentPage}`,
              "",
            );
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          } else if (watchCareer) {
            const response = await http.GET(
              `${courseApi.listByCareer(watchCareer)}?page=${courseCurrentPage}`,
              "",
            );
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          } else {
            const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}`, "");
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const combinedOptions = [...newOptions, ...courseOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setCourseOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getCourses();
    }
  }, [watchGrade, courseCurrentPage, showAssignSkillModal, watchCareer, isOptional]);


  useEffect(() => {
    setValue("career", undefined);
    if (showAssignSkillModal) {
      async function getCareers() {
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
            const combinedOptions = [...newOptions, ...courseOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setCareerOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getCareers();
    }
  }, [watchGrade, careerCurrentPage, showAssignSkillModal]);

  useEffect(() => {
    setSelectedUnit(null);
    setValue("unit", undefined);
    if (showAssignSkillModal) {
      async function getUnits() {
        try {
          if (watchCourse) {
            const response = await http.GET(`${unitApi.listByCourse(watchCourse)}?page=${1}`, "");
            const levelData = response?.data?.data?.filter(item => {
              return item?.level === selectedLevel?.label;
            });
            setUnitCurrentPage(response?.data?.currentPage);
            setUnitTotalPage(response?.data?.totalPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const newUintOptions = convertToOptions(levelData) || [];
            setUnitOptions(selectedLevel ? newUintOptions : newOptions);
          } else {
            const response = await http.GET(`${unitApi.list}?page=${unitCurrentPage}`, "");
            setUnitCurrentPage(response?.data?.currentPage);
            setUnitTotalPage(response?.data?.totalPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const combinedOptions = [...newOptions, ...unitOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setUnitOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getUnits();
    }
  }, [watchCourse, unitCurrentPage, showAssignSkillModal, selectedLevel]);

  const handleCareerSelectChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value);
  };

  const toggleModal = () => {
    setShowAssignSkillModal(pre => !pre);
    setSchoolOptions([]);
    setGradeOptions([]);
    setCourseOptions([]);
  };

  const onAssignedSubmit = data => {
    if (data) {
      http
        .POST(unitApi.assignSkill, {
          unit: data.unit,
          skills: checkedCourses,
        })
        .then(res => {
          setIsAssigned(res?.data?.success);
          toasts.success("Skill assigned successfully!");
          toggleModal();
          setCheckedCourses([]);
          setSelectedSchools([]);

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

  const handleSelectedRows = selectedRows => {
    if (checkedCourses.toString() !== selectedRows.toString()) setCheckedCourses(selectedRows);
  };
  const handleGradeSelectChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value);
  };

  const handleCourseSelectChange = (data, e) => {
    setSelectedCourse(data);
    setValue("course", data?.value);
  };

  const handleUnitSelectChange = (data, e) => {
    setSelectedUnit(data);
    setValue("unit", data?.value);
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
    setSelectedGrade(null)
  };

  const handleClear = () => {
    setSelectedCourse(null);
    setSelectedGrade(null);
    setSelectedLevel(null);
  };


  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_skills")}</h4>
        <div className="header_actions">
          <div className="search_wrapper ">
            <div className="d-flex">
              <Search
                removeFilter={removeFilter}
                handleSearch={handleSearch}
                setRemoveFilter={setRemoveFilter}
                setFilteredData={setSkills}
                setTotalPageNumber={setTotalPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            </div>
          </div>
          {(skillPermissions.includes("/skill/create/") || isAdmin) && (
            <div className="button_wrapper ">
              <Link to={PATH.ADD_SKILL}>
                <Button
                  type="button"
                  clickHandler={() => { }}
                  buttonName={`${t("add")} ${t("sidebar_skills")}`}
                  color="success"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {checkedCourses?.length ? (
        <div className="unassign_banner">
          {checkedCourses?.length} Skill Selected
          <div className="unassign_button">
            <Button
              type="submit"
              color="success"
              buttonName={`${t("Assign to Unit")}`}
              clickHandler={toggleModal}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container skill_table_container">
        <Tables
          data={skills && skills}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          handleDelete={handleDelete}
          formToEdit={<SkillForm />}
          selectedElementRef={selectedElementRef}
          hasCheckBox={true}
          handleClickUpdate={() => handleClickUpdate}
          hasActions={false}
          onSelectRows={handleSelectedRows}
          isAssigned={isAssigned}
          setIsAssigned={setIsAssigned}
        />
      </div>
      {showAssignSkillModal && (
        <div className="sidebarFilterTotal">
          <div
            className="sidebarFilterOverlay"
            onClick={handleClick}
          ></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>Assign Skill to Unit</h1>
              <FontAwesomeIcon icon={faClose} className="cancel_button" onClick={handleClick} />
            </div>

            <form onSubmit={handleSubmit(onAssignedSubmit)} className="sidebarFilterfilter">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="grade_select">
                  <InfiniteScrollSelect
                    id="grade_category"
                    register={register}
                    disabled={isOptional}
                    name="grade_category"
                    label={t("th_grade_category")}
                    placeholder={t("select_a_grade_category")}
                    value={selectedGradeCategory}
                    handleChange={handleGradeCategorySelect}
                    loadOptions={gradeCategoryLoadOptions}
                  />
                </div>
                <div className="level_dropdown">
                  <CustomSelect
                    disabled={isOptional}
                    id="grade"
                    register={register}
                    name="grade"
                    label={t("th_grade")}
                    value={selectedGrade}
                    placeholder={t("select_a_grade")}
                    handleChange={(e, data) => handleGradeSelectChange(e, data)}
                    options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(gradeTotalPage, gradeCurrentPage, setGradeCurrentPage)
                    }
                  />
                </div>
                <div className="level_dropdown">
                  <CustomSelect
                    id="career"
                    register={register}
                    name="career"
                    label={t("th_career")}
                    value={selectedCareer}
                    disabled={!selectedGrade || !careerOptions?.length || isOptional}
                    placeholder={t("select_a_career")}
                    handleChange={(e, data) => {
                      handleCareerSelectChange(e, data);
                    }}
                    options={careerOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(careerTotalPage, careerCurrentPage, setCareerCurrentPage)
                    }
                  />
                </div>
                <div className="toggle_course_optional">
                  <label htmlFor="isOptional">{t("optional")}</label>
                  <ToggleButton
                    value={isOptional}
                    handleChange={() => {
                      setIsOptional(!isOptional);
                      handleClear()
                      setValue("isOptional", isOptional);
                    }}
                  />
                </div>
                <div className="level_dropdown">
                  <CustomSelect
                    id="course"
                    register={register}
                    name="course"
                    label={t("th_course")}
                    value={selectedCourse}
                    disabled={isOptional ? false : !careerOptions?.length ? !selectedGrade : !selectedCareer}
                    placeholder={t("placeholder_select_course")}
                    handleChange={(e, data) => handleCourseSelectChange(e, data)}
                    options={courseOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(courseTotalPage, courseCurrentPage, setCourseCurrentPage)
                    }
                  />
                </div>
                <div className="toggle_option_level">
                  <div className="level_dropdown">
                    <CustomSelect
                      id="leveltype"
                      disabled={true}
                      register={register}
                      name="leveltype"
                      label={t("level_type")}
                      placeholder={
                        !selectedCourse
                          ? t("select_a_level_type")
                          : noLevel
                            ? t("selected_course_has_no_level")
                            : "Select a level type"
                      }
                      value={levelTypeOptions?.[0]}
                      options={levelTypeOptions}
                    />
                  </div>
                  <div className="mt-2">
                    <CustomSelect
                      id="level"
                      disabled={noLevel}
                      register={register}
                      placeholder={
                        !selectedCourse
                          ? t("select_a_level")
                          : noLevel
                            ? t("selected_course_has_no_level")
                            : "Select a level"
                      }
                      name="level"
                      label={t("level")}
                      value={selectedLevel}
                      handleChange={(e, data) => {
                        handleLevelSelectChange(e, data);
                      }}
                      options={levelOptions}
                    />
                  </div>
                </div>

                <div className="level_dropdown">
                  <CustomSelect
                    required
                    id="unit"
                    register={register}
                    name="unit"
                    label={t("unit")}
                    disabled={!selectedCourse}
                    placeholder={t("select_a_unit")}
                    value={selectedUnit}
                    handleChange={(e, data) => handleUnitSelectChange(e, data)}
                    options={unitOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(unitTotalPage, unitCurrentPage, setUnitCurrentPage)
                    }
                  />
                </div>
              </div>
              <div className="searchButton" style={{ marginTop: "20px" }}>
                <Button type="submit" color="success" buttonName={"Assign"} />
              </div>
            </form>
          </div>
        </div>
      )}
      {skills && skills?.length ? (
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
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{`${t("update")} ${t("skill")}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<SkillForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedSkill,
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
        id={selectedSkill?.id}
        name={selectedSkill?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default withTranslation()(Skills);

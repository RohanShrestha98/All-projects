import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import toast from "../../utils/toast";
import Button from "../../components/Button/Button";
import Tables from "../../components/Tables/Tables";
import Search from "../../components/Search/Search";
import IndicatorForm from "./components/indicatorForm/IndicatorForm";
import { PATH } from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/Pagination/Pagination";
import useFetch from "../../hooks/useFetch";
import "./Indicator.scss";
import config from "../../config";
import { withTranslation } from "react-i18next";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import toasts from "../../utils/toast";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { getPermissions } from "../../utils/storage";
import { optionType } from "../../@types/option";
import { handleInfiniteScroll } from "../../utils/handleInfiniteScroll";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { ICourse } from "../../@types/course";
import { InfiniteScrollSelect } from "../../components/CustomSelect/InfiniteScrollSelect";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

const indicatorApi = config.endpoints.api.indicator;
const skillApi = config.endpoints.api.skill;
const globalApi = config.endpoints.api.global;
const unitApi = config.endpoints.api.unit;
const gradeApi = config.endpoints.api.grade;
const courseApi = config.endpoints.api.course;
const careerApi = config.endpoints.api.career;
const gradeCategoryApi = config.endpoints.api.gradeCategory;



type IndicatorType = {
  id: string;
  name: string;
  description: string;
};

function Indicator({ t }) {
  const isAdmin = getPermissions()[0]?.name === "Any";

  const indicatorPermissions = getPermissions()
    .filter(each => each.url.path.includes("indicator"))
    .map(each => each.url.path);

  const mutatePermissions = ["/indicator/update/", "/indicator/delete/", "/indicator/lessons/"];

  const hasMutate = mutatePermissions.some(value => {
    return indicatorPermissions.includes(value);
  });

  const dropdownPermissions = ["/indicator/lessons/"];

  const hasDropDown = dropdownPermissions.some(value => {
    return indicatorPermissions.includes(value);
  });

  const [indicator, setIndicator] = useState<IndicatorType[] | null>();
  const selectedElementRef = useRef<null | HTMLDivElement>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>();
  const navigate = useNavigate();
  const [checkedCourses, setCheckedCourses] = useState([]);
  const [reload, setReload] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<any>();
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const [showAssignIndicatorModal, setShowAssignIndicatorModal] = useState<boolean>(false);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);



  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();

  const [selectedUnit, setSelectedUnit] = useState<optionType>();
  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);

  const [selectedSkill, setSelectedSkill] = useState<optionType>();
  const [skillCurrentPage, setSkillCurrentPage] = useState(1);
  const [skillTotalPage, setSkillTotalPage] = useState(0);
  const [skillOptions, setSkillOptions] = useState<optionType[]>([]);
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);
  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);
  const [isOptional, setIsOptional] = useState<boolean>(false);


  const { register, handleSubmit, setValue, watch } = useForm();
  useEffect(() => {
    fetchNewData(indicatorApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData?.data) {
      setIndicator(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setIndicator(null);
    }
  }, [reload, fetchedData, removeFilter]);

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

  const handleClick = () => {
    setShowAssignIndicatorModal(!showAssignIndicatorModal);
    setSelectedCareer([])
    setSelectedCourse([])
  };

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
            {(indicatorPermissions.includes("/indicator/update/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedIndicator(original);
                }}
                className="edit_btn"
                style={{
                  marginTop: "0.2rem",
                }}
                icon={faEdit}
              />
            )}
            {(indicatorPermissions.includes("/indicator/delete/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedIndicator(original);
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
                {(indicatorPermissions.includes("/indicator/lesssons/") || isAdmin) && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate(PATH.ASSIGNED_LESSONS, {
                        state: { id: original.id, name: original.name },
                      });
                    }}
                  >
                    {t("view_assigned_lessons")}
                  </Dropdown.Item>
                )}
              </DropdownButton>
            )}
          </td>
        );
      },
    });

  const handleDelete = async id => {
    try {
      const response = await http.REMOVE(`${indicatorApi.delete}/${id}/`);
      if (response.status === 200) {
        toast.success(`${t("indicator")} ${t("deleted_successfully")}`);
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;

          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setIndicator(indicator => {
              return indicator.filter(unit => (unit.id !== id ? unit : null));
            });
            fetchNewData(indicatorApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("indicator")}`));
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
        const response = await http.PUT_FILE(indicatorApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(indicatorApi.list);
          setReload(pre => !pre);
          toast.success(`${t("indicator")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error(t("error_in_updating_indicator")));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsLoading(false);
    }
    pushUpdate();
  };

  const handleLevelSelectChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data.value);
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return fetchNewData(indicatorApi.list);
      }

      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "indicator",
        });

        setIndicator(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        setIndicator(null);
        toast.error(err?.message?.toString());
      }
    };
  }, []);

  const handlePageChange = pageNumber => {
    setIndicator([]);
    fetchNewData(`${indicatorApi.list}?page=${pageNumber}`);
  };

  const handleSelectedRows = selectedRows => {
    if (checkedCourses.toString() !== selectedRows.toString()) setCheckedCourses(selectedRows);
  };

  const onAssignedSubmit = data => {
    if (data) {
      http
        .POST(skillApi.assignIndicator, {
          skill: data?.skill,
          indicators: checkedCourses,
        })
        .then(res => {
          setIsAssigned(res?.data?.success);
          toasts.success(`${t("th_indicator")} ${t("assigned_successfully")}`);
          setSelectedSkill(null);
          setSelectedSchools([]);
          toggleModal();
          setCheckedCourses([]);
          const selection = document.querySelectorAll('input[type="checkbox"]');
          selection.forEach((checkbox: HTMLInputElement) => {
            checkbox.checked = false;
          });
        });
    }
  };

  const watchGrade = watch("grade");
  const watchCourse = watch("course");
  const watchCareer = watch("career");
  const watchUnit = watch("unit");

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
        if (response?.data?.success) {
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
    }
    getCourses();
  }, [watchGrade, watchCareer, courseCurrentPage, isOptional]);
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
  useEffect(() => {
    if (showAssignIndicatorModal) {
      async function fetchData() {
        const response = await http.GET(`${gradeApi.list}?page=${gradeCurrentPage}`, "");
        if (response?.data?.success) {
          console.log("response", response)
          setGradeTotalPage(response?.data?.totalPage);
          setGradeCurrentPage(response?.data?.currentPage);
          const newOptions = convertToOptions(response?.data?.data);
          const combinedOptions = [...newOptions, ...gradeOptions];
          const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
            value => combinedOptions.find(option => option.value === value),
          );
          setGradeOptions(uniqueOptions);
        }

      }
      fetchData();
    }
  }, [gradeCurrentPage, showAssignIndicatorModal]);


  useEffect(() => {
    setValue("course", undefined);
    if (showAssignIndicatorModal) {
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
  }, [watchGrade, courseCurrentPage, showAssignIndicatorModal, watchCareer, isOptional]);


  useEffect(() => {
    setValue("career", undefined);
    if (showAssignIndicatorModal) {
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
  }, [watchGrade, careerCurrentPage, showAssignIndicatorModal]);

  useEffect(() => {
    setSelectedUnit(null);
    setValue("unit", undefined);
    if (showAssignIndicatorModal) {
      async function getUnits() {
        try {
          if (watchCourse) {
            const response = await http.GET(`${unitApi.listByCourse(watchCourse)}?page=${1}`, "");
            const levelData = response?.data?.data?.filter(item => {
              return item?.level === selectedLevel?.label;
            });
            setUnitCurrentPage(response?.data?.currentPage);
            setUnitTotalPage(response?.data?.totalPage);
            const newUintOptions = convertToOptions(levelData) || [];
            const newOptions = convertToOptions(response?.data?.data) || [];
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
  }, [watchCourse, unitCurrentPage, showAssignIndicatorModal, selectedLevel]);

  useEffect(() => {
    setSelectedSkill(null);
    setValue("skill", undefined);
    if (showAssignIndicatorModal) {
      async function fetchData() {
        if (watchUnit) {
          const response = await http.GET(`${skillApi.listByUnit(watchUnit)}?page=${1}`, "");
          setSkillCurrentPage(response?.data?.currentPage);
          setSkillTotalPage(response?.data?.totalPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          setSkillOptions(newOptions);
        } else {
          const response = await http.GET(`${skillApi.list}?page=${skillCurrentPage}`, "");
          setSkillCurrentPage(response?.data?.currentPage);
          setSkillTotalPage(response?.data?.totalPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          const combinedOptions = [...newOptions, ...skillOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setSkillOptions(uniqueOptions);
        }
      }
      fetchData();
    }
  }, [watchUnit, skillCurrentPage, showAssignIndicatorModal]);

  const handleCareerSelectChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value);
  };

  const toggleModal = () => {
    setShowAssignIndicatorModal(pre => !pre);
    setSelectedSkill([]);
    setSelectedSchools([]);
    setSelectedCourse([]);
    setSelectedCareer([]);
    setSelectedGrade([]);
    setCourseOptions([]);
    setGradeOptions([]);
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

  const handleSkillSelectChange = (data, e) => {
    setSelectedSkill(data);
    setValue("skill", data?.value);
  };
  const handleClear = () => {
    setSelectedCourse([]);
    setSelectedCareer([]);
    setSelectedGrade(null);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_indicator")}</h4>
        <div className="header_actions">
          <div className="search_wrapper ">
            <div className="d-flex">
              <Search
                removeFilter={removeFilter}
                handleSearch={handleSearch}
                setRemoveFilter={setRemoveFilter}
                setFilteredData={setIndicator}
                setTotalPageNumber={setTotalPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            </div>
          </div>
          {(indicatorPermissions.includes("/indicator/create/") || isAdmin) && (
            <div className="button_wrapper ">
              <Link to={PATH.ADD_INDICATOR}>
                <Button
                  type="button"
                  buttonName={`${t("add")} ${t("sidebar_indicator")}`}
                  color="success"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {checkedCourses?.length ? (
        <div className="unassign_banner">
          {checkedCourses?.length} {t("th_indicator")} ${t("selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="success"
              buttonName={`${t("assign_to_skill")}`}
              clickHandler={toggleModal}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container indicator_table_container">
        <Tables
          data={indicator}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isLoading}
          formToEdit={<IndicatorForm />}
          handleDelete={handleDelete}
          selectedElementRef={selectedElementRef}
          handleClickUpdate={() => handleClickUpdate}
          hasActions={false}
          onSelectRows={handleSelectedRows}
          hasCheckBox={true}
          isAssigned={isAssigned}
          setIsAssigned={setIsAssigned}
        />
      </div>
      {showAssignIndicatorModal && (
        <div className="sidebarFilterTotal">
          <div
            className="sidebarFilterOverlay"
            onClick={handleClick}
          ></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>{t("assign_indicator_to_skill")}</h1>
              <FontAwesomeIcon icon={faClose} className="cancel_button" onClick={handleClick} />
            </div>

            <form onSubmit={handleSubmit(onAssignedSubmit)} className="sidebarFilterfilter">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="grade_select">
                  <InfiniteScrollSelect
                    id="grade_category"
                    disabled={isOptional}
                    register={register}
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
                    id="grade"
                    disabled={isOptional || !selectedGradeCategory}
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
                <div className="level_dropdown">
                  <CustomSelect
                    value={selectedSkill}
                    options={skillOptions}
                    id="skill"
                    name="skill"
                    disabled={!selectedUnit}
                    label={t("skill")}
                    placeholder={t("select_a_skill")}
                    register={register}
                    required
                    handleChange={(e, data) => handleSkillSelectChange(e, data)}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(skillTotalPage, skillCurrentPage, setSkillCurrentPage)
                    }
                  />
                </div>
              </div>
              <div className="searchButton" style={{ marginTop: "20px" }}>
                <Button type="submit" color="success" buttonName={"assign"} />
              </div>
            </form>
          </div>
        </div>
      )}
      {indicator && indicator?.length ? (
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
          <Modal.Title>{`${t("update")} ${t("indicator")}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<IndicatorForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedIndicator,
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
        id={selectedIndicator?.id}
        name={selectedIndicator?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default withTranslation()(Indicator);

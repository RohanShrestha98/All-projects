import React, { useEffect, useMemo, useRef, useState } from "react";
import "./positiondragdroplesson.scss";
import AllContentsCard from "./contentCard/AllContentsCard";
import Pagination from "../../../components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import http from "../../../utils/http";
import config from "../../../config";
import toast from "../../../utils/toast";
import { Modal } from "react-bootstrap";
import LessonForm from "./lessonForm/LessonForm";
import Search from "../../../components/Search/Search";
import CustomTooltip from "../../../components/Tooltip/CustomTooltip";
import ReactPlayer from "react-player";
// import { Document, Page, pdfjs } from "react-pdf";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import { convertToOptions } from "../../../utils/convertToSelectOptions";
import { optionType } from "../../../@types/option";
import { withTranslation } from "react-i18next";
import ErrorPages from "../../../components/ErrorPages/ErrorPages";
import { handleInfiniteScroll } from "../../../utils/handleInfiniteScroll";
import { useLocation } from "react-router-dom";
import { ICourse } from "../../../@types/course";
import { InfiniteScrollSelect } from "../../../components/CustomSelect/InfiniteScrollSelect";
import { Viewer } from "@react-pdf-viewer/core";
import ToggleButton from "../../../components/ToggleButton/ToggleButton";
import { ConvertHtmlToPlainText } from "../../../utils/convertHtmlToPlainText";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const lessonApi = config.endpoints.api.lesson;
const globalApi = config.endpoints.api.global;
const gradeApi = config.endpoints.api.grade;
const courseApi = config.endpoints.api.course;
const careerApi = config.endpoints.api.career;
const unitApi = config.endpoints.api.unit;
const skillApi = config.endpoints.api.skill;
const indicatorApi = config.endpoints.api.indicator;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


function PositionDragDropLesson({
  t,
  removeFilter,
  setRemoveFilter,
  loading,
  hasError,
  data,
  setData,
  fetchNewData,
  handleClick,
  lessonListByContent,
  selectedID,
  handleVideoClick,
  currentPageNumber,
  totalPageNumber,
  setTotalPageNumber,
  setCurrentPageNumber,
  videoPreview,
  contentDetailLoading,
  videoContent,
  setVideoPreview,
  handlePageChange,
}) {
  const selectedElementRef = useRef<null | HTMLDivElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [lessonId, setLessonId] = useState<string>("");
  const [lessonTitle, setLessonTitle] = useState<string>("");
  const [text, setText] = useState("");
  const lessonListContent = lessonListByContent && lessonListByContent[0]?.data?.data;
  const [selectedLessson, setSelectedLesson] = useState<any>();
  const [checkedLessons, setCheckedLessons] = useState([]);
  const [showAssignLessonModal, setShowAssignLessonModal] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<any>();
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [selectedUnit, setSelectedUnit] = useState<optionType>();
  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);
  const [changeBookUrl, setChangeBookUrl] = useState<any>();
  const [selectedSkill, setSelectedSkill] = useState<optionType>();
  const [skillCurrentPage, setSkillCurrentPage] = useState(1);
  const [skillTotalPage, setSkillTotalPage] = useState(0);
  const [skillOptions, setSkillOptions] = useState<optionType[]>([]);
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);
  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);
  const [selectedIndicator, setSelectedIndicator] = useState<optionType>();
  const [indicatorCurrentPage, setIndicatorCurrentPage] = useState(1);
  const [indicatorTotalPage, setIndicatorTotalPage] = useState(0);
  const [indicatorOptions, setIndicatorOptions] = useState<optionType[]>([]);
  const [isOptional, setIsOptional] = useState<boolean>(false);


  const [selectedLessonId, setSelectedLessonId] = useState<string>();

  const handleSelectedElement = event => {
    selectedElementRef.current = event.currentTarget;
  };

  const { state } = useLocation();

  const { register, handleSubmit, setValue, watch } = useForm();

  const watchGrade = watch("grade");
  const watchCourse = watch("course");
  const watchUnit = watch("unit");
  const watchSkill = watch("skill");
  const watchCareer = watch("career");

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
    if (showAssignLessonModal) {
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
  }, [gradeCurrentPage, showAssignLessonModal]);

  useEffect(() => {
    setValue("course", undefined);
    if (showAssignLessonModal) {
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
  }, [watchGrade, courseCurrentPage, showAssignLessonModal, watchCareer, isOptional]);


  useEffect(() => {
    setValue("career", undefined);
    if (showAssignLessonModal) {
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
  }, [watchGrade, careerCurrentPage, showAssignLessonModal]);

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
    setSelectedUnit(null);
    setValue("unit", undefined);
    if (showAssignLessonModal) {
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
  }, [watchCourse, unitCurrentPage, showAssignLessonModal, selectedLevel]);

  useEffect(() => {
    setSelectedSkill(null);
    setValue("skill", undefined);
    if (showAssignLessonModal) {
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
  }, [watchUnit, skillCurrentPage, showAssignLessonModal]);

  useEffect(() => {
    setSelectedIndicator(null);
    setValue("indicator", undefined);
    if (showAssignLessonModal) {
      async function fetchData() {
        if (watchSkill) {
          const response = await http.GET(
            `${indicatorApi.listBySkill(watchSkill)}?page=${indicatorCurrentPage}`,
            "",
          );
          setIndicatorTotalPage(response?.data?.totalPage);
          setIndicatorCurrentPage(response?.data?.currentPage);
          const indicatorOptions = convertToOptions(response?.data?.data);
          setIndicatorOptions(indicatorOptions);
        } else {
          const response = await http.GET(`${indicatorApi.list}?page=${indicatorCurrentPage}`, "");
          setIndicatorTotalPage(response?.data?.totalPage);
          setIndicatorCurrentPage(response?.data?.currentPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          const combinedOptions = [...newOptions, ...indicatorOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setIndicatorOptions(uniqueOptions);
        }
      }
      fetchData();
    }
  }, [watchSkill, indicatorCurrentPage]);

  const handleCareerSelectChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value);
  };

  const handleGradeChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value, { shouldDirty: true });
  };

  const handleCourseChange = (data, e) => {
    setSelectedCourse(data);
    setValue("course", data?.value, { shouldDirty: true });
  };

  const handleUnitChange = (data, e) => {
    setSelectedUnit(data);
    setValue("unit", data?.value, { shouldDirty: true });
  };

  const handleSkillChange = (data, e) => {
    setSelectedSkill(data);
    setValue("skill", data?.value, { shouldDirty: true });
  };

  const handleIndiactorChange = (data, e) => {
    setSelectedIndicator(data);
    setValue("indicator", data?.value, { shouldDirty: true });
  };

  const handleSearch = useMemo(() => {
    return async searchText => {
      setText(searchText);
      if (searchText === "") {
        return fetchNewData(lessonApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "lesson",
        });
        setData(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        toast.error(err?.response?.data?.errors?.error?.toString() || "Error in searching lesson");
        setData(null);
      } // style={{ marginTop: "2em" }}
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(lessonApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("dashboard_lesson")} ${t("deleted_successfully")}`);
        setTimeout(() => {
          setData(lessons => {
            return lessons.filter(lesson => (lesson.id !== id ? lesson : null));
          });
          fetchNewData(lessonApi.list);
        }, 200);
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("lesson")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickUpdate = toggleModal => data => {
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
          toast.success(`${t("dashboard_lesson")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error(`${t("error_in_updating")} ${t("lesson")}`));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
    }
    pushUpdate();
  };

  useEffect(() => {
    handleClick(state);
  }, []);

  const handleCheckChage = e => {
    const { value, checked } = e.target;
    checked
      ? setCheckedLessons([...checkedLessons, value])
      : setCheckedLessons(checkedLessons.filter(e => e !== value));
  };
  const handleLevelSelectChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data.value);
  };

  const handleLessonAssign = async data => {
    try {
      const response = await http.POST(lessonApi.assignLesson, {
        indicator: data?.indicator,
        lessons: checkedLessons,
      });
      if (response?.data?.success || response?.status === 200) {
        toast.success(`${t("lesson")} ${t("assigned_successfully")}`);
        setCheckedLessons([]);
        setShowAssignLessonModal(false);
      }
    } catch (err) {
      toast.error(err?.toString());
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
    setSelectedGrade(null)
  };

  const handleCrossClick = () => {
    setShowAssignLessonModal(!showAssignLessonModal);
    setSelectedCareer([])
    setSelectedCourse([])
  };

  const handleClear = () => {
    setSelectedCourse([]);
    setSelectedCareer([]);
    setSelectedGrade(null);
  };

  if (hasError) {
    toast.error(hasError);
  }
  return (
    <div className="position_drag_drop_lesson">
      <div className="lesson_list_container">
        <div className="lesson_title_search_container">
          <h2>{t("sidebar_lesson")} </h2>
          <div className="d-flex">
            <Search
              removeFilter={removeFilter}
              handleSearch={handleSearch}
              setFilteredData={setData}
              setRemoveFilter={setRemoveFilter}
              setTotalPageNumber={setTotalPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
            />
          </div>
        </div>
        <div className="lesson_list_card">
          {checkedLessons?.length ? (
            <div className="assign_lesson_container">
              {checkedLessons.length} {t("lesson")} {t("selected")}
              <div className="assign_lesson_button">
                <Button
                  type="submit"
                  color="success"
                  buttonName={t("assign_to_indicator")}
                  clickHandler={() => setShowAssignLessonModal(true)}
                  iconName="bx bx-unlink"
                />
              </div>
            </div>
          ) : null}
          <ErrorPages isFetching={loading} data={data} error={hasError} />
          {data &&
            data?.map(item => {
              return (
                <div
                  key={item.id}
                  onClick={event => {
                    handleClick(item);
                    handleSelectedElement(event);
                    setSelectedLessonId(item?.id);
                  }}
                  className="lesson_list"
                  style={{
                    border: `${item.id === selectedID ? "1px solid #0dcaf0" : ""}`,
                  }}
                >
                  <section>
                    <h6 className="lesson_title">
                      <CustomTooltip
                        original={item?.title || item?.name}
                        id={item?.id + Date.now().toString()}
                      />
                    </h6>
                    <p className="lesson_description">
                      <CustomTooltip original={item?.description} id={item?.id} />
                    </p>
                  </section>
                  <section className="lesson_actions">
                    <div
                      onClick={e => e.stopPropagation()}
                      style={{ display: "flex", textAlign: "end" }}
                    >
                      <input
                        type="checkbox"
                        value={item?.id}
                        checked={checkedLessons.includes(item.id)}
                        onChange={handleCheckChage}
                      />
                    </div>
                    <FontAwesomeIcon
                      onClick={e => {
                        e.stopPropagation();
                        setShowEditModal(true);
                        setSelectedLesson(item);
                      }}
                      className="lesson_edit_btn"
                      icon={faEdit as IconProp}
                    />
                    <FontAwesomeIcon
                      onClick={e => {
                        e.stopPropagation();
                        setShowDeleteModal(true);
                        setLessonTitle(item.title);
                        setLessonId(item.id);
                      }}
                      className="lesson_trash_btn"
                      icon={faTrashCan as IconProp}
                    />
                  </section>
                </div>
              );
            })}
        </div>
        {data && data?.length ? (
          <div className="pages_container">
            <Pagination
              currentPageNumber={currentPageNumber}
              totalPageNumber={totalPageNumber}
              handlePageChange={handlePageChange}
            />
          </div>
        ) : null}

        {showAssignLessonModal && (
          <div className="sidebarFilterTotal">
            <div
              className="sidebarFilterOverlay"
              onClick={handleCrossClick}
            ></div>
            <div className="sidebarFilter">
              <div className="sidebarFilterTitle">
                <h1>{t("assign_lesson_to")} {t("dashboard_indicator")}</h1>
                <FontAwesomeIcon
                  icon={faClose}
                  className="cancel_button"
                  onClick={handleCrossClick}
                />
              </div>

              <form onSubmit={handleSubmit(handleLessonAssign)} className="sidebarFilterfilter">
                <div className="assign_select_container">
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
                  <CustomSelect
                    options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                    id="grade"
                    name="grade"
                    disabled={isOptional}
                    label={t("th_grade")}
                    register={register}
                    value={selectedGrade}
                    placeholder={t("placeholder_select_grade")}
                    handleChange={(e, data) => {
                      handleGradeChange(e, data);
                    }}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(gradeTotalPage, gradeCurrentPage, setGradeCurrentPage)
                    }
                  />
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
                  <CustomSelect
                    options={courseOptions}
                    id="course"
                    name="course"
                    label={t("th_course")}
                    register={register}
                    disabled={isOptional ? false : !careerOptions?.length ? !selectedGrade : !selectedCareer}
                    value={selectedCourse}
                    placeholder={t("placeholder_select_course")}
                    handleChange={(e, data) => {
                      handleCourseChange(e, data);
                    }}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(courseTotalPage, courseCurrentPage, setCourseCurrentPage)
                    }
                  />
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
                  <CustomSelect
                    options={unitOptions}
                    id="unit"
                    name="unit"
                    label={t("unit")}
                    disabled={!selectedCourse}
                    register={register}
                    placeholder={t("placeholder_select_unit")}
                    value={selectedUnit}
                    handleChange={(e, data) => {
                      handleUnitChange(e, data);
                    }}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(unitTotalPage, unitCurrentPage, setUnitCurrentPage)
                    }
                  />
                  <CustomSelect
                    options={skillOptions}
                    id="skill"
                    name="skill"
                    label={t("skill")}
                    register={register}
                    placeholder={t("placeholder_select_skill")}
                    value={selectedSkill}
                    disabled={!selectedUnit}
                    handleChange={(e, data) => {
                      handleSkillChange(e, data);
                    }}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(skillTotalPage, skillCurrentPage, setSkillCurrentPage)
                    }
                  />
                  <CustomSelect
                    required
                    options={indicatorOptions}
                    id="indicator"
                    name="indicator"
                    label={t("indicator")}
                    disabled={!selectedSkill}
                    register={register}
                    placeholder={t("placeholder_select_indicator")}
                    value={selectedIndicator}
                    handleChange={(e, data) => {
                      handleIndiactorChange(e, data);
                    }}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(
                        indicatorTotalPage,
                        indicatorCurrentPage,
                        setIndicatorCurrentPage,
                      )
                    }
                  />
                </div>
                <div className="searchButton" style={{ marginTop: "20px" }}>
                  <Button type="submit" color="success" buttonName={t("assign")} />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="content_inside_lesson">
        <AllContentsCard
          id={selectedLessonId}
          title={undefined}
          contents={lessonListContent}
          selectedID={selectedID}
          videoPreview={videoPreview}
          setVideoPreview={setVideoPreview}
          handleVideoClick={handleVideoClick}
          toggleEditContentModal={undefined}
          toggleDeleteContentModal={undefined}
          setDeleteContentData={undefined}
          setUpdateContentData={undefined}
          showAssignContentModal={undefined}
          setShowAssignContentModal={undefined}
          handleClickSubmit={undefined}
          loading={undefined}
        />
      </div>
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
            data: selectedLessson,
            editform: 1,
            handleCancel: () => setShowEditModal(false),
          })}
        </Modal.Body>
      </Modal>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={lessonId}
        name={lessonTitle}
        handleDelete={handleDelete}
      />
      <Modal
        size="lg"
        show={videoPreview}
        onHide={() => setVideoPreview(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{contentDetailLoading ? "Loading..." : ConvertHtmlToPlainText(videoContent?.title?.slice(0, 50))}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modelContent">
          {
            !contentDetailLoading &&
            <> {videoContent &&
              (videoContent?.contentType === "BOOK" ||
                videoContent?.contentType === "SUPPORTFILE") ? (
              <div>
                <div className="bookLevel">
                  {videoContent?.book1 && (
                    <p
                      className={`${(changeBookUrl === videoContent?.book1?.url || !changeBookUrl) &&
                        "bookLevelActive"
                        }`}
                      onClick={() => setChangeBookUrl(videoContent?.book1?.url)}
                    >
                      {t("book")} 1
                    </p>
                  )}
                  {videoContent?.book2 && (
                    <p
                      className={`${changeBookUrl === videoContent?.book2?.url && "bookLevelActive"
                        }`}
                      onClick={() => setChangeBookUrl(videoContent?.book2?.url)}
                    >
                      {t("book")} 2
                    </p>
                  )}
                  {videoContent?.book3 && (
                    <p
                      className={`${changeBookUrl === videoContent?.book3?.url && "bookLevelActive"
                        }`}
                      onClick={() => setChangeBookUrl(videoContent?.book3?.url)}
                    >
                      {t("book")} 3
                    </p>
                  )}
                </div>
                <div className="pdfReaderHeading">
                  <p>{videoContent?.description}</p>
                </div>
                <div className="pdf-viewer">

                  <Viewer fileUrl={changeBookUrl ?? videoContent?.book1?.url} />
                </div>
              </div>
            ) : videoContent?.contentType === "IMAGE" ? (
              <div>
                <img
                  src={videoContent?.file?.url}
                  alt={videoContent?.file?.fileName}
                  width={"100%"}
                />
              </div>
            ) : videoContent?.contentType === "QUESTIONNAIRE" ? (
              <div className="previewModal">
                {videoContent?.questions?.map((ques, index) => {
                  const isCorrect = ques?.answers?.filter(corr => corr.isCorrect == true);
                  return (
                    <div>
                      <h3 className="question_number">
                        {t("question")} {index + 1} {t("of")} {videoContent?.questions?.length}
                      </h3>
                      <p>{ques?.question}</p>
                      <p className="choose_correct">{ques?.type === "TRUEFALSE" ? t("correct_answer") : t("choose_the_correct_answer_below")}:</p>
                      <div className="answers">
                        {ques?.type !== "TRUEFALSE" ? (
                          <>
                            {ques?.answers?.map((ans, ans_index) => {
                              return (
                                <div
                                  className={`${ans?.isCorrect ? "correct_answer" : "answer_index"}`}
                                >
                                  <p>{ans_index + 1}.</p>
                                  <p className="grid-item">{ans?.answer}</p>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <p className={ques?.isTrue ? "trueFalse" : ""}>{ques?.isTrue ? "true" : "false"}</p>
                        )}
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="previewModal">
                <p>{ConvertHtmlToPlainText(videoContent?.description)}</p>
                <ReactPlayer
                  width={"100%"}
                  height={videoContent?.contentType === "AUDIO" ? "20vh" : "56vh"}
                  controls={true}
                  url={videoContent?.file?.url}
                ></ReactPlayer>
              </div>
            )}</>
          }


          {contentDetailLoading && <>Loading...</>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default withTranslation()(PositionDragDropLesson);

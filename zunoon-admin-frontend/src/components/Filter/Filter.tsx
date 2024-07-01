import { useEffect, useState } from "react";
import "./Filter.scss";
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "../../utils/toast";
import config from "../../config";
import http from "../../utils/http";
import { withTranslation } from "react-i18next";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { ICourse } from "../../@types/course";
import { optionType } from "../../@types/option";
import ToggleButton from "../ToggleButton/ToggleButton";
import { IFilter } from "../../@types/searchFilter";
import { handleInfiniteScroll } from "../../utils/handleInfiniteScroll";

const gradeCategoryApi = config.endpoints.api.gradeCategory;
const gradeApi = config.endpoints.api.grade;
const courseApi = config.endpoints.api.course;
const careerApi = config.endpoints.api.career;
const unitApi = config.endpoints.api.unit;
const skillApi = config.endpoints.api.skill;
const indicatorApi = config.endpoints.api.indicator;
const lessonApi = config.endpoints.api.lesson;

const Filter = ({
  t,
  isSchoolAssignCoursePath,
  isCoursePath,
  isUnitPath,
  isSkillPath,
  isIndicatorPath,
  isLessonPath,
  setFilteredData,
  setTotalPageNumber,
  setCurrentPageNumber,
  setFilteredGrade,
  setFilteredCareer,
  setRemoveFilter,
  setWatchValue,
}: IFilter) => {
  const validationSchema = z.object({
    gradeCategory: z.any(),
    grade: z.any(),
    career: z.any(),
    isOptional: z.boolean(),
    course: z.string(),
    unit: z.string(),
    skill: z.string(),
    indicator: z.string(),
    level: z.string(),
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();

  const [noLevel, setNoLevel] = useState<boolean>(false);

  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);

  const [gradeCategoryData, setGradeCategoryData] = useState([]);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<optionType | null>();
  const [gradeCategoryCurrentPage, setGradeCategoryCurrentPage] = useState(1);
  const [gradeCategoryTotalPage, setGradeCategoryTotalPage] = useState(0);
  const [gradeCategoryOptions, setGradeCategoryOptions] = useState<optionType[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);

  const [selectedCareer, setSelectedCareer] = useState<optionType | null>();

  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);
  const [noCareer, setNoCareer] = useState<boolean>(false);

  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [courseOptional, setCourseOptional] = useState<boolean>(false);
  const [courseOptionalFilter, setCourseOptionalFilter] = useState<boolean>(false);

  const [selectedUnit, setSelectedUnit] = useState<optionType | null>();
  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);

  const [selectedSkill, setSelectedSkill] = useState<optionType | null>();
  const [skillCurrentPage, setSkillCurrentPage] = useState(1);
  const [skillTotalPage, setSkillTotalPage] = useState(0);
  const [skillOptions, setSkillOptions] = useState<optionType[]>([]);

  const [selectedIndicator, setSelectedIndicator] = useState<optionType | null>();
  const [indicatorCurrentPage, setindicatorCurrentPage] = useState(1);
  const [indicatorTotalPage, setIndicatorTotalPage] = useState(0);
  const [indicatorOptions, setIndicatorOptions] = useState<optionType[]>([]);

  const showGradeCategory =
    isSchoolAssignCoursePath ||
    isCoursePath ||
    isUnitPath ||
    isSkillPath ||
    isIndicatorPath ||
    isLessonPath;
  const showGrade =
    isSchoolAssignCoursePath ||
    isCoursePath ||
    isUnitPath ||
    isSkillPath ||
    isIndicatorPath ||
    isLessonPath;
  const showCareer =
    isSchoolAssignCoursePath ||
    isCoursePath ||
    isUnitPath ||
    isSkillPath ||
    isIndicatorPath ||
    isLessonPath;
  const showCourse = isUnitPath || isSkillPath || isIndicatorPath || isLessonPath;
  const showCourseLevel = isUnitPath || isSkillPath || isLessonPath || isIndicatorPath;
  const showUnit = isSkillPath || isIndicatorPath || isLessonPath;
  const showSkill = isIndicatorPath || isLessonPath;
  const showIndicator = isLessonPath;
  const showButtons =
    isSchoolAssignCoursePath ||
    isCoursePath ||
    isUnitPath ||
    isSkillPath ||
    isIndicatorPath ||
    isLessonPath;

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(validationSchema),
  });

  const watchGradeCategory = watch("gradeCategory");
  const watchGrade = watch("grade");
  const watchCareer = watch("career");
  const watchIndicator = watch("indicator");
  const watchCourse = watch("course");
  const watchUnit = watch("unit");
  const watchSkill = watch("skill");
  const watchLevel = watch("level");

  useEffect(() => {
    if (isSchoolAssignCoursePath && watch("grade")) {
      setWatchValue(watch("grade"));
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (showGradeCategory) {
      async function getGradeCategoryData() {
        try {
          const gradeCategoryResponse = await http.GET(
            `${gradeCategoryApi.list}?page=${gradeCategoryCurrentPage}`,
            "",
          );
          setGradeCategoryTotalPage(gradeCategoryResponse?.data?.totalPage);
          setGradeCategoryCurrentPage(gradeCategoryResponse?.data?.currentPage);
          const combinedGradeCategoryData = [
            ...gradeCategoryData,
            ...gradeCategoryResponse?.data?.data,
          ];
          const uniqueGradeCategoryData = Array.from(
            new Set(combinedGradeCategoryData.map(item => item?.id)),
          ).map(value => combinedGradeCategoryData.find(option => option?.id === value));
          setGradeCategoryData(uniqueGradeCategoryData);
          const newOptions = convertToOptions(gradeCategoryResponse?.data?.data) || [];
          const combinedOptions = [...gradeCategoryOptions, ...newOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setGradeCategoryOptions(uniqueOptions);
          if (watchGradeCategory !== undefined && selectedGradeCategory !== null) {
            const filteredGradeData =
              gradeCategoryData &&
              gradeCategoryData?.filter(item => item.id === watchGradeCategory && item?.grades);
            const gradeData = filteredGradeData?.[0]?.grades;
            const gradeOptions = convertToOptions(gradeData);
            setGradeOptions(gradeOptions);
          } else {
            const gradeResponse = await http.GET(`${gradeApi.list}?page=${gradeCurrentPage}`, "");
            setGradeTotalPage(gradeResponse?.data?.totalPage);
            setGradeCurrentPage(gradeResponse?.data?.currentPage);
            const newOptions = convertToOptions(gradeResponse?.data?.data);
            const combinedOptions = [...gradeOptions, ...newOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setGradeOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err?.toString());
        }
      }
      getGradeCategoryData();
    }
    setSelectedGrade(null);
    setSelectedCareer(null);
    setSelectedCourse(null);
    setSelectedUnit(null);
    setSelectedSkill(null);
    setSelectedIndicator(null);
  }, [watchGradeCategory, gradeCategoryCurrentPage, gradeCurrentPage]);

  useEffect(() => {
    setNoCareer(false);
    if (showCareer) {
      async function getCareerData() {
        if (watchGrade !== undefined && selectedGrade !== null) {
          const careerResponse = await http.GET(
            `${careerApi.careerByGrade(watchGrade)}?page=${careerCurrentPage}`,
            "",
          );
          !careerResponse?.data?.data && setNoCareer(true);
          setCareerTotalPage(careerResponse?.data?.totalPage);
          setCareerCurrentPage(careerResponse?.data?.currentPage);
          const careerOptions = convertToOptions(careerResponse?.data?.data) || [];
          setCareerOptions(careerOptions);
        } else {
          const response = await http.GET(`${careerApi.list}?page=${careerCurrentPage}`, "");
          setCareerTotalPage(response?.data?.totalPage);
          setCareerCurrentPage(response?.data?.currentPage);
          const newOptions = response?.data?.data ? convertToOptions(response?.data?.data) : [];
          const combinedOptions = [...careerOptions, ...newOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setCareerOptions(uniqueOptions);
        }
      }
      getCareerData();
    }
    setSelectedCareer(null);
    setSelectedCourse(null);
    setSelectedUnit(null);
    setSelectedSkill(null);
    setSelectedIndicator(null);
  }, [watchGrade, careerCurrentPage]);

  useEffect(() => {
    if (showCourse) {
      async function getCourseData() {
        try {
          if (courseOptional) {
            const courseResponse = await http.GET(
              `${courseApi.list}?isOptional=${courseOptional}&page=${courseCurrentPage}`,
              "",
            );
            setCourseTotalPage(courseResponse?.data?.totalPage);
            setCourseCurrentPage(courseResponse?.data?.currentPage);

            const newOptions = convertToOptions(courseResponse?.data?.data) || [];
            // const combinedOptions = [...newOptions, ...courseOptions];
            // const uniqueOptions = Array.from(
            //   new Set(combinedOptions.map(option => option.value)),
            // ).map(value => combinedOptions.find(option => option.value === value));
            setCourseOptions(newOptions);
          } else if (watchCareer) {
            const response = await http.GET(`${courseApi.listByCareer(watchCareer)}?page=${1}`, "");
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            if (response?.data?.data) {
              const courseData = response?.data?.data;
              setCourses(courseData);
              const options = convertToOptions(courseData);
              setCourseOptions(options);
            } else {
              setCourses([]);
              setCourseOptions([]);
            }
            setCourseOptions(newOptions);
          } else if (!watchCareer && watchGrade) {
            const response = await http.GET(`${courseApi.listByGrade(watchGrade)}?page=${1}`, "");
            if (response?.data?.data) {
              const courseData = response?.data?.data;
              setCourses(courseData);
              const options = convertToOptions(courseData);
              setCourseOptions(options);
            } else {
              setCourses([]);
              setCourseOptions([]);
            }
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          } else {
            const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}`, "");
            if (response?.data?.data) {
              const courseData = response?.data?.data;
              setCourses(courseData);
              const options = convertToOptions(courseData);
              setCourseOptions(options);
            } else {
              setCourses([]);
              setCourseOptions([]);
            }
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const combinedOptions = [...courseOptions, ...newOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setCourseOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getCourseData();
    }
    setSelectedCourse(null);
    setSelectedUnit(null);
    setSelectedSkill(null);
    setSelectedIndicator(null);
  }, [watchGrade, watchCareer, courseOptional, courseCurrentPage]);

  useEffect(() => {
    if (courseOptional) {
      setSelectedGradeCategory(null);
      setSelectedGrade(null);
      setSelectedCareer(null);
      setValue("gradeCategory", null);
      setValue("grade", null);
      setValue("career", null);
    }
  }, [courseOptional]);

  useEffect(() => {
    if (selectedCourse) {
      if (courses?.[0]?.levels) {
        setNoLevel(false);
        const levels = courses?.[0]?.levels;
        setLevelOptions(
          levels.map(each => {
            return {
              label: each.name,
              value: each.id,
            };
          }),
        );
      }
    } else {
      setNoLevel(true);
      setSelectedLevel(null);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (showUnit) {
      async function getUnitData() {
        if (watchCourse) {
          const response = await http.GET(`${unitApi.listByCourse(watchCourse)}?page=${1}`, "");
          setUnitCurrentPage(response?.data?.currentPage);
          setUnitTotalPage(response?.data?.totalPage);
          const levelData = response?.data?.data?.filter(item => {
            return item?.level === selectedLevel?.label;
          });
          const newUintOptions = convertToOptions(levelData) || [];
          const newOptions = convertToOptions(response?.data?.data) || [];
          setUnitOptions(selectedLevel ? newUintOptions : newOptions);
        } else {
          const response = await http.GET(`${unitApi.list}?page=${unitCurrentPage}`, "");
          setUnitCurrentPage(response?.data?.currentPage);
          setUnitTotalPage(response?.data?.totalPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          const combinedOptions = [...unitOptions, ...newOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setUnitOptions(uniqueOptions);
        }
      }
      getUnitData();
    }
    setSelectedUnit(null);
    setSelectedSkill(null);
    setSelectedIndicator(null);
  }, [watchCourse, unitCurrentPage, selectedLevel]);

  useEffect(() => {
    if (showSkill) {
      async function getSkillData() {
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
          const combinedOptions = [...skillOptions, ...newOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setSkillOptions(uniqueOptions);
        }
      }
      getSkillData();
    }
    setSelectedSkill(null);
    setSelectedIndicator(null);
  }, [watchUnit, skillCurrentPage]);

  useEffect(() => {
    if (showIndicator) {
      async function getIndicatorData() {
        if (watchSkill) {
          const response = await http.GET(
            `${indicatorApi.listBySkill(watchSkill)}?page=${indicatorCurrentPage}`,
            "",
          );
          setIndicatorTotalPage(response?.data?.totalPage);
          setindicatorCurrentPage(response?.data?.currentPage);
          const indicatorOptions = convertToOptions(response?.data?.data);
          setIndicatorOptions(indicatorOptions);
        } else {
          const response = await http.GET(`${indicatorApi.list}?page=${indicatorCurrentPage}`, "");
          setIndicatorTotalPage(response?.data?.totalPage);
          setindicatorCurrentPage(response?.data?.currentPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          const combinedOptions = [...indicatorOptions, ...newOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setIndicatorOptions(uniqueOptions);
        }
      }
      getIndicatorData();
    }
    setSelectedIndicator(null);
  }, [watchSkill, indicatorCurrentPage]);

  const handleFilter = async () => {
    setRemoveFilter?.(true);
    setIsSubmitted(true);
    if ((isCoursePath || isSchoolAssignCoursePath) && watchGrade && (!watchCareer || noCareer)) {
      const courseResponse = await http.GET(courseApi.listByGrade(watchGrade), "");
      setFilteredData?.(courseResponse?.data?.data ?? null);
      setTotalPageNumber?.(courseResponse?.data?.totalPage);
      setCurrentPageNumber?.(courseResponse?.data?.currentPage);
    } else if ((isCoursePath || isSchoolAssignCoursePath) && watchCareer && watchGrade) {
      const courseResponse = await http.GET(courseApi.listByCareer(watchCareer), "");
      setFilteredData?.(courseResponse?.data?.data ?? null);
      setTotalPageNumber?.(courseResponse?.data?.totalPage);
      setCurrentPageNumber?.(courseResponse?.data?.currentPage);
    } else if ((isCoursePath || isSchoolAssignCoursePath) && courseOptionalFilter) {
      const courseResponse = await http.GET(courseApi.listbyIsOptional(courseOptionalFilter), "");
      setFilteredData?.(courseResponse?.data?.data ?? null);
      setTotalPageNumber?.(courseResponse?.data?.totalPage);
      setCurrentPageNumber?.(courseResponse?.data?.currentPage);
    } else if (isUnitPath && watchCourse) {
      const unitResponse = await http.GET(unitApi.listByCourse(watchCourse), "");
      setFilteredData(unitResponse?.data?.data ?? null);
      setTotalPageNumber?.(unitResponse?.data?.totalPage);
      setCurrentPageNumber(unitResponse?.data?.currentPage);
    } else if (isSkillPath && watchUnit) {
      const skillResponse = await http.GET(skillApi.listByUnit(watchUnit), "");
      setFilteredData(skillResponse?.data?.data ?? null);
      setTotalPageNumber(skillResponse?.data?.totalPage);
      setCurrentPageNumber(skillResponse?.data?.currentPage);
    } else if (isIndicatorPath && watchSkill) {
      const indicatorResponse = await http.GET(indicatorApi.listBySkill(watchSkill), "");
      setFilteredData(indicatorResponse?.data?.data ?? null);
      setTotalPageNumber(indicatorResponse?.data?.totalPage);
      setCurrentPageNumber(indicatorResponse?.data?.currentPage);
    } else if (isLessonPath && watchIndicator) {
      const lessonResponse = await http.GET(lessonApi.listByIndicator(watchIndicator), "");
      setFilteredData(lessonResponse?.data?.data ?? null);
      setTotalPageNumber(lessonResponse?.data?.totalPage);
      setCurrentPageNumber(lessonResponse?.data?.currentPage);
    }
  };

  useEffect(() => {
    setFilteredGrade && setFilteredGrade(watchGrade);
    setFilteredCareer && setFilteredCareer(watchCareer);
  }, [watchGrade, watchCareer]);

  const handleGradeCategoryChange = (data, e) => {
    setGradeCurrentPage(1);
    setSelectedGradeCategory(data);
    setValue("gradeCategory", data?.value, { shouldDirty: true });
  };

  const handleGradeChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value, { shouldDirty: true });
  };

  const handleCareerChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value, { shouldDirty: true });
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

  const handleLevelChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data?.value, { shouldDirty: true });
  };

  const handleReset = () => {
    setSelectedGradeCategory(null);
    setSelectedGrade(null);
    setSelectedCareer(null);
    setSelectedCourse(null);
    setSelectedIndicator(null);
    setSelectedSkill(null);
    setSelectedUnit(null);
    setSelectedLevel(null);
    setValue("gradeCategory", null);
    setValue("grade", null);
    setValue("career", null);
    setValue("course", null);
    setValue("indicator", null);
    setValue("skill", null);
    setValue("unit", null);
    setValue("level", null);
  };

  return (
    <form className="sidebarFilterfilter">

      {isCoursePath && (
        <div className="toggle_course_optional">
          <label htmlFor="isOptional">{t("optional")}</label>
          <ToggleButton
            value={courseOptionalFilter}
            handleChange={() => {
              setCourseOptionalFilter(!courseOptionalFilter);
            }}
          />
        </div>
      )}
      {showGradeCategory && (
        <div className="grade_category_select">
          <CustomSelect
            id="gradeCategory"
            name="gradeCategory"
            label={t("th_grade_category")}
            register={register}
            value={selectedGradeCategory}
            placeholder={t("select_grade_category")}
            handleChange={(e, data) => {
              handleGradeCategoryChange(e, data);
            }}
            options={gradeCategoryOptions}
            disabled={courseOptional || courseOptionalFilter}
            onMenuScrollToBottom={() =>
              handleInfiniteScroll(
                gradeCategoryTotalPage,
                gradeCategoryCurrentPage,
                setGradeCategoryCurrentPage,
              )
            }
          />
        </div>
      )}
      {showGrade && (
        <div className="grade_select">
          <CustomSelect
            id="grade"
            name="grade"
            label={t("th_grade")}
            placeholder={t("select_grade")}
            register={register}
            value={selectedGrade}
            handleChange={(e, data) => {
              handleGradeChange(e, data);
            }}
            options={gradeOptions}
            disabled={courseOptional || !selectedGradeCategory}
            onMenuScrollToBottom={() =>
              handleInfiniteScroll(gradeTotalPage, gradeCurrentPage, setGradeCurrentPage)
            }
          />
          {isCoursePath && isSubmitted && !selectedGrade && !courseOptionalFilter && <p>{t("field_required")}</p>}

        </div>
      )
      }
      {
        showCareer && (
          <div className="career_select">
            <CustomSelect
              id="career"
              register={register}
              name="career"
              label={t("th_career")}
              value={selectedCareer}
              placeholder={noCareer ? t("selected_grade_has_no_career") : t("select_a_career")}
              handleChange={(e, data) => {
                handleCareerChange(e, data);
              }}
              options={careerOptions}
              disabled={courseOptional || noCareer || !selectedGrade}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(careerTotalPage, careerCurrentPage, setCareerCurrentPage)
              }
            />
          </div>
        )
      }
      {
        showCourse && (
          <div className="toggle_course_optional">
            <label htmlFor="isOptional">{t("optional")}</label>
            <ToggleButton
              value={courseOptional}
              handleChange={() => {
                setCourseOptional(!courseOptional);
                setValue("isOptional", courseOptional);
              }}
            />
          </div>
        )
      }
      {
        showCourse && (
          <div className="course_select">
            <CustomSelect
              id="course"
              register={register}
              placeholder={t("select_a_course")}
              name="course"
              label={t("th_course")}
              disabled={!courseOptional && !noCareer && !selectedCareer}
              value={selectedCourse}
              handleChange={(e, data) => {
                handleCourseChange(e, data);
              }}
              options={courseOptions}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(courseTotalPage, courseCurrentPage, setCourseCurrentPage)
              }
            />
            {isUnitPath && isSubmitted && !selectedCourse && <p>{t("field_required")}</p>}
          </div>
        )
      }
      {
        showCourseLevel && (
          <div className="level_select">
            <CustomSelect
              id="level"
              disabled={noLevel}
              register={register}
              placeholder={`${t("select")} ${t("th_course_level")}`}
              name="level"
              label={t("th_course_level")}
              value={selectedLevel}
              handleChange={(e, data) => {
                handleLevelChange(e, data);
              }}
              options={levelOptions}
            />
            {errors?.level?.type === "required" && <p>{t("field_required")}</p>}
          </div>
        )
      }
      {
        showUnit && (
          <div className="unit_select">
            <CustomSelect
              id="unit"
              register={register}
              name="unit"
              label={t("th_unit")}
              placeholder={t("select_a_unit")}
              value={selectedUnit}
              handleChange={(e, data) => {
                handleUnitChange(e, data);
              }}
              disabled={!selectedCourse}
              options={unitOptions}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(unitTotalPage, unitCurrentPage, setUnitCurrentPage)
              }
            />
            {isSkillPath && !selectedUnit && isSubmitted && <p>{t("field_required")}</p>}
          </div>
        )
      }
      {
        showSkill && (
          <div className="skill_select">
            <CustomSelect
              id="skill"
              register={register}
              name="skill"
              label={t("th_skill")}
              placeholder={t("select_a_skill")}
              value={selectedSkill}
              handleChange={(e, data) => {
                handleSkillChange(e, data);
              }}
              disabled={!selectedUnit}
              options={skillOptions}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(skillTotalPage, skillCurrentPage, setSkillCurrentPage)
              }
            />
            {isIndicatorPath && !selectedSkill && isSubmitted && <p>{t("field_required")}</p>}
          </div>
        )
      }
      {
        showIndicator && (
          <div className="indicator_select">
            <CustomSelect
              id="indicator"
              register={register}
              name="indicator"
              label={t("th_indicator")}
              disabled={!selectedSkill}
              placeholder={t("select_a_indicator")}
              value={selectedIndicator}
              handleChange={(e, data) => {
                handleIndiactorChange(e, data);
              }}
              options={indicatorOptions}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(
                  indicatorTotalPage,
                  indicatorCurrentPage,
                  setindicatorCurrentPage,
                )
              }
            />
            {!selectedIndicator && isSubmitted && <p>{t("field_required")}</p>}
          </div>
        )
      }
      {
        showButtons && (
          <div className="filter_button" style={{ marginTop: "20px" }}>
            <Button type="reset" color="danger" buttonName={t("reset")} clickHandler={handleReset} />
            <Button
              type="submit"
              color="success"
              buttonName={t("filter")}
              clickHandler={e => {
                e.preventDefault();
                handleFilter();
              }}
            />
          </div>
        )
      }
    </form >
  );
};

export default withTranslation()(Filter);

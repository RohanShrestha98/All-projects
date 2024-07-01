import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "../../../../utils/toast";
import config from "../../../../config";
import http from "../../../../utils/http";
import { withTranslation } from "react-i18next";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import { ICourse } from "../../../../@types/course";
import { optionType } from "../../../../@types/option";
import { handleInfiniteScroll } from "../../../../utils/handleInfiniteScroll";

const validationSchema = z.object({
  lesson: z.string(),
  grade: z.string().optional(),
  career: z.string().optional(),
  indicator: z.string().optional(),
  course: z.string().optional(),
  unit: z.string().optional(),
  skill: z.string().optional(),
  level: z.string().optional(),
});

const gradeApi = config.endpoints.api.grade;
const courseApi = config.endpoints.api.course;
const careerApi = config.endpoints.api.career;
const unitApi = config.endpoints.api.unit;
const skillApi = config.endpoints.api.skill;
const indicatorApi = config.endpoints.api.indicator;
const lessonApi = config.endpoints.api.lesson;
const basketApi = config.endpoints.api.basket;

const AssignLessonForm = ({ basketId, t, setOverlayOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();
  const [noCareer, setNoCareer] = useState<boolean>(false);
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);

  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);

  const [selectedCareer, setSelectedCareer] = useState<optionType>();
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);

  const [selectedUnit, setSelectedUnit] = useState<optionType>();
  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);

  const [selectedSkill, setSelectedSkill] = useState<optionType>();
  const [skillCurrentPage, setSkillCurrentPage] = useState(1);
  const [skillTotalPage, setSkillTotalPage] = useState(0);
  const [skillOptions, setSkillOptions] = useState<optionType[]>([]);

  const [selectedIndicator, setSelectedIndicator] = useState<optionType>();
  const [indicatorCurrentPage, setIndicatorCurrentPage] = useState(1);
  const [indicatorTotalPage, setIndicatorTotalPage] = useState(0);
  const [indicatorOptions, setIndicatorOptions] = useState<optionType[]>([]);

  const [selectedLesson, setSelectedLesson] = useState<optionType>();
  const [lessonCurrentPage, setLessonCurrentPage] = useState(1);
  const [lessonTotalPage, setLessonTotalPage] = useState(0);
  const [lessonOptions, setLessonOptions] = useState<optionType[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      grade: "",
      career: "",
      course: [],
      unit: "",
      skill: "",
      indicator: "",
      level: "",
      lesson: "",
    },
  });

  const watchGrade = watch("grade");
  const watchCareer = watch("career");
  const watchIndicator = watch("indicator");
  const watchCourse = watch("course");
  const watchUnit = watch("unit");
  const watchSkill = watch("skill");
  const watchLevel = watch("level");
  const watchLesson = watch("lesson");

  const onSubmit = () => {
    const formData = {
      basketID: basketId,
      lessonID: watchLesson,
    };
    http
      .POST(basketApi.assignToLesson, formData)
      .then(res => {
        toast.success("Basket assigned to lesson successfully");
        setOverlayOpen(false);
      })
      .catch(error => {
        toast.error(error?.response?.data?.errors?.error?.toString() || error?.message?.toString());
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
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
  }, [gradeCurrentPage]);

  useEffect(() => {
    setSelectedCareer(null);
    setValue("career", undefined);
    setSelectedCourse(null);
    setValue("course", undefined);
    setNoCareer(false);

    async function fetchData() {
      if (watchGrade) {
        const response = await http.GET(
          `${careerApi.careerByGrade(watchGrade)}?page=${careerCurrentPage}`,
          "",
        );
        setCareerTotalPage(response?.data?.totalPage);
        setCareerCurrentPage(response?.data?.currentPage);
        const careerOptions = response?.data?.data ? convertToOptions(response?.data?.data) : [];
        setCareerOptions(careerOptions);
        !response.data?.data && setNoCareer(true);
      } else {
        const response = await http.GET(`${careerApi.list}?page=${careerCurrentPage}`, "");
        setCareerTotalPage(response?.data?.totalPage);
        setCareerCurrentPage(response?.data?.currentPage);
        const newOptions = response?.data?.data ? convertToOptions(response?.data?.data) : [];
        const combinedOptions = [...newOptions, ...careerOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setCareerOptions(uniqueOptions);
      }
    }
    fetchData();
  }, [watchGrade, careerCurrentPage]);

  useEffect(() => {
    setSelectedCourse(null);
    setValue("course", undefined);

    async function getCourses() {
      try {
        if (watchCareer) {
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
  }, [watchGrade, watchCareer, courseCurrentPage]);

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

    async function getUnits() {
      try {
        if (watchCourse !== undefined && selectedCourse) {
          const response = await http.GET(
            `${unitApi.listByCourse(watchCourse)}?page=${unitCurrentPage}`,
            "",
          );
          const levelData = response?.data?.data?.filter(item => {
            return item?.level === selectedLevel?.label;
          });
          setUnitCurrentPage(response?.data?.currentPage);
          setUnitTotalPage(response?.data?.totalPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          const newUnitOptions = convertToOptions(levelData) || [];
          setUnitOptions(selectedLevel ? newUnitOptions : newOptions);
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
  }, [watchCourse, unitCurrentPage, selectedLevel]);

  useEffect(() => {
    setSelectedSkill(null);
    setValue("skill", undefined);

    async function fetchData() {
      if (watchUnit) {
        const response = await http.GET(
          `${skillApi.listByUnit(watchUnit)}?page=${skillCurrentPage}`,
          "",
        );
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
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setSkillOptions(uniqueOptions);
      }
    }
    fetchData();
  }, [watchUnit, skillCurrentPage]);

  useEffect(() => {
    setSelectedIndicator(null);
    setValue("indicator", undefined);
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
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setIndicatorOptions(uniqueOptions);
      }
    }
    fetchData();
  }, [watchSkill, indicatorCurrentPage]);

  useEffect(() => {
    setSelectedLesson(null);
    setValue("lesson", undefined);
    async function fetchData() {
      if (watchIndicator) {
        const response = await http.GET(
          `${lessonApi.listByIndicator(watchIndicator)}?page=${lessonCurrentPage}`,
          "",
        );
        if (response?.data?.data) {
          setLessonTotalPage(response?.data?.totalPage);
          setLessonCurrentPage(response?.data?.currentPage);
          const lessonOptions = convertToOptions(response?.data?.data);
          setLessonOptions(lessonOptions);
        } else {
          const response = await http.GET(`${lessonApi.list}?page=${lessonCurrentPage}`, "");
          setLessonTotalPage(response?.data?.totalPage);
          setLessonCurrentPage(response?.data?.currentPage);
          const newOptions = convertToOptions(response?.data?.data) || [];
          const combinedOptions = [...newOptions, ...lessonOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map(option => option.value)),
          ).map(value => combinedOptions.find(option => option.value === value));
          setLessonOptions(uniqueOptions);
        }
      } else {
        const response = await http.GET(`${lessonApi.list}?page=${lessonCurrentPage}`, "");
        setLessonTotalPage(response?.data?.totalPage);
        setLessonCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        const combinedOptions = [...newOptions, ...lessonOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value)))?.map(
          value => combinedOptions.find(option => option.value === value),
        );
        setLessonOptions(uniqueOptions);
      }
    }
    fetchData();
  }, [watchIndicator, lessonCurrentPage]);

  const handleGradeChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value, { shouldDirty: true });
    setCareerCurrentPage(1);
    setCourseCurrentPage(1);
  };

  const handleCareerChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value, { shouldDirty: true });
    setCourseCurrentPage(1);
  };

  const handleCourseChange = (data, e) => {
    setSelectedCourse(data);
    setValue("course", data?.value, { shouldDirty: true });
    setUnitCurrentPage(1);
  };

  const handleUnitChange = (data, e) => {
    setSelectedUnit(data);
    setValue("unit", data?.value, { shouldDirty: true });
    setSkillCurrentPage(1);
  };

  const handleSkillChange = (data, e) => {
    setSelectedSkill(data);
    setValue("skill", data?.value, { shouldDirty: true });
    setIndicatorCurrentPage(1);
  };

  const handleIndiactorChange = (data, e) => {
    setSelectedIndicator(data);
    setValue("indicator", data?.value, { shouldDirty: true });
    setLessonCurrentPage(1);
  };

  const handleLevelChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data?.value, { shouldDirty: true });
  };

  const handleLessonChange = (data, e) => {
    setSelectedLesson(data);
    setValue("lesson", data?.value, { shouldDirty: true });
  };

  const handleReset = () => {
    setSelectedGrade(null);
    setSelectedCareer(null);
    setSelectedCourse(null);
    setSelectedIndicator(null);
    setSelectedSkill(null);
    setSelectedUnit(null);
    setSelectedLevel(null);
    setSelectedLesson(null);
    setValue("grade", null);
    setValue("career", null);
    setValue("course", null);
    setValue("indicator", null);
    setValue("skill", null);
    setValue("unit", null);
    setValue("level", null);
    setValue("lesson", null);
  };

  return (
    <div className="sidebarFilterfilter">
      <form className="course-form-container">
        <div className="col-container">
          <div className="fieldAndValidate">
            <div className="toggle_option_level">
              <div className="grade_select">
                <CustomSelect
                  id="grade"
                  name="grade"
                  label={t("th_grade")}
                  register={register}
                  value={selectedGrade}
                  placeholder={t("select_a_grade")}
                  handleChange={(e, data) => {
                    handleGradeChange(e, data);
                  }}
                  options={gradeOptions}
                  onMenuScrollToBottom={() =>
                    handleInfiniteScroll(gradeTotalPage, gradeCurrentPage, setGradeCurrentPage)
                  }
                />
              </div>
              <div className="career_select">
                <CustomSelect
                  id="career"
                  register={register}
                  name="career"
                  label={t("th_career")}
                  value={selectedCareer}
                  disabled={noCareer || !selectedGrade}
                  placeholder={noCareer ? "Selected grade has no career" : t("select_a_career")}
                  handleChange={(e, data) => {
                    handleCareerChange(e, data);
                  }}
                  options={careerOptions}
                  onMenuScrollToBottom={() =>
                    handleInfiniteScroll(careerTotalPage, careerCurrentPage, setCareerCurrentPage)
                  }
                />
                {errors?.course?.type === "required" && <p>{t("field_required")}</p>}
              </div>
              <div className="course_select">
                <CustomSelect
                  options={courseOptions}
                  id="course"
                  name="course"
                  label={t("th_course")}
                  disabled={!noCareer && !selectedCareer}
                  register={register}
                  value={selectedCourse}
                  placeholder={t("select_a_course")}
                  handleChange={(e, data) => {
                    handleCourseChange(e, data);
                  }}
                  onMenuScrollToBottom={() =>
                    handleInfiniteScroll(courseTotalPage, courseCurrentPage, setCourseCurrentPage)
                  }
                />
              </div>
            </div>
            <div className="toggle_option_level">
              <CustomSelect
                label={t("level")}
                id="level"
                // required={!noCareer}
                disabled={noLevel}
                register={register}
                placeholder={noLevel ? t("selected_course_has_no_level") : t("select_a_level")}
                name="level"
                value={selectedLevel}
                handleChange={(e, data) => {
                  handleLevelChange(e, data);
                }}
                options={levelOptions}
              />
              {errors?.level?.type === "required" && <p>{t("field_required")}</p>}
            </div>
            <div className="toggle_option_level">
              <div className="unit_select">
                <CustomSelect
                  id="unit"
                  register={register}
                  name="unit"
                  label={t("unit")}
                  disabled={!selectedCourse}
                  placeholder={t("select_a_unit")}
                  value={selectedUnit}
                  handleChange={(e, data) => {
                    handleUnitChange(e, data);
                  }}
                  options={unitOptions}
                  onMenuScrollToBottom={() =>
                    handleInfiniteScroll(unitTotalPage, unitCurrentPage, setUnitCurrentPage)
                  }
                />
              </div>
              <div className="skill_select">
                <CustomSelect
                  id="skill"
                  register={register}
                  name="skill"
                  label={t("skill")}
                  placeholder={t("select_a_skill")}
                  value={selectedSkill}
                  disabled={!selectedUnit}
                  handleChange={(e, data) => {
                    handleSkillChange(e, data);
                  }}
                  options={skillOptions}
                  onMenuScrollToBottom={() =>
                    handleInfiniteScroll(skillTotalPage, skillCurrentPage, setSkillCurrentPage)
                  }
                />
              </div>
              <div className="indicator_select">
                <CustomSelect
                  id="indicator"
                  register={register}
                  name="indicator"
                  label={t("indicator")}
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
                      setIndicatorCurrentPage,
                    )
                  }
                />
              </div>
              <div className="lesson_select">
                <CustomSelect
                  id="lesson"
                  register={register}
                  name="lesson"
                  disabled={!selectedIndicator}
                  label={t("lesson")}
                  placeholder={t("select_a_lesson")}
                  value={selectedLesson}
                  handleChange={(e, data) => {
                    handleLessonChange(e, data);
                  }}
                  options={lessonOptions}
                  onMenuScrollToBottom={() =>
                    handleInfiniteScroll(lessonTotalPage, lessonCurrentPage, setLessonCurrentPage)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-5">
          <Button type="reset" color="danger" buttonName={t("clear")} clickHandler={handleReset} />
          <Button
            clickHandler={handleSubmit(onSubmit)}
            type="submit"
            color="success"
            disabled={isSubmitting ? true : false}
            style={{ margin: "100px 0px" }}
            buttonName={t("assign")}
          />
        </div>
      </form>
    </div>
  );
};

export default withTranslation()(AssignLessonForm);

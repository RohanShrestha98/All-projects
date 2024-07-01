import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import Textarea from "../../../../components/Textarea/Textarea";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import config from "../../../../config";
import http from "../../../../utils/http";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import "./IndicatorForm.scss";
import { optionType } from "../../../../@types/option";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import { handleInfiniteScroll } from "../../../../utils/handleInfiniteScroll";
import { ICourse } from "../../../../@types/course";
import { IFileUploadResponse } from "../../../../@types/content";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";

const courseApi = config.endpoints.api.course;
const gradeApi = config.endpoints.api.grade;
const careerApi = config.endpoints.api.career;
const unitApi = config.endpoints.api.unit;
const skillApi = config.endpoints.api.skill;
const fileUploadApi = config.endpoints.api.file;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


interface ICareer {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

type PropsType = {
  data?: {
    career: ICareer;
    name: string;
    id: number;
    description: string;
    thumbnail: IFileUploadResponse;
    course: ICourse;
    grade: ICourse;
    skillId: ICourse;
    unit: ICourse;
    level: ICourse;
    isOptional: boolean;
    hasLevel: boolean;
  };
  editform?: boolean | any;
  handleCancel?: Function | any;
  handleClickSubmit?: Function | any;
  handleClickUpdate?: Function | any;
  isSubmitting?: boolean;
  t: Function;
};

const IndicatorForm = ({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  t,
}: PropsType) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    editform ? data?.thumbnail : "",
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<optionType>();
  const [noCareer, setNoCareer] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<optionType>();
  const [selectedUnit, setSelectedUnit] = useState<optionType>();
  const [levelCourses, setLevelCourses] = useState([]);
  const [levelLessCourses, setLevelLessCourses] = useState([]);

  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);

  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);

  const [selectedLevelType, setSelectedLevelType] = useState<optionType>();
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);

  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);

  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();


  const [skillCurrentPage, setSkillCurrentPage] = useState(1);
  const [skillTotalPage, setSkillTotalPage] = useState(0);
  const [skillOptions, setSkillOptions] = useState<optionType[]>([]);

  const {
    reset,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data?.id,
        name: data && data?.name,
        grade: data && data.grade?.id,
        skillId: data && data.skillId,
        career: data && data.career,
        course: data && data.course,
        level: data && data.level?.id,
        thumbnail: data && data?.thumbnail,
        description: data && data?.description,
        unit: data && data.unit,
      },
    },
  );

  const watchGrade = watch("grade");
  const watchCareer = watch("career");
  const watchCourse = watch("course");
  const watchUnit = watch("unit");

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
        }
        else if (!watchCareer && !watchGrade && isOptional) {
          const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}&&isOptional=${true}`, "");
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
  }, [watchGrade, watchCareer, courseCurrentPage, isOptional]);

  useEffect(() => {
    setSelectedLevelType(null);
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
    setSelectedUnit(null);
    setValue("unit", undefined);

    async function getUnits() {
      try {
        if (watchCourse) {
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
  }, [watchCourse, unitCurrentPage, selectedLevel]);

  useEffect(() => {
    setSelectedSkill(null);
    setValue("skillId", undefined);

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

  const handleGradeChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data.value);
    setCareerCurrentPage(1);
    setCourseCurrentPage(1);
  };

  const handleCareerSelectChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value);
    setCourseCurrentPage(1);
  };

  const handleCourseSelectChange = (data, e) => {
    setSelectedCourse(data);
    setValue("course", data.value);
    setUnitCurrentPage(1);
  };

  const handleLevelTypeSelectChange = (data, e) => {
    setSelectedLevelType(data);
  };

  const handleLevelSelectChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data?.value);
  };

  const handleUnitSelectChange = (data, e) => {
    setSelectedUnit(data);
    setValue("unit", data?.value);
    setSkillCurrentPage(1);
  };

  const handleSkillSelectChange = (data, e) => {
    setSelectedSkill(data);
    setValue("skillId", data?.value);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await http.GET(courseApi.list, "");
        const response1 = await http.GET(gradeApi.list, "");
        const response2 = await http.GET(unitApi.list, "");
        const skillResponse = await http.GET(skillApi.list, "");

        const options = convertToOptions(response?.data?.data);
        const options1 = convertToOptions(response1?.data?.data);
        const options2 = convertToOptions(response2?.data?.data);
        const skillOptions = convertToOptions(skillResponse?.data?.data);
        // setGradeOptions(options1);
        // setUnitOptions(options2);
        // setSkillOptions(skillOptions);
        if (editform) {
          const course = options?.find(item => item?.value === data?.course?.id);
          setSelectedCourse(course);
          const grade = options1?.find(item => item?.value === data?.grade?.id);
          setSelectedGrade(grade);
          const unit = options2?.find(item => item?.value === data?.unit?.id);
          setSelectedUnit(unit);
          const skill = skillOptions?.find(item => item?.value === data?.unit?.id);
          setSelectedSkill(skill);
        }
        //@ts-ignore
        setValue("course", data?.course?.id);
        setValue("level", data?.level?.id);
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, [editform, data, setValue]);

  const handleIndicatorThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "indicator",
        type: fileType,
        file: file,
      });
      setIsUploading(false);
      setThumbnailUrl(response?.data?.data);
      setValue("thumbnail", response?.data?.data, { shouldDirty: true });
    } catch (err) {
      toast.error(err?.message?.toString());
      setIsUploading(false);
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
  };

  const handleReset = () => {
    reset();
  };

  const handleClear = () => {
    setSelectedCourse(null);
    setSelectedGrade(null);
    setSelectedUnit(null);
    setThumbnailUrl("");
    handleReset();
    setValue("grade", null);
    setValue("level", null);
  };

  const handleIsOptionalClick = () => {
    setSelectedGradeCategory([]);
    setSelectedCourse(null);
    setSelectedGrade(null);
    setSelectedLevel(null);
  }


  return (
    <form
      className="course-form-container"
      onSubmit={handleSubmit(editform ? handleClickUpdate()(handleCancel) : handleClickSubmit)}
    >
      <div className="row-container">
        <div className="course_image">
          <ImageInput
            image={thumbnailUrl?.url}
            editform={editform}
            setImage={setThumbnailUrl}
            isUploading={isUploading}
            {...register("thumbnail", {
              required: false,
            })}
            onChange={handleIndicatorThumbnailUpload}
          />
        </div>
        <div className="col-container">
          <div className="fieldAndValidate">
            <div className="fieldAndValidate mb-5">
              <InputField
                required
                type="text"
                label={`${t("indicator")} ${t("name")}`}
                placeholder={t("placeholder_indicator_name")}
                {...register("name", {
                  required: true,
                })}
                onKeyUp={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
                watchValue={watch("name")}
              />

              {errors?.name?.type === "required" && <p>{t("field_required")}</p>}
            </div>

            <div className="fieldAndValidate ">
              <Textarea
                rows={5}
                label={t("th_description")}
                placeholder={t("placeholder_indicator_description")}
                {...register("description", {
                  required: true,
                })}
                onChange={e => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
                watchValue={watch("description")}
              />
              {errors?.description?.type === "required" && <p>{t("field_required")}</p>}
            </div>
          </div>
        </div>
        {!editform && (
          <div className="col-container fixFilterOption">
            <div className="fieldAndValidate">
              <div className="toggle_option_level">
                <div className="toggle_field toggle_field_top">
                  <label htmlFor="isOptional">{t("optional")}</label>
                  <ToggleButton
                    value={isOptional}
                    handleChange={() => {
                      setIsOptional(!isOptional);
                      handleIsOptionalClick()
                      setValue("isOptional", isOptional);
                    }}
                  />
                </div>
                <div className="grade_select">
                  <InfiniteScrollSelect
                    id="grade_category"
                    register={register}
                    name="grade_category"
                    disabled={isOptional}
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
                    value={selectedGrade}
                    disabled={isOptional}
                    handleChange={(e, data) => {
                      handleGradeChange(e, data);
                    }}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(gradeTotalPage, gradeCurrentPage, setGradeCurrentPage)
                    }
                    options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                  />
                  {errors?.grade?.type === "required" && <p>{t("field_required")}</p>}
                </div>
                <div className="career_select">
                  <CustomSelect
                    id="career"
                    register={register}
                    name="career"
                    label={t("th_career")}
                    value={selectedCareer}
                    disabled={noCareer || !selectedGrade || isOptional}
                    placeholder={noCareer ? "Selected grade has no career" : t("select_a_career")}
                    handleChange={(e, data) => {
                      handleCareerSelectChange(e, data);
                    }}
                    options={careerOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(careerTotalPage, careerCurrentPage, setCareerCurrentPage)
                    }
                  />
                </div>
                <div className="course_select">
                  <CustomSelect
                    id="course"
                    register={register}
                    name="course"
                    label={t("th_course")}
                    value={selectedCourse}
                    disabled={isOptional ? false : (!selectedCareer && !noCareer)}
                    placeholder={t("placeholder_select_course")}
                    handleChange={(e, data) => {
                      handleCourseSelectChange(e, data);
                    }}
                    options={courseOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(courseTotalPage, courseCurrentPage, setCourseCurrentPage)
                    }
                  />
                </div>
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
                    handleChange={(e, data) => {
                      handleLevelTypeSelectChange(e, data);
                    }}
                    options={levelTypeOptions}
                  />
                </div>
                <div className="mt-2">
                  <CustomSelect
                    id="level"
                    required={selectedCourse?.hasLevel}
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
              <div className="toggle_option_level">
                <div className="level_dropdown">
                  <CustomSelect
                    id="unit"
                    register={register}
                    name="unit"
                    disabled={!selectedCourse}
                    label={t("unit")}
                    value={selectedUnit}
                    placeholder={t("select_a_unit")}
                    handleChange={(e, data) => {
                      handleUnitSelectChange(e, data);
                    }}
                    options={unitOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(unitTotalPage, unitCurrentPage, setUnitCurrentPage)
                    }
                  />
                </div>
              </div>
              <div className="toggle_option_level">
                <div className="level_dropdown">
                  <CustomSelect
                    id="skillId"
                    register={register}
                    name="skillId"
                    label={t("skill")}
                    placeholder={t("select_a_skill")}
                    disabled={!selectedUnit}
                    value={selectedSkill}
                    handleChange={(e, data) => {
                      handleSkillSelectChange(e, data);
                    }}
                    options={skillOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(skillTotalPage, skillCurrentPage, setSkillCurrentPage)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="row-container">
        <div className="button-wrapper">
          {!editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("reset")}
              clickHandler={() => handleClear()}
            />
          )}
          {editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("cancel")}
              clickHandler={() => (handleCancel ? handleCancel() : null)}
            />
          )}
          <Button
            clickHandler={() => { }}
            type="submit"
            color="success"
            disabled={isSubmitting || isUploading}
            buttonName={
              isSubmitting
                ? `${t("submitting")}`
                : editform
                  ? `${t("update")} ${t("indicator")}`
                  : `${t("add")}`
            }
          />
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(IndicatorForm);

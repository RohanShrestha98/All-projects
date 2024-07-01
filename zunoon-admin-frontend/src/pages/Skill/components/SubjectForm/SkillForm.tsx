import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import Textarea from "../../../../components/Textarea/Textarea";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import config from "../../../../config";
import http from "../../../../utils/http";
import { withTranslation } from "react-i18next";
import "./SkillForm.scss";
import { optionType } from "../../../../@types/option";
import toast from "../../../../utils/toast";
import { handleInfiniteScroll } from "../../../../utils/handleInfiniteScroll";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import { ICourse } from "../../../../@types/course";
import { IFileUploadResponse } from "../../../../@types/content";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";

const courseApi = config.endpoints.api.course;
const gradeApi = config.endpoints.api.grade;
const careerApi = config.endpoints.api.career;
const unitApi = config.endpoints.api.unit;
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
    thumbnail?: IFileUploadResponse;
    course: ICourse;
    grade: ICourse;
    unitId: ICourse;
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

const SkillForm = ({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  t,
}: PropsType) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(editform ? data?.thumbnail : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<optionType | null>();
  const [selectedCourse, setSelectedCourse] = useState<optionType>();
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [noCareer, setNoCareer] = useState<boolean>(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState<optionType>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [levelCourses, setLevelCourses] = useState([]);
  const [levelLessCourses, setLevelLessCourses] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();


  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);

  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();


  const [selectedLevelType, setSelectedLevelType] = useState<optionType>();
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);

  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [levelOptions, setLevelOptions] = useState<optionType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();

  const [unitCurrentPage, setUnitCurrentPage] = useState(1);
  const [unitTotalPage, setUnitTotalPage] = useState(0);
  const [unitOptions, setUnitOptions] = useState<optionType[]>([]);

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
        grade: data && data?.grade?.id,
        career: data && data?.career,
        course: data && data?.course,
        level: data && data?.level?.id,
        thumbnail: data && data?.thumbnail,
        description: data && data?.description,
        unitId: data && data?.unitId,
      },
    },
  );

  const watchGrade = watch("grade");
  const watchCareer = watch("career");
  const watchCourse = watch("course");

  useEffect(() => {
    setValue("isOptional", isOptional);
  }, [isOptional]);

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
      } else if (!watchCareer && !watchGrade && isOptional) {
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
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setCourseOptions(uniqueOptions);
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
    setValue("unitId", undefined);

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

  const handleGradeSelectChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value);
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
    setValue("course", data?.value);
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
    setValue("unitId", data.value);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await http.GET(courseApi.list, "");
        const response1 = await http.GET(gradeApi.list, "");
        const response2 = await http.GET(unitApi.list, "");
        const options = convertToOptions(response.data.data);
        const options1 = convertToOptions(response1.data.data);
        const options2 = convertToOptions(response2.data.data);

        // setGradeOptions(options1);
        // setUnitOptions(options2);
        if (editform) {
          const course = options?.find(item => item?.value === data?.course?.id);
          setSelectedCourse(course);
          const grade = options1?.find(item => item?.value === data?.grade?.id);
          setSelectedGrade(grade);
          //@ts-ignore
          const unit = options2?.find(item => item?.value === data?.unit?.id);
          setSelectedUnit(unit);
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

  const handleSkillThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "skill",
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
    setValue("grade", null);
    setValue("level", null);
    handleReset();
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
          {/* <ImageInput
            image={thumbnailUrl?.url}
            editform={editform}
            setImage={setThumbnailUrl}
            isUploading={isUploading}
            {...register("thumbnail", {
              required: false,
            })}
            onChange={handleSkillThumbnailUpload}
          /> */}
          <ImageInput
            image={thumbnailUrl?.url}
            editform={editform}
            setImage={setThumbnailUrl}
            isUploading={isUploading}
            {...register("thumbnail", {
              required: false,
            })}
            onChange={handleSkillThumbnailUpload}
          />
        </div>
        <div className="col-container">
          <div className="fieldAndValidate">
            <div className="fieldAndValidate mb-5">
              <InputField
                required
                type="text"
                label={`${t("skill")} ${t("name")}`}
                placeholder={t("placeholder_skill_name")}
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
                required
                rows={5}
                label={t("th_description")}
                placeholder={t("placeholder_skill_description")}
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
                    label={t("th_grade_category")}
                    placeholder={t("select_a_grade_category")}
                    disabled={isOptional}
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
                      handleGradeSelectChange(e, data);
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
                    disabled={isOptional ? false : (!selectedCareer && !noCareer)}
                    value={selectedCourse}
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
                    id="unitId"
                    register={register}
                    name="unitId"
                    disabled={!selectedCourse}
                    label={t("unit")}
                    placeholder={t("select_a_unit")}
                    value={selectedUnit}
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
                  ? `${t("update")} ${t("Skill")}`
                  : `${t("add")}`
            }
          />
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(SkillForm);

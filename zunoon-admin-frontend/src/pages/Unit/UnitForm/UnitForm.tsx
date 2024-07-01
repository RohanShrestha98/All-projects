import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import config from "../../../config";
import http from "../../../utils/http";
import Button from "../../../components/Button/Button";
import Textarea from "../../../components/Textarea/Textarea";
import InputField from "../../../components/InputField/InputField";
import ImageInput from "../../../components/ImageInput/ImageInput";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import "./UnitForm.scss";
import { optionType } from "../../../@types/option";
import toast from "../../../utils/toast";
import { convertToOptions } from "../../../utils/convertToSelectOptions";
import { handleInfiniteScroll } from "../../../utils/handleInfiniteScroll";
import { IFileUploadResponse } from "../../../@types/content";
import { InfiniteScrollSelect } from "../../../components/CustomSelect/InfiniteScrollSelect";
import ToggleButton from "../../../components/ToggleButton/ToggleButton";

const gradeApi = config.endpoints.api.grade;
const careerApi = config.endpoints.api.career;
const courseApi = config.endpoints.api.course;
const fileUploadApi = config.endpoints.api.file;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


interface ICourse {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  hasLevel: boolean;
  levels: {
    id: string;
    name: string;
    description: string;
    type: {
      id: string;
      name: string;
    };
  }[];
}

type PropsType = {
  data?: {
    name: string;
    id: number;
    index: number;
    description: string;
    thumbnail: IFileUploadResponse;
    courses: ICourse[];
    grade: ICourse;
    level: ICourse;
    leveltype: any;
    isOptional: boolean;
    career: string;
    startDate?: string;
    endDate?: string;
  };
  editform?: boolean | any;
  handleCancel?: Function | any;
  handleClickSubmit?: Function | any;
  handleClickUpdate?: Function | any;
  isSubmitting?: boolean;
  t: Function;
};

const UnitForm = ({
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

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data?.id,
        name: data && data?.name,
        grade: data && data.grade?.id,
        career: data && data.career,
        courses: data && data.courses,
        level: data && data.level?.id,
        thumbnail: data && data?.thumbnail,
        isOptional: data && data?.isOptional,
        index: data && data?.index,
        description: data && data?.description,
        startDate: data?.startDate?.slice(0, 16) || "",
        endDate: data?.endDate?.slice(0, 16) || "",
      },
    },
  );





  const [selectedCareer, setSelectedCareer] = useState<optionType>();
  const [noCareer, setNoCareer] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [levelCourses, setLevelCourses] = useState([]);
  const [levelLessCourses, setLevelLessCourses] = useState([]);
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState();

  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();

  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<optionType | null>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [isOptional, setIsOptional] = useState<boolean>(false);

  const [selectedLevelType, setSelectedLevelType] = useState<any>();
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);
  const [levelOptions, setLevelOptions] = useState<any[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();


  const [indexValue, setIndexValue] = useState("");

  const watchGrade = watch("grade");
  const watchCareer = watch("career");

  useEffect(() => {
    setValue("isOptional", isOptional);
  }, [isOptional]);

  const handleGradeSelectChange = (data, e) => {
    setCourseCurrentPage(1);
    setCareerCurrentPage(1);
    setSelectedGrade(data);
    setValue("grade", data?.value);
  };

  const handleCareerSelectChange = (data, e) => {
    setCourseCurrentPage(1);
    setSelectedCareer(data);
    setValue("career", data?.value);
  };

  const handleCourseSelectChange = (data, e) => {
    setSelectedCourse(data);
    setValue("courses", data?.value);
  };

  const handleLevelSelectChange = (data, e) => {
    if (data !== null) {
      setSelectedLevel(data);
      setValue("level", data?.value);
    }
  };

  const handleLevelTypeSelectChange = (data, e) => {
    setSelectedLevelType(data);
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
    setValue("courses", undefined);
    setNoCareer(false);

    async function fetchData() {
      if (watchGrade !== undefined && selectedGrade !== null) {
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
    setValue("courses", undefined);

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

  const handleUnitThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "unit",
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

  const minDate = new Date().toISOString().slice(0, 16);
  const minEndDate = watch("startDate")?.slice(0, 16);


  const handleReset = () => {
    reset({
      name: "",
      description: "",
      courses: [],
      grade: "",
      level: "",
      index: null,
      startDate: "",
      endDate: "",
    });
  };

  const handleClear = () => {
    setSelectedCourse(null);
    setSelectedGrade(null);
    setSelectedLevel(null);
    setThumbnailUrl("");
    setIndexValue(null);
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
          <ImageInput
            image={thumbnailUrl?.url}
            editform={editform}
            setImage={setThumbnailUrl}
            isUploading={isUploading}
            {...register("thumbnail", {
              required: false,
            })}
            onChange={handleUnitThumbnailUpload}
          />
        </div>
        <div className="col-container">
          <div className={`fieldAndValidate unitEditForm`}>
            <div className={`fieldAndValidate ${!editform && "mb-5"}`}>
              <InputField
                required
                type="text"
                label={`${t("unit")} ${t("name")}`}
                placeholder={t("placeholder_unit_name")}
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
            {editform && (
              <div className="unitEditForm">
                <div className="start_date">
                  <InputField
                    type="datetime-local"
                    label={t("start_date")}
                    name="startDate"
                    placeholder={`${t("enter")} ${t("start_date")}`}
                    min={minDate}
                    {...register("startDate",)}
                  />
                </div>
                <div className="end_date">
                  <InputField
                    type="datetime-local"
                    label={t("end_date")}
                    name="endDate"
                    placeholder={`${t("enter")} ${t("end_date")}`}
                    min={minEndDate}
                    {...register("endDate")}
                  />
                </div>
              </div>
            )}

            <div className="fieldAndValidate">
              <Textarea
                rows={5}
                label={t("th_description")}
                placeholder={t("placeholder_unit_description")}
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
            {!editform && (
              <div className={`fieldAndValidate `}>

                <InputField
                  required={selectedCourse ? true : false}
                  type="number"
                  label={`${t("th_index")} `}
                  placeholder={t("enter_the_index")}
                  {...register("index", {
                    required: false,
                  })}
                  disabled={!selectedCourse}
                  min={1}
                  max={4}
                  onChange={e => {
                    const index = Number(e?.target?.value) <= 4 ? e.target?.value : e?.target?.value == null ? "" : "";
                    setIndexValue(index);
                  }}
                  value={indexValue}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
              </div>
            )}
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
                    disabled={isOptional}
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
                    id="courses"
                    register={register}
                    name="courses"
                    label={t("th_course")}
                    value={selectedCourse}
                    disabled={isOptional ? false : (!selectedCareer && !noCareer)}
                    placeholder={t("select_a_course")}
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
              <div className="date_picker_container">
                <div className="start_date">
                  <InputField
                    type="datetime-local"
                    label={t("start_date")}
                    name="startDate"
                    placeholder={`${t("enter")} ${t("start_date")}`}
                    min={minDate}
                    {...register("startDate")}
                  />
                </div>
                <div className="end_date">
                  <InputField
                    type="datetime-local"
                    label={t("end_date")}
                    name="endDate"
                    placeholder={`${t("enter")} ${t("end_date")}`}
                    min={minEndDate}
                    {...register("endDate")}
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
                    // placeholder={required={selectedCourse?.hasLevel}
                    //   noLevel ? t("selected_course_has_no_level") : "Select a level type"
                    // }
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

                    disabled={noLevel}
                    register={register}
                    // placeholder={noLevel ? t("selected_course_has_no_level") : "Select a level"}
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
                  ? `${t("update")} ${t("unit")}`
                  : `${t("add")}`
            }
          />
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(UnitForm);

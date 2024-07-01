import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import Textarea from "../../../../components/Textarea/Textarea";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import config from "../../../../config";
import http from "../../../../utils/http";
import "./CourseForm.scss";
import { withTranslation } from "react-i18next";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import MultiSelect from "../../../../components/MultiSelect/MultiSelect";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import toast from "../../../../utils/toast";
import { optionType } from "../../../../@types/option";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";
import { handleInfiniteScroll } from "../../../../utils/handleInfiniteScroll";
import { IFileUploadResponse } from "../../../../@types/content";

const gradeApi = config.endpoints.api.grade;
const careerApi = config.endpoints.api.career;
const gradeCategoryApi = config.endpoints.api.gradeCategory;
const courseApi = config.endpoints.api.course;
const levelCategoryApi = config.endpoints.api.levelCategory;
const fileUploadApi = config.endpoints.api.file;

interface IGrade {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}
[];

type PropsType = {
  data?: {
    name: string;
    id: number;
    description: string;
    thumbnail: IFileUploadResponse;
    grades: IGrade;
    levels: IGrade;
    level_category: string;
    isOptional: boolean;
    hasLevel: boolean;
    careers: string[];
  };
  editform?: boolean | any;
  handleCancel?: Function | any;
  handleClickSubmit?: Function | any;
  handleClickUpdate?: Function | any;
  isSubmitting?: boolean;
  t: Function;
};

const CourseForm = ({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  t,
}: PropsType) => {
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [noCareer, setNoCareer] = useState<boolean>(true);
  const [hasLevel, setHasLevel] = useState<boolean>(false);
  const [level, setLevel] = useState([]);
  const [levelTypeOptions, setLevelTypeOptions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedLevelType, setSelectedLevelType] = useState();
  const [gradeOptions, setGradeOptions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [careerGrade, setCareerGrade] = useState([]);
  const [careerlessGrade, setCareerlessGrade] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState<any>();
  const [selectedCareers, setSelectedCareers] = useState<any>();
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(editform ? data?.thumbnail : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [levelTypeCurrentPage, setLevelTypeCurrentPage] = useState(1);
  const [levelTypeTotalPage, setLevelTypeTotalPage] = useState(0);
  const [levelCategoryOptions, setLevelCategoryOptions] = useState([]);
  const [levelOptions, setlevelOptions] = useState([]);

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
        isOptional: data && data?.isOptional,
        hasLevel: data && data?.hasLevel,
        grades: data && data.grades?.id,
        levels: data && data.levels,
        level_category: data && data.level_category,
        thumbnail: data && data?.thumbnail,
        description: data && data?.description,
        careers: data && data.careers,
      },
    },
  );

  useEffect(() => {
    setValue("isOptional", isOptional);
  }, [isOptional, setValue]);

  useEffect(() => {
    setValue("hasLevel", hasLevel);
  }, [hasLevel, setValue]);

  useEffect(() => {
    async function getData() {
      try {
        if (!editform) {
          const response = await http.GET(gradeApi.list, "");
          const gradeData = response.data.data;
          setGrades(gradeData);

          const options = convertToOptions(gradeData);
          setGradeOptions(options);

          setCareerGrade(gradeData.filter(each => each.hasCareer));
          setCareerlessGrade(gradeData.filter(each => !each.hasCareer));
        }


        if (editform) {
          setSelectedLevelType({
            //@ts-ignore
            label: data.levels[0].type,
            value: data.levels[0].type,
          });

          setSelectedLevel(
            //@ts-ignore
            data?.levels?.map(each => {
              return {
                value: each.id,
                label: each.name,
              };
            }),
          );
        }
      } catch (err) {
        // toast.error(err);
      }
    }
    getData();
  }, [editform, data, setValue]);

  useEffect(() => {

    const gradeLoadOptions = async () => {
      const gradeResponse = await http.GET(`${gradeApi.list}`, "");
      const gradeOptions = convertToOptions(gradeResponse?.data?.data);
      setGradeOptions(gradeOptions)
    };
    if (!editform) {

      gradeLoadOptions()
    }
  }, [])

  const handleGradeCategorySelect = value => {
    setSelectedGradeCategory(value);
  };

  const handleGradeMultiSelect = value => {
    setSelectedGrades(value);
    const courseIds = value?.map(item => item?.value);
    setValue("grades", courseIds);
    setSelectedCareers([]);
    setValue("careers", undefined);
  };

  const watchGrades = watch("grades");
  const watchLevelCategory = watch("level_category");

  if (watchGrades?.length) {
    if (careerGrade.map(each => each.id)?.includes(watchGrades?.[0])) {
      const singleCareerGradeOptions = convertToOptions(
        careerGrade.filter(each => each.id === watchGrades[0]),
      );
      if (gradeOptions.toString() !== singleCareerGradeOptions.toString()) {
        setGradeOptions(singleCareerGradeOptions);
        setSelectedCareers([]);
        setNoCareer(false);
      }
    } else {
      const careerlessGradesOptions = convertToOptions(careerlessGrade);
      if (gradeOptions.toString() !== careerlessGradesOptions.toString()) {
        setGradeOptions(careerlessGradesOptions);
        setSelectedCareers([]);
      }
    }
  } else {
    if (gradeOptions.toString() !== convertToOptions(grades).toString()) {
      setGradeOptions(convertToOptions(grades));
      setNoCareer(true);
    }
  }

  const handleCareerMultiSelect = value => {
    setSelectedCareers(value);
    const courseIds = value.map(item => item?.value);
    setValue("careers", courseIds);
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
    async function fetchData() {

      if (watchGrades?.length) {
        const response = await http.GET(
          `${careerApi.careerByGrade(watchGrades?.[0])}?page=${careerCurrentPage}`,
          "",
        );
        setCareerTotalPage(response?.data?.totalPage);
        setCareerCurrentPage(1);
        const careerOptions = response?.data?.data ? convertToOptions(response?.data?.data) : [];
        setCareerOptions(careerOptions);
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
    if (!editform) {

      fetchData();
    }
  }, [watchGrades?.length, careerCurrentPage]);

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(courseApi.levelList, "");
      const levelData = response.data.data;
      const levelTypesSet = new Set(levelData && levelData.map(each => each.type));
      const levelTypes = [...levelTypesSet];

      setLevelTypeOptions(
        levelTypes.map(each => ({
          label: each,
          value: each,
        })),
      );
      setLevel(levelData);
    }
    fetchData();
  }, [watchGrades]);

  useEffect(() => {
    if (hasLevel) {
      const fetchLevelCategory = async () => {
        const response = await http.GET(
          `${levelCategoryApi.list}?page=${levelTypeCurrentPage}`,
          "",
        );
        const levelCategoryData = response?.data?.data;
        setLevelTypeTotalPage(response?.data?.totalPage);
        setLevelTypeCurrentPage(response?.data?.currentPage);
        const newlevelCategoryOptions = convertToOptions(levelCategoryData);
        const combinedOptions = [...levelCategoryOptions, ...newlevelCategoryOptions];
        const uniqueLevelCategoryOptions = Array.from(
          new Set(combinedOptions.map(option => option.value)),
        ).map(value => combinedOptions.find(option => option.value === value));
        setLevelCategoryOptions(uniqueLevelCategoryOptions);
        const levelData =
          levelCategoryData &&
          levelCategoryData?.filter(item => item?.id === watchLevelCategory && item?.levels);
        setLevel(levelData?.[0]?.levels);
        setlevelOptions(convertToOptions(levelData?.[0]?.levels));
      };
      fetchLevelCategory();
    }
  }, [watchLevelCategory, hasLevel, levelTypeCurrentPage]);

  const handleLevelSelectChange = value => {
    setSelectedLevel(value);
    const courseIds = value?.map(item => item?.value);
    setValue("levels", courseIds);
  };

  const handleLevelCategoryChange = (data, e) => {
    setSelectedLevelType(data);
    setValue("level_category", data?.value);
    setValue("levels", undefined);
    setSelectedLevel([]);
  };

  const handleCourseThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "course",
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


  const handleReset = () => {
    reset({
      name: "",
      description: "",
      grades: "",
    });
  };

  useEffect(() => {
    const getGradeByGradeCategory = async () => {
      const gradeByCategoryResponse = selectedGradeCategory?.value && await http.GET(`${gradeApi.list}?gradeCategory=${selectedGradeCategory?.value}`, "");
      const gardeByGradeCategoryOptions = convertToOptions(gradeByCategoryResponse?.data?.data)
      setGradeByGradeCategory(gardeByGradeCategoryOptions)
    }
    getGradeByGradeCategory()
  }, [selectedGradeCategory?.value])

  const handleClear = () => {
    setSelectedGrades(null);
    setSelectedCareers(null);
    setSelectedLevelType(null);
    setSelectedLevel(null);
    setIsOptional(false);
    setHasLevel(false);
    setThumbnailUrl("");
    handleReset();
  };

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
            onChange={handleCourseThumbnailUpload}
          />
        </div>

        <div className="col-container">
          <div className="fieldAndValidate">
            <InputField
              required
              type="text"
              label={`${t("th_course")} ${t("name")}`}
              placeholder={t("placeholder_course_name")}
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

          <div className="fieldAndValidate fieldAndValidateDesp">
            <Textarea
              name="description"
              required
              rows={5}
              label={t("th_description")}
              placeholder={t("placeholder_course_description")}
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
        {!editform && (
          <div className="col-container fixFilterOption ">
            <div className="fieldAndValidate">
              {!editform && (
                <div className="toggle_option_level">
                  <div className="toggle_field toggle_field_top">
                    <label htmlFor="isOptional">{t("optional")}</label>
                    <ToggleButton
                      value={isOptional}
                      handleChange={() => {
                        setIsOptional(!isOptional);
                        setSelectedCareers([])
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
                      value={!isOptional ? selectedGradeCategory : null}
                      handleChange={handleGradeCategorySelect}
                      loadOptions={gradeCategoryLoadOptions}
                    />
                  </div>
                  <div className="grade_select">
                    <CustomSelect
                      id="grades"
                      register={register}
                      name="grades"
                      label={t("grade_name")}
                      placeholder={t("select_a_grade")}
                      value={!isOptional ? selectedGrades : null}
                      handleChange={(e) => {
                        handleGradeMultiSelect(e);
                      }}
                      disabled={isOptional}
                      isMulti
                      options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                    />
                    {errors?.grades?.type === "required" && <p>{t("field_required")}</p>}
                  </div>
                  <div className="grade_select">
                    <MultiSelect
                      name="careers"
                      label={t("th_career")}
                      options={careerOptions}
                      selected={selectedCareers}
                      isDisabled={!selectedGrades || isOptional || noCareer}
                      handleMultiSelect={handleCareerMultiSelect}
                      {...register("careers", {
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
                </div>
              )}
              <div className="toggle_option_level">
                <div className="toggle_field">
                  <label htmlFor="hasLevel">{t("level")}</label>
                  {!editform && (
                    <ToggleButton
                      value={hasLevel}
                      handleChange={e => {
                        setSelectedLevel([])
                        setHasLevel(e.target.checked);
                        setValue("hasLevel", e.target.checked);
                      }}
                    />
                  )}
                </div>
                <div className="level_dropdown">
                  <CustomSelect
                    id="level_category"
                    register={register}
                    name="level_category"
                    label={t("level_type")}
                    value={hasLevel ? selectedLevelType : ""}
                    handleChange={(e, data) => {
                      handleLevelCategoryChange(e, data);
                    }}
                    options={levelCategoryOptions}
                    disabled={!hasLevel}
                    haslevel={hasLevel}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(
                        levelTypeTotalPage,
                        levelTypeCurrentPage,
                        setLevelTypeCurrentPage,
                      )
                    }
                  />
                  {errors?.level_category?.type === "required" && <p>{t("field_required")}</p>}
                </div>
                <br />
                <div className="level_dropdown">
                  <MultiSelect
                    name="levels"
                    label={t("level")}
                    options={levelOptions}
                    selected={selectedLevel}
                    isDisabled={!hasLevel}
                    handleMultiSelect={handleLevelSelectChange}
                    {...register("levels", {
                      required: false,
                    })}
                  />
                  {errors?.levels?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="row-container ">
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
                  ? `${t("update_course")}`
                  : `${t("add")}`
            }
          />
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(CourseForm);

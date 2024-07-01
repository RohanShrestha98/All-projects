import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import Textarea from "../../../../components/Textarea/Textarea";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import InputField from "../../../../components/InputField/InputField";
import "./GradeForm.scss";
import { withTranslation } from "react-i18next";
import http from "../../../../utils/http";
import config from "../../../../config";
import { IGrade } from "../../../../@types/grade";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import toast from "../../../../utils/toast";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";

const careerApi = config.endpoints.api.career;
const gradeCategoryApi = config.endpoints.api.gradeCategory;
const gradeApi = config.endpoints.api.grade;
const fileUploadApi = config.endpoints.api.file;

type PropsType = {
  data?: IGrade;
  editform?: any;
  handleCancel?: Function | any;
  handleClickSubmit?: Function | any;
  handleClickUpdate?: Function | any;
  isSubmitting?: boolean;
  gradeCategory?: boolean;
  setIsDirtyGrades?: Dispatch<SetStateAction<boolean>>;
  setSelectedGradeCategory?: any;
  t: Function;
};

function GradeForm({
  gradeCategory,
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  setIsDirtyGrades,
  setSelectedGradeCategory,
  t,
}: PropsType) {
  const [thumbnailUrl, setThumbnailUrl] = useState(editform ? data?.thumbnail : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [careerOptions, setCareerOptions] = useState([]);
  const [selectedCareers, setSelectedCareers] = useState<any>();
  const [gradeOptions, setGradeOptions] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState<any>();
  const [gradeCategoryOption, setGradeCategoryOption] = useState([]);
  const [gradeCategorySelected, setGradeCategorySelected] = useState<any>();
  const [careerBool, setCareerBool] = useState(editform ? (data?.hasCareer ? true : false) : false);


  const {
    reset,
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data.id,
        name: data && data.name,
        thumbnail: data && data.thumbnail,
        description: data && data.description,
        careers: data && data.careers,
        grades: data && data.grades,
        gradeCategory: data && data.gradeCategory,
        hasCareer: data && data.hasCareer,
      },
    },
  );

  const handleGradeThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: gradeCategory ? "gradeCategory" : "grade",
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
    });
  };

  const handleClear = () => {
    handleReset();
    setThumbnailUrl("");
    setSelectedGrade(null);
    setSelectedCareers(null);
    setGradeCategorySelected(null);
    setSelectedGradeCategory(null);
    setCareerBool(false);
  };

  const handleCareer = e => {
    setCareerBool(e.target.checked);
  };

  useEffect(() => {
    !careerBool && setSelectedCareers(null), setValue("careers", null);
  }, [careerBool]);

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(careerApi.list, "");
      setCareerOptions(convertToOptions(response?.data?.data));

      if (editform) {
        setSelectedCareers(
          data?.careers?.map(each => {
            return {
              value: each.id,
              label: each.name,
            };
          }),
        );
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(gradeCategoryApi.list, "");
      if (response.status === 200) {
        const gradeCategoryOption = convertToOptions(response?.data?.data);
        setGradeCategoryOption(gradeCategoryOption);
        editform &&
          setGradeCategorySelected(
            gradeCategoryOption.find(item => item.value === data?.gradeCategory?.id),
          );
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await http.GET(gradeApi.list, "");
      if (response.status === 200) {
        const gradeOption = convertToOptions(response?.data?.data);
        setGradeOptions(gradeOption);
        editform &&
          setSelectedGrade(
            gradeOption?.filter(item1 => data?.grades?.some(item2 => item2?.id === item1?.value)),
          );
      }
    };
    fetchData();
  }, [editform, data]);

  const gradeCategoryLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const gradeCategoryResponse = await http.GET(`${gradeCategoryApi.list}?page=${page}`, "");
    const gradeCategoryOptions = convertToOptions(gradeCategoryResponse?.data?.data);
    if (!gradeCategoryResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const filteredOptions = searchQuery
      ? gradeCategoryOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : gradeCategoryOptions;
    const hasMore =
      gradeCategoryResponse?.data?.totalPage > gradeCategoryResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  const gradeLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const gradeResponse = await http.GET(`${gradeApi.list}?page=${page}`, "");
    if (!gradeResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const gradeOptions = convertToOptions(gradeResponse?.data?.data);
    const filteredOptions = searchQuery
      ? gradeOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : gradeOptions;

    const hasMore = gradeResponse?.data?.totalPage > gradeResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  const careerLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const careerResponse = await http.GET(`${careerApi.list}?page=${page}`, "");
    if (!careerResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const careerOptions = convertToOptions(careerResponse?.data?.data) || [];
    const filteredOptions = searchQuery
      ? careerOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : careerOptions;

    const hasMore = careerResponse?.data?.totalPage > careerResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  const handleGradeCategoryChange = (data, e) => {
    setGradeCategorySelected(data);
    setSelectedGradeCategory(data);
    setValue("gradeCategory", data?.value, { shouldDirty: true });
  };

  const handleGradeMultiSelect = value => {
    editform && setIsDirtyGrades(true);
    const selectedIds = value?.map(item => item?.value);
    setSelectedGrade(value);
    setValue("grades", selectedIds, { shouldDirty: true });
  };

  const handleCareerMultiSelect = value => {
    const selectedIds = value?.map(item => item?.value);
    setSelectedCareers(value);
    setValue("careers", selectedIds, { shouldDirty: true });
  };

  return (
    <form
      className="grade-form-container"
      onSubmit={handleSubmit(editform ? handleClickUpdate()(handleCancel) : handleClickSubmit)}
    >
      <div className="row-container">
        <div className="col-container">
          <div className="row-container">
            <div className="unit_image">
              <ImageInput
                image={thumbnailUrl?.url}
                editform={editform}
                setImage={setThumbnailUrl}
                isUploading={isUploading}
                {...register("thumbnail", {
                  required: false,
                })}
                onChange={handleGradeThumbnailUpload}
              />
            </div>
            <div className="col-container">
              {!gradeCategory && (
                <div className="gradeCategoryHeading">
                  <InfiniteScrollSelect
                    id="gradeCategory"
                    register={register}
                    name="gradeCategory"
                    label={`${t("th_grade_category")}`}
                    placeholder={t("select_a_grade_category")}
                    value={gradeCategorySelected}
                    handleChange={(e, data) => {
                      handleGradeCategoryChange(e, data);
                    }}
                    loadOptions={gradeCategoryLoadOptions}
                    disabled={false}
                  />
                </div>
              )}
              <div className="row-container">
                <div className="fieldAndValidate">
                  <InputField
                    required
                    type="text"
                    label={`${gradeCategory ? t("grade_category_name") : t("grade_name")}`}
                    placeholder={`${gradeCategory ? t("placeholder_gradetype_name") : t("placeholder_grade_name")
                      }`}
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
              </div>
              <div className="fieldAndValidate career_select">
                <div className="career_check">
                  {!gradeCategory && (
                    <label htmlFor="hasCareer" style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                      {t("has_career")}
                    </label>
                  )}
                  {!gradeCategory && (
                    <input
                      checked={careerBool}
                      disabled={editform}
                      type="checkbox"
                      {...register("hasCareer")}
                      onChange={e => handleCareer(e)}
                    />
                  )}
                  {!editform && !gradeCategory && (
                    <span
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#abeeff",
                        padding: "0px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      {t("note_grade_once_created")}
                    </span>
                  )}
                </div>
                {gradeCategory ? (
                  <InfiniteScrollSelect
                    id="grades"
                    name="grades"
                    label={`${t("sidebar_grades")}`}
                    value={selectedGrade}
                    handleChange={handleGradeMultiSelect}
                    loadOptions={gradeLoadOptions}
                    placeholder={`${t("placeholder_select_grade")}`}
                    register={register}
                    isMulti={true}
                  />
                ) : (
                  <InfiniteScrollSelect
                    id="careers"
                    name="careers"
                    label={t("sidebar_careers")}
                    placeholder={t("select")}
                    value={selectedCareers}
                    handleChange={handleCareerMultiSelect}
                    loadOptions={careerLoadOptions}
                    register={register}
                    isMulti={true}
                    disabled={!careerBool}
                    isDisabled={!careerBool || editform}
                  />
                )}
              </div>
              <div className="fieldAndValidate">
                <Textarea
                  label={`${t("th_description")}`}
                  rows={4}
                  placeholder={`${gradeCategory
                    ? t("placeholder_gradetype_description")
                    : t("placeholder_grade_description")
                    }`}
                  required={true}
                  {...register("description", {
                    required: true,
                  })}
                  onChange={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                  watchValue={watch("description")}
                />
                {errors?.description?.type === "required" && <p>{t("field_required")}</p>}
                {errors?.description?.type === "maxLength" && (
                  <p>{t("discription_too_long_max_70")}</p>
                )}
                {errors?.description?.type === "minLength" && (
                  <p>
                    {t("th_grade")} {t("min_length")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-container">
        <div className="button-wrapper">
          {!editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("clear")}
              clickHandler={() => handleClear()}
            />
          )}
          {editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("cancel")}
              clickHandler={() => handleCancel()}
            />
          )}
          <Button
            type="submit"
            color="success"
            clickHandler={() => { }}
            buttonName={
              isSubmitting
                ? `${t("submitting")}`
                : editform && !gradeCategory
                  ? `${t("update")} ${t("th_grade")}`
                  : editform && gradeCategory
                    ? `${t("update")} ${t("th_grade")} ${t("category")}`
                    : `${t("add")}`
            }
            disabled={isSubmitting || isUploading}
          />
        </div>
      </div>
    </form>
  );
}

export default withTranslation()(GradeForm);

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import Textarea from "../../../../components/Textarea/Textarea";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import InputField from "../../../../components/InputField/InputField";
import "./CareerForm.scss";
import { withTranslation } from "react-i18next";
import useFetch from "../../../../hooks/useFetch";
import config from "../../../../config";
import { optionType } from "../../../../@types/option";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import { IGrade } from "../../../../@types/grade";
import http from "../../../../utils/http";
import toast from "../../../../utils/toast";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";

const gradeApi = config.endpoints.api.grade;
const gradeCategoryApi = config.endpoints.api.gradeCategory;
const fileUploadApi = config.endpoints.api.file;

type PropsType = {
  data?: IGrade;
  editform?: any;
  handleCancel?: Function | any;
  handleClickSubmit?: Function | any;
  handleClickUpdate?: Function | any;
  isSubmitting?: boolean;
  t?: Function;
};

function CareerForm({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  t,
}: PropsType) {
  const [thumbnailUrl, setThumbnailUrl] = useState(editform ? data?.thumbnail : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [selectedGrades, setSelectedGrades] = useState<any>();
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data.id,
        name: data && data.name,
        thumbnail: data && data.thumbnail,
        description: data && data.description,
        grades: [],
      },
    },
  );

  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useEffect(() => {
    fetchNewData(gradeApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      const gradeData = fetchedData.data;
      const filterHasCareerGrade = gradeData?.filter((item) => item?.hasCareer)
      const gradeOptions = convertToOptions(filterHasCareerGrade);
      setGradeOptions(gradeOptions);
    }
  }, [fetchedData]);

  useEffect(() => {
    const getGradeByGradeCategory = async () => {
      const gradeByCategoryResponse = selectedGradeCategory?.value && await http.GET(`${gradeApi.list}?gradeCategory=${selectedGradeCategory?.value}`, "");
      const filterHasCareerGrade = gradeByCategoryResponse?.data?.data?.filter((item) => item?.hasCareer)
      const gardeByGradeCategoryOptions = convertToOptions(filterHasCareerGrade)
      setGradeByGradeCategory(gardeByGradeCategoryOptions)
    }
    getGradeByGradeCategory()
  }, [selectedGradeCategory?.value])

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

  const handleGradeMultiSelect = value => {
    setSelectedGrades(value);
    const gradeIds = value.map(item => item?.value);
    setValue("grades", gradeIds);
  };
  const handleGradeCategorySelect = value => {
    setSelectedGradeCategory(value);
    setSelectedGrades([])
  };

  const handleCareerThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "career",
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
      grades: [],
    });
  };

  const handleClear = () => {
    handleReset();
    setThumbnailUrl("");
    setSelectedGrades([]);
  };

  return (
    <form
      className="career-form-container"
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
                onChange={handleCareerThumbnailUpload}
              />
            </div>

            <div className="col-container">
              <div className={`fieldAndValidate ${editform && "d-none"}`}>
                <div className="grade_select">
                  <InfiniteScrollSelect
                    id="grade_category"
                    register={register}
                    name="grade_category"
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
                    isMulti
                    value={selectedGrades}
                    handleChange={handleGradeMultiSelect}
                    options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                  />
                  {errors?.grades?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
              <div className="fieldAndValidate">
                <InputField
                  required
                  type="text"
                  label={`${t("career_name")}`}
                  placeholder={`${t("placeholder_career_name")}`}
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

              <div className="fieldAndValidate">
                <Textarea
                  label={`${t("th_description")}`}
                  rows={4}
                  placeholder={`${t("placeholder_career_description")}`}
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
                : editform
                  ? `${t("update")} ${t("th_career")}`
                  : `${t("add")}`
            }
            disabled={isSubmitting || isUploading}
          />
        </div>
      </div>
    </form>
  );
}

export default withTranslation()(CareerForm);

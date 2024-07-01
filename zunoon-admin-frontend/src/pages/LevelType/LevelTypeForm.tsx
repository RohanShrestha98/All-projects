import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import ImageInput from "../../components/ImageInput/ImageInput";
import InputField from "../../components/InputField/InputField";
import { withTranslation } from "react-i18next";
import http from "../../utils/http";
import config from "../../config";
import "./LevelType.scss";
import { optionType } from "../../@types/option";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { InfiniteScrollSelect } from "../../components/CustomSelect/InfiniteScrollSelect";
import { IFileUploadResponse } from "../../@types/content";
import toast from "../../utils/toast";

const levelCategoryApi = config.endpoints.api.levelCategory;
const levelApi = config.endpoints.api.level;
const fileUploadApi = config.endpoints.api.file;

interface ICourse {
  id: string;
  name: string;
  description: string;
  thumbnail: null | string | HTMLInputElement;
}
interface IGrade {
  id?: string;
  name?: string;
  description: string;
  thumbnail?: IFileUploadResponse;
  course: ICourse;
  levels: [{ id: string; name: string }];
  type: { id: string; name: string };
  typeId?: string;
  hasCareer: boolean;
}

type PropsType = {
  data?: IGrade;
  editform?: any;
  handleCancel?: Function | any;
  handleClickSubmit?: Function | any;
  handleClickUpdate?: Function | any;
  isLoading?: boolean;
  levels?: boolean;
  t: Function;
  setIsDirtyLevels?: Dispatch<SetStateAction<boolean>>;
};

function LevelTypeForm({
  levels,
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isLoading,
  setIsDirtyLevels,
  t,
}: PropsType) {
  const [thumbnailUrl, setThumbnailUrl] = useState(editform ? data?.thumbnail : "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
        id: data && data?.id,
        name: data && data?.name,
        thumbnail: data && data?.thumbnail,
        description: data && data?.description,
        levels: data && data?.levels,
        typeId: data && data?.type?.id,
      },
    },
  );

  const [levelOptions, setLevelOptions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState<any>();
  const [levelCategoryOption, setLevelCategoryOption] = useState([]);
  const [levelCategorySelected, setLevelCategorySelected] = useState<optionType | null>();

  const handleMultiSelectLevels = value => {
    editform && setIsDirtyLevels(true);
    setSelectedLevel(value);
    const levelIds = value.map(item => item?.value);
    setValue("levels", levelIds, { shouldDirty: true });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(levelCategoryApi.list, "");
      const levelCategoryOptions = convertToOptions(response?.data?.data);
      setLevelCategorySelected(levelCategoryOptions.find(item => item?.value === data?.type?.id));
      setLevelCategoryOption(levelCategoryOptions);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedLevel(convertToOptions(data?.levels));
  }, [editform, data]);

  const handleLevelTypeChange = (data, e) => {
    setLevelCategorySelected(data);
    setValue("typeId", data?.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(levelApi.list, "");
      setLevelOptions(convertToOptions(response?.data?.data));
    }
    fetchData();
  }, [editform]);

  const handleReset = () => {
    reset({
      name: "",
      description: "",
    });
  };

  const levelLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const levelResponse = await http.GET(`${levelApi.list}?page=${page}`, "");
    if (!levelResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const levelOptions = convertToOptions(levelResponse?.data?.data) || [];
    const filteredOptions = searchQuery
      ? levelOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : levelOptions;
    const hasMore = levelResponse?.data?.totalPage > levelResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  const levelTypeLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const levelTypeResponse = await http.GET(`${levelCategoryApi.list}?page=${page}`, "");
    if (!levelTypeResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const levelTypeOptions = convertToOptions(levelTypeResponse?.data?.data) || [];
    const filteredOptions = searchQuery
      ? levelTypeOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : levelTypeOptions;
    const hasMore = levelTypeResponse?.data?.totalPage > levelTypeResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  const handleThumbnailUpload = async e => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: levels ? "level" : "levelType",
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

  const handleClear = () => {
    handleReset();
    setThumbnailUrl("");
    setLevelCategorySelected(null);
    setSelectedLevel(null);
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
                onChange={handleThumbnailUpload}
              />
            </div>
            <div className="col-container">
              {levels && (
                <div className="levelsHeading">
                  <InfiniteScrollSelect
                    id="typeId"
                    // required={true}
                    register={register}
                    name="typeId"
                    label={t("level_type")}
                    placeholder={`${t("select")} ${t("level_type")}`}
                    //@ts-ignore
                    value={levelCategorySelected}
                    handleChange={(e, data) => {
                      handleLevelTypeChange(e, data);
                    }}
                    loadOptions={levelTypeLoadOptions}
                  />
                </div>
              )}

              <div className="row-container">
                <div className="fieldAndValidate">
                  <InputField
                    required
                    type="text"
                    label={`${!levels ? t("level_type_name") : t("level_name")}`}
                    placeholder={`${levels ? `${t("enter")} ${t("level_name")}` : t("placeholder_leveltype_name")
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
              {!levels && (
                <div className="fieldAndValidate career_select">
                  <InfiniteScrollSelect
                    id="levels"
                    register={register}
                    name="levels"
                    label={t("levels")}
                    placeholder={`${t("select")} ${t("levels")}`}
                    value={selectedLevel}
                    handleChange={handleMultiSelectLevels}
                    loadOptions={levelLoadOptions}
                    isMulti={true}
                  />
                </div>
              )}
              <div className="fieldAndValidate">
                <Textarea
                  label={`${t("th_description")}`}
                  rows={4}
                  placeholder={`${levels
                    ? t("placeholder_lesson_description")
                    : t("placeholder_leveltype_description")
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
              isLoading
                ? `${t("submitting")}`
                : editform && levels
                  ? `${t("update_level")}`
                  : editform && !levels
                    ? `${t("update_level_type")}`
                    : `${t("add")}`
            }
            disabled={isLoading || isUploading}
          />
        </div>
      </div>
    </form>
  );
}

export default withTranslation()(LevelTypeForm);

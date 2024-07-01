import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { ISchool } from "../../../../../@types/school";
import { withTranslation } from "react-i18next";
import CustomSelect from "../../../../../components/CustomSelect/CustomSelect";
import GenerateListOptions from "../../schoolForm/SelectOptions";
import Button from "../../../../../components/Button/Button";
import http from "../../../../../utils/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../../../../config";
import SubmitModal from "../../SubmitModal";
import MultiSelect from "../../../../../components/MultiSelect/MultiSelect";
import { handleInfiniteScroll } from "../../../../../utils/handleInfiniteScroll";
import { optionType } from "../../../../../@types/option";
import useFetch from "../../../../../hooks/useFetch";
import { convertToOptions } from "../../../../../utils/convertToSelectOptions";
import ConvertArrayToString from "../../../../../utils/convertArrayToString";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";

const schoolApi = config.endpoints.api.school;
const gradeCategoryApi = config.endpoints.api.gradeCategory;

const Feature = ({
  t,
  prevStep,
  data,
  setData,
  setResErrors,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const { fetchedData, fetchNewData } = useFetch();
  const navigate = useNavigate();
  const { planList, modalityList } = GenerateListOptions();

  const [selectedPlan, setSelectedPlan] = useState(
    planList.find(item => item.value === data.feature.plan),
  );
  const [selectedModality, setSelectedModality] = useState(
    modalityList.find(item => item.value === data.feature.deliverymodality),
  );
  // const [selectededucationLevel, setSelectededucationLevel] = useState(
  //   educationLevelsList.find(item => item.value === data.feature.educationLevels),
  // );


  const [educationLevelCurrentPage, setEducationLevelCurrentPage] = useState(1);
  const [educationLeveTotalPage, setEducationLevelTotalPage] = useState(0);
  const [educationLeveOptions, setEducationLevelOptions] = useState<optionType[]>([]);
  useEffect(() => {
    if (fetchedData.data) {
      setEducationLevelOptions(convertToOptions(fetchedData.data));
      setEducationLevelTotalPage(fetchedData.totalPage);
      setEducationLevelCurrentPage(fetchedData.currentPage);
    } else {
      setEducationLevelOptions([]);
    }
  }, [fetchedData]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<any>();

  useEffect(() => {
    fetchNewData(`${gradeCategoryApi.list}/?page=${educationLevelCurrentPage}`);
  }, [fetchNewData]);



  const defaultEducationLevelInPrevious = educationLeveOptions?.filter((item) =>
    data?.feature?.educationLevels?.some(
      (item2) => item2 === item?.value
    )
  );


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ISchool>({ defaultValues: data });

  const handlePlanChange = (data, e) => {
    setSelectedPlan(data);
    setValue("feature.plan", data?.value, { shouldDirty: true });
  };

  const handleModalityChange = (data, e) => {
    setSelectedModality(data);
    setValue("feature.deliverymodality", data?.value, { shouldDirty: true });
  };

  const handleEducationLevelMultiSelect = value => {
    setSelectedEducationLevel(value);
    const educationLevelIds = value?.map(item => item?.value);
    setValue("feature.educationLevels", educationLevelIds, { shouldDirty: true });
  };


  const handleClickSubmit = (data: ISchool) => {
    isSubmitting;
    setData({ ...data });
    http
      .POST(schoolApi.create, data)
      .then(res => {
        toast.success(` ${t("school")} ${t("added_successfully")}!`);
        setTimeout(() => {
          navigate("../");
        }, 1000);
      })
      .catch(err => {
        let errorMessage = JSON.stringify(err?.response?.data?.errors);
        let parsedErrMessage = errorMessage && errorMessage && JSON.parse(errorMessage);
        setResErrors(parsedErrMessage);
        toast.error(
          err?.response?.data?.errors
            ? capitalizeFirstLetter(
              ConvertArrayToString(Object?.values(err?.response?.data?.errors)),
            )
            : err?.message?.toString(),
        );
      })
      .finally(() => {
        isSubmitted;
      });
  };

  const onError = (errors: FieldErrors<ISchool>) => { };

  const saveData = (data: ISchool) => {
    setData({ ...data });
    isPreviousClick && prevStep();
  };

  const handleFormSubmit = () => {
    setIsPreviousClick(false);
    handleClose();
    handleSubmit(handleClickSubmit, onError)();
  };

  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <form
        className="school_form_container"
        onSubmit={
          isPreviousClick
            ? handleSubmit(saveData, onError)
            : handleSubmit(handleClickSubmit, onError)
        }
        onKeyDown={handleKeyPress}
      >
        <div className="row_container">
          <div className="field_and_validate">
            <CustomSelect
              id="feature.plan"
              required={!isPreviousClick}
              register={register}
              name="feature.plan"
              label={t("plan")}
              placeholder={t("placeholder_plan")}
              value={selectedPlan}
              handleChange={(e, data) => {
                handlePlanChange(e, data);
              }}
              options={planList}
              disabled={false}
            />
            {errors?.feature?.plan?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
          <div className="field_and_validate">
            <CustomSelect
              id="feature.deliverymodality"
              required={!isPreviousClick}
              register={register}
              name="feature.deliverymodality"
              label={t("deliverymodality")}
              placeholder={t("placeholder_deliveryModality")}
              value={selectedModality}
              handleChange={(e, data) => {
                handleModalityChange(e, data);
              }}
              options={modalityList}
              disabled={false}
            />
            {errors?.feature?.deliverymodality?.type === "required" && (
              <p className="error">{t("field_required")}</p>
            )}
          </div>
        </div>
        <div className="row_container">
          <div className="field_and_validate">
            <MultiSelect
              name="feature.educationLevels"
              label={t("educationLevel")}
              options={educationLeveOptions}
              selected={selectedEducationLevel ?? defaultEducationLevelInPrevious}
              placeholder={`${t("select")} ${t("educationLevel")}`}
              handleMultiSelect={handleEducationLevelMultiSelect}
              {...register("feature.educationLevels", {
                required: !isPreviousClick,
              })}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(
                  educationLeveTotalPage,
                  educationLevelCurrentPage,
                  setEducationLevelCurrentPage,
                )
              }
            />
          </div>
          <div className="field_and_validate">{""}</div>
        </div>
        <div className="d-flex justify-content-between ">
          <div className="pull-left">
            <Button
              type="submit"
              color="info"
              buttonName={t("prev")}
              clickHandler={() => setIsPreviousClick(true)}
              disabled={false}
            />
          </div>
          <div className="pull-right">
            <Button
              type="button"
              color="info"
              buttonName={`${t("submit")} >`}
              clickHandler={handleShow}
              disabled={false}
            />
            <SubmitModal
              title={t("school_form_submit")}
              handleClose={handleClose}
              show={show}
              handleClickSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default withTranslation()(Feature);

import { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { useForm } from "react-hook-form";
import GenerateListOptions from "../schoolForm/SelectOptions";
import Button from "../../../../components/Button/Button";
import "./EditSchool.scss";
import { useNavigate } from "react-router-dom";
import { ISchool } from "../../../../@types/school";
import httpMethods from "../../../../utils/http";
import config from "../../../../config";
import { toast } from "react-toastify";
import { useSchoolContext } from "../../../../context/SchoolContextProvider";
import useFetch from "../../../../hooks/useFetch";
import { optionType } from "../../../../@types/option";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import MultiSelect from "../../../../components/MultiSelect/MultiSelect";
import { handleInfiniteScroll } from "../../../../utils/handleInfiniteScroll";

const schoolApi = config.endpoints.api.school;
const gradeCategoryApi = config.endpoints.api.gradeCategory;

const EditFeature = ({ t }) => {
  const { fetchedData, fetchNewData } = useFetch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { schoolData, handleSchoolUpdate } = useSchoolContext();

  const { planList, modalityList } = GenerateListOptions();
  const fetchedPlanVal = planList.find(item => item.value === schoolData?.feature.plan);
  const fetchedDeliveryModalityVal = modalityList.find(
    item => item.value === schoolData?.feature.deliverymodality,
  );
  const [selectedPlan, setSelectedPlan] = useState(fetchedPlanVal);
  const [selectedModality, setSelectedModality] = useState(fetchedDeliveryModalityVal);

  const [educationLevelCurrentPage, setEducationLevelCurrentPage] = useState(1);
  const [educationLeveTotalPage, setEducationLevelTotalPage] = useState(0);
  const [educationLeveOptions, setEducationLevelOptions] = useState<optionType[]>([]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<any>();

  useEffect(() => {
    fetchNewData(`${gradeCategoryApi.list}/?page=${educationLevelCurrentPage}`);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setEducationLevelOptions(convertToOptions(fetchedData.data));
      setEducationLevelTotalPage(fetchedData.totalPage);
      setEducationLevelCurrentPage(fetchedData.currentPage);
      setSelectedEducationLevel(
        convertToOptions(fetchedData.data)?.filter(item1 =>
          schoolData?.feature?.educationLevels?.some(item2 => item2?.id === item1?.value),
        ),
      );
    } else {
      setEducationLevelOptions([]);
    }
  }, [fetchedData]);

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: schoolData,
  });

  const handlePlanChange = (data, e) => {
    setSelectedPlan(data);
    setValue("feature.plan", data.value, { shouldDirty: true });
  };

  const handleModalityChange = (data, e) => {
    setSelectedModality(data);
    setValue("feature.deliverymodality", data.value, { shouldDirty: true });
  };

  const handleEducationLevelMultiSelect = data => {
    setSelectedEducationLevel(data);
    const educationLevelIds = data.map(item => item?.value);
    setValue("feature.educationLevels", educationLevelIds, { shouldDirty: true });
  };

  const handleUpdate = (data: ISchool) => {
    const featureDetails = {
      plan: data && data.feature?.plan,
      deliverymodality: data && data.feature?.deliverymodality,
      educationLevels: data && selectedEducationLevel?.map(item => item?.value),
    };
    handleSchoolUpdate({ ...data });
    setIsSubmitting(true);
    async function updateFeature() {
      try {
        if (isDirty) {
          const response = await httpMethods.PATCH(
            schoolApi.featureUpdate(schoolData.id),
            featureDetails,
          );
          if (response.status === 200) {
            toast.success(`${t("feature")} ${t("updated_successfully")}`);
            navigate("../../");
          } else {
            toast.error("Error in updating feature");
          }
        } else {
          toast.error("No changes made to the feature information");
        }
      } catch (error) {
        toast.error(error.toString());
      }
      setIsSubmitting(false);
    }
    updateFeature();
  };
  const handleReset = () => {
    reset({
      feature: {
        plan: "",
        deliverymodality: "",
        educationLevels: [],
      },
    });
    setSelectedPlan(null);
    setSelectedModality(null);
  };

  return (
    <div className="form_wrapper">
      <div className="page_header">
        <h4 className="page_title">{`${t("school")} | ${t("edit")} ${t("feature")}`}</h4>
        <div className="button_wrapper ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="success"
            clickHandler={() => navigate("../../")}
          />
        </div>
      </div>

      <form className="form_container">
        <div className=" row_container">
          <div className="input_container">
            <CustomSelect
              id="feature.plan"
              required={true}
              register={register}
              name="feature.plan"
              label={t("plan")}
              placeholder="Select Plan Type"
              value={selectedPlan}
              handleChange={(e, data) => {
                handlePlanChange(e, data);
              }}
              options={planList}
              disabled={false}
            />
            {errors?.feature?.plan?.type === "required" && <p>{t("field_required")}</p>}
          </div>
          <div className="input_container">
            <CustomSelect
              id="feature.deliverymodality"
              required={true}
              register={register}
              name="feature.deliverymodality"
              label={t("deliverymodality")}
              placeholder="Select Modality Type"
              value={selectedModality}
              handleChange={(e, data) => {
                handleModalityChange(e, data);
              }}
              options={modalityList}
              disabled={false}
            />
            {errors?.feature?.deliverymodality?.type === "required" && <p>{t("field_required")}</p>}
          </div>
        </div>
        <div className="row_container">
          <div className="input_container" style={{ cursor: "not-allowed" }}>
            <MultiSelect
              name="feature.educationLevels"
              label={t("educationLevel")}
              options={educationLeveOptions}
              selected={selectedEducationLevel}
              handleMultiSelect={data => handleEducationLevelMultiSelect(data)}
              {...register("feature.educationLevels", {
                required: false,
              })}
              onMenuScrollToBottom={() =>
                handleInfiniteScroll(
                  educationLeveTotalPage,
                  educationLevelCurrentPage,
                  setEducationLevelCurrentPage,
                )
              }
              isDisabled={true}
            />
          </div>
          <div className="input_container">{""}</div>
        </div>
        <div className="button-container">
          <div className="button-group">
            <Button
              type="button"
              buttonName={`${t("clear")}`}
              color="danger"
              clickHandler={() => handleReset()}
            />
            <Button
              type="submit"
              buttonName={isLoading ? `${t("submitting")}` : t("submit")}
              color="info"
              clickHandler={handleSubmit(handleUpdate)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default withTranslation()(EditFeature);

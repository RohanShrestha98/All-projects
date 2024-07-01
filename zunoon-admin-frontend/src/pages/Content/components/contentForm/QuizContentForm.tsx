import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import "./quizContentForm.scss";
import InputField from "../../../../components/InputField/InputField";
import { withTranslation } from "react-i18next";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { optionType } from "../../../../@types/option";
import http from "../../../../utils/http";
import config from "../../../../config";
import CustomCreatableSelect from "../../../../components/CustomSelect/CustomCreatableSelect";
import { PATH } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import toast from "../../../../utils/toast";
import AddQuestionComponent from "./AddQuestionComponent";
import { InfiniteScrollSelect } from "../../../../components/CustomSelect/InfiniteScrollSelect";
import GenerateListOptions from "../../../School/components/schoolForm/SelectOptions";
import httpMethods from "../../../../utils/http";
const contentApi = config.endpoints.api.content;
const quizApi = config.endpoints.api.quiz;

const QuizContentForm = ({
  id,
  data,
  editform,
  handleCancel,
  isSubmitting,
  fetchNewContentData,
  currentPageNumber,
  showEditModal,
  handlePageChange,
  setShowEditModal,
  type,
  t,
}: any) => {
  const { supplyContentTypeOptions } = GenerateListOptions();
  const [loading, setLoading] = useState(false);
  const [previewContentDetails, setPreviewContentDetails] = useState<any>();
  const [contentLengthChange, setContentLengthChange] = useState<boolean>(false);

  useEffect(() => {
    async function getContentDetailsData() {
      setLoading(true)
      try {
        const response = await httpMethods.GET(`${contentApi.details(data?.id)}`, "");
        setPreviewContentDetails(response?.data?.data)
        setLoading(false)
      }
      catch (err) {
        console.log("err", err)
        setLoading(false)
      }
    }
    getContentDetailsData()
  }, [data?.id, contentLengthChange])

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm(
    editform
      ? {
        defaultValues: {
          id: data && data.id,
          masterContent: data && data.masterContent,
          questionTitle: data && data.questionTitle,
          abilityCategory: data && data.abilityCategory,
          supplyContentType: data && data.supplyContentType,
          questionType: data && data.questionType,
          taxonomy: data && data.taxonomy,
          description: data && data.description,
          title: data && data.title,
          question: data && data.question,
          answer1: data && data.answer1,
          answer: data && data.answer,
        },
      }
      : {
        defaultValues: {
          masterContent: id,
        },
      },
  );

  const { error, fetchedData, fetchNewData } = useFetch();

  const navigate = useNavigate();

  const [ability, setAbility] = useState<optionType[] | null>();
  const [selectedAbility, setSelectedAbility] = useState<any>();
  const [keyWords, setKeyWords] = useState<any>([]);
  const [addedQuestion, setAddedQuestion] = useState<any>([]);
  const [editingQuestion, setEditingQuestion] = useState<any>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isFinalExam, setIsFinalExam] = useState<boolean>(editform ? data?.isFinalExam : false);
  const [editQuestion, setEditQuestion] = useState<boolean>(false);
  const [canAddQuestion, setCanAddQuestion] = useState<boolean>(true);
  const [isUpdateAddButtonClick, setIsUpdateAddButtonClick] = useState<boolean>(true);
  const [addQuestionUpdateClick, setAddQuestionUpdateClick] = useState<boolean>(false);
  const [keyWordsError, setKeyWordsError] = useState("");
  const [addQuestionCount, setAddQuestionCount] = useState(1);
  const [addQuestionInUpdateCount, setAddQuestionInUpdateCount] = useState(0);

  const [selectedSupplyContentType, setSelectedSupplyContentType] = useState<optionType | null>();
  const [questions, setQuestions] = useState(Array(addQuestionCount).fill(""));
  const [addQuestionInUpdate, setAddQuestionInUpdate] = useState(
    Array(addQuestionInUpdateCount).fill(""),
  );
  const [examQuestion, setExamQuestion] = useState([]);

  useEffect(() => {
    fetchNewData(contentApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData?.data) {
      setExamQuestion(fetchedData.data);
    } else {
      setExamQuestion(null);
    }
  }, [fetchedData]);

  const handleAddQuestion = data => {
    if (editform && data && canAddQuestion) {
      setCanAddQuestion(false);
      setIsUpdateAddButtonClick(true);
      setAddQuestionInUpdate([...addQuestionInUpdate, ""]);
      setAddQuestionInUpdateCount(addQuestionInUpdateCount + 1);
    } else if (!editform) {
      setQuestions([...questions, ""]);
      setAddQuestionCount(addQuestionCount + 1);
    }
  };

  const handleAbilitySelectChange = (data, e) => {
    setSelectedAbility(data);
    setValue("abilityCategory", data.value);
  };

  const handleSupplyContentTypeSelectChange = (data, e) => {
    setSelectedSupplyContentType(data);
    setValue("supplyContentType", data.value);
  };

  useEffect(() => {
    if (editform) {
      if (data?.keywords?.length) {
        setKeyWords(data?.keywords?.map(word => word));
      }
    }
  }, [data, editform, setKeyWords]);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const abilityCategoryResponse = await http.GET(`${contentApi.abilityList}?page=${page}`, "");
    if (!abilityCategoryResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const abilityOptions = abilityCategoryResponse?.data?.data?.map(ability => ({
      value: ability.id,
      label: ability.type,
    }));
    const filteredOptions = searchQuery
      ? abilityOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : abilityOptions;

    const hasMore =
      abilityCategoryResponse?.data?.totalPage > abilityCategoryResponse?.data?.currentPage;

    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  useEffect(() => {
    if (editform && ability?.length > 0) {
      const selectedAbility = ability.find(each => each.value === data?.abilityCategory);
      setSelectedAbility(selectedAbility);
    }
    if (editform && supplyContentTypeOptions?.length) {
      const selectedSupplyContentType = supplyContentTypeOptions.find(
        each => each.value == data?.supplyContentType,
      );
      setSelectedSupplyContentType(selectedSupplyContentType);
    }
  }, [editform, data, ability]);

  const handleClickSubmit = data => {
    const transformObject = inputObject => {
      const outputObject = {
        title: inputObject?.title,
        isFinalExam: isFinalExam,
        contentType: "questionnaire",
        bloomsTaxonomyLevel: data?.bloomsTaxonomyLevelId,
        abilityCategory: inputObject?.abilityCategory,
        keywords: keyWords,
        supplyContentType: inputObject?.supplyContentType,
        hasSubContent: false,
        questions: [],
      };

      for (let i = 1; i <= questions?.length; i++) {
        const questionKey = `_${i}question`;
        const typeKey = `_${i}type`;
        const bloomsKey = `_${i}bloomsTaxonomyLevelId`;
        const pointKey = `_${i}point`;
        const fileKey = `_${i}thumbnail`;

        const question = {
          type: inputObject[typeKey],
          question: inputObject[questionKey],
          point: parseInt(inputObject[pointKey]),
          file: inputObject[fileKey],
          bloomsTaxonomyLevelId: inputObject[bloomsKey],
          isTrue: inputObject?.isTrue,
          answers: [],
        };

        for (let j = 1; j <= 8; j++) {
          const answerKey = `_${i}answer${j}`;
          const isCorrectKey = `_${i}isCorrect${j}`;

          if (inputObject[answerKey]) {
            question.answers.push({
              answer: inputObject[answerKey],
              isCorrect: inputObject[isCorrectKey],
            });
          }
        }
        outputObject.questions.push(question);
      }
      return outputObject;
    };

    const transformedObject = transformObject(data);

    http
      .POST(contentApi.create, transformedObject)
      .then(() => {
        toast.success(` ${t("questions")} ${t("added_successfully")}`);
        navigate(PATH.CONTENT);
      })
      .catch(err => {
        toast.error(err);
        setKeyWordsError(err?.response?.data?.errors?.keywords);
      })
      .finally(() => {
        // setIsSubmiting(false);
      });
  };

  const handleClickUpdate = data => {
    const formData = {
      contentType: "questionnaire",
      abilityCategory: data?.abilityCategory,
      keywords: keyWords,
      isFinalExam: isFinalExam,
      supplyContentType: data?.supplyContentType,
      title: data?.title,
    };
    http
      .PATCH(contentApi.update(data.id), formData)
      .then(() => {
        toast.success(` ${t("content")} ${t("updated_successfully")}`);
        setShowEditModal(false)
        // navigate(PATH.CONTENT);
        handlePageChange(currentPageNumber)
      })
      .catch(err => {
        toast?.error(err);
      })
      .finally(() => {
        // setIsSubmiting(false);
      });
  };

  const handleReset = () => {
    reset();
    setSelectedAbility(null);
    setSelectedSupplyContentType(null);
    setKeyWords(null);
  };


  return (
    <>
      <form
        className="content-form-container"
        onSubmit={handleSubmit(editform ? handleClickUpdate : handleClickSubmit)}
      >
        <div className="basic_form_container">
          <div className="is_final_title">
            <h1>{t("basic_information")}</h1>
            <div className="is_final_title">
              <p>{`${t("unit")} ${t("exam")}`}</p>
              <input type="checkbox" defaultChecked={isFinalExam} onClick={() => setIsFinalExam(!isFinalExam)} />
            </div>
          </div>

          <div className="basic_title_field">
            <InputField
              required
              type="text"
              label={`${t("question_title")}`}
              placeholder={`${t("enter")} ${t("question_title")}`}
              {...register("title")}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            <div className="row-container">
              <div className="fieldAndValidate">
                <InfiniteScrollSelect
                  id="abilityCategory"
                  required={true}
                  register={register}
                  name="abilityCategory"
                  label={t("sidebar_ability_category")}
                  value={selectedAbility}
                  handleChange={(e, data) => {
                    handleAbilitySelectChange(e, data);
                  }}
                  loadOptions={loadOptions}
                  disabled={false}
                />
                {errors?.abilityCategory?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
          </div>
          <div className="basic_title_field">
            <div className="row-container">
              <div className="fieldAndValidate">
                <CustomCreatableSelect
                  required={false}
                  id="keywords"
                  register={register}
                  name="keywords"
                  label={t("keywords")}
                  tags={keyWords}
                  setTags={setKeyWords}
                  isSubmitted={isSubmitted}
                />
                <p>{keyWordsError}</p>
              </div>
            </div>

            <div className="row-container">
              <div className="fieldAndValidate">
                <CustomSelect
                  id="supplyContentType"
                  required={true}
                  register={register}
                  name="supplyContentType"
                  label={t("supply_content_type")}
                  placeholder={`${t("select")} ${t("supply_content_type")}`}
                  value={selectedSupplyContentType}
                  handleChange={(e, data) => {
                    handleSupplyContentTypeSelectChange(e, data);
                  }}
                  options={supplyContentTypeOptions}
                  disabled={false}
                />
                {errors?.supplyContentType?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="add_questions">
          <div className="questions_title_addQuestion">
            {!editform ? <h1>{t("questions")} </h1> : <p>{t("questions")} </p>}
            <div className="button-wrapper">
              <Button
                color="success"
                buttonName={`+ ${t("add")} ${t("questions")}`}
                clickHandler={e => {
                  e.preventDefault();
                  handleAddQuestion(1);
                }}
              />
            </div>
          </div>
          <div className="question_container">
            {addQuestionInUpdate?.map((_, questionIndex: number) => {
              return (
                <AddQuestionComponent
                  isUpdateAddButtonClick={isUpdateAddButtonClick}
                  setIsUpdateAddButtonClick={setIsUpdateAddButtonClick}
                  key={questionIndex}
                  questionContentId={data?.id}
                  setCanAddQuestion={setCanAddQuestion}
                  fetchNewContentData={fetchNewContentData}
                  questionIndex={questionIndex}
                  setValue={setValue}
                  register={register}
                  currentPageNumber={currentPageNumber}
                  errors={errors}
                  handlePageChange={handlePageChange}
                  editform={editform}
                  setQuestions={setQuestions}
                  questions={questions}
                  setContentLengthChange={setContentLengthChange}
                  contentLengthChange={contentLengthChange}
                  data={undefined}
                  updateQuestion={undefined}
                />
              );
            })}
            {questions?.map((_, questionIndex: number) => {
              return (
                //@ts-ignore
                <AddQuestionComponent
                  updateQuestion={previewContentDetails?.questions}
                  key={questionIndex}
                  currentPageNumber={currentPageNumber}
                  setContentLengthChange={setContentLengthChange}
                  contentLengthChange={contentLengthChange}
                  handlePageChange={handlePageChange}
                  setCanAddQuestion={setCanAddQuestion}
                  questionIndex={questionIndex}
                  setValue={setValue}
                  register={register}
                  errors={errors}
                  editform={editform}
                  setQuestions={setQuestions}
                  questions={questions}
                />
              );
            })}
          </div>
          <div className="row-container">
            <div className="button-wrapper">
              {!editform && (
                <Button
                  type="button"
                  color="danger"
                  buttonName={t("clear")}
                  clickHandler={() => handleReset()}
                />
              )}
              {editform && (
                <Button
                  type="button"
                  color="danger"
                  buttonName={t("clear")}
                  clickHandler={() => {
                    setIsSubmitted(false);
                    handleCancel();
                  }}
                />
              )}
              <Button
                type="submit"
                color="success"
                buttonName={
                  isSubmitting
                    ? t("submitting")
                    : editform
                      ? t(`update_questionaire`)
                      : t(`add_questionaire`)
                }
                disabled={isSubmitting ? true : false}
                clickHandler={e => {
                  setIsSubmitted(true);
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
//@ts-ignore
export default withTranslation()(QuizContentForm);

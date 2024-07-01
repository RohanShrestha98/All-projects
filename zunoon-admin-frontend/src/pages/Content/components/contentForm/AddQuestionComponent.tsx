import { useEffect, useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { optionType } from "../../../../@types/option";
import { convertToOptions } from "../../../../utils/convertToSelectOptions";
import http from "../../../../utils/http";
import config from "../../../../config";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { withTranslation } from "react-i18next";
import Textarea from "../../../../components/Textarea/Textarea";
import MCQAddQuestionCOmponent from "./MCQAddQuestionCOmponent";
import ChooseOneAddQuestionComponent from "./ChooseOneAddQuestionComponent";
import "./quizContentForm.scss";
import { useLocation } from "react-router-dom";
import InputField from "../../../../components/InputField/InputField";
import toast from "../../../../utils/toast";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import ImageInput from "../../../../components/ImageInput/ImageInput";
import MathJax from "../../../../components/MathJsxx/MathJsx";
import GenerateListOptions from "../../../School/components/schoolForm/SelectOptions";

interface IEditQuestion {
  id: string;
  type: string;
  question: string;
  point: number;
  bloomsTaxonomyLevelId: string;
}

const contentApi = config.endpoints.api.content;
const quizApi = config.endpoints.api.quiz;
const fileUploadApi = config.endpoints.api.file;

const AddQuestionComponent = ({
  questionIndex,
  data,
  t,
  setValue,
  register,
  isUpdateAddButtonClick,
  setIsUpdateAddButtonClick,
  fetchNewContentData,
  currentPageNumber,
  setContentLengthChange,
  contentLengthChange,
  errors,
  handlePageChange,
  questions,
  setQuestions,
  updateQuestion,
  questionContentId,
  setCanAddQuestion,
  editform,
}) => {
  const location = useLocation();
  const isAddContent = location.pathname?.includes("add-content");
  const { questionTypeOptions } = GenerateListOptions();
  const [taxonomyData, setTaxonomyData] = useState<any>();
  const [taxonomyOptions, setTaxonomyOptions] = useState<optionType[] | null>();
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<optionType | null>();
  const [addAnswerCount, setAddAnswerCount] = useState(4);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [addChooseAnswerCount, setAddChooseAnswerCount] = useState(2);
  const [selectedQuestionType, setSelectedQuestionType] = useState<optionType[] | null>();
  const [answers, setAnswers] = useState(Array(addAnswerCount).fill(true));
  const [chooseAnswers, setChooseAnswers] = useState(Array(addAnswerCount).fill(true));
  const [currentPosition, setCurrentPosition] = useState<number>();
  const [showQuestionDeleteModal, setShowQuestionDeleteModal] = useState<boolean>(false);
  const { handleSubmit, register: registerEach, setValue: setValueAddQuestion, watch } = useForm();
  const [editQuestionData, setEditQuestionData] = useState<IEditQuestion>();
  const [thumbnailUrl, setThumbnailUrl] = useState();

  const [selectedQuestionIdTitle, setSelectedQuestionIdTitle] = useState({
    id: "",
    title: "",
  });

  const [selectedUpdateAddTaxonomy, setSelectedUpdateAddTaxonomy] = useState("");
  const [selectedUpdateQuestionType, setSelectedUpdateQuestionType] = useState("");
  const [question, setQuestion] = useState("");

  const handleMCQAddAnswer = () => {
    setAnswers([...answers, ""]);
    setAddAnswerCount(addAnswerCount + 1);
  };
  const watchAddedQuestion = watch();
  const handleChooseAddAnswer = () => {
    setChooseAnswers([...chooseAnswers, ""]);
    setAddChooseAnswerCount(addChooseAnswerCount + 1);
  };

  const handleQuestionTypeSelectChange = (data, e, questionIndex) => {
    setSelectedQuestionType([data]);
    setSelectedUpdateQuestionType(data?.value);
    setValue(`_${questionIndex + 1}type`, `${data?.value}`);
  };

  const handlePointChange = e => {
    e.target.value = e.target.value?.trimStart();
    setValue(`_${questionIndex + 1}point`, e.target.value);
  };

  const handleQuestionTrashClick = indexToRemove => {
    if (questions?.length > 1) {
      const newQuestions = questions.filter((_, index) => index !== indexToRemove);
      setQuestions(newQuestions);
      toast.success(`${t("question_no")} ${indexToRemove + 1} ${t("removed")}`);
    } else {
      toast.error(`${t("at_least_one_question_required")}`);
    }
  };

  const handleTaxonomyChange = (data, e, questionIndex) => {
    setSelectedUpdateAddTaxonomy(data?.value);
    setEditQuestionData(prev => ({
      ...prev,
      bloomsTaxonomyLevelId: data.value,
    }));
    setSelectedTaxonomy(data);
    setValue(`_${questionIndex + 1}bloomsTaxonomyLevelId`, `${data?.value}`);
  };

  useEffect(() => {
    async function getData() {
      const taxonomyResponse = await http.GET(contentApi?.bloomList, "");
      setTaxonomyData(taxonomyResponse?.data?.data);
      const taxonomyOptions = taxonomyResponse && convertToOptions(taxonomyResponse?.data?.data);
      setTaxonomyOptions(taxonomyOptions);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!isAddContent && taxonomyOptions?.length) {
      const selectedTaxonomy = taxonomyOptions.find(
        each => each.value === data?.bloomsTaxonomyLevelID,
      );
      setSelectedTaxonomy(selectedTaxonomy);
    }

    if (updateQuestion?.length && !isAddContent) {
      const defaultQuestionType = updateQuestion.map(item => {
        const questionType = questionTypeOptions.find(type => type.value === item.type);
        return {
          label: questionType.label,
          value: item.type,
        };
      });
      setSelectedQuestionType(defaultQuestionType);
    }
  }, [data, taxonomyOptions, updateQuestion, isAddContent]);

  useEffect(() => {
    if (!isAddContent) {
      const filterTaxonomy =
        taxonomyData && taxonomyData?.find(item => item?.id === selectedTaxonomy?.value);
      setEditQuestionData(prev => ({
        ...prev,
        point: parseInt(filterTaxonomy?.points),
      }));
      setValue(`updateQuestion[${currentPosition - 1}]point`, parseInt(filterTaxonomy?.points));
    } else {
      const filterTaxonomy =
        taxonomyData && taxonomyData?.find(item => item?.id === selectedTaxonomy?.value);
      setValue(`_${questionIndex + 1}point`, filterTaxonomy?.points);
    }
  }, [selectedTaxonomy]);

  const handleEachQuestionAdd = () => {
    const formData = {
      ...watchAddedQuestion,
      point: parseInt(watchAddedQuestion?.point),
      bloomsTaxonomyLevelId: selectedUpdateAddTaxonomy,
      type: selectedUpdateQuestionType,
    };
    const transformObject = inputObject => {
      const outputObject = {
        ...inputObject,
        answers: [],
      };

      for (let i = 1; i <= answers?.length; i++) {
        const answerKey = `_1answer${i}`;
        const isCorrectKey = `_1isCorrect${i}`;

        const question = {
          isCorrect: inputObject[isCorrectKey],
          answer: inputObject[answerKey],
        };

        outputObject.answers.push(question);
      }
      return outputObject;
    };

    const transformedObject = transformObject(formData);

    const postData = {
      question: transformedObject.question,
      type: transformedObject.type,
      point: transformedObject.point,
      file: transformedObject.thumbnail,
      isTrue: transformedObject.isTrue,
      bloomsTaxonomyLevelId: transformedObject.bloomsTaxonomyLevelId,
      answers: transformedObject.answers,
    };

    async function eachAdd() {
      try {
        const response = await http.POST(
          `${quizApi.addOneQuestion}/${questionContentId}`,
          postData,
        );
        setIsUpdateAddButtonClick(false)
        setCanAddQuestion(true)
        // setQuestions([...questions, ""])
        handlePageChange(currentPageNumber)
        setContentLengthChange(!contentLengthChange)
        toast.success(`${t("question")}  ${t("added_successfully")}`);
        fetchNewContentData(contentApi.list);
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
    }
    eachAdd();
  };

  const handleEachQuestionUpdate = () => {
    async function pushUpdate() {
      try {
        const response = await http.PATCH(
          `${quizApi.questionUpdate}/${editQuestionData?.id}/`,
          editQuestionData,
        );
        toast.success(` ${t("question")} ${t("updated_successfully")}`);
        setCurrentPosition(0);
        setContentLengthChange(prev => !prev)
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
    }
    pushUpdate();
  };

  const handleEachQuestionDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(quizApi.questionDelete(id));
      toast.success(`${t("question")}${t("deleted_successfully")}`);
      // setContentLengthChange(!contentLengthChange)
      setContentLengthChange(prev => !prev)

    } catch (error) {
      console.log("error", error)
      // toast.error(error);
    }
  };

  const handleEachAnswerUpdate = data => {
    const updateAnswerData = {
      answer: data?.answer,
      isCorrect: data?.isCorrect,
    };
    async function pushUpdate() {
      try {
        const response = await http.PATCH(`${quizApi.answerUpdate}/${data.id}/`, updateAnswerData);
        if (response.status === 200) {
          toast.success(`  ${t("answer")}${t("updated_successfully")}`);
        } else {
          toast.error(new Error(`${t("error_in_updating")} ${t("answer")}`));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
    }
    pushUpdate();
  };

  const handleEachAnswerDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(quizApi.answerDelete(id));
      if (response.status === 200) {
        toast.success(`${t("question")} ${t("deleted_successfully")}`);
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("question")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUploadImage = async (index, e) => {
    setIsUploading(true);
    const file = e.target.files[0];
    const fileType = file?.type?.split("/")?.[0];
    try {
      const response = await http.POST_FILE(fileUploadApi.fileUpload, {
        source: "question",
        type: fileType,
        file: file,
      });
      setIsUploading(false);
      setValue(`_${index}thumbnail`, response?.data?.data, { shouldDirty: true });
      setValueAddQuestion(`thumbnail`, response?.data?.data, { shouldDirty: true });
    } catch (err) {
      toast.error(err?.message?.toString());
      setIsUploading(false);
    }
  };

  return (
    <>
      {isAddContent ? (
        <div key={questionIndex} className="questions_form_container">
          <div className="question_heading">
            <h1>
              {t("question")} {questionIndex + 1}
            </h1>
            <div className="question_edit_delete_container">
              {isUpdateAddButtonClick ? (
                <i
                  className="bx bx-check tick question_edit_button"
                  style={{ fontSize: "large", fontWeight: "bolder" }}
                  onClick={() => {
                    handleEachQuestionAdd();
                  }}
                ></i>
              ) : (
                questions?.length > 1 && (
                  <BiTrash
                    onClick={() => {
                      handleQuestionTrashClick(questionIndex);
                    }}
                    size={30}
                    className="question_trash_button"
                  />
                )
              )}
            </div>
          </div>
          <div>
            <div className="questions_title_field">
              <div className="row-container">
                <div className="fieldAndValidate">
                  <CustomSelect
                    id="type"
                    register={register}
                    name={`type`}
                    label={t("question_type")}
                    value={selectedQuestionType?.[0]}
                    handleChange={(e, data) => {
                      handleQuestionTypeSelectChange(e, data, questionIndex);
                    }}
                    options={questionTypeOptions}
                    disabled={false}
                  />
                  {errors?.type?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
              <div className="row-container">
                <div className="fieldAndValidate">
                  <CustomSelect
                    id="bloomsTaxonomyLevelId"
                    required={false}
                    register={register}
                    name="bloomsTaxonomyLevelId"
                    label={t("taxonomy")}
                    value={selectedTaxonomy}
                    handleChange={(e, data) => {
                      handleTaxonomyChange(e, data, questionIndex);
                    }}
                    options={taxonomyOptions}
                    disabled={false}
                  />
                  {errors?.bloomsTaxonomyLevelId?.type === "required" && (
                    <p>{t("field_required")}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="questions_title_field">
              <div className="row-container">
                <div className="fieldAndValidate">
                  <InputField
                    required={!editform}
                    type="number"
                    label={`${t("point")}`}
                    placeholder={`${t("Enter point")}`}
                    {...register(`_${questionIndex + 1}point`)}
                    onChange={e => handlePointChange(e)}
                  />
                  {errors?.point?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
              <div className="row-container" style={{ marginTop: "24px" }}>
                <ImageInput
                  editform={editform}
                  question={true}
                  setImage={setThumbnailUrl}
                  isUploading={isUploading}
                  {...register(`_${questionIndex + 1}thumbnail`, {
                    required: false,
                  })}
                  onChange={e => handleUploadImage(questionIndex + 1, e)}
                />
              </div>
            </div>
            <div className="questions_title_field">
              <div className="row-container">
                <div className="fieldAndValidate">
                  <Textarea
                    required={!editform}
                    label={t("question_title")}
                    rows={5}
                    setValue={setQuestion}
                    isMathJsx={true}
                    questionIndex={questionIndex}
                    placeholder={t("Question title")}
                    {...register(`_${questionIndex + 1}question`)}
                    onChange={e => {
                      e.target.value = e?.target?.value?.trimStart();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {selectedQuestionType?.some(item => item?.value === "MCQS") ? (
            <div>
              <div className="add_answer">
                <p onClick={() => handleMCQAddAnswer()}>
                  + {t("add")} {t("answer")}
                </p>
              </div>
              {answers?.map((_, index: number) => {
                return (
                  <MCQAddQuestionCOmponent
                    key={index}
                    questionId={questionIndex}
                    answerId={index}
                    register={register}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                );
              })}
            </div>
          ) : selectedQuestionType?.some(item => item.value === "CHOOSECORRECT") ? (
            <div>
              <div className="add_answer">
                <p onClick={() => handleChooseAddAnswer()}>+ {t("add_answer")}</p>
              </div>
              {chooseAnswers?.map((_, answerIndex: number) => {
                return (
                  <ChooseOneAddQuestionComponent
                    key={answerIndex}
                    questionId={questionIndex}
                    answerId={answerIndex}
                    register={register}
                    chooseAnswers={chooseAnswers}
                    setChooseAnswers={setChooseAnswers}
                  />
                );
              })}
            </div>
          ) : (
            selectedQuestionType?.some(item => item.value === "TRUEFALSE") && (
              <div className="trueFalseCheckbox">
                <p style={{ marginTop: "4px" }}>{t("is_true")}</p>
                <input type="checkbox" {...register("isTrue")} />{" "}
              </div>
            )
          )}
        </div>
      ) : isUpdateAddButtonClick && !isAddContent ? (
        <div key={questionIndex} className="questions_form_container">
          <div className="question_heading">
            <h1>
              {t("question")} {questionIndex + 1}
            </h1>
            <div className="question_edit_delete_container">
              <i
                className="bx bx-check tick question_edit_button"
                style={{ fontSize: "large", fontWeight: "bolder" }}
                onClick={() => {
                  handleEachQuestionAdd();
                }}
              ></i>
            </div>
          </div>
          <div className="questions_title_field">
            <div className="row-container">
              <div className="fieldAndValidate">
                <CustomSelect
                  id="type"
                  register={registerEach}
                  name={`type`}
                  label={t("Question Type")}
                  value={selectedQuestionType?.[0]}
                  handleChange={(e, data) => {
                    handleQuestionTypeSelectChange(e, data, questionIndex);
                  }}
                  options={questionTypeOptions}
                  disabled={false}
                />
                {errors?.type?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
            <div className="row-container">
              <div className="fieldAndValidate">
                <CustomSelect
                  id="bloomsTaxonomyLevelId"
                  required={false}
                  register={registerEach}
                  name="bloomsTaxonomyLevelId"
                  label={t("taxonomy")}
                  value={selectedTaxonomy}
                  handleChange={(e, data) => {
                    handleTaxonomyChange(e, data, questionIndex);
                  }}
                  options={taxonomyOptions}
                  disabled={false}
                />
                {errors?.bloomsTaxonomyLevelId?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
          </div>
          <div className="questions_title_field">
            <div className="row-container">
              <div className="fieldAndValidate">
                <InputField
                  required={!editform}
                  type="number"
                  label={`${t("point")}`}
                  placeholder={`${t("enter_point")}`}
                  {...registerEach(`point`)}
                  onChange={e => handlePointChange(e)}
                />
                {errors?.point?.type === "required" && <p>{t("field_required")}</p>}
              </div>
            </div>
            <div className="row-container">
              <ImageInput
                editform={editform}
                question={true}
                setImage={setThumbnailUrl}
                isUploading={isUploading}
                {...registerEach(`thumbnail`, {
                  required: false,
                })}
                onChange={e => handleUploadImage(questionIndex + 1, e)}
              />
            </div>
          </div>
          <div className="questions_title_field">
            <div className="row-container">
              <div className="fieldAndValidate">
                <Textarea
                  required={!editform}
                  label={t("question_title")}
                  rows={5}
                  setValue={setQuestion}
                  placeholder={t("question_title")}
                  {...registerEach(`question`)}
                  onChange={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
              </div>
            </div>
          </div>
          {selectedQuestionType?.some(item => item?.value === "MCQS") ? (
            <div>
              <div className="add_answer">
                <p onClick={() => handleMCQAddAnswer()}>
                  + {t("add")} {t("answer")}
                </p>
              </div>
              {answers?.map((_, index: number) => {
                return (
                  <MCQAddQuestionCOmponent
                    key={index}
                    questionId={questionIndex}
                    answerId={index}
                    register={registerEach}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                );
              })}
            </div>
          ) : selectedQuestionType?.some(item => item.value === "CHOOSECORRECT") ? (
            <div>
              <div className="add_answer">
                <p onClick={() => handleChooseAddAnswer()}>
                  + {t("add")} {t("answer")}
                </p>
              </div>
              {chooseAnswers?.map((_, answerIndex: number) => {
                return (
                  <ChooseOneAddQuestionComponent
                    key={answerIndex}
                    questionId={questionIndex}
                    answerId={answerIndex}
                    register={registerEach}
                    chooseAnswers={chooseAnswers}
                    setChooseAnswers={setChooseAnswers}
                  />
                );
              })}
            </div>
          ) : (
            selectedQuestionType?.some(item => item.value === "TRUEFALSE") && (
              <div className="trueFalseCheckbox">
                <p style={{ marginTop: "4px" }}>{t("is_true")}</p>
                <input type="checkbox" {...registerEach("isTrue")} />{" "}
              </div>
            )
          )}
        </div>
      ) : (
        <>
          {updateQuestion &&
            updateQuestion?.map((item, id) => {
              return (
                <div key={id} className="questions_form_container">
                  <div className="question_heading">
                    <h1>
                      {t("question")} {id + 1}
                    </h1>
                    <div className="question_edit_delete_container">
                      {currentPosition === id + 1 ? (
                        <i
                          className="bx bx-check tick question_edit_button"
                          style={{ fontSize: "large", fontWeight: "bolder" }}
                          onClick={() => {
                            handleEachQuestionUpdate();
                          }}
                        ></i>
                      ) : (
                        <BiEdit
                          onClick={() => {
                            setCurrentPosition(id + 1);
                            setEditQuestionData(item);
                          }}
                          size={30}
                          className="question_edit_button"
                        />
                      )}
                      <BiTrash
                        onClick={() => {
                          setShowQuestionDeleteModal(true);
                          setSelectedQuestionIdTitle({
                            id: item?.id,
                            title: item?.question,
                          });
                        }}
                        size={30}
                        className="question_trash_button"
                      />
                    </div>
                  </div>
                  <div className="questions_title_field">
                    <div className="row-container">
                      <div className="fieldAndValidate">
                        <CustomSelect
                          id="type"
                          register={register}
                          name={`type`}
                          label={t("Question Type")}
                          defaultValue={questionTypeOptions.filter(
                            qustion => qustion?.value === item?.type,
                          )}
                          disabled={true}
                        />
                        {errors?.type?.type === "required" && <p>{t("field_required")}</p>}
                      </div>
                    </div>
                    <div className="row-container">
                      <div className="fieldAndValidate">
                        <CustomSelect
                          id="bloomsTaxonomyLevelId"
                          required={false}
                          register={register}
                          name={`bloomsTaxonomyLevelId`}
                          label={t("taxonomy")}
                          value={
                            selectedTaxonomy ??
                            taxonomyOptions?.find(
                              taxonomy => taxonomy.value === item?.bloomsTaxonomyLevelId,
                            )
                          }
                          handleChange={(e, data) => {
                            handleTaxonomyChange(e, data, id);
                          }}
                          {...register(`updateQuestion[${id}].bloomsTaxonomyLevelId`, {
                            // required: true,
                          })}
                          options={taxonomyOptions}
                          disabled={currentPosition !== id + 1}
                        />
                        {errors?.bloomsTaxonomyLevelId?.type === "required" && (
                          <p>{t("field_required")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="questions_title_field">
                    <div className="row-container">
                      <div className="fieldAndValidate">
                        <InputField
                          required
                          type="text"
                          label={`${t("point")}`}
                          placeholder={`${t("Enter point")}`}
                          {...register(`updateQuestion[${id}].point`, {
                            // required: true,
                          })}
                          defaultValue={item?.point}
                          onChange={e => {
                            const newValue = e.target.value?.trimStart();
                            const updatedQuestions = [...updateQuestion];
                            updatedQuestions[id].point = parseInt(newValue);
                            setEditQuestionData(prev => ({
                              ...prev,
                              point: parseInt(newValue),
                            }));
                          }}
                          disabled={currentPosition !== id + 1}
                        />
                        {errors?.point?.type === "required" && <p>{t("field_required")}</p>}
                      </div>
                    </div>
                    <div className="row-container">{""}</div>
                  </div>
                  <div className="questions_title_field">
                    <div className="row-container">
                      <div className="fieldAndValidate">
                        <Textarea
                          required
                          label={t("question_title")}
                          rows={5}
                          placeholder={t("Question title")}
                          defaultValue={item?.question}
                          {...register(`updateQuestion[${id}].question`, {
                            // required: true,
                          })}
                          onChange={e => {
                            const newValue = e.target.value?.trimStart();
                            const updatedQuestions = [...updateQuestion];
                            updatedQuestions[id].question = newValue;
                            setEditQuestionData(prev => ({
                              ...prev,
                              question: newValue,
                            }));
                          }}
                          disabled={currentPosition !== id + 1}
                        />
                      </div>
                    </div>
                  </div>
                  {item.type === "MCQS" ? (
                    <div>
                      <div className="add_answer">
                        <p onClick={() => handleMCQAddAnswer()}>
                          + {t("add")} {t("answer")}
                        </p>
                      </div>
                      {item?.answers?.map((item: any, index: number) => {
                        return (
                          <MCQAddQuestionCOmponent
                            key={index}
                            questionId={index + 1}
                            answerId={index + 1}
                            register={register}
                            answers={[item]}
                            setAnswers={setAnswers}
                            isEditQuiz={true}
                            handleDeleteAnswer={handleEachAnswerDelete}
                            handleUpdateAnswer={handleEachAnswerUpdate}
                          />
                        );
                      })}
                    </div>
                  ) : item?.type === "CHOOSECORRECT" ? (
                    <div>
                      <div className="add_answer">
                        <p onClick={() => handleChooseAddAnswer()}>
                          + {t("add")} {t("answer")}
                        </p>
                      </div>
                      {item?.answers?.map((item, index: number) => {
                        return (
                          <ChooseOneAddQuestionComponent
                            key={index}
                            questionId={questionIndex}
                            answerId={index + 1}
                            register={register}
                            chooseAnswers={[item]}
                            setChooseAnswers={setChooseAnswers}
                            isEditQuiz={true}
                            handleDeleteAnswer={handleEachAnswerDelete}
                            handleUpdateAnswer={handleEachAnswerUpdate}
                          />
                        );
                      })}
                    </div>
                  ) : item?.type === "TRUEFALSE" ? (
                    <div className="trueFalseCheckbox">
                      <p style={{ marginTop: "4px" }}>{t("is_true")}</p>
                      <input
                        type="checkbox"
                        {...register("isTrue")}
                        defaultChecked={item?.isTrue}
                      />{" "}
                    </div>
                  ) : null}
                </div>
              );
            })}
        </>
      )}
      <DeleteModal
        isDeactivate={false}
        show={showQuestionDeleteModal}
        handleClose={() => setShowQuestionDeleteModal(false)}
        id={selectedQuestionIdTitle?.id}
        name={selectedQuestionIdTitle?.title}
        handleDelete={handleEachQuestionDelete}
      />
    </>
  );
};

export default withTranslation()(AddQuestionComponent);

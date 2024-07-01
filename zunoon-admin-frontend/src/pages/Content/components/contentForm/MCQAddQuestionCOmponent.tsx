import React, { useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import { BiEdit, BiTrash } from "react-icons/bi";
import { withTranslation } from "react-i18next";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal";

interface IMcq {
  answerId?: number;
  register?: any;
  answers?: any;
  questionId?: number;
  t?: Function;
  setAnswers?: any;
  isEditQuiz?: boolean;
  editform?: boolean;
  handleDeleteAnswer?: Function;
  handleUpdateAnswer?: Function;
}

const MCQAddQuestionCOmponent = ({
  answerId,
  register,
  answers,
  setAnswers,
  questionId,
  editform,
  isEditQuiz = false,
  handleDeleteAnswer,
  handleUpdateAnswer,
  t,
}: IMcq) => {
  const [showAnswerDeleteModal, setShowAnswerDeleteModal] = useState<boolean>(false);
  const [eachAnswerUpdateClick, setEachAnswerUpdateClick] = useState<boolean>(false);
  const [currentAnswerId, setCurrentAnswerId] = useState();

  const handleMCQTrashClick = answerIdToRemove => {
    const newAnswers = answers.filter((_, answerId) => answerId !== answerIdToRemove);
    setAnswers(newAnswers);
  };

  return (
    <>
      {isEditQuiz ? (
        <div key={answerId} className="basic_title_field">
          <InputField
            defaultValue={answers?.[0]?.answer}
            required={!editform}
            type="text"
            label={`Answer ${answerId}`}
            placeholder={`Answer ${answerId}`}
            {...register(`_${questionId}answer${answerId}.answers`)}
            onChange={e => {
              const newValue = e.target.value.trimStart();
              const updatedAnswers = [...answers];
              updatedAnswers[0].answer = newValue;
            }}
            disabled={currentAnswerId !== answerId}
          />
          <div className="row-container">
            <div className="is_correct_answer_delete">
              <div className="is_correct_answer">
                <p>{t("is_answer_correct")}? </p>
                <input
                  type="checkbox"
                  {...register(`_${questionId + 1}isCorrect${answerId + 1}`)}
                  defaultChecked={answers[0]?.isCorrect}
                  onChange={e => {
                    const newValue = e.target.checked;
                    const updatedAnswers = [...answers];
                    updatedAnswers[0].isCorrect = newValue;
                  }}
                  disabled={currentAnswerId !== answerId}
                />
              </div>
              <div className="question_edit_delete_container">
                {eachAnswerUpdateClick ? (
                  <i
                    className="bx bx-check tick question_edit_button"
                    style={{ fontSize: "large", fontWeight: "bolder" }}
                    onClick={() => {
                      handleUpdateAnswer(answers[0]);
                    }}
                  ></i>
                ) : (
                  <BiEdit
                    onClick={() => {
                      setEachAnswerUpdateClick(prev => !prev);
                      //@ts-ignore
                      setCurrentAnswerId(answerId);
                    }}
                    size={30}
                    className="question_edit_button"
                  />
                )}
                <BiTrash
                  onClick={() => {
                    setShowAnswerDeleteModal(true);
                  }}
                  size={30}
                  className="question_trash_button"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div key={answerId} className="basic_title_field">
          <InputField
            required={!editform}
            type="text"
            label={`Answer ${answerId + 1}`}
            placeholder={`Answer ${answerId + 1}`}
            {...register(`_${questionId + 1}answer${answerId + 1}`)}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          <div className="row-container">
            <div className="is_correct_answer_delete">
              <div className="is_correct_answer">
                <p>Is correct answer? </p>
                <input
                  type="checkbox"
                  {...register(`_${questionId + 1}isCorrect${answerId + 1}`)}
                />
              </div>
              <div className="question_edit_delete_container">
                <BiTrash
                  onClick={() => handleMCQTrashClick(answerId)}
                  size={30}
                  className="question_trash_button"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <DeleteModal
        isDeactivate={false}
        show={showAnswerDeleteModal}
        handleClose={() => setShowAnswerDeleteModal(false)}
        id={answers?.id}
        name={answers?.answer}
        handleDelete={handleDeleteAnswer}
      />
    </>
  );
};
export default withTranslation()(MCQAddQuestionCOmponent);

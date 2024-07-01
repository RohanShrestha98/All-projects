import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import InputField from "../../../../components/InputField/InputField";
import { BiEdit, BiTrash } from "react-icons/bi";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal";

interface IChooose {
  answerId?: number;
  register?: any;
  chooseAnswers?: any;
  questionId?: number;
  t?: Function;
  setChooseAnswers?: any;
  isEditQuiz?: boolean;
  editform?: boolean;
  handleDeleteAnswer?: Function;
  handleUpdateAnswer?: Function;
}

function ChooseOneAddQuestionComponent({
  answerId,
  register,
  chooseAnswers,
  setChooseAnswers,
  questionId,
  editform,
  isEditQuiz = false,
  handleDeleteAnswer,
  handleUpdateAnswer,
}: IChooose) {
  const [showAnswerDeleteModal, setShowAnswerDeleteModal] = useState<boolean>(false);
  const [eachAnswerUpdateClick, setEachAnswerUpdateClick] = useState<boolean>(false);
  const [currentAnswerId, setCurrentAnswerId] = useState();

  const handleChooseTrashClick = indexToRemove => {
    const newAnswers = chooseAnswers.filter((_, index) => index !== indexToRemove);
    setChooseAnswers(newAnswers);
  };

  const {t} = useTranslation();

  return (
    <>
      {isEditQuiz ? (
        <div key={answerId} className="basic_title_field">
          <InputField
            defaultValue={chooseAnswers?.[0]?.answer}
            required={!editform}
            type="text"
            label={`${t("answer")} ${answerId}`}
            placeholder={`${t("answer")} ${answerId}`}
            {...register(`_${questionId}answer${answerId}.answers`)}
            onChange={e => {
              const newValue = e.target.value.trimStart();
              const updatedAnswers = [...chooseAnswers];
              updatedAnswers[0].answer = newValue;
            }}
            disabled={currentAnswerId !== answerId}
          />
          <div className="row-container">
            <div className="is_correct_answer_delete">
              <div className="is_correct_answer">
                <p>Is true? </p>
                <input
                  type="checkbox"
                  {...register(`_${questionId + 1}isCorrect${answerId + 1}`)}
                  defaultChecked={chooseAnswers[0]?.isCorrect}
                  onChange={e => {
                    const newValue = e.target.checked;
                    const updatedAnswers = [...chooseAnswers];
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
                      handleUpdateAnswer(chooseAnswers?.[0]);
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
            label={`${t("answer")} ${answerId + 1}`}
            placeholder={`${t("answer")} ${answerId + 1}`}
            {...register(`_${questionId + 1}answer${answerId + 1}`)}
            onKeyUp={e => {
              e.target.value = e?.target?.value?.trimStart();
            }}
          />
          <div className="row-container">
            <div className="is_correct_answer_delete">
              <div className="is_correct_answer">
                <p>Is true? </p>
                <input
                  type="checkbox"
                  {...register(`_${questionId + 1}isCorrect${answerId + 1}`)}
                />
              </div>
              <div className="question_edit_delete_container">
                <BiTrash
                  onClick={() => handleChooseTrashClick(answerId)}
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
        id={chooseAnswers?.id}
        name={chooseAnswers?.answer}
        handleDelete={handleDeleteAnswer}
      />
    </>
  );
}

export default withTranslation()(ChooseOneAddQuestionComponent);

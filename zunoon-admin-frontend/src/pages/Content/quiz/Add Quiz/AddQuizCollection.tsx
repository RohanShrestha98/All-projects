import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AddQuizForm from "./AddQuizForm";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../../components/Button/Button";

import "./AddQuizCollection.scss";
import { useTranslation } from "react-i18next";

const answerPrototype = {
  question: "",
  description: "",
  link: "",
  answers: [
    {
      answer: "",
      description: "",
      link: "",
      is_correct: true
    },
    {
      answer: "",
      description: "",
      link: "",
      is_correct: false
    },
    {
      answer: "",
      description: "",
      link: "",
      is_correct: false
    },
    {
      answer: "",
      description: "",
      link: "",
      is_correct: false
    }
  ]
};

export default function AddQuizCollection({ postData }) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{
    id?: string;
    index?: number;
  }>({});

  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      contents: [answerPrototype]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents"
  });

  const addNewQuestion = event => {
    event.preventDefault();
    append(answerPrototype);
  };

  const toggleDeleteModal = (selectedData?: { id: string; index?: number }) => {
    setShowDeleteModal(preState => !preState);
    if (selectedData) setSelectedQuestion(selectedData);
  };

  const confirmDelete = () => {
    toggleDeleteModal();
    if (selectedQuestion?.id) {
      remove(parseInt(selectedQuestion?.id));
    }
  };

  const renderQuestions = () => {
    return fields.map((question, index) => {
      return (
        <AddQuizForm
          key={question.id}
          id={question.id}
          register={register}
          index={index}
          setValue={setValue}
          errors={errors}
          handleDelete={toggleDeleteModal}
          getValues={getValues}
        />
      );
    });
  };
  const {t} = useTranslation();
  return (
    <div className="questions_container">
      <form>
        {renderQuestions()}
        <button className="add_new_question_button" onClick={addNewQuestion}>
          +
        </button>
        <div className="add_button_container">
          <div className="submit_button_wrapper">
            <CustomButton
              type="submit"
              buttonName={t("submit")}
              color="success"
              clickHandler={() => { }}
              filledButton={true}
            />
          </div>
        </div>
      </form>
      <Modal
        className="modal-box"
        show={showDeleteModal}
        onHide={toggleDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("delete_confirmation")} {t("question")} "
          {selectedQuestion.index ? selectedQuestion.index + 1 : ""}" ?
        </Modal.Body>
        <Modal.Footer>
          <div className="button_wrapper">
            <div className="btn_yes">
              <CustomButton
                type="button"
                buttonName="Confirm"
                color="danger"
                clickHandler={confirmDelete}
                filledButton={true}
              />
              {/* <Button className="btn-danger" onClick={confirmDelete}>
                Confirm
              </Button> */}
            </div>
            <div className="btn_no">
              <CustomButton
                type="button"
                buttonName="Cancel"
                color="success"
                clickHandler={toggleDeleteModal}
                filledButton={false}
              />
              {/* <Button onClick={toggleDeleteModal}>Cancel</Button> */}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import http from "../../../utils/http";
import ShowQuestion from "./ShowQuestion/ShowQuestion";
import { toast } from "react-toastify";
import EditQuestionForm from "./EditForm/EditQuestionForm";
import { Modal } from "react-bootstrap";
import EditAnswerForm from "./EditForm/EditAnswerForm";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import QuizCollection from "./Add Quiz/AddQuizCollection";
import Button from "../../../components/Button/Button";

import "./ShowQuiz.scss";
import { answerType, questionType, quizType } from "../../../@types/content";
import { useTranslation } from "react-i18next";



export default function ShowQuiz() {
  const {t} = useTranslation();
  const [quiz, setQuiz] = useState<quizType>();

  const [showEditQuestionModal, setShowEditQuestionModal] =
    useState<boolean>(false);
  const [showEditAnswerModal, setShowEditAnswerModal] =
    useState<boolean>(false);
  const [showAddQuestionModal, setShowAddQuestionModal] =
    useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [newQuestions, setNewQuestions] = useState<questionType[]>();

  const [selectedQuestion, setSelectedQuestion] = useState<questionType>();
  const [selectedAnswer, setSelectedAnswer] = useState<answerType>();
  const [selectedDeleteQuestion] = useState<questionType>();

  useEffect(() => {
    async function getData() {
      try {
        const response = await http.GET("content/quiz/list", "");
        setQuiz(response.data.data[1]);
      } catch (error) {
        toast.error(error);
      }
    }
    getData();
  }, []);

  //toggle modal for closing modal
  const closeEditQuestionModal = () => {
    setShowEditQuestionModal(preState => !preState);
  };
  const closeEditAnswerModal = () => {
    setShowEditAnswerModal(preState => !preState);
  };
  const toggleAddQuestionModal = () => {
    setShowAddQuestionModal(preState => !preState);
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal(previousState => !previousState);
  };
  //toggle modal for opening modal with selected question
  const handleEditQuestion = question => {
    setSelectedQuestion(question);
    setShowEditQuestionModal(state => !state);
  };
  const handleEditAnswer = answer => {
    setSelectedAnswer(answer);
    setShowEditAnswerModal(preState => !preState);
  };

  const confirmDelete = () => {
    const filteredQuestions = newQuestions?.filter((eachQuestion, index) => {
      if (index === selectedDeleteQuestion?.id) {
        return null;
      } else {
        return eachQuestion;
      }
    });
    setNewQuestions(filteredQuestions);
  };

  //api call for update question
  const handleQuestionUpdate = data => {
    async function pushUpdate() {
      try {
        const response = await http.PUT(
          `/content/question/update/${data.id}/`,
          data
        );
        if (response.status === 200) {
          toast.success("Updated successfully");
        }
      } catch (error) {
        toast.error(error);
      }
    }
    pushUpdate();
  };

  //api call for answer update
  const handleAnswerUpdate = updatedAnswer => {
    async function pushUpdate() {
      try {
        const response = await http.PUT(
          `/content/answer/update/${updatedAnswer.id}/`,
          updatedAnswer
        );
        if (response.status === 200) {
          toast.success("Updated successfully");
        }
      } catch (error) {
        toast.error(error);
      }
    }
    pushUpdate();
  };

  /* const handleRemove = selectedQuestion => {
    setSelectedDeleteQuestion(selectedQuestion);
    setShowDeleteModal(preState => !preState);
  };
 */
  const renderQuestion = () => {
    return quiz?.questions?.map((question, index) => {
      return (
        <ShowQuestion
          key={index}
          question={question}
          questionId={index}
          closeEditQuestionModal={closeEditQuestionModal}
          handleEditQuestion={handleEditQuestion}
          handleEditAnswer={handleEditAnswer}
        />
      );
    });
  };

  //handeling submit for adding new questions
  /* const handleSubmit = (e, newQuestions) => {
    e.preventDefault();
  }; */

  return (
    <>
      <h4>{t("quiz")} : {quiz?.title}</h4>
      <div className="add_more_quiz_button_wrapper">
        <Button
          type="button"
          buttonName={t("add_more_questions")}
          color="success"
          clickHandler={toggleAddQuestionModal}
        />
      </div>

      {renderQuestion()}
      <Modal
        className="edit_question_modal"
        size="lg"
        show={showEditQuestionModal}
        onHide={closeEditQuestionModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("update_question")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditQuestionForm
            question={selectedQuestion}
            handleQuestionUpdate={handleQuestionUpdate}
            closeEditQuestionModal={closeEditQuestionModal}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal
        className="edit_answer_modal"
        show={showEditAnswerModal}
        onHide={closeEditAnswerModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${t("edit")} ${t("answer")}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAnswerForm
            answer={selectedAnswer}
            handleAnswerUpdate={handleAnswerUpdate}
            closeEditAnswerModal={closeEditAnswerModal}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={showAddQuestionModal}
        size="lg"
        onHide={toggleAddQuestionModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${t("add")} ${t("question")}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuizCollection postData={() => { }} />
        </Modal.Body>
      </Modal>
      <DeleteModal
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        id={selectedDeleteQuestion?.id}
        name={selectedDeleteQuestion?.question}
        handleDelete={confirmDelete}
      />
    </>
  );
}

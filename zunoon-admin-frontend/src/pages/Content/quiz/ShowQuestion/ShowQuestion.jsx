import React from "react";
import { Accordion, useAccordionButton, Card } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ShowQuestion.scss";
import RadioButtonIcon from "../../../../components/RadioButtonIcon/RadioButtonIcon";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return (
    <button
      className="button button_primary show_answer_btn"
      type="button primary_button"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function ShowQuestion(props) {
  const { question, questionId, handleEditQuestion, handleEditAnswer } = props;

  let handleCorrectAnswer = () => {};

  //answers rendering
  const renderAnswers = () => {
    return question?.answers?.map((answer, index) => {
      return (
        <div key={index} className="answer_container">
          {/* <input
            required
            onChange={handleCorrectAnswer}
            id={`edit${questionId}_${index}`}
            type="radio"
            name={`group${questionId}`}
            checked={question?.answers[index].is_correct ? true : false}
          /> */}
          <RadioButtonIcon
            index={index}
            onClick={handleCorrectAnswer}
            name={`group${questionId}`}
            id={`edit${questionId}_${index}`}
            isChecked={question?.answers[index].is_correct ? true : false}
          />
          <label htmlFor={`edit${questionId}_${index}`}>{answer?.answer}</label>
          <button className="answer_edit_btn" onClick={() => handleEditAnswer(answer)}>
            <FontAwesomeIcon className="edit_icon" icon={faEdit} />
          </button>
        </div>
      );
    });
  };

  //individual question render
  return (
    <div className="question_container">
      <Accordion>
        <Card>
          <Card.Header>
            <div className="question">{`${questionId + 1}. ${question?.question}`}</div>
            <button className="edit_btn" onClick={() => handleEditQuestion(question)}>
              <FontAwesomeIcon className="edit_icon" icon={faEdit} />
            </button>
            <CustomToggle eventKey={questionId}> Answers </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={questionId}>
            {/* question answers render */}
            <Card.Body>
              <div className=" show_answers_container answers_container ">{renderAnswers()}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

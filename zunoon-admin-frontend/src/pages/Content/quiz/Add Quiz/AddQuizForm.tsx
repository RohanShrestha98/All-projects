import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./AddQuiz.scss";
import RadioButtonIcon from "../../../../components/RadioButtonIcon/RadioButtonIcon";
import { IQuiz } from "../../../../@types/content";


export default function AddQuizForm(props: IQuiz) {
  /* const [state, setState] = useState(false); */
  const { register, id, index, setValue, errors, handleDelete, getValues } =
    props;
  const answerCount = 4;
  // let handleCorrect = (e, selectedIndex: string) => {
  //   for (let index = 0; index < answerCount; index++) {
  //     setValue(`${e.target.id}[${index}].is_correct`, false);
  //     if (+selectedIndex === +index) {
  //       setValue(`${e.target.id}[${index}].is_correct`, true);
  //     }
  //   }
  // };

  //setCorrect answer of answers
  const handleCorrect = (targetEl: Element | null, selectedIndex: string) => {
    for (let index = 0; index < answerCount; index++) {
      //first setting all values false
      setValue(`${targetEl?.id}[${index}].is_correct`, false);

      //setting correct value true
      if (+selectedIndex === +index) {
        setValue(`${targetEl?.id}[${index}].is_correct`, true);
      }
    }
  };
  const addAnswers = () => {
    const answers: ReactElement[] = [];
    for (let i = 0; i < answerCount; i++) {
      answers.push(
        <div className="answer_field" key={i}>
          {/* <input
            type="radio"
            name={`contents[${index}].answers`}
            id={`contents[${index}].answers`}
            onClick={e => handleCorrect(e, `${i}`)}
            defaultChecked={i === 0 ? true : false}
          /> */}
          <RadioButtonIcon
            index={i}
            name={`contents[${index}].answers`}
            id={`contents[${index}].answers`}
            onClick={(e, index?: number) => handleCorrect(e, `${index}`)}
            isChecked={getValues(`contents[${index}].answers[${i}].is_correct`)}
          /* changeState={setState} */
          />
          <input
            type="text"
            {...register(`contents[${index}].answers[${i}].answer`, {
              required: false
            })}
            placeholder={`Answer ${i + 1}`}
          />
          <input
            className="link_input"
            type="text"
            {...register(`contents[${index}].answers[${i}].link`)}
            placeholder={`Link  ${i + 1}`}
          />
          <FontAwesomeIcon className="link_image" icon={faLink} />
          {/* <input
            type="text"
            {...register(`contents[${index}].answers[${i}].description`)}
            placeholder={`AnswerDescription${i+1}`}
          /> */}
        </div>
      );
    }
    return answers;
  };
  return (
    <div key={id} className="quiz_question_card">
      <div className="close_btn">
        <FontAwesomeIcon
          onClick={() => {
            handleDelete({ id, index });
          }}
          icon={faXmark}
        />
      </div>
      <div className="field_container question_container">
        <h6>{index + 1}</h6>
        <input
          className={
            errors &&
              errors?.contents &&
              errors?.contents[index]?.question?.type
              ? "error"
              : ""
          }
          placeholder={
            errors &&
              errors?.contents &&
              errors?.contents[index]?.question?.type
              ? "Question required"
              : "Question"
          }
          type="text"
          {...register(`contents[${index}.question`, { required: true })}
        />
      </div>
      <div className="field_container description_container">
        <input
          type="text"
          {...register(`contents[${index}.description`)}
          placeholder="Description"
        />
      </div>
      {/* <input type="text" {...register(`contents[${index}.link`)} /> */}
      <div className="answer_container">{addAnswers()}</div>
    </div>
  );
}

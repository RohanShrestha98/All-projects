import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./RadioButtonIcon.scss";

type PropsType = {
  name: string;
  id: string;
  onClick: (el: Element | null, index?: number) => void;
  index?: number;
  isChecked: boolean;
  changeState?: Function;
};
export default function RadioButtonIcon(props: PropsType) {
  const {
    name,
    id,
    onClick: radioButtonClick,
    index,
    isChecked,
    changeState
  } = props;

  //changing state
  function handleChange(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    radioButtonClick(e.currentTarget.children[0], index);
    //for re-rendering
    if (changeState) {
      changeState(preState => !preState);
    }
  }

  return (
    <div className="custom_radio_button" onClick={handleChange}>
      <input
        type="radio"
        name={name}
        id={id}
        checked={isChecked}
        onChange={() => {}}
      />
      <FontAwesomeIcon className="correct_answer" icon={faCheck} />
      <span className="checkmark"></span>
    </div>
  );
}

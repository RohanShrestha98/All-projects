/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Input } from "antd";
import { GoArrowBoth } from "react-icons/go";

const JumbleWords = props => {
  const [arrangedWord, setArranged] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const words = [
    {
      jumble: "rowds",
      correct: "words",
    },
    {
      jumble: "umblej",
      correct: "jumble",
    },
    {
      jumble: "corerct",
      correct: "correct",
    },
    {
      jumble: "isnpect",
      correct: "inspect",
    },
  ];

  const handleChange = (e, word, i) => {
    setArranged(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkResults = () => {
    let correctNo = 0;
    if (isChecked) {
      setArranged([]);
      props.checkResult(0, 0, false);
    } else {
      for (let i = 0; i < Object.keys(arrangedWord)?.length; i++) {
        if (arrangedWord[i] === words[i].correct) {
          correctNo = correctNo + 1;
        }
      }
      props.checkResult(correctNo, words.length - correctNo, true);
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-7 rounded-lg bg-white">
      <div className="flex items-center font-medium text-[15px] mb-[17.26px]">
        <div className="w-[55%]">Words:</div>
        <div className="w-[45%]">Right Words:</div>
      </div>
      <div className="flex">
        <div className="w-[55%]">
          {words.map((word, id) => {
            return (
              <div key={id} className="mb-4 flex items-center">
                <div className="w-[90%] bg-gray-11 rounded-md font-normal text-[13px] py-2 px-[10px]">
                  {word.jumble}
                </div>
                <div className="w-[10%] mx-[14px]">
                  <GoArrowBoth />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[45%]">
          {words.map((word, id) => {
            // if (isChecked) {
            // }
            return (
              <div
                key={id}
                className={`mb-4  ${
                  isChecked
                    ? word.correct === arrangedWord[id]
                      ? "bg-light-green3 h-[35.5px] rounded-md border "
                      : "bg-red-4 h-[35.5px] rounded-md border "
                    : "h-[35.5px]"
                }`}
              >
                {!isChecked && (
                  <Input
                    value={arrangedWord[id]}
                    name={`${id}`}
                    onChange={e => handleChange(e, word, id)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {Object.keys(arrangedWord)?.length === words?.length && (
        <div
          onClick={checkResults}
          className="flex justify-center mt-[12.93px] cursor-pointer"
        >
          <div className="flex justify-center items-center text-white bg-cyan rounded-[100px] h-[43.16px] w-40">
            {isChecked ? "Try Again" : "Find Out"}
          </div>
        </div>
      )}
    </div>
  );
};

export default JumbleWords;

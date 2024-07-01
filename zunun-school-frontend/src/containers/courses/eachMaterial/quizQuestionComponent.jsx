import React from "react";
const QuizQuestionComponent = props => {
  const indices = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };

  const questions = props?.questions;
  function decimalToFraction(decimal) {
    const decimalString = decimal.toString();
    const decimalPlaces = (decimalString.split(".")[1] || "").length;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = decimal * denominator;
    const gcd = findGCD(numerator, denominator);
    const simplifiedNumerator = numerator / gcd;
    const simplifiedDenominator = denominator / gcd;

    return `${simplifiedNumerator}/${simplifiedDenominator}`;
  }
  function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
  }

  const calcultePercentage =
    props?.data?.feedback?.totalRightAnswer /
    props?.data?.feedback?.totalQuestions;
  const fraction = decimalToFraction(calcultePercentage);

  return (
    <div className="relative pb-[23px] h-[80vh] overflow-auto">
      <div className=" rounded-xl p-4 mb-4 bg-white">
        <div className="flex justify-between">
          <b className="text-gray">Total Right Answer :</b>
          <b>{props?.data?.feedback?.totalRightAnswer}</b>
        </div>
        <div className="flex justify-between">
          <b className="text-gray">Total Questions :</b>
          <b>{props?.data?.feedback?.totalQuestions}</b>
        </div>
        <div className="flex justify-between  border-t-[1px] border-gray mt-2 py-2">
          <b>Total Points :</b>
          <b>{props?.data?.feedback?.totalPoint}</b>
        </div>
        <div className="w-full bg-red h-4 rounded-xl mt-2">
          <div className={`w-${fraction} bg-green h-4 rounded-xl`}></div>
        </div>
      </div>
      {questions?.map((quiz, id) => {
        return (
          <div
            key={id}
            className=" py-6 px-8 rounded-lg bg-white border border-gray-13 mb-4"
          >
            <div className="font-semibold text-[17px] mb-2">
              {quiz?.question}
            </div>
            <div>
              {quiz?.answers ? (
                quiz?.answers?.map((option, index) => {
                  return (
                    <div
                      key={index}
                      className={`cursor-pointer mb-[12px] ${
                        (option?.id === quiz?.submitted?.id &&
                          quiz?.submitted?.submittedCorrect) ||
                        option?.isCorrect
                          ? " border-green"
                          : option?.id === quiz?.submitted?.id &&
                            !quiz?.submitted?.submittedCorrect
                          ? "border-red"
                          : "bg-white"
                      }  flex justify-between items-center px-3 py-3 rounded-md border border-gray-13`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center  ${
                            (option?.id === quiz?.submitted?.id &&
                              quiz?.submitted?.submittedCorrect) ||
                            option?.isCorrect
                              ? " bg-green"
                              : option?.id === quiz?.submitted?.id &&
                                !quiz?.submitted?.submittedCorrect
                              ? "bg-red"
                              : "bg-gray-13"
                          }  text-white h-9 w-9 rounded-md mr-4 `}
                        >
                          {indices[index]}
                        </div>
                        <div className="font-medium text-[17px]">
                          {option?.answer}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div
                    className={`cursor-pointer mb-[12px] ${
                      (quiz?.isTrue &&
                        quiz?.submitted?.submittedCorrect === true) ||
                      quiz?.isTrue
                        ? "border-green"
                        : !quiz?.isTrue &&
                          quiz?.submitted?.submittedCorrect === false
                        ? "border-red"
                        : "border-gray-13"
                    } flex justify-between items-center px-3 py-3 rounded-md border
                       
                        `}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center  ${
                          (quiz?.isTrue &&
                            quiz?.submitted?.submittedCorrect === true) ||
                          quiz?.isTrue
                            ? "bg-green"
                            : !quiz?.isTrue &&
                              quiz?.submitted?.submittedCorrect === false
                            ? "bg-red"
                            : "bg-gray-13"
                        }  text-white h-9 w-9 rounded-md mr-4 `}
                      >
                        A
                      </div>
                      <div className="font-medium text-[17px]">True</div>
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer mb-[12px] ${
                      (!quiz?.isTrue &&
                        quiz?.submitted?.submittedCorrect === true) ||
                      !quiz?.isTrue
                        ? "border-green"
                        : quiz?.isTrue &&
                          quiz?.submitted?.submittedCorrect === false
                        ? "border-red"
                        : "border-gray-13"
                    } flex justify-between items-center px-3 py-3 rounded-md border`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center  ${
                          (!quiz?.isTrue &&
                            quiz?.submitted?.submittedCorrect === true) ||
                          !quiz?.isTrue
                            ? "bg-green"
                            : quiz?.isTrue &&
                              quiz?.submitted?.submittedCorrect === false
                            ? "bg-red"
                            : "bg-gray-13"
                        }  text-white h-9 w-9 rounded-md mr-4 `}
                      >
                        B
                      </div>

                      <div className="font-medium text-[17px]">False</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizQuestionComponent;

import React, { useState } from "react";
import { useMutate } from "../../../hooks/useMutateData";
import toast from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";

const QuizComponent = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isTrueActive, setIsTrueActive] = useState(false);
  const navigate = useNavigate();

  const indices = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };

  const handlePrevious = () => {
    setIsTrueActive(true);
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { auth } = useAuthContext();

  const useQuizMutation = () =>
    useMutate(["quiz-submit"], "api/v1/content/submit/quiz/");

  const questions = props?.questions;

  const { mutateAsync } = useQuizMutation();

  const handleNext = () => {
    setIsTrueActive(false);
    if (currentPage === questions?.length && !isFinished) {
      setCurrentPage(1);
      setIsFinished(true);
    } else if (currentPage === questions?.length && isFinished) {
      setCurrentPage(1);
      setIsFinished(false);
      setSelectedOption([]);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleQuizSubmit = async () => {
    const postData = {
      questions: selectedOption,
    };
    try {
      const response = await mutateAsync([
        "post",
        `${props?.questionId}`,
        postData,
      ]);
      if (response.success) {
        toast.success("Quiz Subimted Successfully");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err.response.data.errors.remaks);
    }
  };

  const handleSelectOption = (question, option, answer) => {
    setIsTrueActive(true);
    const index = selectedOption?.findIndex(val => val.questionId === question);
    if (index === -1) {
      const updatedOption =
        answer === "answerId"
          ? { questionId: question, answerId: option }
          : { questionId: question, isTrue: option };
      setSelectedOption(prevState => [...prevState, updatedOption]);
    } else {
      const selected = selectedOption;
      const updatedOption =
        answer === "answerId"
          ? { questionId: question, answerId: option }
          : { questionId: question, isTrue: option };
      selected.splice(index, 1, updatedOption);
      setSelectedOption([...selected]);
    }
  };

  return (
    <div className="rounded-md bg-white shadow-md relative pb-[23px]">
      {questions?.map((quiz, id) => {
        return (
          <div key={id}>
            {currentPage === id + 1 && (
              <>
                <div className="pt-2 mr-4 flex justify-end text-gray-dark font-semibold text-[16px]">{`${currentPage}/${questions.length}`}</div>
                <div className="mt-[7px] mb-[23px] mx-8 sm:mx-6">
                  <div className="font-semibold text-[17px]">
                    {quiz?.question}
                  </div>
                  {quiz?.file?.url && (
                    <img
                      className="w-full h-44 object-cover"
                      src={quiz?.file?.url}
                      alt=""
                    />
                  )}
                  <div className="my-4 font-medium text-[17px] text-gray-12">
                    Select an option
                  </div>
                  <div>
                    {quiz?.answers ? (
                      quiz?.answers?.map((option, index) => {
                        return (
                          <div
                            key={index}
                            className={`cursor-pointer mb-[12px] flex justify-between items-center px-3 py-3 rounded-md border-[2px] ${
                              selectedOption[id]?.answerId === option?.id
                                ? "border-cyan"
                                : option?.isCorrect
                                ? "border-green"
                                : "border-gray-13"
                            }`}
                            onClick={() =>
                              handleSelectOption(
                                quiz?.id,
                                option?.id,
                                "answerId",
                              )
                            }
                          >
                            <div className="flex items-center">
                              <div
                                className={`flex items-center justify-center h-9 w-9 rounded-md mr-4 ${
                                  selectedOption[id]?.answerId === option?.id
                                    ? "bg-cyan text-white"
                                    : option?.isCorrect
                                    ? "bg-green text-white"
                                    : "bg-gray-13"
                                }`}
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
                          className={`cursor-pointer mb-[12px] flex justify-between items-center px-3 py-3 rounded-md border-[2px] ${
                            selectedOption[id]?.isTrue === true && isTrueActive
                              ? "border-cyan"
                              : quiz?.type === "TRUEFALSE" && quiz?.isTrue
                              ? "border-green"
                              : "border-gray-13"
                          }`}
                          onClick={() =>
                            handleSelectOption(quiz?.id, true, "isTrue")
                          }
                        >
                          <div className="flex items-center">
                            <div
                              className={`flex items-center justify-center h-9 w-9 rounded-md mr-4 ${
                                selectedOption[id]?.isTrue === true &&
                                isTrueActive
                                  ? "bg-cyan text-white"
                                  : quiz?.type === "TRUEFALSE" && quiz?.isTrue
                                  ? "bg-green text-white"
                                  : "bg-gray-13"
                              }`}
                            >
                              A
                            </div>
                            <div className="font-medium text-[17px]">True</div>
                          </div>
                        </div>
                        <div
                          className={`cursor-pointer mb-[12px] flex justify-between items-center px-3 py-3 rounded-md border-[2px] ${
                            selectedOption[id]?.isTrue === false && isTrueActive
                              ? "border-cyan"
                              : "border-gray-13"
                          }`}
                          onClick={() =>
                            handleSelectOption(quiz?.id, false, "isFalse")
                          }
                        >
                          <div className="flex items-center">
                            <div
                              className={`flex items-center justify-center h-9 w-9 rounded-md mr-4 ${
                                selectedOption[id]?.isTrue === false &&
                                isTrueActive
                                  ? "bg-cyan text-white"
                                  : "bg-gray-13"
                              }`}
                            >
                              B
                            </div>
                            <div className="font-medium text-[17px]">False</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex justify-between font-medium text-[15px]">
                      <div
                        className={`mr-4 cursor-pointer rounded-[100px] w-40 h-10 flex justify-center items-center ${
                          currentPage === 1
                            ? "bg-gray-14 text-gray-12"
                            : "bg-cyan-lighter text-blue-4"
                        }`}
                        onClick={handlePrevious}
                      >
                        Previous
                      </div>
                      {currentPage === questions?.length &&
                      auth?.user?.role?.id !== 5 ? (
                        <div></div>
                      ) : (
                        <div
                          className={`cursor-pointer rounded-[100px] w-40 h-10 flex justify-center items-center text-white ${
                            !isFinished
                              ? (selectedOption?.[id] === undefined ||
                                  currentPage === questions?.length) &&
                                auth?.user?.role?.id === 5
                                ? "bg-baby-blue"
                                : auth?.user?.role?.id !== 5
                                ? "bg-cyan"
                                : "bg-cyan "
                              : selectedOption?.length >=
                                  questions?.length - 1 && "bg-cyan"
                          }`}
                          onClick={() => {
                            if (
                              (selectedOption[id] !== undefined &&
                                id !== questions?.length - 1) ||
                              (auth?.user?.role?.id !== 5 &&
                                currentPage <= questions?.length - 1)
                            ) {
                              handleNext();
                            } else if (
                              selectedOption[id] !== undefined &&
                              selectedOption?.length >= questions?.length - 1 &&
                              auth?.user?.role?.id == 5
                            ) {
                              handleQuizSubmit();
                            }
                          }}
                        >
                          {(selectedOption[id] !== undefined &&
                            id !== questions?.length - 1) ||
                          (auth?.user?.role?.id !== 5 &&
                            currentPage <= questions?.length - 1)
                            ? "Next"
                            : selectedOption[id] !== undefined &&
                              selectedOption?.length >= questions?.length - 1 &&
                              auth?.user?.role?.id == 5
                            ? "Submit"
                            : "Next"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizComponent;

import React, { useState } from "react";
import MockTest from "./mockTest";
import { Drawer } from "antd";
import {
  BookmarkSvg,
  CrossSvg,
  FilledBookmarkSvg,
  FilledTimeSvg,
  LeftArrowSvg,
  RightArrowSvg,
  RoundDashboardSvg,
} from "../../assets/allSvg";
import PopConfirmModal from "../../components/UI/popConfirmModal";
import { useNavigate ,useLocation} from "react-router-dom";
import { useTestDetails } from "../../hooks/useQueryData";
import { useBookmarkMutation, usetestSubmitMutation } from "../../hooks/useMutateData";
import { message } from "antd";
import Countdown from 'react-countdown';
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";

export default function Questions() {
  const [open, setOpen] = useState(false);
  const [mark, setMark] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()
  const indices = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  
  const {data,isLoading,isError} = useTestDetails(location?.state?.id)
  const questions = data?.data?.questionSet?.questions

const testSubmitMutation = usetestSubmitMutation()
const bookmarkMutation = useBookmarkMutation()

  const handleSelectedQuestionAnswer = (data) => {
    const index = selectedAnswer?.findIndex(val => val.id === data?.id);
    if (index === -1) {
    setSelectedAnswer(prevState => [...prevState, data]);
    }else {
      const selected = selectedAnswer;
      selected.splice(index, 1, data);
      setSelectedAnswer([...selected]);
    }
};

const onSubmitHandler = async () => {
  const postData = {
    questions:selectedAnswer
  }
  try {
    const result = await testSubmitMutation.mutateAsync(["post", `${data?.data?.id}`, postData]);
    message.success("Test submitted Successfully", [2]);
  } catch (error) {
    let errorMessage = error?.response?.data?.error
      ? error?.response?.data?.message?.toString()
      : error?.message?.toString();
    message.error(error?.response?.data?.errors?.error, [2]);
  }
};

const renderer = ({days, hours, minutes, seconds, completed}) => {
  if (completed) {
      return (<p>Test End !</p>);
  } else {
      return(
          <p>
              {days}:{hours}:{minutes}:{seconds}
          </p>
      )
  }
}


const handleNextButtonClick = ()=>{
  if(questionCount === selectedAnswer?.length ){
  setQuestionCount(questionCount + 1)}
}
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const handleBookmark = async (id) => {
    const postData ={
      questionID:id
    }
    try {
      const result = await bookmarkMutation.mutateAsync(["post", `create`, postData]);
     setMark(!mark);
      message.success("Question bookmarked Successfully", [2]);
    } catch (error) {
      let errorMessage = error?.response?.data?.error
        ? error?.response?.data?.message?.toString()
        : error?.message?.toString();
      message.error(error?.response?.data?.errors?.error, [2]);
    }
  };

  return (
    <div className=" h-full min-h-screen bg-[#F7F7F7]  flex flex-col justify-between">
      <div>
        <div className="flex items-center py-[15px] px-[170px] md:px-10 sm:px-3 justify-between bg-white  w-full md:shadow ">
          <p className="text-[#4D4D4D] text-lg md:text-sm font-semibold leading-5 ">
            Question {questionCount} of {questions?.length}
          </p>
          <div onClick={showDrawer} className="hidden md:block cursor-pointer">
            <RoundDashboardSvg />
          </div>
          <p className="flex items-center text-[#404040] md:hidden text-base leading-5 bg-[#F2F2F2] rounded-full py-2 px-4 gap-2">
            <FilledTimeSvg className="text-[#808080]" />
            <Countdown 
              date={new Date(data?.data?.endTime)}
              renderer={renderer}
               />
          </p>
          <PopConfirmModal
            placement="bottomLeft"
            handleConfirm={() => navigate(-1)}
            title=""
            okText="Quit"
            description="Are you sure want to quit this quiz ?">
            <button className="text-[#D92626] border border-[#D92626] md:hidden rounded-lg py-1 px-7  items-center flex gap-1">
              Quit
            </button>
          </PopConfirmModal>
        </div>
        <div className={`my-10 md:my-6 flex gap-6 px-[170px] md:px-10 sm:px-3`}>
          {questions?.map((item, index) => {
            return (
              <>
                {index + 1 === questionCount && (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-lg bg-white p-6 md:p-3 md:pb-8 w-[60%] md:w-full text-[#4D4D4D]">
                    <p className="text-base md:text-sm font-medium leading-5 tracking-tight">
                      {item?.title}
                    </p>
                    <p className="text-[#999] text-xs ">Select one option</p>
                    <div className="flex flex-col gap-4">
                      {item?.options?.map((item2,index2) => {
                        const selectedQuestionAnswer = {id:item?.id,answer:indices[index2]}
                        return (
                          <div
                            key={item2.id}
                            onClick={()=>handleSelectedQuestionAnswer(selectedQuestionAnswer)}
                            className={`flex flex-col  gap-2 ${selectedAnswer?.[index]?.answer === indices[index2] ?"border-green":"border-[#EFEFEF]" }  cursor-pointer border rounded-xl py-2 px-4 `}>
                              <div className="flex items-center gap-4">
                              <p className={` ${selectedAnswer?.[index]?.answer === indices[index2] ?"bg-green text-white":"bg-[#F2F2F2]" } rounded-full text-lg font-semibold leading-6 tracking-widest px-3 py-2`}>
                              {indices[index2]}
                            </p>
                            <p className="text-[#4D4D4D] text-sm font-medium leading-4">
                              {ConvertHtmlToPlainText(item2?.title)}
                            </p>
                              </div>
                            
                            {
                                                item2?.image && <img className="w-[140px] h-[140px] object-cover" src={item2?.image} alt="" />
                                            }
                                            {
                                                item2?.audio && <audio className="bg-white mt-2 w-full h-10" controls>
                                                    <source src={item2?.audio} />
                                                </audio>
                                            }
                            {/* {item2.type === "audio"
                              ? "audio"
                              : item2.type === "img"
                              ? "img"
                              : "text"} */}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-end  md:hidden">
                      <p
                        onClick={() => {
                          handleBookmark(item?.id);
                        }}
                        className=" inline-block  bg-[#F2F2F2] rounded-full p-[6px] cursor-pointer">
                        {mark ? (
                          <FilledBookmarkSvg color="#FFC534" />
                        ) : (
                          <BookmarkSvg />
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}

          <div className="rounded-lg bg-white p-6 w-[40%] md:hidden shadow h-[300px] ">
            <MockTest data={questions} questionCount={questionCount} />
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm font-semibold py-[15px] sticky bottom-0 px-[170px] md:px-6 justify-center md:justify-between bg-white  w-full md:shadow-2xl md:rounded-t-lg">
        <p
          onClick={() => {
            handleBookmark();
          }}
          className=" hidden md:inline-block  bg-[#F2F2F2] rounded-full p-[6px] cursor-pointer">
          {mark ? <FilledBookmarkSvg color="#FFC534" /> : <BookmarkSvg />}
        </p>
        <div className="flex items-center gap-4 md:gap-2">
          <button
            onClick={() => {
              questionCount > 1 && setQuestionCount(questionCount - 1);
            }}
            className="text-[#CCC] border border-[#CCC] rounded-lg py-2 px-5 md:px-4  items-center flex gap-1">
            <LeftArrowSvg color={"#CCC"} /> Previous
          </button>
          <button
            onClick={() => {
              questionCount !== questions.length ?
              handleNextButtonClick():onSubmitHandler()
            }}
            className="text-[#FFF]  bg-theme-color rounded-lg py-2 px-7 md:px-5 items-center flex gap-1">
            Next <RightArrowSvg color={"white"} />
          </button>
        </div>
      </div>
      <Drawer
        className="header-none p-0  "
        closable={false}
        footer={
          <div className="flex rounded-t-lg py-1  text-sm font-semibold gap-2 justify-between ">
            <button
              onClick={() => navigate("/tests/quiz")}
              className="text-[#D92626] border border-[#D92626] rounded-lg py-[6px] px-[61px]  items-center flex gap-1">
              Quit
            </button>
            <button className="text-[#FFF]  bg-theme-color rounded-lg py-[6px] px-[61px] items-center flex gap-1">
              Submit
            </button>
          </div>
        }
        onClose={onClose}
        open={open}
        placement={"bottom"}
        height={665}>
        <div className="flex items-center justify-between mb-5">
          <p className=" hidden md:block  text-[#4D4D4D] text-sm font-medium leading-4">
            Mock Test
          </p>
          <button className="text-red text-[20px]" onClick={onClose}>
            <CrossSvg />
          </button>
        </div>
        <MockTest data={questions} questionCount={questionCount} />
      </Drawer>
    </div>
  );
}

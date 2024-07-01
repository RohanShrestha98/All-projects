import React from "react";
import quizTime from "../../images/quizTime.svg";
import quizMark from "../../images/quizMark.svg";
import quizNote from "../../images/quizNote.svg";
import quizWeb from "../../images/quizWeb.svg";
import instruction from "../../images/instruction.svg";
import {
  DateSvg,
  NoteSvg,
  DotSvg,
  RightArrowSvg,
  FilledTimeSvg,
} from "../../assets/allSvg";
import { useLocation, useNavigate } from "react-router-dom";
import MobileHeader from "../../components/navbar/mobileHeader";
import { DynamicFooter } from "../../components/footer/dynamicFooter";
import ConvertUTCDate from "../../utils/convertUTCDate";

export default function DailyQuiz() {
  const navigate = useNavigate();
  const location = useLocation()
  const testData  = location?.state?.eachTestData

  console.log("testData",testData)

  const startDate = ConvertUTCDate(testData?.startTime,'MMM DD YYYY')
  const startHourTime = ConvertUTCDate(testData?.startTime,'H')

  const boxData = [
    {
      id: 1,
      icon: quizTime,
      title: testData?.duration /60  + " hours",
    },
    {
      id: 2,
      icon: quizMark,
      title: testData?.marks + " marks",
    },
    {
      id: 3,
      icon: quizNote,
      title: testData?.totalQuestions +" Questions",
    },
    {
      id: 4,
      icon: quizWeb,
      title: testData?.course?.courseID,
    },
  ];
  const quizData = [
    {
      id: 1,
      title: startDate,
      icon: <DateSvg className="md:h-[20px] md:w-[20px]" />,
    },
    {
      id: 2,
      title: "12 PM - 1 PM",
      icon: <FilledTimeSvg className="md:h-[20px] md:w-[20px]" />,
    },
    {
      id: 3,
      title: testData?.marks * testData?.totalQuestions + " marks" ,
      icon: <NoteSvg className="md:h-[18px] md:w-[18px]" />,
    },
  ];
  return (
    <div className="rounded-md   bg-white md:bg-[#F7F7F7]  flex flex-col justify-between  py-5 md:py-0 ">
      <MobileHeader
        headerName={testData?.title}
        noProfile={true}
        className={"px-8 pt-3"}
      />
      <div className="md:gap-6 md:p-4 md:mx-4   bg-white flex flex-col gap-5 mx-10">
        <div className="text-[#666666] flex items-center gap-2  mt-[6px]  md:grid md:grid-cols-3">
          {quizData.map((item) => {
            return (
              <div className="flex items-center gap-2" key={item.id}>
                <DotSvg
                  className={` text-[#B2B2B2] ${item.id === 1 ? "hidden" : ""}`}
                />
                <p className="">{item.icon}</p>
                <p className="text-[#808080] text-sm md:text-[11px] tracking-tight whitespace-nowrap">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 gap-3 md:gap-2 ">
          {boxData.map((item) => {
            return (
              <div
                className="flex gap-3 border items-center border-[#E6E6E6] rounded-lg px-3 py-2"
                key={item.id}>
                <img src={item.icon} alt="" />
                <p className="text-[#343434] font-medium text-sm md:text-xs leading-4 whitespace-nowrap">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="bg-[#F7F7F7] md:bg-transparent px-10  pt-6 md:pt-0 pb-10 md:pb-0  md:px-1 rounded-xl flex flex-col gap-6 md:gap-3  md:tracking-[0.24px]">
          <div className="flex gap-3">
            <img src={instruction} alt="" />
            <p className="text-[#4D4D4D] text-base md:text-sm font-bold leading-5">
              Instructions
            </p>
          </div>
          <ul className="ml-4 md:ml-0 md:ps-3 list-disc text-[#404040] leading-5 text-sm md:text-xs flex flex-col gap-3">
            <li>
              Students must complete the multiple-choice exam within the
              allocated time frame given for the exam.
            </li>
            <li>
              Students must complete the 2-question multiple-choice exam within
              the 10-minute time frame allotted for the exam.
            </li>
            <li>
              Students must not stop the session and then return to it. This is
              especially important in the online environment where the system
              will &quot;time-out&quot; and not allow the student or you to
              reenter the exam site.
            </li>
          </ul>
          <p className="italic text-[#333333] text-xs">
            Note: Answers are not saved by the system until you click on submit
            button. If you have to log back in to complete your exam, your prior
            answers will not remain. So, please check for a stable internet
            connection.
          </p>
        </div>
        <div className="flex flex-col gap-6 ">
          <div className="flex items-center gap-[10px]">
            <input
              className="h-5 md:h-[15px]  w-5 text-[#B3B3B3]"
              type="checkbox" 
            />
            <p className="text-gray-3 text-sm md:text-xs leading-5">
              I agree to the{" "}
              <b className="text-theme underline cursor-pointer font-semibold">
                Terms and Conditions
              </b>
            </p>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => navigate("/tests/quiz/questions",{state:testData})}
              className="flex items-center bg-theme-color rounded-lg py-3 md:py-2 px-[35px] md:px-6 text-white gap-1 leading-5 text-sm tracking-wide">
              Start <RightArrowSvg color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
      <DynamicFooter
        buttonName={"Start"}
        className={"justify-end w-36"}
        handleButtonClick={() => navigate("/tests/quiz/questions")}
      />
    </div>
  );
}

import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoReloadCircle } from "react-icons/io5";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerThumbnail,
} from "react-shimmer-effects";
import VideoMaterial from "./videoMaterial";
import QuizComponent from "./quiz";
import PdfMaterial from "./pdfMaterial";
import ScriptDesign from "./scriptDesign";
import { BiArrowBack } from "react-icons/bi";

const MaterialBody = ({ initial, data, hideSidebar }) => {
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setIncorrect] = useState(0);
  const [isResult, setIsResult] = useState(false);
  // const { contentDetails } = useContentDetailsContext();
  const isScript = false;

  const checkResults = (correctNo, inCorrectNo, isRes) => {
    setCorrect(correctNo);
    setIncorrect(inCorrectNo);
    setIsResult(isRes);
  };

  return (
    <div>
      {!isScript ? (
        <>
          <div className="">
            {initial ? (
              <div className="w-32">
                <ShimmerText line={1} />
              </div>
            ) : (
              <div className="flex items-center ">
                <button
                  className="flex items-center gap-1 mr-4 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
                  onClick={() => navigate(-1)}
                >
                  <BiArrowBack size={16} />
                </button>
                <div className="font-semibold text-lg sm:text-lg sm:font-bold">
                  {isResult ? "Results" : `${data?.title}`}
                </div>
              </div>
            )}
          </div>
          <div className="sm:pt-[66px]">
            {isResult && (
              <div className="md:px-6 flex flex-col gap-4">
                <div className="flex items-center sm:mt-0 mt-4">
                  {initial ? (
                    <ShimmerCircularImage size={20} />
                  ) : (
                    <IoCheckmarkCircle className="fill-green text-white mr-2" />
                  )}
                  {initial ? (
                    <div className="w-32 ml-1">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <>
                      <div className="font-semibold text-[15px] mr-[9px]">
                        Correct attempts:
                      </div>
                      <div className="font-semibold text-[15px]">{correct}</div>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  {initial ? (
                    <ShimmerCircularImage size={20} />
                  ) : (
                    <IoReloadCircle className="fill-cyan text-white mr-2" />
                  )}
                  {initial ? (
                    <div className="w-32 ml-1">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <>
                      <div className="font-semibold text-[15px] mr-[9px]">
                        Attempts remaining:
                      </div>
                      <div className="font-semibold text-[15px]">
                        {inCorrect}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center"></div>
              </div>
            )}
            <div className="md:px-6 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  {initial ? (
                    <div className="w-32">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <>
                      {isResult && (
                        <div className="font-bold text-lg mt-5">
                          {data?.title}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div></div>
              </div>
              {initial ? (
                <ShimmerThumbnail />
              ) : (
                <div>
                  {data?.contentType === "AUDIO" ||
                  data?.contentType === "VIDEO" ? (
                    <VideoMaterial
                      hideSidebar={hideSidebar}
                      id={data?.id}
                      type={data?.contentType}
                      title={data?.name ?? data?.title}
                      videoUrl={data?.file?.url}
                    />
                  ) : data?.contentType === "SUPPORTFILE" ||
                    data?.contentType === "BOOK" ? (
                    <PdfMaterial data={data} />
                  ) : data?.contentType === "QUESTIONNAIRE" ? (
                    <QuizComponent
                      questionId={data?.id}
                      checkResult={checkResults}
                      questions={data?.questions}
                    />
                  ) : // : data?.questions ? (
                  //   <QuizQuestionComponent
                  //     questionId={data?.id}
                  //     data={data}
                  //     checkResult={checkResults}
                  //     questions={data?.questions}
                  //   />
                  // )
                  data?.contentType === "IMAGE" ? (
                    <img src={data?.file?.url} />
                  ) : null}
                </div>
              )}
              {initial ? (
                <div>
                  <ShimmerText line={3} />
                </div>
              ) : (
                <div className="font-medium text-sm text-gray-light">
                  <h2 className="font-bold">Description</h2>
                  {data?.description}
                </div>
              )}
              {initial ? (
                <div>
                  <ShimmerText line={3} />
                </div>
              ) : (
                <div className="font-medium text-sm text-gray-light">
                  <h2 className="font-bold">Instruction</h2>
                  {data?.instruction}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex gap-4 sm:pt-[18px] sm:gap-0">
          <NavLink
            to={data?.file?.url}
            state={{ subject: data?.title }}
            className="sm:hidden"
          >
            <HiOutlineArrowLeft />
          </NavLink>
          {initial ? (
            <ShimmerThumbnail />
          ) : (
            <ScriptDesign url={data?.file?.url} subject={data?.title} />
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialBody;

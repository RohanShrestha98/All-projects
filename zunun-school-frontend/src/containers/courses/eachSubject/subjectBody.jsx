import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { EachSubjectItems } from "./subjectitems";
import { BsCheckCircleFill } from "react-icons/bs";
import videoImg from "../../../assets/images/video.png";
import { ShimmerCircularImage, ShimmerText } from "react-shimmer-effects";
import { Switch } from "antd";

const SubjectBody = props => {
  const EachCard = ({ subject, subjectId, materialId }) => {
    return (
      <NavLink
        to={`/courses/${subjectId}/${materialId}`}
        state={{
          from: `/courses/${subjectId}`,
          subject: props.subject,
          subtitle: subject.name,
          item: subject.item,
          currentChapter: subjectId,
          currentMaterial: materialId,
        }}
      >
        <div
          className={`sm:mt-7 ${materialId === 0 ? "mt-[21px]" : "mt-0"} ${
            !props.initial
              ? subject.isCompleted
                ? "border border-light-green"
                : ""
              : ""
          } 
            rounded-[15px] bg-white py-5 pl-4 pr-[30px] flex items-center justify-between mb-4 cursor-pointer hover:shadow-md sm:pr-4 sm:border-0 sm:shadow-md`}
        >
          <div className="flex gap-x-4 items-center">
            {props.initial ? (
              <ShimmerCircularImage size={40} />
            ) : (
              <img src={subject.image} alt="image" className="w-10 h-10" />
            )}
            <div>
              {props.initial ? (
                <div className="w-32 sm:hidden">
                  <ShimmerText line={1} />
                </div>
              ) : (
                <div className="mb-1 font-medium text-[12px] text-gray-slate sm:hidden">
                  {subject.item}
                </div>
              )}
              {props.initial ? (
                <div className="w-32">
                  <ShimmerText line={1} />
                </div>
              ) : (
                <div className="font-semibold text-sm">{subject.name}</div>
              )}
            </div>
          </div>
          {props.width > 480 ? (
            <div>
              {subject.isCompleted ? (
                <div className="flex items-center font-bold text-sm fill-light-green text-light-green">
                  {props.initial ? (
                    <ShimmerCircularImage size={20} />
                  ) : (
                    <BsCheckCircleFill />
                  )}
                  {props.initial ? (
                    <div className="w-20 ml-1">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <div className="ml-1">Completed</div>
                  )}
                </div>
              ) : (
                <div>
                  {!props.initial && (
                    <MdKeyboardArrowRight className="fill-gray-dark2" />
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              {props.initial ? (
                <ShimmerCircularImage size={30} />
              ) : (
                <img
                  src={videoImg}
                  alt="image"
                  className="w-[22.5px] h-[22.5px]"
                />
              )}
            </>
          )}
        </div>
      </NavLink>
    );
  };

  return (
    <div>
      {EachSubjectItems.map((subject, id) => {
        return (
          <div className="mb-[23px]" key={id}>
            <div
              onClick={() => {
                if (props.width > 480) {
                  props.handleChapterClick(id);
                }
              }}
              className="cursor-pointer flex items-center sm:cursor-default"
            >
              {!props.initial && props.width > 480 && (
                <div className="w-[30px] h-[30px] bg-gray-8 rounded-full flex justify-center items-center sm:hidden">
                  {props.chapterIndex === id ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </div>
              )}
              {props.width > 480 ? (
                <div className="flex justify-between w-full">
                  <div className="ml-4 text-gray-light font-bold text-[16px] sm:text-xl">
                    {props.initial ? (
                      <div className="w-32">
                        <ShimmerText line={1} />
                      </div>
                    ) : (
                      subject.chapter
                    )}
                  </div>
                  <section>
                    Public: <Switch className="bg-[#B2B2B2]" defaultChecked />
                  </section>
                </div>
              ) : (
                <div className="ml-4 text-gray-light font-bold text-[16px]">
                  {props.initial ? (
                    <div className="w-32">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    `Section ${id + 1}-${subject.chapter}`
                  )}
                </div>
              )}
            </div>
            {((props.width > 480 && props.chapterIndex === id) ||
              props.width <= 480) &&
              subject.material.map((subject, index) => {
                return (
                  <EachCard
                    subject={subject}
                    materialId={index}
                    subjectId={id}
                    key={index}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default SubjectBody;

import React, { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function ToggleSidebar({
  item2,
  indicatorData,
  setLessonBodyDisplay,
  index1,
  startSkillData,
  startIndicatorData,
}) {
  const [skillClick, setSkillClick] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [indicatorClick, setIndicatorClick] = useState(false);
  const initialValue = null;
  const [selectedIndicator, setSelectedIndicator] = useState(initialValue);
  const startSkillDataId = startSkillData?.skill?.[0].id;
  const startSkillDataIdMatch = startSkillDataId === item2.id;
  const startIndicatorDataId = startIndicatorData?.indicator?.[0].id;
  const startIndicatorDataIdMatch =
    startIndicatorDataId === item2.indicator?.[0].id;

  const handleSkillClick = item => {
    setSkillClick(!skillClick);
    setSelectedSkill(item.id);
  };

  useEffect(() => {
    if (
      selectedIndicator === null &&
      startSkillDataIdMatch &&
      startIndicatorDataIdMatch
    ) {
      setSelectedSkill(startSkillDataId);
      setSelectedIndicator(startIndicatorDataId);
      setSkillClick(true);
      setIndicatorClick(true);
    }
  }, []);

  const openFirstSkill = selectedSkill === item2.id;

  return (
    <div key={index1} className="my-2 ml-5">
      <div
        className="flex gap-1 items-start mb-4 cursor-pointer "
        onClick={() => handleSkillClick(item2)}
      >
        {skillClick && openFirstSkill ? (
          <IoIosArrowDown className="min-w-[20px] min-h-[20px] p-1 mr-2 rounded-3xl bg-blue text-white" />
        ) : (
          <IoIosArrowForward className="min-w-[20px] rounded-3xl mr-2 p-1 min-h-[20px] bg-gray-6" />
        )}
        <p className="font-semibold text-sm">{item2.name}</p>
      </div>
      {openFirstSkill &&
        skillClick &&
        indicatorData?.map((item3, index3) => {
          const lessonData = item3?.lesson;

          return (
            <ToggleSideBarLesson
              index3={index3}
              setLessonBodyDisplay={setLessonBodyDisplay}
              startSkillData={startSkillData}
              item2={item2}
              startIndicatorData={startIndicatorData}
              item3={item3}
              lessonData={lessonData}
            />
          );
        })}
    </div>
  );
}

const ToggleSideBarLesson = ({
  index3,
  setLessonBodyDisplay,
  startSkillData,
  item2,
  startIndicatorData,
  item3,
  lessonData,
}) => {
  const [indicatorClick, setIndicatorClick] = useState(false);
  const initialValue = null;
  const [selectedIndicator, setSelectedIndicator] = useState(initialValue);
  const startSkillDataId = startSkillData?.skill?.[0].id;
  const startSkillDataIdMatch = startSkillDataId === item2.id;
  const startIndicatorDataId = startIndicatorData?.indicator?.[0].id;
  const startIndicatorDataIdMatch =
    startIndicatorDataId === item2.indicator?.[0].id;
  const openFirstIndicator = selectedIndicator === item3.id;
  const handleIndicatorClick = item => {
    setIndicatorClick(!indicatorClick);
    setLessonBodyDisplay(item);
    setSelectedIndicator(item.id);
  };

  useEffect(() => {
    if (
      selectedIndicator === null &&
      startSkillDataIdMatch &&
      startIndicatorDataIdMatch
    ) {
      setSelectedIndicator(startIndicatorDataId);
      setIndicatorClick(true);
    }
  }, []);
  return (
    <>
      <div
        key={index3}
        className="ml-4 mb-2 flex gap-1 items-start cursor-pointer"
        onClick={() => handleIndicatorClick(item3)}
      >
        {openFirstIndicator && indicatorClick && lessonData?.length ? (
          <IoIosArrowDown className="min-w-[20px] min-h-[20px] p-1 mr-2 rounded-3xl bg-blue text-white" />
        ) : (
          <IoIosArrowForward className="min-w-[20px] rounded-3xl mr-2 p-1 min-h-[20px] bg-gray-6" />
        )}
        <p className="text-sm"> {item3.name}</p>
      </div>
      {openFirstIndicator &&
        indicatorClick &&
        lessonData?.map((item4, index) => {
          return (
            <>
              <div
                key={item4.id}
                className="flex items-center gap-2 ml-4 px-4 font-medium mb-2 cursor-pointer my-1"
              >
                <li className="text-sm line-clamp-1  ">{index + 1 + " . "}{item4?.name}</li>
              </div>
            </>
          );
        })}
    </>
  );
};

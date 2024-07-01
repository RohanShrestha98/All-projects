import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import UnitToggle from "./UnitToggle";

export default function LevelToggle({
  title,
  finalData,
  setLessonBodyDisplay,
}) {
  const initialValue = null;
  const [levelClick, setLevelClick] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(initialValue);

  const selectedLevelUnit = finalData?.unit?.filter(
    item => item?.level === selectedLevel,
  );

  const startLessonData = finalData?.unit?.[0]?.level === title;
  const handleLevelClick = item => {
    setLevelClick(!levelClick);
    setSelectedLevel(item);
  };

  useEffect(() => {
    if (selectedLevel === null && startLessonData) {
      setSelectedLevel(finalData?.unit?.[0]?.level);
      setLevelClick(true);
    }
  }, []);

  return (
    <>
      <div
        className="flex gap-1 items-start mb-4 cursor-pointer "
        onClick={() => handleLevelClick(title)}
      >
        {levelClick ? (
          <IoIosArrowDown className="min-w-[20px] min-h-[20px] p-1 mr-2 rounded-3xl bg-blue text-white" />
        ) : (
          <IoIosArrowForward className="min-w-[20px] rounded-3xl mr-2 p-1 min-h-[20px] bg-gray-6" />
        )}
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <div className="ml-2">
        {levelClick &&
          selectedLevelUnit?.map((item, index) => {
            const skillData = item?.skill;
            return (
              <UnitToggle
                key={index}
                index={index}
                skillData={skillData}
                item={item}
                finalData={finalData}
                setLessonBodyDisplay={setLessonBodyDisplay}
              />
            );
          })}
      </div>
    </>
  );
}

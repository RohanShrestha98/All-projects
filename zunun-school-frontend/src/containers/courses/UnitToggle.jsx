import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import ToggleSidebar from "./toggleSidebar";

export default function UnitToggle({
  index,
  item,
  skillData,
  finalData,
  setLessonBodyDisplay,
}) {
  const initialValue = null;
  const [unitClick, setUnitClick] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(initialValue);

  const startSkillData = finalData?.unit?.[0];
  const startIndicatorData = finalData?.unit?.[0]?.skill?.[0];
  const startunitData = finalData?.unit?.[0]?.id === item.id;
  const handleUnitClick = item => {
    setUnitClick(!unitClick);
    setSelectedUnit(item.id);
  };

  useEffect(() => {
    if (selectedUnit === null && startunitData) {
      setSelectedUnit(finalData?.unit?.[0]?.id);
      setUnitClick(true);
    }
  }, []);
  return (
    <>
      <div
        className="flex gap-1 items-start my-2 cursor-pointer "
        onClick={() => handleUnitClick(item)}
      >
        {unitClick ? (
          <IoIosArrowDown className="min-w-[20px] min-h-[20px] p-1 mr-2 rounded-3xl bg-blue text-white" />
        ) : (
          <IoIosArrowForward className="min-w-[20px] rounded-3xl mr-2 p-1 min-h-[20px] bg-gray-6" />
        )}
        <p className="font-semibold text-sm">{item.name}</p>
      </div>
      {unitClick &&
        item.id === selectedUnit &&
        skillData?.map((item2, index1) => {
          const indicatorData = item2?.indicator;
          return (
            <div key={index1}>
              <ToggleSidebar
                setLessonBodyDisplay={setLessonBodyDisplay}
                startSkillData={startSkillData}
                startIndicatorData={startIndicatorData}
                index={index}
                index1={index1}
                item2={item2}
                indicatorData={indicatorData}
              />
            </div>
          );
        })}
      <div className="border-b border-[#C8C7C7] last:border-none"></div>
    </>
  );
}

import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { useNavigate } from "react-router-dom";
import IndicatorContentAccordian from "./IndicatorContentAccordian";
import { useTranslation } from "react-i18next";

export default function SkillContentAccordian({ indicatorData, item2, skillData }) {
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [skillDropDown, setSkillDropDown] = useState(false);
  const [lessonDropDown, setLessonDropDown] = useState(false);
  const navigate = useNavigate();

  const handleSkillClick = id => {
    setSelectedSkillId(id);
    setSkillDropDown(!skillDropDown);
    setLessonDropDown(false);
  };

  const {t} = useTranslation();
  return (
    <>
      <div
        className="unit_class_skill "
        onClick={() => indicatorData && handleSkillClick(item2.id)}
      >
        <div className="unit_class_skill_hr">
          <div className="unit_class_skill_hr_first"></div>
          {skillData?.length > 1 && <div className="unit_class_skill_hr_second"></div>}
        </div>
        <div className="accordian no_level">
          <div className="indicate_accordian">
            {skillDropDown ? (
              <BsFillCaretDownFill color="#5eead4" />
            ) : (
              <BsFillCaretRightFill color="#9ca3af" />
            )}
            <i className="bx bx-brain" style={{ background: "#5eead4" }}></i>
            <div>
              <h5>{t("th_skill")}</h5>
              <CustomTooltip original={item2?.name} id={item2?.id} />
            </div>
          </div>
          <button
            onClick={() => {
              navigate("../../skills/indicators", {
                state: { id: item2.id, name: item2.name },
              });
            }}
          >
            {t("view_assigned")}
          </button>
        </div>
      </div>
      {selectedSkillId === item2.id &&
        skillDropDown &&
        indicatorData &&
        indicatorData.map(item3 => {
          const lessonData = item3.lesson;
          let lastElement = indicatorData[indicatorData?.length - 1];

          return (
            <IndicatorContentAccordian
              lastElement={lastElement}
              lessonData={lessonData}
              item3={item3}
              indicatorData={indicatorData}
            />
          );
        })}
    </>
  );
}

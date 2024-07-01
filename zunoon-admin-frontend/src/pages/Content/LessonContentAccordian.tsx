import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import ContentAccordian from "./ContentAccordian";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LessonContentAccordian({ lastElement, contentData, item4, lessonData }) {
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [lessonDropDownOpen, setLessonDropDownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLessonClick = id => {
    setSelectedLessonId(id);
    setLessonDropDownOpen(!lessonDropDownOpen);
  };
  const {t} = useTranslation();
  return (
    <>
      <div className="unit_class_skill " onClick={() => contentData && handleLessonClick(item4.id)}>
        <div className="unit_class_skill_indicator_lesson_hr">
          <div className="unit_class_skill_hr_first"></div>
          {lessonData?.length > 1 && item4.id !== lastElement.id && (
            <div className="unit_class_skill_hr_second"></div>
          )}
        </div>
        <div className="accordian no_level">
          <div className="indicate_accordian">
            {lessonDropDownOpen ? (
              <BsFillCaretDownFill color="#ffc107" />
            ) : (
              <BsFillCaretRightFill color="#9ca3af" />
            )}
            <i className="bx bx-align-middle" style={{ background: "#ffc107" }}></i>
            <div>
              <h5>{t("lesson")}</h5>
              <CustomTooltip original={item4?.name} id={item4?.id} />
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/lessons", {
                state: { id: item4.id, name: item4.name },
              });
            }}
          >
            {t("view_assigned")}
          </button>
        </div>
      </div>
      {selectedLessonId === item4.id &&
        lessonDropDownOpen &&
        contentData &&
        contentData.map(item5 => {
          const subContentData = item5.subContent;
          let lastElement = subContentData && subContentData[subContentData?.length - 1];

          return (
            <ContentAccordian
              lastElement={lastElement}
              subContentData={subContentData}
              contentData={contentData}
              item5={item5}
            />
          );
        })}
    </>
  );
}

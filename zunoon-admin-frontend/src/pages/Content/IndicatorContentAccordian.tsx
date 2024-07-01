import { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { useNavigate } from "react-router-dom";
import LessonContentAccordian from "./LessonContentAccordian";
import { useTranslation } from "react-i18next";

export default function IndicatorContentAccordian({
  lessonData,
  item3,
  lastElement,
  indicatorData,
}) {
  const [selectedIndicatorId, setSelectedIndicatorId] = useState("");
  const [indicatorDropDownOpen, setIndicatorDropDownOpen] = useState(false);
  const [contentDropDown, setContentDropDown] = useState(false);
  const navigate = useNavigate();

  const handleIndicatorClick = id => {
    setSelectedIndicatorId(id);
    setIndicatorDropDownOpen(!indicatorDropDownOpen);
    setContentDropDown(false);
  };
  const {t} = useTranslation();
  return (
    <>
      <div
        className="unit_class_skill"
        onClick={() => lessonData && handleIndicatorClick(item3.id)}
      >
        <div className="unit_class_skill_indicator_hr">
          <div className="unit_class_skill_hr_first"></div>
          {indicatorData?.length > 1 && item3.id !== lastElement.id && (
            <div className="unit_class_skill_hr_second"></div>
          )}
        </div>
        <div className="accordian no_level">
          <div className="indicate_accordian">
            {indicatorDropDownOpen ? (
              <BsFillCaretDownFill color="#a8ea1a" />
            ) : (
              <BsFillCaretRightFill color="#9ca3af" />
            )}
            <i className="bx bxs-book-content" style={{ background: "#a8ea1a" }}></i>
            <div>
              <h5>{t("dashboard_indicator")}</h5>
              <CustomTooltip original={item3?.name} id={item3?.id} />
            </div>
          </div>
          <button
            onClick={() => {
              navigate("../../indicators/lessons", {
                state: { id: item3.id, name: item3.name },
              });
            }}
          >
            {t("view_assigned")}
          </button>
        </div>
      </div>
      {selectedIndicatorId === item3.id &&
        indicatorDropDownOpen &&
        lessonData &&
        lessonData.map(item4 => {
          const contentData = item4.content;
          let lastElement = lessonData[lessonData?.length - 1];

          return (
            <LessonContentAccordian
              lastElement={lastElement}
              contentData={contentData}
              item4={item4}
              lessonData={lessonData}
            />
          );
        })}
    </>
  );
}

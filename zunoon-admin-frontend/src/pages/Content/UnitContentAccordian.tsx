import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { useNavigate } from "react-router-dom";
import SkillContentAccordian from "./SkillContentAccordian";
import { useTranslation } from "react-i18next";

export default function UnitContentAccordian({ skillData, item, level }) {
  const [selectedId, setSelectedId] = useState("");
  const [unitDropDown, setUnitDropDown] = useState(false);
  const [indicatorDropDown, setIndicatorDropDown] = useState(false);
  const navigate = useNavigate();

  const handleUnitClick = id => {
    setSelectedId(id);
    setUnitDropDown(!unitDropDown);
    setIndicatorDropDown(false);
  };
  const {t} = useTranslation();
  return (
    <div className={level ? "level_all_unit_class" : "all_unit_class"}>
      <div className="unit_class_2" onClick={() => skillData && handleUnitClick(item.id)}>
        <div className="indicate_accordian">
          {unitDropDown ? (
            <BsFillCaretDownFill color="#00bad6" />
          ) : (
            <BsFillCaretRightFill color="#9ca3af" />
          )}
          <i className="bx bx-book-reader text-[#00bad6]"></i>
          <div>
            <h5>{t("th_unit")} {`(${item?.startDate} - ${item?.endDate})`}</h5>
            <CustomTooltip original={item?.name} id={item?.id} />
          </div>
        </div>
        <button
          onClick={() => {
            navigate("../../units/skills", {
              state: { id: item.id, name: item.name },
            });
          }}
        >
          {t("view_assigned")}
        </button>
      </div>
      {selectedId === item?.id &&
        unitDropDown &&
        skillData &&
        skillData.map(item2 => {
          const indicatorData = item2.indicator;
          return (
            <SkillContentAccordian
              key={item2?.id}
              indicatorData={indicatorData}
              item2={item2}
              skillData={skillData}
            />
          );
        })}
    </div>
  );
}

import React, { useState } from 'react'
import UnitContentAccordian from './UnitContentAccordian';

export default function LevelContentAccordian({ item, data, tableOfUnit }) {
    const [selecteddLevelId, setSelectedLevelId] = useState("");
    const [levelDropDown, setLevelDropDown] = useState(false);


    const handleLevelClick = key => {
        setSelectedLevelId(key);
        setLevelDropDown(!levelDropDown);
    };

    return (
        <>
            <div className="accordian" onClick={() => handleLevelClick(item)}>
                <div className="indicate_accordian">
                    <i className="bx bx-brain" style={{ background: "#0dcaf0" }}></i>
                    <div>
                        <h5>Level</h5>
                        <h2>{item}</h2>
                    </div>
                </div>
            </div>
            <>
                {selecteddLevelId === item &&
                    data &&
                    data.map(level => {
                        return (
                            <>
                                {levelDropDown &&
                                    tableOfUnit &&
                                    tableOfUnit.map(item2 => {
                                        if (
                                            item2.id === level.id &&
                                            item === level.level
                                        ) {
                                            const skillData = item2.skill;
                                            return (
                                                <UnitContentAccordian skillData={skillData} item={item2} level={true} />
                                            );
                                        }
                                    })}
                            </>
                        );
                    })}
            </>
        </>
    )
}

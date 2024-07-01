/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const CheckboxTree = ({ data, onCheckboxChange, checkedMap, type }) => {
  const initialIsChecked =
    checkedMap[data.id] !== undefined ? checkedMap[data.id] : data.is_checked;
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheckboxChange(data.id, newCheckedState);
  };

  const renderSubDepartments = () => {
    if (
      !Array.isArray(data.sub_department) ||
      data.sub_department.length === 0
    ) {
      return null;
    }

    return (
      <div style={{ marginLeft: "20px" }}>
        {data.sub_department.map((sub) => (
          <CheckboxTree
            key={sub.id}
            data={sub}
            onCheckboxChange={onCheckboxChange}
            checkedMap={checkedMap}
            parentChecked={isChecked}
            type={type}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <label className="flex items-center gap-x-1 w-fit">
        {type === "submit" && (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        )}
        {data.title}
      </label>
      {isChecked && renderSubDepartments()}
    </div>
  );
};

const FilteredJsonComponent = ({ originalJson, setStateData, type }) => {
  const [checkedMap, setCheckedMap] = useState({});

  const handleCheckboxChange = (id, isChecked = true) => {
    const newCheckedMap = { ...checkedMap, [id]: isChecked };
    setCheckedMap(newCheckedMap);
  };

  const updateJson = (jsonData, parentChecked = true) => {
    const initialIsChecked =
      checkedMap[jsonData.id] !== undefined
        ? checkedMap[jsonData.id]
        : jsonData.is_checked;
    const newCheckedState = initialIsChecked && parentChecked;

    return {
      ...jsonData,
      is_checked: newCheckedState,
      sub_department: (jsonData.sub_department || []).map((sub) =>
        updateJson(sub, newCheckedState)
      ),
    };
  };

  const filteredJson = updateJson(originalJson);

  useEffect(() => {
    setStateData((prev) => ({
      ...prev,
      sub_department: (prev.sub_department || []).map((sub) =>
        updateJson(sub, true)
      ),
    }));
  }, [checkedMap]);

  return (
    <div>
      <CheckboxTree
        data={filteredJson}
        onCheckboxChange={handleCheckboxChange}
        checkedMap={checkedMap}
        parentChecked={true} // Initial parentChecked is true
        type={type}
      />
    </div>
  );
};

const CheckboxTreeComp = ({ type = "submit", stateData, setStateData }) => (
  <div>
    {stateData?.sub_department?.map((sub) => (
      <FilteredJsonComponent
        key={sub.id}
        originalJson={sub}
        setStateData={setStateData}
        type={type}
      />
    ))}
  </div>
);

export default CheckboxTreeComp;

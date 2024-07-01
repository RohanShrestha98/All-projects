import { Select } from "antd";
import React from "react";

const CustomSelect = ({
  options = [],
  defaultValue = [],
  value,
  placeholder,
  handleChange,
  className,
  label = "",
  id,
}) => {
  return (
    <div className="space-y-3">
      <label className={`${className}`}>{label}</label>
      <Select
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full h-[42px] md:text-xs `}
        allowClear
        value={value}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;

import React from "react";

const CustomCheckbox = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" />
      <p>{text}</p>
    </div>
  );
};

export default CustomCheckbox;

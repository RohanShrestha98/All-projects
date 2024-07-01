/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomSelect from "../CustomSelect";

export default function SearchSelectField({
  label,
  placeholder,
  required = false,
  errorMessage,
  className,
  orientation = "vertical",
  options,
  defaultValue,
  changeHandler,
  ...rest
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      className={`relative flex ${className} ${
        orientation === "horizontal"
          ? "flex-row-reverse items-center justify-end gap-4"
          : "flex-col-reverse gap-2"
      }`}
    >
      {errorMessage ? (
        <span
          className={`text-xs italic text-danger ${
            orientation === "horizontal"
              ? "absolute right-0.5 top-full mt-1.5"
              : "ml-0.5"
          }`}
        >
          {errorMessage}
        </span>
      ) : null}
      <CustomSelect
        options={options}
        // value={bloodGroupData}
        defaultValue={defaultValue}
        placeholder={placeholder}
        register={() => {}}
        name={"blood_group"}
        // label={"Blood Group"}
        handleChange={changeHandler}
      />
      <label
        className={`flex gap-1 text-sm whitespace-nowrap font-medium ${
          rest.disabled
            ? "text-grayText"
            : isMenuOpen
            ? "text-primary"
            : "text-grayTextDark peer-hover:text-blackText"
        }`}
      >
        <span>{label}</span>
        {required ? <span className="text-danger">*</span> : null}
      </label>
    </div>
  );
}

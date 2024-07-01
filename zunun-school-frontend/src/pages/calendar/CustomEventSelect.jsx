import React from "react";
import Select from "react-select";
const customStyles = {
  control: provided => ({
    ...provided,
    boxShadow: "none",
    fontSize: 12,
    borderRadius: 10,
    background: "#FFFFFF",
    marginTop: 3,
    minheight: 40,
  }),
  placeholder: provided => ({
    ...provided,
    color: "#909090",
    fontSize: 30,
    opacity: 0.5,
  }),
};

export default function CustomEventSelect(props) {
  const {
    name,
    options,
    value,
    handleChange,
    disabled,
    required,
    register,
    placeholder,
    ...rest
  } = props;
  return (
    <Select
      id={name}
      {...rest}
      {...register(name, { required })}
      options={options}
      value={value}
      onChange={(e, data) => handleChange(e, data)}
      isDisabled={disabled}
      styles={customStyles}
      placeholder={placeholder}
    />
  );
}

import React from "react";
import Select from "react-select";
import { ISelectLabelValue } from "../../@types/school";

type propsType = {
  id?: string;
  name?: string;
  options: any[];
  value: string | undefined | ISelectLabelValue;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: any;
  isOptional?: boolean;
  haslevel?: boolean;
  defaultValues?: object;
  handleChange: (e: Event, data: any) => any;
};
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    boxShadow: "none",
    fontSize: 12,
    borderRadius: 20,
    background: "#f9f9f9",
    marginTop: 12,
    height: 60,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#000",
    fontSize: 12,
    opacity: 0.5,
  }),
};

export default function CustomEventSelect(props: propsType) {
  const { name, options, value, handleChange, disabled, required, register, placeholder, ...rest } =
    props;
  return (
    <Select
      id={name}
      {...rest}
      {...register(name, { required })}
      options={options}
      value={value}
      onChange={(e: Event, data) => handleChange(e, data)}
      isDisabled={disabled}
      styles={customStyles}
      placeholder={placeholder}
    />
  );
}

import Select from "react-select";
import { ISelect } from "../../@types/select";
import "./CustomSelect.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    boxShadow: "none",
    border: state.isFocused ? "1px solid #00bad6" : "1px solid #989e9a",
    "&:hover": {
      border: "1px solid #00bad6",
    },
    fontSize: 12,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#000",
    fontSize: 12,
    opacity: 0.5,
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
};

export default function CustomSelect(props: ISelect) {
  const {
    name,
    label,
    options,
    value,
    handleChange,
    disabled,
    required,
    register,
    isMulti,
    placeholder,
    defaultValue,
    isContentForm,
    onMenuScrollToBottom,
    clearable = true,
    ...rest
  } = props;
  const location = useLocation();




  return (
    <>
      <div className="select_label_container">
        {label && <label htmlFor={name}>{label}</label>}
        {required && <span>*</span>}
      </div>
      <Select
        className={isContentForm && "dropdown_select"}
        id={name}
        {...rest}
        {...register(name, { required })}
        options={options}
        value={value}
        defaultValue={defaultValue}
        onChange={(e: Event, data) => handleChange(e, data)}
        isDisabled={disabled}
        isMulti={isMulti}
        styles={customStyles}
        placeholder={placeholder}
        isClearable={clearable}
        isOptionDisabled={(option: any) => option.isDisabled}
        onMenuScrollToBottom={onMenuScrollToBottom}
      />
    </>
  );
}

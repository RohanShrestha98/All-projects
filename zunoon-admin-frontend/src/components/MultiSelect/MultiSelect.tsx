import React from "react";
import Select from "react-select";
import { optionType } from "../../@types/option";
import "./MultiSelect.scss";

const customStyles = {
  control: (provided, state) => ({
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

  menuList: provided => ({
    ...provided,
    maxHeight: "200px",
    overflow: "auto",
    position: "relative",
    zIndex: 99,
  }),
};

type PropsType = {
  selected?: { value: string; label: string }[];
  options: optionType[] | any;
  defaultValues?: any;
  handleMultiSelect?: Function | React.ChangeEventHandler | any;
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
  isDisabled?: boolean;
  rest?: any;
  placeholder?: string;
  label?: string;
  name?: string;
  required?: boolean;
};

type RefType = HTMLInputElement | null | undefined | any;


const MultiSelect = React.forwardRef<RefType, PropsType>(
  (
    {
      selected = [],
      options = [],
      defaultValues,
      handleMultiSelect,
      onMenuScrollToBottom,
      placeholder,
      name,
      label,
      required = false,
      isDisabled = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        <div className="multi_select_label_container">
          {label && <label htmlFor={name}>{label}</label>}
          {required && <span>*</span>}
        </div>
        <Select
          defaultValue={defaultValues}
          isMulti
          value={selected}
          options={options}
          styles={customStyles}
          name={name}
          {...rest}
          onChange={handleMultiSelect}
          ref={ref}
          placeholder={placeholder}
          onMenuScrollToBottom={onMenuScrollToBottom}
          isDisabled={isDisabled}
        />
        {/* {required && !selected.length && <p className="error">This field is required</p>} */}
      </>
    );
  },
);

export default MultiSelect;

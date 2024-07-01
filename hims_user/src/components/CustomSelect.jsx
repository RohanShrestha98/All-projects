/* eslint-disable react/prop-types */
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: state.isFocused
      ? "1px solid border-gray-dark3"
      : "1px solid border-gray-dark3",
    "&:hover": {
      border: "1px solid border-gray-dark3",
    },
    fontSize: 12,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
    fontSize: 12,
    opacity: 0.5,
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
};

export default function CustomSelect(props) {
  const {
    name,
    label,
    labelClassname = "ml-1 text-sm mb-1 text-gray-900 font-semibold ",
    options,
    value,
    handleChange,
    disabled,
    required,
    register,
    placeholder,
    defaultValue,
    ...rest
  } = props;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className={labelClassname}>
          {label && <label htmlFor={name}>{label}</label>}
          {required && <span className="text-red-600 font-bold ml-1">*</span>}
        </div>
      )}

      <Select
        id={name}
        {...rest}
        required={required}
        {...register(name)}
        options={options}
        value={value}
        defaultValue={defaultValue}
        onChange={(e, data) => handleChange(e, data)}
        isDisabled={disabled}
        styles={customStyles}
        placeholder={placeholder}
        isClearable
        isOptionDisabled={(option) => option.isDisabled}
      />
    </div>
  );
}

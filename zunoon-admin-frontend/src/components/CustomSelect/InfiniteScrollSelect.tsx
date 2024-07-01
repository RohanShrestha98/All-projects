import { AsyncPaginate } from "react-select-async-paginate";
import "./CustomSelect.scss";
import { IInfiniteScrollSelect } from "../../@types/select";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export const InfiniteScrollSelect = (props: IInfiniteScrollSelect) => {
  const {
    name,
    label,
    loadOptions,
    value,
    handleChange,
    disabled,
    required,
    register,
    placeholder,
    defaultValue,
    isMulti = false,
    isDisabled = false,
    submitButtonClick = false,
    ...rest
  } = props;

  const location = useLocation();

  const { t } = useTranslation();

  return (
    <>
      <div className="select_label_container">
        {label && <label htmlFor={name}>{label}</label>}
        {required && <span>*</span>}
      </div>
      <AsyncPaginate
        isMulti={isMulti}
        {...rest}
        {...register(name, { required })}
        id={name}
        key={name}
        value={value}
        loadOptions={loadOptions}
        onChange={(e: Event, data) => handleChange(e, data)}
        isSearchable
        isClearable
        placeholder={placeholder}
        additional={{
          page: 1,
        }}
        styles={customStyles}
        isDisabled={disabled}
      />
      {!location.pathname.includes("contents") &&
        required &&
        !value?.length &&
        submitButtonClick && <p className="error">{t("field_required")}</p>}
    </>
  );
};

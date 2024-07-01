import React, { LegacyRef, ReactNode } from "react";
import styles from "./DropdownField.module.scss";
import { DropdownType } from "../../@types/formField";
import { useTranslation } from "react-i18next";

const Selector = React.forwardRef(
  (
    {
      label,
      name,
      editform,
      required = false,
      setValue,
      selectValue,
      setSelectValue,
      options,
      disabled = false,
      ...rest
    }: DropdownType,
    ref: LegacyRef<HTMLSelectElement>,
  ) => {
    const { t } = useTranslation();
    return (
      <div className={styles.main}>
        <div className={styles.labelCon}>
          {label && <label htmlFor={name}>{label}</label>}
          {required && <span>*</span>}
        </div>

        <select
          className={styles.select}
          name={name}
          disabled={disabled}
          id={name}
          {...rest}
          ref={ref}
          value={selectValue && selectValue}
          onChange={e => {
            rest?.onChange && rest?.onChange(e);
            setSelectValue && setSelectValue(e.target.value);
          }}
        >
          {!editform && <option value="0">{t("select")}</option>}
          {options.map(val => (
            <option key={Object.keys(val)[0]} value={Object.keys(val)[0]}>
              {Object.values(val)[0] as ReactNode}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

export default Selector;

import React, { useState } from "react";
import styles from "./InputField.module.scss";
import Icon from "../Icon/Icon";
import { InputType } from "../../@types/formField";
import { Tooltip } from "react-tooltip";
import { BsDot } from "react-icons/bs";
import { useLocation } from "react-router-dom";

type RefType = HTMLInputElement | null;
const InputField = React.forwardRef<RefType, InputType>(
  (
    {
      label,
      name,
      currentCharacterLength,
      type,
      required = false,
      icon,
      tooltipText,
      setValue,
      validateInput,
      placeholder,
      value,
      defaultValue = "",
      disabled = false,
      max = 100,
      autoFocus,
      min,
      registerName,
      onChange,
      handleGeneratePassword,
      onKeyUp,
      watchValue,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const location = useLocation();
    const avoidCharactersLengthDisplayPathnameArray = ["/schools", "/staffs", "/profile", "/login"];
    const avoidCharactersLengthDisplay = avoidCharactersLengthDisplayPathnameArray.some(item =>
      location?.pathname?.includes(item),
    );

    return (
      <div className={styles.main}>
        <div className={styles.labelCon}>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <div>
              {label && <label htmlFor={name}>{label}</label>}
              {required && <span>*</span>}
            </div>
            {max && type === "text" && !avoidCharactersLengthDisplay && (
              <div style={{ fontSize: "12px" }}>
                {watchValue?.length || 0}/{max}
              </div>
            )}
          </div>

          {icon && (
            <>
              <section
                data-tooltip-variant="info"
                style={{ marginLeft: "2px", cursor: "pointer" }}
                data-tooltip-id={name}
              >
                {icon}
              </section>
              <Tooltip place="bottom" id={name} style={{ zIndex: "99" }}>
                <ul>
                  {tooltipText?.map(item => {
                    return (
                      <li style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <BsDot />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </Tooltip>
            </>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type={type === "password" ? (!showPassword ? "password" : "text") : type}
            autoComplete={type === "password" ? "off" : "on"}
            className={styles.input}
            name={name}
            disabled={disabled}
            max={max}
            min={min}
            //@ts-ignore
            maxLength={max}
            value={value && value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onChange}
            onKeyUp={onKeyUp}
            ref={ref}
            {...rest}
            autoFocus={autoFocus}
          />
          {
            <>
              {type === "password" ? (
                !showPassword ? (
                  <div className={styles.eyeIconWrapper}>
                    <Icon className={`fas fa-eye-slash `} onClick={handleShowPassword} />
                  </div>
                ) : (
                  <div className={styles.eyeIconWrapper}>
                    <Icon className={`fas fa-eye `} onClick={handleShowPassword} />
                  </div>
                )
              ) : null}
            </>
          }
        </div>
      </div>
    );
  },
);

export default InputField;

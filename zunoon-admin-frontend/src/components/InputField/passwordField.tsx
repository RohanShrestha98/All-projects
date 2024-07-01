import React, { useEffect, useState } from "react";
import styles from "./InputField.module.scss";
import Icon from "../Icon/Icon";
import { InputType } from "../../@types/formField";
import { Tooltip } from "react-tooltip";
import { BsDot } from "react-icons/bs";

type RefType = HTMLInputElement | null;

const generateRandomPassword = () => {
  const passwordLength = 12;

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const specialChars = "!@#$%&*";

  const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

  let password = "";

  // Ensure at least one character from each character set
  password += lowercaseChars[getRandomInt(lowercaseChars.length)];
  password += uppercaseChars[getRandomInt(uppercaseChars.length)];
  password += numericChars[getRandomInt(numericChars.length)];
  password += specialChars[getRandomInt(specialChars.length)];

  // Generate the remaining characters
  for (let i = password.length; i < passwordLength; i++) {
    const randomIndex = getRandomInt(allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle the password characters
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

const PasswordField = React.forwardRef<RefType, InputType>(
  (
    {
      label,
      name,
      required = false,
      icon,
      tooltipText,
      setValue,
      validateInput,
      placeholder,
      value,
      defaultValue = "",
      disabled = false,
      max,
      autoFocus,
      min,
      registerName,
      onChange,
      handleGeneratePassword,
      onKeyUp,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const generatePass = () => {
      const password = generateRandomPassword();
      setValue(password);
    };

    const handlePasswordChange = e => {
      setValue(e.target.value);
    };

    return (
      <div>
        <div className={styles.main}>
          <div className={styles.labelCon}>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <div>
                {label && <label htmlFor={name}>{label}</label>}
                {required && <span>*</span>}
              </div>
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
              type={!showPassword ? "password" : "text"}
              autoComplete="off"
              className={styles.input}
              name={name}
              disabled={disabled}
              max={max}
              min={min}
              value={value}
              placeholder={placeholder}
              onChange={handlePasswordChange}
              onKeyUp={onKeyUp}
              ref={ref}
              {...rest}
              autoFocus={autoFocus}
            />

            <div style={{ display: "flex", gap: "4px" }}>
              <div className={styles.settingIconWrapper}>
                <Icon className={`fas fa-key`} onClick={() => generatePass()} />
              </div>
              {!showPassword ? (
                <div className={styles.eyeIconWrapper}>
                  <Icon className={`fas fa-eye-slash `} onClick={handleShowPassword} />
                </div>
              ) : (
                <div className={styles.eyeIconWrapper}>
                  <Icon className={`fas fa-eye `} onClick={handleShowPassword} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default PasswordField;

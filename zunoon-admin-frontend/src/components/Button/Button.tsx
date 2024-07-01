import React from "react";
import Icon from "../Icon/Icon";
import * as styles from "./Button.module.scss";

type PropsType = {
  disabledButton?: boolean;
  buttonName: any;
  type?: "button" | "submit" | "reset" | undefined;
  filledButton?: boolean;
  filter?: boolean;
  color?: string;
  iconName?: string;
  clickHandler?: Function
  fontsize?: string;
  disabled?: boolean;
  disabledSet?: (val: boolean) => void;
  style?: any;
  classes?: string;
  loading?: boolean;
};

const Button = ({
  buttonName,
  type,
  filledButton = false,
  color = "default",
  iconName,
  clickHandler,
  fontsize = "small",
  disabledButton = false,
  disabled,
  disabledSet,
  style,
  classes,
}: PropsType) => {
  return (
    <>
      {filledButton ? (
        <button
          type={type}
          onClick={e => {
            clickHandler && clickHandler(e);
            if (disabledButton && disabledSet) {
              disabledSet(true);
              setTimeout(() => {
                disabledSet(false);
              }, 5000);
            }
          }}
          className={`${styles.filledButton} button ${classes ? classes : ""}`}
          data-color={disabled ? "disabled" : color}
          data-fontsize={fontsize}
          disabled={disabled}
          style={style}
        >
          <Icon className={iconName} />
          {buttonName}
        </button>
      ) : (
        <button
          type={type}
          onClick={e => {
            clickHandler && clickHandler(e);
            if (disabledButton && disabledSet) {
              disabledSet(true);
              setTimeout(() => {
                disabledSet(false);
              }, 5000);
            }
          }}
          className={`${styles.button} button ${classes ? classes : ""}`}
          data-color={disabled ? "disabled" : color}
          data-fontsize={fontsize}
          disabled={disabled}
        >
          {buttonName}
        </button>
      )}
    </>
  );
};

export default Button;

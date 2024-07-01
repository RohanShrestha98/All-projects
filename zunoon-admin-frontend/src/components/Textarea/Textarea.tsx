import React, { useEffect, useState } from "react";
import styles from "./Textarea.module.scss";
import Tex2SVG from "react-hook-mathjax";
import "./style.css";

type PropsType = {
  rest?: any;
  rows: number;
  name: string;
  cols?: number;
  error?: Error;
  label: string;
  value?: string;
  maxLength?: number;
  border?: string;
  errorMsg?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  isMathJsx?: boolean;
  placeholder: string;
  onChange?: Function;
  setValue?: Function;
  watchValue?: string;
  validateInput?: Function;
};

type RefType = HTMLTextAreaElement | null;

const Textarea = React.forwardRef<RefType, PropsType>(
  (
    {
      label,
      name,
      setValue,
      validateInput,
      required = false,
      error,
      errorMsg,
      placeholder,
      value,
      watchValue,
      rows,
      defaultValue,
      cols,
      isMathJsx,
      border,
      disabled = false,
      maxLength = 500,
      ...rest
    },
    ref,
  ) => {
    const [mathJsx, setMathJsx] = useState(false);
    const [inputValue, setInputValue] = useState(
      "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\kappa T_{\\mu\\nu}",
    );
    const [textAreaValue, setTextAreaValue] = useState("");

    useEffect(() => {
      setTextAreaValue(watchValue);
    }, [watchValue]);

    return (
      <div className={styles.main}>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "space-between" }}
          className={`${styles.labelCon} `}
        >
          <div>
            {label && <label htmlFor={name}>{label}</label>}
            {required && <span>*</span>}
          </div>
          {maxLength && (
            <div style={{ fontSize: "12px" }}>
              {textAreaValue?.length || 0} / {maxLength}
            </div>
          )}
          {/* {
            isMathJsx &&
            <div style={{ display: "flex", gap: "10px" }}>
              <input type="checkbox" onClick={() => setMathJsx(!mathJsx)} />
              <p style={{ marginLeft: "20px", marginTop: "3px", color: "gray" }}>Use Math jsx </p>
            </div>
          } */}
        </div>
        {isMathJsx && mathJsx ? (
          <div className="mathjsx">
            <header>
              <div className="tex-container">
                <Tex2SVG class="tex" tabindex={-1} latex={inputValue} />
              </div>
              <textarea
                className="mathJsxInput"
                defaultValue={inputValue}
                placeholder="Question title"
                onChange={e => setInputValue(e.target.value)}
              />
            </header>
          </div>
        ) : (
          <textarea
            data-border={border}
            className={styles.input}
            //   value={value}
            name={name}
            disabled={disabled}
            id={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            cols={cols}
            rows={rows}
            {...rest}
            maxLength={maxLength}
            ref={ref}
            onChange={e => {
              e.target.value = e?.target?.value?.trimStart();
              setTextAreaValue(e?.target?.value?.trimStart());
            }}
          />
        )}
      </div>
    );
  },
);
export default Textarea;

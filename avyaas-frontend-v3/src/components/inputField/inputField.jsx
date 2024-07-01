import React, { forwardRef, useState } from "react";
import { HidePasswordSvg, ShowPasswordSvg } from "../../assets/allSvg";

const InputField = forwardRef(function InputFieldComponent(
  {
    required = false,
    defaultValue = "",
    name,
    label,
    type = "text",
    placeholder,
    errorMessage,
    className,
    disabled,
    ...rest
  },
  ref
) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {type === "password" ? (
        <div className="flex flex-col rounded-lg gap-2 bg-white">
          {label && (
            <h2 className="md:text-xs text-[#4B4B4B] leading-4">
              {label} {required}
            </h2>
          )}
          <div className="flex relative justify-between w-full border border-[#CCCCCC] rounded-lg">
            <input
              defaultValue={defaultValue}
              name={name}
              type={passwordVisible ? "text" : "password"}
              autoComplete="off"
              placeholder={placeholder}
              ref={ref}
              {...rest}
              className={`py-3 px-5 rounded-lg ${className}`}
            />
            {passwordVisible ? (
              <div
                className="absolute right-3 top-1/3"
                onClick={() => togglePasswordVisibility()}
              >
                <ShowPasswordSvg className="h-[18px] w-[18px]" />
              </div>
            ) : (
              <div
                className="absolute right-3 top-1/3"
                onClick={() => togglePasswordVisibility()}
              >
                <HidePasswordSvg className="h-[18px] w-[18px]" />
              </div>
            )}
          </div>
          <p className="text-red text-xs">{errorMessage}</p>
        </div>
      ) : (
        <div className="flex flex-col rounded-lg gap-2 bg-white">
          {label && (
            <>
              <span className="md:text-xs text-[#4B4B4B] leading-4">
                {label}
                {required && <span className="text-danger">*</span>}
              </span>
            </>
          )}
          <div
            className={`flex items-center justify-between w-full border border-[#CCCCCC] rounded-lg`}
          >
            <input
              defaultValue={defaultValue}
              name={name}
              type={type}
              autoComplete="on"
              placeholder={placeholder}
              {...rest}
              ref={ref}
              className={`py-3 px-5 rounded-lg outline-none ${className} ${
                disabled
                  ? "cursor-not-allowed bg-[#E7E7E7]"
                  : "focus:border-theme-color  hover:border-theme-color"
              }`}
              disabled={disabled}
            />
          </div>
          <p className="text-red text-xs">{errorMessage}</p>
        </div>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;

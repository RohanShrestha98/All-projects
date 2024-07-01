/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function InputField({
  type,
  register,
  isIcon,
  placeholder,
  className,
  labelClassname = "text-sm mb-1 text-gray-600  font-semibold",
  registerName,
  label,
  max,
  min,
  disabled,
  icon,
  defaultValue,
  required,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const maxDate = moment(max).format("YYYY-MM-DD");
  const minDate = moment(min).format("YYYY-MM-DD");
  return (
    <>
      {isIcon ? (
        <div className="flex flex-col">
          {label && (
            <label htmlFor="" className={`${labelClassname} `}>
              {label}{" "}
              {required && <span className="text-red-600 font-bold">*</span>}
            </label>
          )}

          <div
            className={`flex items-center gap-2 ${
              disabled && "bg-[#f2f2f2]"
            } w-full border border-gray-dark3 h-10 hover:border-[#6786c1]  rounded-lg ${className}`}
          >
            <div className="h-full flex items-center text-gray-400 text-lg">
              {" "}
              {icon}
            </div>
            <input
              className="outline-none h-9 w-full text-sm bg-transparent px-3"
              {...register(registerName, { required: required })}
              defaultValue={defaultValue}
              disabled={disabled}
              max={max && maxDate}
              min={min && minDate}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
            />
            {type === "password" && (
              <>
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                    size={18}
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                    size={18}
                  />
                )}
              </>
            )}
          </div>
        </div>
      ) : label ? (
        <div>
          <label htmlFor="" className={`${labelClassname} `}>
            {label}{" "}
            {required && <span className="text-red-600 font-bold">*</span>}
          </label>
          <div
            className={`w-full border ${
              disabled && "bg-[#f2f2f2]"
            } flex items-center justify-between relative border-gray-dark3 h-10 rounded-lg ${className}`}
          >
            <input
              className="outline-none h-9 w-full text-sm bg-transparent px-3"
              {...register(registerName, { required: required })}
              defaultValue={defaultValue}
              type={type === "password" && showPassword ? "text" : type}
              // max={"2023-12-20"}
              disabled={disabled}
              min={min && minDate}
              max={max && maxDate}
              placeholder={placeholder}
            />
            {type === "password" && (
              <>
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 absolute top-1/4 right-3 cursor-pointer"
                    size={18}
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 absolute top-1/4 right-3 cursor-pointer"
                    size={18}
                  />
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 w-full border border-gray-dark3 h-10 px-3 rounded-lg ${className} ${
            disabled && "bg-[#f2f2f2]"
          }`}
        >
          <input
            className="outline-none h-9 w-full text-sm bg-transparent"
            {...register(registerName, { required: required })}
            type={type}
            disabled={disabled}
            max={max && maxDate}
            min={min && minDate}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </div>
      )}
    </>
  );
}

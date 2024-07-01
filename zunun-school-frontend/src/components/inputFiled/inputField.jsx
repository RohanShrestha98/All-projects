/* eslint-disable react/display-name */
import React, { forwardRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const InputFileld = forwardRef(
  ({ name, type, placeholder, prefixIcon, ...rest }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    return (
      <div>
        {type === "password" ? (
          <div className="flex rounded-lg  py-2 sm:p-4 gap-2  bg-gray-100 items-center  px-3">
            <span className="">{prefixIcon}</span>
            <input
              name={name}
              type={passwordVisible ? "text" : "password"}
              autoComplete="off"
              placeholder={placeholder}
              ref={ref}
              {...rest}
              className="border-black bg-gray-100 font-Urbanist min-w-[82%] "
            />
            {passwordVisible ? (
              <AiFillEye onClick={() => togglePasswordVisibility()} />
            ) : (
              <AiFillEyeInvisible onClick={() => togglePasswordVisibility()} />
            )}
          </div>
        ) : (
          <div className="flex rounded-lg w-full py-2 sm:p-4 bg-gray-100 items-center px-3">
            <span className="flex items-center gap-2">{prefixIcon}</span>
            <input
              name={name}
              type={type}
              autoComplete="on"
              placeholder={placeholder}
              {...rest}
              ref={ref}
              className="outline-none bg-gray-100 font-Urbanist min-w-[88%] ml-2"
            />
          </div>
        )}
      </div>
    );
  },
);

export default InputFileld;

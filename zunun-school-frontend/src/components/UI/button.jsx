import React from "react";
import { Button as AntButton } from "antd";

export const ButtonSubmit = ({
  color,
  bgColor,
  borderRadius,
  text,
  handleClick,
}) => {
  return (
    <div
      onClick={handleClick}
      className={`text-[15px] px-6 py-1.5 flex justify-center items-center rounded-3xl text-${color} bg-${bgColor} border-blue hover:text-blue hover:bg-white border  rounded-[${borderRadius}]`}
    >
      <div>{text}</div>
    </div>
  );
};

export const Button = ({ type, className, ...props }) => {
  const style = {
    primary: `bg-cyan text-white hover:text-cyan hover:!bg-white hover:!border-cyan ${className}`,
    disabled: `bg-zinc-400 text-white hover:!text-white hover:!border-zinc-400 ${className}`,
    outlined: `text-zinc-500 border-zinc-500 hover:!text-cyan hover:!border-cyan ${className}`,
    danger: `bg-rose-600 text-white hover:!text-white hover:!border-rose-600 ${className}`,
    dangerOutlined: `border-rose-600 text-rose-600 hover:!text-rose-600 hover:!border-rose-600 ${className}`,
  };

  return (
    <AntButton className={style[type]} {...props}>
      {props.children}
    </AntButton>
  );
};

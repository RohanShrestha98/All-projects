import React from "react";
import LoadingSvg from "../../assets/allSvg";

export default function Button({
  buttonName,
  icon,
  afterIcon,
  handleClick,
  className = "",
  type = "button",
  isLoading = false,
  disabled = false,
}) {
  return (
    <button
      onClick={handleClick}
      className={`${
        isLoading || disabled ? "opacity-70" : "opacity-100"
      } ${className}`}
      type={type}
      disabled={isLoading || disabled}
    >
      {icon && icon}
      {isLoading && <LoadingSvg className="h-5 w-5 animate-spin" />}
      <p className="whitespace-nowrap"> {buttonName}</p>
      {afterIcon && afterIcon}
    </button>
  );
}

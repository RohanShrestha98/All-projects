/* eslint-disable react/prop-types */
import loading from "../assets/loading.webp";

export default function Button({
  buttonName,
  isFilled = true,
  type,
  className,
  handleButtonClick,
  isLoading,
  isDisabled,
}) {
  return (
    <button
      type={type}
      onClick={() => {
        handleButtonClick();
      }}
      disabled={isDisabled}
      className={`border w-full whitespace-nowrap flex items-center justify-center gap-2 py-2 text-sm  rounded bg-[#265CC0] ${
        !isFilled ? "text-gray-600" : "text-white "
      } ${className}`}
    >
      {isLoading && <img className="w-5 h-5" src={loading} />}
      {buttonName}
    </button>
  );
}

/* eslint-disable react/prop-types */

export default function HeadingAdd({ heading, buttonName, handleButtonClick }) {
  return (
    <div className="flex items-center justify-between">
      <h1>{heading}</h1>
      <button onClick={() => handleButtonClick()}>{buttonName}</button>
    </div>
  );
}

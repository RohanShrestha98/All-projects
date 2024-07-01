/* eslint-disable react/prop-types */

export default function Button({ buttonName }) {
  return (
    <button className="border w-full h-10 rounded bg-blue-500 text-white">
      {buttonName}
    </button>
  );
}

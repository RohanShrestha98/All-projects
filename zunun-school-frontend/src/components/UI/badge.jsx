import React from "react";

function Badge({ text, className }) {
  return (
    <div
      className={
        className +
        " text-center rounded-xl p-1 px-4 text-white w-fit min-w-[100px]"
      }
    >
      {text}
    </div>
  );
}

export default Badge;

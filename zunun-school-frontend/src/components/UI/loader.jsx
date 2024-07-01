import React from "react";

const Loader = ({ size, color }) => {
  return (
    <div
      className={`w-${size ? size : 4} h-${
        size ? size : 4
      } rounded-full inline-block border-t-3 border-${
        color ? color : "blue-500"
      } border-r-3 border-transparent box-content animate-spin`}
    ></div>
  );
};

export default Loader;

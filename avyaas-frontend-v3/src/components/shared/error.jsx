import React from "react";

const Error = ({ message = "Error" }) => {
  return <h1 className="font-medium text-grayText xs:text-sm">{message}</h1>;
};

export default Error;

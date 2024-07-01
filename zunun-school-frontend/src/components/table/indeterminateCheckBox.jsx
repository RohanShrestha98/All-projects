import { Checkbox } from "antd";
import React, { useEffect, useRef } from "react";

export function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}) {
  const ref = useRef(!null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <Checkbox ref={ref} className={className + " cursor-pointer"} {...rest} />
  );
}

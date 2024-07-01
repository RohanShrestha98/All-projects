import { Tooltip } from "antd";
import React from "react";

export const TruncateText = (text, length, toolTipLength) => {
  const truncateText =
    text?.length > length ? (
      <Tooltip
        placement="top"
        title={text?.slice(0, toolTipLength ?? 150)}
        color="#1fb6ffff"
      >
        {" "}
        <p className="text-sm">{text?.slice(0, length) + "..."}</p>
      </Tooltip>
    ) : (
      text
    );

  return truncateText;
};

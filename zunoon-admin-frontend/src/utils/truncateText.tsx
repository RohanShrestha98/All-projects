
import { Tooltip } from "react-tooltip";

export const TruncateText = (text, length, toolTipLength) => {
  const truncateText =
    text?.length > length ? (
      <Tooltip
        place="top"
        content={text?.slice(0, toolTipLength ?? 150)}
      // color="#1fb6ffff"
      >
        {" "}
        <p className="">{text?.slice(0, length) + "..."}</p>
      </Tooltip>
    ) : (
      text
    );

  return truncateText;
};

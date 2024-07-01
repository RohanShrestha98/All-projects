import { Progress } from "antd";
import React from "react";

export default function CircularProgress({
  totalValue = 360,
  currentValue = 180,
}) {
  const percent = (currentValue * 100) / totalValue;
  return (
    <Progress
      className="px-4 pt-4"
      type="dashboard"
      size={70}
      strokeLinecap="butt"
      strokeWidth={10}
      percent={percent}
      format={() => {
        return (
          <div className="space-y-1">
            <p className="text-xs text-theme-color font-bold">{currentValue}</p>
            <p className="text-[10px] text-gray-1">of {totalValue}</p>
          </div>
        );
      }}
    />
  );
}

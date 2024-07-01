import React from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";

const Loading = ({
  className = "flex flex-nowrap w-full overflow-x-auto no-scrollbar gap-4",
  height = 160,
  width = 160,
}) => {
  return (
    <div className={className}>
      {[...Array(4)].map((_, i) => (
        <ShimmerThumbnail
          key={i}
          height={height}
          width={width}
          className="rounded-xl"
        />
      ))}
    </div>
  );
};

export default Loading;

import React from "react";
import MobileHeader from "../../components/navbar/mobileHeader";
import LiveUpdates from "../../containers/home/liveUpdates";

export const Live = () => {
  return (
    <div>
      <MobileHeader headerName={"Live"} noArrow={true} />
      <div className="md:px-3">
        <LiveUpdates />
      </div>
    </div>
  );
};

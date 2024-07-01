/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useLocation } from "react-router-dom";

const VideoLayout = (props) => {
  const location = useLocation();

  return (
    <div className="h-screen overflow-hidden flex flex-col ">
      <Navbar />
      <>{props?.children}</>
      {location.pathname.includes("/subjects/videos") ? null : (
        <div className="w-full bottom-0">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default VideoLayout;

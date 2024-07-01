import React, { useEffect, useRef, useState } from "react";
import videoSrc from "../../../assets/images/video1.mp4";
import ReactPlayer from "react-player";

const VideoMaterial = props => {
  const mqlRef = useRef();
  mqlRef.current ??= window.matchMedia("(orientation:portrait)");
  const [portrait, setPortrait] = useState(mqlRef.current.matches);
  useEffect(() => {
    const handleChange = e => setPortrait(e.matches);
    mqlRef.current.addEventListener("change", handleChange);
    return () => mqlRef.current.removeEventListener("change", handleChange);
  }, []);
  return (
    <ReactPlayer
      width={"100%"}
      height={
        props?.type === "AUDIO" ? "100px" : props.hideSidebar ? "65vh" : "50vh"
      }
      // playing={true}
      controls={true}
      url={`${props.videoUrl ? props.videoUrl : videoSrc}`}
      progressInterval={500}
      key={`${props.videoUrl ? props.videoUrl : videoSrc}`}
    ></ReactPlayer>
  );
};

export default VideoMaterial;

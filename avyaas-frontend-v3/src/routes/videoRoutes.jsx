import React from "react";
import VideoLayout from "../layout/videoLayout";
import { Route, Routes } from "react-router-dom";
import InsideSubject from "../pages/videos/insideSubject";
import VideoDetails from "../pages/videos/videoDetails";
import TopicSidebar from "../pages/videos/topicSidebar";

export default function VideoRoutes() {
  const subjectRoutes = [
    { path: "/subjects/videos", element: <InsideSubject /> },
    { path: "/subjects/videos/details", element: <VideoDetails /> },
    { path: "/subjects/videos/sidebar", element: <TopicSidebar /> },
  ];

  return (
    <VideoLayout>
      <Routes>
        {subjectRoutes.map((route, id) => {
          return <Route key={id} path={route.path} element={route.element} />;
        })}
      </Routes>
    </VideoLayout>
  );
}

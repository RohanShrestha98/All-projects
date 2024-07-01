import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";

import Lesson from "../pages/Lesson/Lesson";
import AddLesson from "../pages/Lesson/AddLesson";

export default function LessonRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.LESSON))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Lesson />} />
      <Route path={PATH.ADD_LESSON} element={<AddLesson />} />
      <Route path="*" element={<Navigate to={`/${PATH.LESSON}`} />} />
    </Routes>
  );
}

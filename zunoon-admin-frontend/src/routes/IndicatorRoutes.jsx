import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import Indicator from "../pages/Indicator/Indicator";
import AddIndicator from "../pages/Indicator/AddIndicator";
import AssignedLesson from "../pages/Indicator/AssignedLesson";

export default function IndicatorRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.INDICATOR))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Indicator />} />
      <Route path={PATH.ADD_INDICATOR} element={<AddIndicator />} />
      <Route path={PATH.ASSIGNED_LESSONS} element={<AssignedLesson />} />
      <Route path="*" element={<Navigate to={`/${PATH.INDICATOR}`} />} />
    </Routes>
  );
}

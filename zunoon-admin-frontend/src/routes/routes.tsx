import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import { PATH } from "../constants/routes";
import StaffRoutes from "./StaffRoutes";
import SchoolRoutes from "./SchoolRoutes";
import CourseRoutes from "./CourseRoutes";
import GradeRoutes from "./GradeRoutes";
import CareerRoutes from "./CareerRoutes";
import SkillRoutes from "./SkillRoutes";
import IndicatorRoutes from "./IndicatorRoutes";
import ProfileRoutes from "./ProfileRoutes";
import ContentRoutes from "./ContentRoute";
import AbilityRoutes from "./AbilityRoutes";
import UnitRoute from "./UnitRoute";
import BasketRoutes from "./BasketRoutes";
import CalendarRoutes from "./CalendarRoutes";
import LessonCardRoutes from "./LessonCardRoutes";
import LevelTypeRoutes from "./LevelTypeRoutes";
// import TableOfContent from "../pages/Content/TableOfContent";

export default function BaseRoutes() {
  return (
    <Routes>
      {/* //public routes */}
      <Route path={PATH.LOGIN} element={<LoginRoutes />} />

      {/* private routes */}
      <Route element={<PrivateRoute />}>
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PATH.STAFF + "/*"} element={<StaffRoutes />} />
        <Route path={PATH.UNIT + "/*"} element={<UnitRoute />} />
        <Route path={PATH.SCHOOL + "/*"} element={<SchoolRoutes />} />
        <Route path={PATH.SKILL + "/*"} element={<SkillRoutes />} />
        <Route path={PATH.COURSE + "/*"} element={<CourseRoutes />} />
        <Route path={PATH.GRADE + "/*"} element={<GradeRoutes />} />
        <Route path={PATH.CAREER + "/*"} element={<CareerRoutes />} />
        <Route path={PATH.INDICATOR + "/*"} element={<IndicatorRoutes />} />
        <Route path={PATH.LESSON + "/*"} element={<LessonCardRoutes />} />
        <Route path={PATH.PROFILE + "/*"} element={<ProfileRoutes />} />
        <Route path={PATH.CONTENT + "/*"} element={<ContentRoutes />} />
        <Route path={PATH.ABILITY + "/*"} element={<AbilityRoutes />} />
        <Route path={PATH.CONTENT_BASKET + "/*"} element={<BasketRoutes />} />
        <Route path={PATH.CALENDAR + "/*"} element={<CalendarRoutes />} />
        <Route path={PATH.LESSON_CARD + "/*"} element={<LessonCardRoutes />} />
        <Route path={PATH.LEVEL_TYPE + "/*"} element={<LevelTypeRoutes />} />
        <Route path="*" element={<Navigate to={PATH.DASHBOARD} />} />
        {/* <Route path={PATH.TABLE_OF_CONTENT} element={<TableOfContent />} /> */}
      </Route>
    </Routes>
  );
}

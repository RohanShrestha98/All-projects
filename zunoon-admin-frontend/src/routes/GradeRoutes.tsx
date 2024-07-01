import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import Grades from "../pages/Grade/Grades";
import AddGrade from "../pages/Grade/AddGrade";
import AssignedCareers from "../pages/Grade/AssignedCareers";
import AssignedCourses from "../pages/Grade/AssignedCourses";

export default function GradeRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.GRADE))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Grades />} />
      <Route path={PATH.ADD_GRADE} element={<AddGrade />} />
      <Route path={PATH.ADD_GRADE_CATEGORY} element={<AddGrade />} />
      <Route path={PATH.ASSIGNED_CAREERS} element={<AssignedCareers />} />
      <Route path={PATH.ASSIGNED_COURSES} element={<AssignedCourses />} />
      <Route path="*" element={<Navigate to={`/${PATH.GRADE}`} />} />
    </Routes>
  );
}

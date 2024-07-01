import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import Grades from "../pages/Grade/Grades";
import AddGradeCategory from "../pages/Grade/AddGradeCategory";

export default function GradeCategoryRoutes() {
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
      <Route path={PATH.ADD_GRADE_CATEGORY} element={<AddGradeCategory />} />
      <Route path="*" element={<Navigate to={`/${PATH.GRADE_CATEGORY}`} />} />
    </Routes>
  );
}

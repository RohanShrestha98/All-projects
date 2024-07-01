import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import Course from "../pages/Course/Course";
import AddCourse from "../pages/Course/AddCourse";
import AssignedUnits from "../pages/Course/AssignedUnits";
import TableOfContent from "../pages/Content/TableOfContent";

export default function CourseRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList?.includes("Any") || accessList?.includes(SYSTEM_ACCESS_ID.COURSE))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Course />} />
      <Route path={PATH.ADD_COURSE} element={<AddCourse />} />
      <Route path={PATH.ASSIGNED_UNITS} element={<AssignedUnits />} />
      <Route path={PATH.TABLE_OF_CONTENT} element={<TableOfContent />} />
      <Route path="*" element={<Navigate to={`/${PATH.COURSE}`} />} />
    </Routes>
  );
}

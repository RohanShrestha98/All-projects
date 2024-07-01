import { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import Careers from "../pages/Career/Careers";
import AddCareer from "../pages/Career/AddCareer";
import AssignedCareer from "../pages/Career/AssignedCareer";

export default function CareerRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.CAREER))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Careers />} />
      <Route path={PATH.ADD_CAREER} element={<AddCareer />} />
      <Route path={PATH.ASSIGNED_COURSES} element={<AssignedCareer />} />
      <Route path="*" element={<Navigate to={`/${PATH.CAREER}`} />} />
    </Routes>
  );
}

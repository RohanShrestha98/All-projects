import { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import Unit from "../pages/Unit/Unit";
import AddUnit from "../pages/Unit/AddUnit";
import AssignedSkills from "../pages/Unit/AssignedSkills";

export default function UnitRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.UNIT))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Unit />} />
      <Route path={PATH.ADD_UNIT} element={<AddUnit />} />
      <Route path={PATH.ASSIGNED_SKILLS} element={<AssignedSkills />} />
      <Route path="*" element={<Navigate to={`/${PATH.UNIT}`} />} />
    </Routes>
  );
}

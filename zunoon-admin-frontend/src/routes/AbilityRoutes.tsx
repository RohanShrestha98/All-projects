import { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import AbilityCategory from "../pages/Ability/AbilityCategory";

export default function CareerRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();
    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.ABILITY))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<AbilityCategory />} />
      <Route path="*" element={<Navigate to={`/${PATH.ABILITY}`} />} />
    </Routes>
  );
}

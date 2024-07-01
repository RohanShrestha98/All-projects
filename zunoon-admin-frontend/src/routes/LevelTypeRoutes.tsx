import { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";
import LevelType from "../pages/LevelType/LevelType";
import AddLevelCategory from "../pages/LevelType/AddLevelType";

export default function LevelTypeRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();
    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.LEVEL_TYPE))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<LevelType />} />
      <Route path={PATH.ADD_LEVEL_TYPE} element={<AddLevelCategory />} />
      <Route path="*" element={<Navigate to={`/${PATH.LEVEL_TYPE}`} />} />
    </Routes>
  );
}

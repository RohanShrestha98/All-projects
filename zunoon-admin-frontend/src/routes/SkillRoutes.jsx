import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";

import Skills from "../pages/Skill/Skills";
import AddSkills from "../pages/Skill/AddSkills";
import AssignedIndicators from "../pages/Skill/AssignedIndicators";

export default function SkillRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.SKILL))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Skills />} />
      <Route path={PATH.ADD_SKILL} element={<AddSkills />} />
      <Route path={PATH.ASSIGNED_INDICATORS} element={<AssignedIndicators />} />
      <Route path="*" element={<Navigate to={`/${PATH.SKILL}`} />} />
    </Routes>
  );
}

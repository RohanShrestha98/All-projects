import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";

import Staff from "../pages/Staff/Staff";
import AddStaff from "../pages/Staff/AddStaff";
import Permission from "../pages/Staff/Permission";

export default function StaffRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.ACCOUNT))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Staff />} />
      <Route path={PATH.ADD_STAFF} element={<AddStaff />} />
      <Route path={PATH.PERMISSION} element={<Permission />} />
      <Route path="*" element={<Navigate to={`/${PATH.STAFF}`} />} />
    </Routes>
  );
}

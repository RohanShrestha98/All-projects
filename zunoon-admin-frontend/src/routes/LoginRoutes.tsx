import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin/AdminLogin";

import { getRefreshToken } from "../services/token";
import { renewToken } from "../services/auth";
import { PATH } from "../constants/routes";
import toasts from "../utils/toast";

export default function LoginRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    async function checkTokenValidity() {
      if (refreshToken) {
        try {
          await renewToken(refreshToken);
          navigate(PATH.DASHBOARD);
        } catch (error) {
          toasts.error(error);
        }
      }
    }
    checkTokenValidity();
  }, [navigate]);
  return (
    <Routes>
      <Route index element={<AdminLogin />} />
    </Routes>
  );
}

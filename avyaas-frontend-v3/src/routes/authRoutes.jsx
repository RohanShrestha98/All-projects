import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../containers/auth/login";
import ForgotPassword from "../containers/auth/forgotPassword";
import AuthLayout from "../layout/authLayout";
import { Signup } from "../containers/auth/signup";

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoutes;

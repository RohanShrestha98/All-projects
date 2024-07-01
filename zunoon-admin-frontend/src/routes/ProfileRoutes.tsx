import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import { PATH } from "../constants/routes";
import EditProfile from "../pages/Profile/EditProfile";
import Security from "../pages/Profile/Security";
import ProfileSidebar from "../pages/Profile/ProfileSidebar";


export default function ProfileRoutes() {
  return (
    <Routes>
      <Route element={<ProfileSidebar />}>
        <Route index element={<Profile />} />
        <Route path={PATH.SETTING} element={<EditProfile />} />
        <Route path={PATH.SECURITY} element={<Security />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${PATH.PROFILE}`} />} />
    </Routes>
  );
}

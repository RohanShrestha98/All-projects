import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";

import School from "../pages/School/School";
import AssignedCourses from "../pages/School/AssignedCourses";
import AssignNewCourses from "../pages/School/AssignNewCourses";
import AddSchool from "../pages/School/components/addSchool/AddSchool";
import EditBasic from "../pages/School/components/editSchool/EditBasic";
import EditAddress from "../pages/School/components/editSchool/EditAddress";
import EditContact from "../pages/School/components/editSchool/EditContact";
import EditFeature from "../pages/School/components/editSchool/EditFeature";
import SchoolEditSidebar from "../pages/School/components/editSchool/SchoolEditSidebar";
import TableOfContent from "../pages/Content/TableOfContent";

export default function SchoolRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.SCHOOL))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<School />} />
      <Route path={PATH.ADD_SCHOOL} element={<AddSchool />} />
      <Route path={PATH.ASSIGNED_COURSES} element={<AssignedCourses />} />
      <Route path={PATH.ASSIGN_NEW_COURSES} element={<AssignNewCourses />}>
        <Route path={PATH.TABLE_OF_CONTENT} element={<TableOfContent />} />
      </Route>
      <Route path={PATH.UPDATE_SCHOOL} element={<SchoolEditSidebar />}>
        <Route path={PATH.BASIC} element={<EditBasic />} />
        <Route path={PATH.ADDRESS} element={<EditAddress />} />
        <Route path={PATH.CONTACT} element={<EditContact />} />
        <Route path={PATH.FEATURE} element={<EditFeature />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${PATH.SCHOOL}`} />} />
    </Routes>
  );
}

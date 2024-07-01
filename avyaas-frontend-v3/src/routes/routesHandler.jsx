import React from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import DashboardRoutes from "./dashboardRoutes";
import AuthRoutes from "./authRoutes";
import VideoRoutes from "./videoRoutes";
import { ChoiceCourse } from "../pages/choiceCourse/choiceCourse";
import { useAuthStore } from "../store/useAuthStore";
// import { ChoiceCourseSidebar } from "../pages/choiceCourse/choiceCourseSidebar";
import { EnrolledCourse } from "../containers/availableCourse/enrolledCourse";
import AuthLayout from "../layout/authLayout";
import AccountDeletionForm from "../pages/profile/deleteAccount";
// import { ChoiceCourseSidebar } from "../pages/choiceCourse/choiceCourseSidebar";
// import { SidebarAccordion } from "../pages/choiceCourse/sidebarAccordion";

const RoutesContent = () => {
  const { loggedIn } = useAuthStore();
  const location = useLocation();
  if (loggedIn) {
    return (
      <>
        {location?.pathname.includes("enrolledCourse") ? (
          <AuthLayout>
            <Routes>
              <Route
                path="/enrolledCourse"
                exact={true}
                element={<EnrolledCourse view="mobile" />}
              />
            </Routes>
          </AuthLayout>
        ) : location?.pathname.includes("choiceCourse") ? (
          <Routes>
            <Route
              path="/choiceCourse"
              exact={true}
              element={<ChoiceCourse view="mobile" />}
            />
          </Routes>
        ) : location?.pathname.includes("deleteAccount") ? (
          <Routes>
            <Route
              path="/profile/deleteAccount"
              exact={true}
              element={<AccountDeletionForm view="mobile" />}
            />
          </Routes>
        ) : location?.pathname.startsWith("/subjects/videos") ? (
          <Routes>
            <Route
              path="/*"
              exact={true}
              element={<VideoRoutes view="mobile" />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/*"
              exact={true}
              element={<DashboardRoutes view="mobile" />}
            />
          </Routes>
        )}
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/*" exact={true} element={<AuthRoutes />} />
        <Route path="/choiceCourse" exact={true} element={<ChoiceCourse />} />
      </Routes>
    );
  }
};

const RoutesHandler = () => {
  return (
    <BrowserRouter>
      <RoutesContent />
    </BrowserRouter>
  );
};

export default RoutesHandler;

import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout";
import { commonRoutes } from "./commonDashboardRoutes";
import Questions from "../pages/tests/questions";

const DashboardRoutes = () => {
  const location = useLocation();
  return (
    <>
        <Routes>
          <Route path="/tests/quiz/questions" element={<Questions />} />
        </Routes>
        <DashboardLayout>
          <Routes>
            {commonRoutes.map((route, id) => {
              return (
                <Route key={id} path={route.path} element={route.element} />
              );
            })}
          </Routes>
        </DashboardLayout>
    </>
  );
};

export default DashboardRoutes;

{
  /* <Routes>
<Route element={<LoginLayout />}>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
</Route>
<Route path="/signUp" element={<RegisterPage />} />

<Route element={<PersistLogin />}>
  <Route element={<RequireAuth />}>
    <Route element={<BaseLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/requests" element={<PujaRequests />} />
      <Route
        path="/requests/details/:id"
        element={<RequestDetailsPage />}
      />
      <Route path="/lists" element={<PujaList />} />
      <Route path="/lists/create" element={<PujaCreatePage />} />
      <Route path="/lists/edit/:id" element={<PujaEditPage />} />
      <Route path="/lists/details/:id" element={<PujaDetailsPage />} />
      <Route path="/finances" element={<Finance />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/profile" element={<MoansterySignupPage />} />
    </Route>
  </Route>
</Route>
<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
<Route path="unauthorized" element={<UnauthorizedPage />} />
<Route path="*" element={<PageNotFound />} />
</Routes> */
}

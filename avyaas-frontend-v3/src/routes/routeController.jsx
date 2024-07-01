import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layout/authLayout";
import { Signup } from "../containers/auth/signup";
import Login from "../containers/auth/login";
import ForgotPassword from "../containers/auth/forgotPassword";
import RequireAuth from "../utils/requireAuth";
import DashboardLayout from "../layout/dashboardLayout";
import Home from "../pages/homePage";
import NotificationSettings from "../pages/profile/notificationSettings";
import LanguageSettings from "../pages/profile/language";
import HelpCenter from "../pages/profile/helpCenter";
import NotificationDisplay from "../pages/notification";
import VideoSubject from "../pages/videos/videoSubject";
import Profile from "../pages/profile/profile";
import AboutProfile from "../pages/profile/aboutProfile";
import ViewProfile from "../pages/profile/viewProfile";
import Tests from "../pages/tests/tests";
import DailyQuiz from "../pages/tests/dailyQuiz";
import SubscriptionPlans from "../pages/viewPlans/subscriptionPlans";
import { PaymentMethod } from "../pages/viewPlans/paymentMethod";
import Discussion from "../pages/discussion/discussion";
import AddDiscussion from "../pages/discussion/addDiscussion";
import Replies from "../pages/discussion/replies";
import { Live } from "../pages/live/live";
import { Bookmark } from "../pages/bookmarks/bookmark";
import { Qbank } from "../pages/qbank/qbank";
import { EnrolledCourse } from "../containers/availableCourse/enrolledCourse";
import { ChoiceCourse } from "../pages/choiceCourse/choiceCourse";
import AccountDeletionForm from "../pages/profile/deleteAccount";
import VideoLayout from "../layout/videoLayout";
import InsideSubject from "../pages/videos/insideSubject";
import VideoDetails from "../pages/videos/videoDetails";
import TopicSidebar from "../pages/videos/topicSidebar";
import { EsewaSuccess } from "../containers/payment/esewa/esewaSuccess";
import Questions from "../pages/tests/questions";
import ZoomSDK from "../components/zoomSDK/ZoomSDK";
import { MeetingContextProvider } from "../components/context/meetingContext";
import { KhaltiSuccess } from "../containers/payment/khalti/khaltiSuccess";

const RouteController = () => {
  return (
    <BrowserRouter>
      <MeetingContextProvider>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            }
          />

          {/* Authenticated Routes */}
          <Route element={<RequireAuth />}>
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Home />
                </DashboardLayout>
              }
            />
            <Route
              path="/notificationSetting"
              element={
                <DashboardLayout>
                  <NotificationSettings />
                </DashboardLayout>
              }
            />
            <Route
              path="/language"
              element={
                <DashboardLayout>
                  <LanguageSettings />
                </DashboardLayout>
              }
            />
            <Route
              path="/helpCenter"
              element={
                <DashboardLayout>
                  <HelpCenter />
                </DashboardLayout>
              }
            />
            <Route
              path="/notification"
              element={
                <DashboardLayout>
                  <NotificationDisplay />
                </DashboardLayout>
              }
            />
            <Route
              path="/subjects"
              element={
                <DashboardLayout>
                  <VideoSubject />
                </DashboardLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              }
            />
            <Route
              path="/esewa_payment_success"
              element={
                <DashboardLayout>
                  <EsewaSuccess />
                </DashboardLayout>
              }
            />
            <Route
              path="/khalti_payment_success"
              element={
                <DashboardLayout>
                  <KhaltiSuccess />
                </DashboardLayout>
              }
            />
            <Route
              path="/profile/aboutProfile"
              element={
                <DashboardLayout>
                  <AboutProfile />
                </DashboardLayout>
              }
            />
            <Route
              path="/viewProfile"
              element={
                <DashboardLayout>
                  <ViewProfile />
                </DashboardLayout>
              }
            />
            <Route
              path="/tests"
              element={
                <DashboardLayout>
                  <Tests />
                </DashboardLayout>
              }
            />
            <Route
              path="/tests/quiz"
              element={
                <DashboardLayout>
                  <DailyQuiz />
                </DashboardLayout>
              }
            />
            <Route
              path="/subscriptionPlans"
              element={
                <DashboardLayout>
                  <SubscriptionPlans />
                </DashboardLayout>
              }
            />
            <Route
              path="/subscriptionPlans/payment"
              element={
                <DashboardLayout>
                  <PaymentMethod />
                </DashboardLayout>
              }
            />
            <Route
              path="/discussion"
              element={
                <DashboardLayout>
                  <Discussion />
                </DashboardLayout>
              }
            />
            <Route
              path="/discussion/addDiscussion"
              element={
                <DashboardLayout>
                  <AddDiscussion />
                </DashboardLayout>
              }
            />
            <Route
              path="/discussion/replies"
              element={
                <DashboardLayout>
                  <Replies />
                </DashboardLayout>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <DashboardLayout>
                  <Bookmark />
                </DashboardLayout>
              }
            />
            <Route
              path="/live"
              element={
                <DashboardLayout>
                  <Live />
                </DashboardLayout>
              }
            />
            <Route path="/live/meeting" element={<ZoomSDK />} />
            <Route
              path="/qBank"
              element={
                <DashboardLayout>
                  <Qbank />
                </DashboardLayout>
              }
            />

            {/* Mobile View Routes */}
            <Route
              path="/enrolledCourse"
              element={
                <AuthLayout>
                  <EnrolledCourse exact={true} view="mobile" />
                </AuthLayout>
              }
            />
            <Route
              path="/choiceCourse"
              exact={true}
              element={<ChoiceCourse view="mobile" />}
            />
            <Route
              path="/profile/deleteAccount"
              exact={true}
              element={<AccountDeletionForm view="mobile" />}
            />

            {/* Video Layout Routes */}
            <Route
              path="/subjects/videos"
              element={
                <VideoLayout>
                  <InsideSubject />
                </VideoLayout>
              }
            />
            <Route
              path="/subjects/videos/details"
              element={
                <VideoLayout>
                  <VideoDetails />
                </VideoLayout>
              }
            />
            <Route
              path="/subjects/videos/sidebar"
              element={
                <VideoLayout>
                  <TopicSidebar />
                </VideoLayout>
              }
            />
            <Route path="/tests/quiz/questions" element={<Questions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </MeetingContextProvider>
    </BrowserRouter>
  );
};

export default RouteController;

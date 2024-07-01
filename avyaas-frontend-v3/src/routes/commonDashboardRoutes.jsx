import React from "react";
import Home from "../pages/homePage.jsx";
import NotificationSettings from "../pages/profile/notificationSettings.jsx";
import LanguageSettings from "../pages/profile/language.jsx";
import HelpCenter from "../pages/profile/helpCenter.jsx";
import NotificationDisplay from "../pages/notification.jsx";
import VideoSubject from "../pages/videos/videoSubject.jsx";
import Profile from "../pages/profile/profile.jsx";
import ViewProfile from "../pages/profile/viewProfile.jsx";
import Tests from "../pages/tests/tests.jsx";
import DailyQuiz from "../pages/tests/dailyQuiz.jsx";
import SubscriptionPlans from "../pages/viewPlans/subscriptionPlans.jsx";
import Discussion from "../pages/discussion/discussion.jsx";
import AddDiscussion from "../pages/discussion/addDiscussion.jsx";
import AboutProfile from "../pages/profile/aboutProfile.jsx";
import { PaymentMethod } from "../pages/viewPlans/paymentMethod.jsx";
import Replies from "../pages/discussion/replies.jsx";
import { Bookmark } from "../pages/bookmarks/bookmark.jsx";
import { Live } from "../pages/live/live.jsx";
import { Qbank } from "../pages/qbank/qbank.jsx";

export const commonRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/notificationSetting", element: <NotificationSettings /> },
  { path: "/language", element: <LanguageSettings /> },
  { path: "/helpCenter", element: <HelpCenter /> },
  { path: "/notification", element: <NotificationDisplay /> },
  { path: "/subjects", element: <VideoSubject /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/aboutProfile", element: <AboutProfile /> },
  { path: "/viewProfile", element: <ViewProfile /> },
  { path: "/tests", element: <Tests /> },
  { path: "/tests/quiz", element: <DailyQuiz /> },
  { path: "/subscriptionPlans", element: <SubscriptionPlans /> },
  { path: "/subscriptionPlans/payment", element: <PaymentMethod /> },
  { path: "/discussion", element: <Discussion /> },
  { path: "/discussion/addDiscussion", element: <AddDiscussion /> },
  { path: "/discussion/replies", element: <Replies /> },
  { path: "/bookmarks", element: <Bookmark /> },
  { path: "/live", element: <Live /> },
  { path: "/qBank", element: <Qbank /> },
  { path: "*", element: <Home /> },
];

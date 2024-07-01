import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PersistLogin from "../containers/auth/persistLogin";
import RequireAuth from "../containers/auth/requireAuth";
import AuthLayout from "../layout/authLayout";
import Register from "../containers/auth/register";
import Login from "../containers/auth/login";
import ForgotPassword from "../containers/auth/forgotPassword";
import MaterialPage from "../pages/course/material/material";
import Home from "../pages/homePage";
import SubjectPage from "../pages/course/subject/subject";
import MyCourses from "../pages/course/myCourses";
import EachSubGradesPage from "../pages/course/grade/eachGrades";
import MyAssignment from "../pages/assignment/assignmentPage";
import AssignmentUpload from "../pages/assignment/assignmentUpload";
import AssignmentSubmitted from "../pages/assignment/assignmentSubmitted";
import AntdCalendar from "../pages/calendar/calendar";
import MyProfile from "../pages/profile/myProfile";
import Security from "../pages/profile/security/security";
import DashboardLayout from "../layout/dashboardLayout";
import NotificationSettings from "../pages/profile/notificationSettings";
import LanguageSettings from "../pages/profile/language";
import EditProfile from "../pages/profile/editProfile/editProfile";
import HelpCenter from "../pages/profile/helpCenter";
import CustomerService from "../containers/profile/customerService";
import SearchPage from "../containers/home/searchPage";
import NotificationDisplay from "../pages/notification";
import BlogsDetails from "../pages/blog/blogsDetails";
import AllBlogs from "../pages/blog/allBlogs";
import User from "../containers/user/user";
import EditUser from "../containers/user/editUser";
import AddUser from "../containers/user/addUser";
import EditPermission from "../containers/user/editPermission";
import GradePage from "../pages/grade/gradePage";
import SectionPage from "../pages/section/sectionPage";
import StudentPage from "../pages/student/studentPage";
import AddAssignment from "../pages/assignment/AddAssignment";
import AssignPermission from "../containers/user/assignPermissions";
import AssignmentList from "../pages/assignment/AssignmentList";
import AssignmentDetails from "../pages/assignment/AssignmentDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import CourseDetails from "../containers/courses/courseDetails";
import CourseList from "../containers/courses/list/courseList";
import Cycle from "../pages/cycle/cycle";
import Grading from "../pages/grading/Grading";
import GradingCard from "../pages/gradingCard/gradingCard";
import GradingCriteria from "../pages/gradingCriteria/gradingCriteria";
import QuizComponent from "../containers/courses/eachMaterial/quiz";
import Notes from "../pages/notes/Notes";
import AddBlog from "../pages/blog/addBlog";
// import PrivacyPolicy from "../pages/profile/privacyPolicy";
import PreviewCsv from "../utils/previewCsv";
import { useQueryData } from "../hooks/useQueryData";
import CourseDetailsStudent from "../containers/courses/courseDetailsStudent";
import { useContentDetailsContext } from "../context/contentDetailContext";
import { useAuthContext } from "../context/authContext";

const RoutesHandler = () => {
  const [courseId, setCourseId] = useState();
  const [courseName, setCourseName] = useState("");
  const { setContentDetails } = useContentDetailsContext();

  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;

  const courseDetails = JSON.parse(localStorage?.getItem("courseDetails"));

  const { data, refetch } = useQueryData(
    ["student_course_details", courseId, courseDetails?.courseId],
    `api/v1/course/student-details/${courseId ?? courseDetails?.courseId}/`,
    "",
    isStudent && (!!courseId || !!courseDetails?.courseId),
  );

  useEffect(() => {
    if (isStudent) {
      localStorage.setItem(
        "contentDetails",
        data !== undefined && JSON.stringify(data?.data),
      );
      setContentDetails(JSON.stringify(data !== undefined && data?.data));
    }
  }, [data, isStudent]);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route
              path="/courses/list/content/"
              element={<MaterialPage data={data} refetch={refetch} />}
            />
            <Route path="/courses/lesson" element={<SubjectPage />} />
            <Route
              path="/courses"
              element={
                <MyCourses
                  setCourseId={setCourseId}
                  setCourseName={setCourseName}
                />
              }
            />
            <Route path="/courses/list" element={<CourseList />} />
            <Route path="/courses/list/:id" element={<CourseDetails />} />
            <Route
              path="/courses/:id"
              element={
                <CourseDetailsStudent
                courseId={courseId}
                isStudent={isStudent}
                  // courseName={courseName}
                  // data={data}
                  // isError={isError}
                  // isLoading={isLoading}
                />
              }
            />
            <Route path="/grades/:id" element={<EachSubGradesPage />} />
            <Route path="/assignment" element={<MyAssignment />} />
            <Route path="/assignment/upload" element={<AssignmentUpload />} />
            <Route path="/assignment/add" element={<AddAssignment />} />
            <Route path="/assignment/list" element={<AssignmentList />} />
            <Route path="/assignment/details" element={<AssignmentDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cycle" element={<Cycle />} />
            <Route path="/grading" element={<Grading />} />
            <Route path="/grading-card" element={<GradingCard />} />

            {/* <Route path="/grading-card" element={<GradingCard />} /> */}
            <Route path="/grading-criteria" element={<GradingCriteria />} />
            <Route
              path="/assignment/submitted"
              element={<AssignmentSubmitted />}
            />
            <Route path="/calendar" element={<AntdCalendar />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/preview-csv" element={<PreviewCsv />} />
            <Route path="/security" element={<Security />} />
            <Route
              path="/notificationSetting"
              element={<NotificationSettings />}
            />
            <Route path="/language" element={<LanguageSettings />} />
            <Route path="/student/edit-profile" element={<EditProfile />} />
            <Route path="/student/add-student" element={<EditProfile />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
            {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
            <Route path="/customerService" element={<CustomerService />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notification" element={<NotificationDisplay />} />
            <Route path="/blog/:id" element={<BlogsDetails />} />
            <Route path="/blog" element={<AllBlogs />} />
            <Route path="/blog/create" element={<AddBlog />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/addUser" element={<AddUser />} />
            <Route path="/quiz" element={<QuizComponent />} />
            <Route
              path="/user/assignPermission"
              element={<AssignPermission />}
            />
            <Route path="/user/editUser" element={<EditUser />} />
            <Route path="/user/editPermission" element={<EditPermission />} />
            <Route path="/grade" element={<GradePage />} />

            {/* routes for section and its students, courses and assignment */}
            <Route path="/section" element={<SectionPage />} />
            <Route path="/section/student" element={<StudentPage />} />
            <Route path="/section/teacher" element={<User />} />
            <Route path="/section/assistant-teacher" element={<User />} />
            <Route path="/section/course" element={<CourseList />} />
            <Route path="/section/course/:id" element={<CourseDetails />} />
            <Route path="/section/assignment" element={<MyAssignment />} />
            <Route
              path="/section/assignment/upload"
              element={<AssignmentUpload />}
            />
            <Route path="/section/assignment/add" element={<AddAssignment />} />
            <Route
              path="/section/assignment/list"
              element={<AssignmentList />}
            />
            <Route
              path="/section/assignment/details"
              element={<AssignmentDetails />}
            />

            <Route path="/student" element={<StudentPage />} />

            <Route path="/*" element={<Home />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesHandler;

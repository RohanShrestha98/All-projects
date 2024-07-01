import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
import RequireAuth from "./auth/requireAuth";
import PersistLogin from "./auth/persistLogin";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./auth/signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import Documents from "./pages/Documents";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import NoticeDetails from "./pages/NoticeDetails";
import Inventory from "./pages/Inventory/InventoryPage";
import InventoryForm from "./pages/Inventory/InventoryForm";
import Notification from "./pages/Notification";
import Partner from "./pages/Partner/Partner";
import PartnerForm from "./pages/Partner/PartnerForm";
import Services from "./pages/Services/Services";
import HospitalServiceForm from "./pages/Services/HospitalServiceForm";
import PreviewServices from "./pages/Services/PreviewServices";
import AddProfileForm from "./pages/ProfileForm/AddProfileForm";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/profile-add" element={<AddProfileForm />} />
          </Route>
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/programs" element={<Jobs />} />
              <Route path="/services/preview" element={<PreviewServices />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/add" element={<HospitalServiceForm />} />
              <Route path="/library" element={<Library />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/inventory/add" element={<InventoryForm />} />
              <Route path="/partner/add" element={<PartnerForm />} />
              <Route path="/library/book" element={<BookDetails />} />
              <Route path="/job-details" element={<JobDetails />} />
              <Route path="/noitce-details" element={<NoticeDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

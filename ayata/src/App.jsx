import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import BaseLayout from "./layout/BaseLayout";
import CareersPage from "./pages/careers/CareersPage";
import ClientPage from "./pages/clients/ClientPage";
import OurWorkPage from "./pages/ourworks/OurWorkPage";
import TeamPage from "./pages/team/TeamPage";
import ContactPage from "./pages/contactus/ContactPage";
import AboutUsPage from "./pages/aboutUs/AboutUsPage";
import ProjectSummary from "./pages/projectSummary/ProjectSummary";
import OurProductPage from "./pages/ourproducts/OurProductPage";
import CareerDetailPage from "./pages/careerDetail/CareerDetailPage";
import Home from "./pages/home/Home";
// import AboutUs from "./pages/home/AboutUs";

function App() {
  return (
    <div className="element w-[100vw] overflow-x-hidden" id="containerElement">
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/our-works" element={<OurWorkPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/our-products" element={<OurProductPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/project-summary" element={<ProjectSummary />} />
            <Route path="/career-detail" element={<CareerDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingFirst from "../pages/home/LoadingFirst";
import Footer from "../pages/Footer";
import OldFooter from "../pages/OldFooter";

export default function BaseLayout() {
  return (
    <div>
      {/* <LoadingFirst /> */}
      {/* <Navbar /> */}
      <Outlet />
      <OldFooter/>
      {/* <Footer /> */}
    </div>
  );
}

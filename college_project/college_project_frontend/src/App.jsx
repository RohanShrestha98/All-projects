import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
import Home from "./pages/Home";
import RequireAuth from "./auth/requireAuth";
import PersistLogin from "./auth/persistLogin";
import Register from "./auth/register";
import CreateContact from "./pages/CreateContact";
import DashboardLayput from "./layouts/DashboardLayput";
import Staff from "./pages/staff/Staff";
import ApproveShop from "./pages/approveShop/ApproveShop";
import PaymentIntrigation from "./pages/checkout/PaymentIntrigation";
import ShopDashboard from "./pages/shop/ShopDashboard";
import Product from "./pages/product/Product";
import AddProduct from "./pages/product/AddProduct";
import Category from "./pages/category/Category";
import AddCategory from "./pages/category/AddCategory";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<PaymentIntrigation />} />
        <Route path="/shop-dashboard" element={<ShopDashboard />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayput />}>
              <Route path="/" element={<Home />} />
              <Route path="/revenue" element={<Home />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/add-category" element={<AddCategory />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/add-product" element={<AddProduct />} />
              <Route path="/shop/apply" element={<ApproveShop />} />
              <Route path="/register" element={<Register />} />
              <Route path="/analytics" element={<Home />} />
              <Route path="/inventory" element={<Home />} />
              <Route path="/create-contact" element={<CreateContact />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

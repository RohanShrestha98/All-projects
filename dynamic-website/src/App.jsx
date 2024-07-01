import { Route, Routes } from "react-router-dom";
import { ColorProvider } from "./ColorContext";
import AdminPannelLayout from "./layout/AdminPannelLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/settings/Setting";
import AddUser from "./pages/product/AddUser";
import LoginForm from "./pages/auth/LoginForm";
import AddProduct from "./pages/productPage/AddProduct";
import "./App.css";
import AddCategory from "./pages/category/AddCategory";
import Category from "./pages/category/Category";
import Product from "./pages/productPage/Product";

const App = () => {
  return (
    <ColorProvider>
      <Routes>
        <Route element={<AdminPannelLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/product" element={<Product />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </ColorProvider>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import { ColorProvider } from "./ColorContext";
import UserPannelLayout from "./layout/UserPannelLayout";
import Home from "./pages/home/Home";
import Setting from "./pages/settings/Setting";
import AllProducts from "./pages/product/AllProducts";

const App = () => {
  return (
    <ColorProvider>
      <Routes>
        <Route element={<UserPannelLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </ColorProvider>
  );
};

export default App;

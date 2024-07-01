import { Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "../constants/routes";
import ContentBasket from "../pages/Content/components/contentBasket/ContentBasket";

export default function BasketRoutes() {
  return (
    <Routes>
      <Route index element={<ContentBasket />} />
      <Route path="*" element={<Navigate to={`/${PATH.CONTENT_BASKET}`} />} />
    </Routes>
  );
}

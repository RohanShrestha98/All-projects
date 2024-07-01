import { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { PATH } from "../constants/routes";
import { getAccessList } from "../utils/storage";
import { SYSTEM_ACCESS_ID } from "../constants/accessId";

import Content from "../pages/Content/Content";
import UpdateContent from "../pages/Content/UpdateContent";
import ContentBasket from "../pages/Content/components/contentBasket/ContentBasket";

export default function ContentRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let accessList = getAccessList();

    if (!(accessList.includes("Any") || accessList.includes(SYSTEM_ACCESS_ID.CONTENT))) {
      navigate(PATH.DASHBOARD);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Content />} />
      <Route
        path={PATH.ADD_CONTENT}
        element={<UpdateContent data={undefined} editForm={false} />}
      />
      <Route path={PATH.CONTENT_BASKET} element={<ContentBasket />} />
      <Route path="*" element={<Navigate to={`/${PATH.CONTENT}`} />} />
    </Routes>
  );
}

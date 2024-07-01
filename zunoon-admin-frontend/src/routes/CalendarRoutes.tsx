import { Routes, Route, Navigate } from "react-router-dom";

import { PATH } from "../constants/routes";
import { EventCalendar } from "../pages/Calendar/Calendar";

export default function CalendarRoutes() {
  return (
    <Routes>
      <Route index element={<EventCalendar />} />
      <Route path="*" element={<Navigate to={`/${PATH.CALENDAR}`} />} />
    </Routes>
  );
}

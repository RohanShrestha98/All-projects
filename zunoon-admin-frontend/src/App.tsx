import React, { Suspense, useEffect } from "react";
import BaseRoutes from "./routes/routes";

import "boxicons/css/boxicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./pages/ErrorBoundary/ErrorBoundary";

import "./assets/styles/App.scss";
import { useTranslation } from "react-i18next";
import { get, set } from "./utils/storage";
import { useUserContext } from "./context/UserContextProvider";
import { Worker } from "@react-pdf-viewer/core";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = get("lang");
    if (lang === null) {
      i18n.changeLanguage(`"en"`);
      set("lang", "en");
    }
    if (lang === `"en"`) {
      i18n.changeLanguage("en");
    }
    if (lang === `"es"`) {
      i18n.changeLanguage("es");
    }
  }, [i18n]);

  const { setUser } = useUserContext();
  useEffect(() => {
    const user = get("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [setUser]);

  return (
    <>
      <ToastContainer />
      <ErrorBoundary>
        <Suspense fallback="loading">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<BaseRoutes />} />
              </Routes>
            </BrowserRouter>
          </Worker>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;

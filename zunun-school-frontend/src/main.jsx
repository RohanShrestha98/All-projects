import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import "./containers/profile/logoutModal.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/authContext";
import { CookiesProvider } from "react-cookie";
import i18next from "i18next";
import { BrowserRouter } from "react-router-dom";
import { PermissionProvider } from "./context/permissionContext";
import { ContentDeteilProvider } from "./context/contentDetailContext";
import { I18nextProvider } from "react-i18next";
import { Worker } from "@react-pdf-viewer/core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      networkMode: "always",
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ContentDeteilProvider>
              <PermissionProvider>
                <I18nextProvider i18n={i18next}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <App />
                  </Worker>
                </I18nextProvider>
                {/* <ReactQueryDevtools  position="bottom-left" /> */}
              </PermissionProvider>
            </ContentDeteilProvider>
          </AuthProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

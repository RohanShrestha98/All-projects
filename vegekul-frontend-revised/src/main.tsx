import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import App from "./App";
import "./index.css";
import "./i18n.config";

import { AuthProvider } from "./context/Authcontext";
import { ToastProvider } from "./context/Aoastcontext";
import { AppProvider } from "./context/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      networkMode: "always",
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <AppProvider>
              <AuthProvider>
                <DndProvider backend={HTML5Backend}>
                  <App />
                </DndProvider>
              </AuthProvider>
            </AppProvider>
          </I18nextProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "sm:text-sm xs:text-xs",
              loading: {
                duration: 8000,
              },
            }}
          />
          <ReactQueryDevtools position="bottom-right" />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

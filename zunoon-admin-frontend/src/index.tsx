import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { I18nextProvider } from "react-i18next";

import "./i18n.config";
import i18next from "i18next";
import { UploadProvider } from "./context/UploadContextProvider";
import { UserProvider } from "./context/UserContextProvider";
import { SchoolProvider } from "./context/SchoolContextProvider";
import { TabContextProvider } from "./context/TabContextProvider";
import { CheckContextProvider } from "./context/CheckContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <UploadProvider>
    <UserProvider>
      <SchoolProvider>
        <TabContextProvider>
          <CheckContextProvider>
            <I18nextProvider i18n={i18next}>
              <App />
            </I18nextProvider>
          </CheckContextProvider>
        </TabContextProvider>
      </SchoolProvider>
    </UserProvider>
  </UploadProvider>,
  // </React.StrictMode>
);

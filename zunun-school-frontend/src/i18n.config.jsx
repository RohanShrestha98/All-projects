import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import languageParser from "./utils/i18n";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: languageParser("en"),
    },
    es: {
      translations: languageParser("es"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "jp"];

export default i18n;

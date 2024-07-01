import translationFile from "../locales/translationFiles.json";

const translations = translationFile;

export default function languageParser(language) {
  const result = {};

  for (const key in translations) {
    if (translations.hasOwnProperty(key)) {
      result[key] = translations[key][language];
    }
  }

  return result;
}

import translationFile from '../locales/translationFiles.json';

interface TranslationFile {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: TranslationFile = translationFile;

export default function languageParser(language: string): {
  [key: string]: string;
} {
  const result: { [key: string]: string } = {};

  for (const key in translations) {
    if (translations.hasOwnProperty(key)) {
      result[key] = translations[key][language];
    }
  }

  return result;
}

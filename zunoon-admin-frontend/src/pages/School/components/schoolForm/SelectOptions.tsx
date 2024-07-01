import { useTranslation } from "react-i18next";
import { optionType } from "../../../../@types/option";

const GenerateListOptions = () => {
  const { t } = useTranslation();

  const planList: optionType[] = [
    { value: "daily", label: `${t("daily")}` },
    { value: "evening", label: `${t("evening")}` },
    { value: "night", label: `${t("night")}` },
    { value: "weekend", label: `${t("weekend")}` },
    { value: "distance", label: `${t("distance")}` },
    { value: "blended", label: `${t("blended")}` },
    { value: "virtual", label: `${t("virtual")}` },
  ];

  const modalityList: optionType[] = [
    { value: "presencial", label: `${t("presencial")}` },
    { value: "semipresencial", label: `${t("semipresencial")}` },
    { value: "virtualdm", label: `${t("virtualdm")}` },
  ];

  const sectorList: optionType[] = [
    { value: "private", label: `${t("private")}` },
    { value: "public", label: `${t("public")}` },
  ];

  //   Image: jpg, jpeg, png, gif
  // Audio: mp3, wav
  // Video: mp4, mpeg
  // Book: pdf

  const imageTypeOptions: optionType[] = [
    { value: "jpg", label: "JPG" },
    { value: "jpeg", label: "JPEG" },
    { value: "png", label: "PNG" },
    { value: "gif", label: "GIF" },
  ];

  const audioTypeOptions: optionType[] = [
    { value: "mp3", label: "MP3" },
    { value: "wav", label: "WAV" },
  ];

  const videoTypeOptions: optionType[] = [{ value: "mp4", label: "MP4" }];

  const fileTypeOptions: optionType[] = [
    { value: "pdf", label: "PDF" },
    { value: "mp4", label: "MP4" },
    { value: "mp3", label: "MP3" },
    { value: "wav", label: "WAV" },
  ];

  const bookTypeOptions: optionType[] = [{ value: "pdf", label: "PDF" }];

  const supplyContentTypeOptions: optionType[] = [
    { value: 1, label: "Obligatory" },
    { value: 2, label: "Public" },
    { value: 3, label: "Private" },
  ];

  const contentTypeOptions: optionType[] = [
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "image", label: "Image" },
    { value: "supportFile", label: "Support File", isDisabled: true },
    // { value: "anagram", label: "Anagram" },
    { value: "book", label: "Book" },
    { value: "questionaire", label: "Questionnaire" },
    { value: "dicted", label: "Dicted", isDisabled: true },
    { value: "webLink", label: "Web Link", isDisabled: true },
    { value: "shortMaterial", label: "Short Material", isDisabled: true },
    // { value: "conceptOrder", label: "Concept Order" },
    { value: "performance", label: "Performance", isDisabled: true },
    // { value: "letterSoup", label: "Letter Soup" },
  ];

  const questionTypeOptions: optionType[] = [
    { value: "MCQS", label: "Multiple Choice Questions (MCQs)" },
    { value: "TRUEFALSE", label: "True/False" },
    // {  value: "CHOOSECORRECT", label: "Choose correct" },
  ];

  return {
    planList,
    modalityList,
    sectorList,
    fileTypeOptions,
    imageTypeOptions,
    audioTypeOptions,
    videoTypeOptions,
    bookTypeOptions,
    supplyContentTypeOptions,
    contentTypeOptions,
    questionTypeOptions,
  };
};
export default GenerateListOptions;

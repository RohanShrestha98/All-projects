import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import googlePlay from "../assets/images/googlePlay.png";
import MySlider from "../components/UI/slider";
import { Link, Outlet } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import uk_flag from "../assets/flags/uk.webp";
import spain_flag from "../assets/flags/spain.webp";
import { IoIosArrowDown } from "react-icons/io";
import i18next from "i18next";
import { get, set } from "../utils/storage";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {
  useEffect(() => {
    document.title = "Zunun School";
  }, []);
  // const { i18n } = useTranslation();

  const [langDropDown, setLangDropDown] = useState(false);
  const languages = [
    {
      id: 1,
      name: "english",
      flag: uk_flag,
      code: "en",
    },
    {
      id: 2,
      name: "spanish",
      flag: spain_flag,
      code: "es",
    },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleLanguage = language => {
    // i18n.changeLanguage(language?.code);
    set("lang", language?.code);
    setSelectedLanguage(language);
    setLangDropDown(false);
  };

  // const lang = get("lang");

  // console.log("lang", lang);

  useEffect(() => {
    const lang = get("lang");
    if (lang === null) {
      // i18n.changeLanguage(`"en"`);
      set("lang", "en");
      setSelectedLanguage(languages?.filter(lang => lang?.code === "en")[0]);
    }
    if (lang === "en") {
      // i18n.changeLanguage("en");
      setSelectedLanguage(languages?.filter(lang => lang.code === "en")[0]);
    }
    if (lang === "es") {
      // i18n.changeLanguage("es");
      setSelectedLanguage(languages?.filter(lang => lang.code === "es")[0]);
    }
  }, [i18next, langDropDown]);

  // const [selectedLanguage, setSelectedLanguage] =
  //   useState <
  //   any >
  //   languages.find(language => language.code === getLanguage());

  // useEffect(() => {
  //   const lang = getLanguage();
  //   if (lang === null) {
  //     i18n.changeLanguage('"en"');
  //     setLanguage("en");
  //     setSelectedLanguage(languages.filter(lang => lang.code === "en")[0]);
  //   }
  //   setLanguage(lang);
  //   setSelectedLanguage(
  //     languages.filter(language => language.code === lang)[0],
  //   );
  // }, [i18n]);

  // const toggleLanguage = code => {
  //   const lang = languages.find(lang => lang.code === code) || languages[0];
  //   i18n.changeLanguage(lang.code);
  //   setSelectedLanguage(lang);
  //   setLanguage(lang.code);
  // };

  return (
    <div className="flex flex-col w-full h-[100vh] gap-8">
      <div className="px-44 py-8 flex items-center justify-between xl:px-32 lg:px-12 max-sm:items-center md:hidden">
        <img src={logo} alt="logo" />
        {/* <div className="border border-gray-6 rounded w-[120px] bg-white px-2">
          <div
            onClick={() => {
              setLangDropDown(!langDropDown);
            }}
            className="flex items-center cursor-pointer gap-2"
          >
            <img
              className="w-6 h-4"
              src={selectedLanguage?.flag}
              alt={selectedLanguage?.name}
            />
            <p className="font-normal text-sm text-gray-4 py-[2px]">
              {selectedLanguage?.name}
            </p>
            <IoIosArrowDown className="text-gray-4 min-w-[20px]" />
          </div>
          {langDropDown && (
            <div className="absolute border border-gray-6 rounded-md mt-1 w-[120px]   -ml-[9px]">
              {languages?.map((language, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center cursor-pointer py-1 px-2 gap-2 ${
                      language?.name === selectedLanguage?.name
                        ? "bg-gray-8 "
                        : ""
                    }`}
                    onClick={() => toggleLanguage(language)}
                  >
                    <img
                      className="w-6 h-4"
                      src={language?.flag}
                      alt={language?.name}
                    />
                    <p className="font-normal text-sm text-gray-4">
                      {language?.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div> */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 md:bg-white md:items-center md:justify-center md:p-0">
        <div className="flex flex-col items-center justify-between md:hidden ">
          <MySlider />
          <div className="flex bg-gray-200 px-4 py-2 items-center justify-center rounded-md">
            <p className="font-normal font-Urbanist">
              Also, get our mobile app
            </p>
            <Link to="https://play.google.com/store">
              <img
                src={googlePlay}
                alt="googleplay"
                className="items-center ml-2"
              />
            </Link>
          </div>
        </div>
        <div className=" sm:w-full h-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

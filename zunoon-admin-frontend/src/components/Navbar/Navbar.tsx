import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCalendarAlt,
  faShoppingBasket,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { clear, get, getPermissions, set } from "../../utils/storage";
import { PATH } from "../../constants/routes";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import uk_flag from "../../assets/flags/uk.webp";
import spain_flag from "../../assets/flags/spain.webp";
import { RiArrowDropDownLine } from "react-icons/ri";
import { faUser, faFileWord } from "@fortawesome/free-regular-svg-icons";
import { withTranslation } from "react-i18next";
import "./Navbar.scss";
import { useUploadContext } from "../../context/UploadContextProvider";
import { getUser } from "../../utils/storage";
import config from "../../config";
import http from "../../utils/http";
import toasts from "../../utils/toast";

interface IStyledProps {
  progress: number;
}

const NavContainer = styled.div<IStyledProps>`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${p => p.progress}%;
    height: 2px;
    background: linear-gradient(90deg, #ff58f9 0%, #00bad6 100%);
    transition: width 0.5s ease-in-out;
  }
`;

const Progress = styled.div<IStyledProps>`
  width: ${p => p.progress}%;
`;

const assignedApi = config.endpoints.api.assigned;

function Navbar({ i18n, setLangDropDown, langDropDown, t }) {
  const languages = [
    {
      id: 1,
      name: t("english"),
      flag: uk_flag,
      code: "en",
    },
    {
      id: 2,
      name: t("spanish"),
      flag: spain_flag,
      code: "es",
    },
  ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = getUser();
  const { progress, log, temp, uploadQueue, isEditing } = useUploadContext();
  const [assignedData, setAssignedData] = useState([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [calendarEventDate, setCalendarEventDate] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(languages[0]);
  const [assignedDataCalendar, setAssignedDataCalendar] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const wrapperRef = useRef(null);
  useHandleClickOutside(wrapperRef, { toggle: () => setShowMenu(false) });

  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, []);

  useEffect(() => {
    const lang = get("lang");
    if (lang === null) {
      i18n.changeLanguage(`"en"`);
      set("lang", "en");
      setSelectedLanguage(languages.filter(lang => lang.code === "en")[0]);
    }
    if (lang === `"en"`) {
      i18n.changeLanguage("en");
      setSelectedLanguage(languages.filter(lang => lang.code === "en")[0]);
    }
    if (lang === `"es"`) {
      i18n.changeLanguage("es");
      setSelectedLanguage(languages.filter(lang => lang.code === "es")[0]);
    }
  }, [i18n, langDropDown]);

  const toggleMenu = () => {
    setShowMenu(showMenu => !showMenu);
  };

  const toggleLanguage = lang => {
    i18n.changeLanguage(lang.code);
    setSelectedLanguage(lang);
    set("lang", lang.code);
    setLangDropDown(false);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response1 = await http.GET(assignedApi.list, "");
        setAssignedData([response1]);
      } catch (err) {
        toasts.error(err?.response?.data?.errors?.error);
      }
    }
    getData();
  }, []);

  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const basketPermissions = getPermissions()
    ?.filter(each => each.url.path.includes("basket"))
    ?.map(each => each.url.path);
  const eventPermissions = getPermissions()
    ?.filter(each => each.url.path.includes("event"))
    ?.map(each => each.url.path);

  const assignedDateData = assignedData && assignedData[0]?.data?.data;

  useEffect(() => {
    if (assignedDateData) {
      const objectKey = Object.keys(assignedDateData);
      setAssignedDataCalendar(objectKey);
    }
  }, [assignedDateData]);

  useEffect(() => {
    const dataArray = [];
    for (const id in assignedDataCalendar) {
      if (assignedDataCalendar.hasOwnProperty(id)) {
        const date = assignedDataCalendar[id];
        dataArray.push({ date });
      }
    }
    setCalendarEventDate(dataArray);
  }, [assignedDataCalendar]);

  const handleLogout = () => {
    clear();
    navigate(PATH.LOGIN);
    // window.location.href = "/login";
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });

  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
    ?.replace(/,/g, "");

  return (
    <NavContainer
      progress={progress}
      className="navbar_container"
      onClick={() => {
        if (langDropDown) {
          setLangDropDown(false);
        }
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: `${windowWidth > 900 ? "row" : "column"}`,
          justifyContent: "space-between",
          gap: `${windowWidth > 900 ? "10px" : "0px"}`,
          alignItems: `${windowWidth > 900 ? "center" : "start"}`,
        }}
      >
        {formattedDate.includes("at") ? formattedDate?.replace(/at/g, "") : formattedDate}
        {/* <div className="date_container">
          {windowWidth > 1050 && (
            <i
              style={{ marginBottom: ".1em", fontSize: "1.2em" }}
              className="fal fa-calendar-alt"
            ></i>
          )}
          <span>{new Date().toDateString()}</span>
        </div>
        <div className="time_container">
          {windowWidth > 1050 && (
            <i style={{ fontSize: "1.2em", fontWeight: "300" }} className="far fa-clock"></i>
          )}
          <span className="">
            {time?.slice(1, 2) === ":" ? 0 : ""}
            {time?.slice(0, 8)}
          </span>
          <span className="">{time.slice(-2)}</span>
        </div> */}
      </div>

      <div className="row-container">
        {(eventPermissions?.includes("/event/list/") || isAdmin) && (
          <div className="basket_icon" onClick={() => navigate(PATH.CALENDAR)}>
            {calendarEventDate?.length ? <div className="event_notification"></div> : null}

            <FontAwesomeIcon icon={faCalendarAlt} id="basket_icon" />
          </div>
        )}

        {(basketPermissions?.includes("/basket/list/") || isAdmin) && (
          <div
            className="basket_icon"
            onClick={() => navigate(`${PATH.CONTENT}/${PATH.CONTENT_BASKET}`)}
          >
            <FontAwesomeIcon icon={faShoppingBasket} id="basket_icon" />
          </div>
        )}

        {/* <div className={`upload_container ${progress > 0 ? "active" : "inactive"}`}>
          <div
            className="upload_indicator"
            onClick={() => {
              setUploadModal(uploadModal => !uploadModal);
            }}
          >
            {progress > 0 ? (
              <p className="progress_number">{progress} %</p>
            ) : (
              <FontAwesomeIcon icon={faUpload} id="upload_icon" />
            )}
          </div>
          {uploadModal && (
            <div className="upload_modal">
              {temp && (
                <div className="upload_item">
                  <div className="upload_icon">
                    <FontAwesomeIcon icon={faVideo} className="icon" />
                  </div>
                  <div className="upload_content">
                    {isEditing ? (
                      <h5 className="upload_title">{temp.title} - Updating</h5>
                    ) : (
                      <h5 className="upload_title">{temp.title}</h5>
                    )}
                    <p>
                      {`${temp.description.slice(0, 50)}`}
                      <span>{temp?.description.split("").length >= 50 && "..."}</span>
                    </p>
                    <div className="progress_bar">
                      <Progress progress={progress} className="progress"></Progress>
                    </div>
                    <div className="upload_status">
                      <p style={{ margin: 0 }}>{progress} %</p>
                    </div>
                  </div>
                </div>
              )}
              {uploadQueue &&
                uploadQueue?.length &&
                uploadQueue.map((item, index) => (
                  <div className="upload_item" key={index}>
                    <div className="upload_icon">
                      <FontAwesomeIcon icon={faVideo} className="icon" />
                    </div>
                    <div className="upload_content">
                      <h5 className="upload_title">{item.title}</h5>
                      <p>
                        {`${item.description.slice(0, 50)}`}
                        <span>{item?.description.split("").length >= 50 && "..."}</span>
                      </p>
                      <div className="waiting">
                        <p>Waiting . In Queue</p>
                      </div>
                    </div>
                  </div>
                ))}
              {log &&
                log?.length &&
                log.map((item, index) => (
                  <div className="upload_item completed" key={index}>
                    <div className="upload_icon">
                      <FontAwesomeIcon icon={faAudioDescription} className="icon" />
                    </div>
                    <div className="upload_content">
                      <h5 className="upload_title">{item.title}</h5>
                      <p>
                        {`${item?.description?.slice(0, 50)}`}
                        <span>{item?.description.split("")?.length >= 50 && "..."}</span>
                      </p>
                      <div className="waiting">
                        <p>Completed</p>
                      </div>
                    </div>
                  </div>
                ))}
              {(temp === undefined || temp === null) &&
                (uploadQueue === undefined || uploadQueue.length === 0) &&
                (log === undefined || log.length === 0) && (
                  <div className="empty_message">
                    <p>
                      😟<span>You have nothing in upload right now.</span>
                    </p>
                  </div>
                )}
            </div>
          )}
        </div> */}
        <div className="greeting_container">
          <div className="custom-language-selector">
            <div
              className="selected"
              onClick={() => {
                setLangDropDown(!langDropDown);
              }}
            >
              <div>
                <img
                  className="lang-flag"
                  src={selectedLanguage.flag}
                  alt={selectedLanguage.name}
                />
                <p className="lang-text">{selectedLanguage.name}</p>
              </div>
              <RiArrowDropDownLine
                style={
                  langDropDown
                    ? {
                      transform: "rotate(180deg)",
                      transition: "all 0.2s ease-in-out",
                    }
                    : { transition: "all 0.2s ease-in-out" }
                }
                size={28}
              />
            </div>
            {langDropDown && (
              <div className="options">
                {languages.map((language, index) => (
                  <div key={index} className="option" onClick={() => toggleLanguage(language)}>
                    <img className="lang-flag" src={language.flag} alt={language.name} />
                    <p className="lang-text">{language.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h6>
            {t("hello")},{" "}
            <strong style={{ textTransform: "capitalize" }}>{user?.username || "User"}</strong>!
          </h6>
        </div>
        <div ref={wrapperRef} className="menu_container" onClick={toggleMenu}>
          <div className="navbar_pic_container">
            {user?.image ? (
              <img src={`${user.image}`} alt="profile" />
            ) : (
              (user?.firstName ? user?.firstName[0] : "Z") +
              (user?.lastName ? user?.lastName[0] : "")
            )}
          </div>
          {showMenu ? (
            <FontAwesomeIcon icon={faAngleUp} id="arrow_pic" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} id="arrow_pic" />
          )}
          {showMenu && (
            <ul className="dropdown_menu">
              <Link to={PATH.PROFILE}>
                <FontAwesomeIcon icon={faUser} />
                <li>{t("profile")}</li>
              </Link>
              <li className="dropdown_divider">
                <hr />
              </li>
              <Link to={PATH.LOGIN} onClick={handleLogout}>
                <FontAwesomeIcon icon={faFileWord} />
                <li>{t("logout")}</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </NavContainer>
  );
}

export default withTranslation()(Navbar);

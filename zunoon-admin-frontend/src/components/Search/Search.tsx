import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import "./Search.scss";
import { useLocation } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BiFilter } from "react-icons/bi";
import Filter from "../Filter/Filter";
import ContentFilter from "../../pages/Content/components/contentFilter/ContentFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISearch } from "../../@types/searchFilter";
import Button from "../Button/Button";

const Search = ({
  removeFilter,
  handleSearch,
  setRemoveFilter,
  t,
  setFilteredData,
  setTotalPageNumber,
  setCurrentPageNumber,
  setFilteredGrade,
  setFilteredCareer,
  setWatchValue,
}: ISearch) => {
  const location = useLocation();

  const [searchText, setSearchText] = useState<string>("");
  const [firstAccess, setFirstAccess] = useState<boolean>(true);

  function handleText(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }
  useEffect(() => {
    let timerKey: any;
    if (!firstAccess) {
      timerKey = setTimeout(() => {
        handleSearch?.(searchText);
      }, 400);
    }
    return () => {
      setFirstAccess(false);
      clearTimeout(timerKey);
    };
  }, [searchText, handleSearch, firstAccess]);

  const [sidebarFilter, setSidebarFilter] = useState(false);

  const handleSidebarClick = () => {
    setSidebarFilter(!sidebarFilter);
  };
  const isSchoolAssignCoursePath = location.pathname === "/schools/assigncourses";
  const isCoursePath = location.pathname === "/courses";
  const isUnitPath = location.pathname === "/units";
  const isSkillPath = location.pathname === "/skills";
  const isIndicatorPath = location.pathname === "/indicators";
  const isLessonPath = location.pathname === "/lessons";
  const isContentPath = location.pathname === "/contents";
  const filter =
    isSchoolAssignCoursePath ||
    isCoursePath ||
    isUnitPath ||
    isSkillPath ||
    isIndicatorPath ||
    isLessonPath ||
    isContentPath;

  return (
    <>
      {sidebarFilter && (
        <div className="sidebarFilterTotal">
          <div className="sidebarFilterOverlay" onClick={() => setSidebarFilter(false)}></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>
                {` ${t("filter")} ${
                  isCoursePath || isSchoolAssignCoursePath
                    ? `${t("course")}`
                    : isUnitPath
                    ? `${t("unit")}`
                    : isSkillPath
                    ? `${t("skill")}`
                    : isIndicatorPath
                    ? `${t("indicator")}`
                    : isLessonPath
                    ? `${t("lesson")}`
                    : `${t("content")}`
                }`}
              </h1>
              <img
                src="/cross.png"
                style={{ width: "20px", marginRight: "20px" }}
                onClick={handleSidebarClick}
                alt=""
              />
            </div>
            <div className="sidebarFilterfilter">
              <Filter
                isSchoolAssignCoursePath={isSchoolAssignCoursePath}
                isCoursePath={isCoursePath}
                isUnitPath={isUnitPath}
                isSkillPath={isSkillPath}
                setRemoveFilter={setRemoveFilter}
                isIndicatorPath={isIndicatorPath}
                isLessonPath={isLessonPath}
                setFilteredData={setFilteredData}
                setTotalPageNumber={setTotalPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
                setFilteredGrade={setFilteredGrade}
                setFilteredCareer={setFilteredCareer}
                setWatchValue={setWatchValue}
              />
              {isContentPath && (
                <ContentFilter
                  setFilteredData={setFilteredData}
                  setRemoveFilter={setRemoveFilter}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="search_box">
        <div className="form">
          <div className="search_filter">
            <div className={`${isContentPath ? "content_filter_input" : "search_filter_input"} `}>
              <input
                type="search"
                id="form1"
                className="form_input"
                value={searchText}
                onChange={handleText}
                placeholder={t("search")}
                onKeyUp={(e: any) => {
                  e.target.value = e?.target?.value?.trimStart();
                }}
              />
              <span className="search_icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            {filter ? (
              <div className="filter">
                {removeFilter ? (
                  <Button
                    type="button"
                    clickHandler={() => setRemoveFilter(false)}
                    buttonName={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          padding: "0 4px",
                        }}
                      >
                        {t("clear")} X
                      </div>
                    }
                    color="success"
                    classes="remove_filter"
                  />
                ) : (
                  <Button
                    type="button"
                    clickHandler={() => handleSidebarClick()}
                    buttonName={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                        }}
                      >
                        <BiFilter className="filter_icons" />
                        {t("filter")}
                      </div>
                    }
                    color="success"
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Search);

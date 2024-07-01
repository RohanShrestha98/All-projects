import React, { useState } from "react";
import { Input } from "antd";

import { useQueryData } from "../../hooks/useQueryData";
import AddSection from "./addSection";
import SectionCard from "./sectionCard";
import { Button } from "../../components/UI/button";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { Link, useLocation } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { BiFilter } from "react-icons/bi";
// import NoData from "../../components/errorimage/NoData";
import { usePermissionContext } from "../../context/permissionContext";
import { useEffect } from "react";
import ErrorPage from "../../components/errorPage/errorPage";
import FilterByGrades from "./filterByGrades";

function SectionPage() {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [gradeId, setGradeId] = useState("");
  const location = useLocation();

  const showDrawer = () => {
    setOpen(true);
  };

  const { data, isFetching, error } = useQueryData(
    ["section", location?.state?.id, searchText],
    location?.state?.id
      ? `api/v1/section/grade/${location?.state?.id}`
      : `api/v1/section/list/?query=${searchText}`,
  );
  const { data: sectionByGrade } = useQueryData(
    ["section", gradeId, isFiltered, searchText],
    isFiltered
      ? `api/v1/section/grade/${gradeId}`
      : `api/v1/section/list/?query=${searchText}`,
    "",
    !!gradeId,
  );

  const [sectionData, setSectionData] = useState(data?.data);

  useEffect(() => {
    if (sectionByGrade) {
      setSectionData(sectionByGrade);
    } else {
      setSectionData(null);
    }
  }, [gradeId, sectionByGrade]);

  const { permissions } = usePermissionContext().permissions;
  const sectionPermission = permissions
    .filter(each => each.url.path.includes("section"))
    .map(each => each.url.path);
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        {location?.state?.id && (
          <Link
            to={-1}
            className="flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          >
            {" "}
            <ImArrowLeft2 size={16} />
          </Link>
        )}
        <h2 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
          {location?.state?.name ? `${location?.state?.name} -` : ""} Sections
        </h2>
        <div className="flex items-center gap-2">
          <Input.Search
            placeholder="Search sections"
            className="md:w-1/2"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <div
            className={`flex gap-2 ${
              isFiltered
                ? "font-bold bg-red text-white hover:text-red hover:bg-white border border-red px-4 py-[2px]"
                : "bg-blue text-white px-4 py-[2px] hover:bg-white hover:text-blue cursor-pointer border border-blue"
            }  rounded cursor-pointer whitespace-nowrap`}
            onClick={() => {
              !isFiltered ? setOpenFilter(true) : setIsFiltered(false);
            }}
          >
            {!isFiltered ? "Filter" : "Clear "}
            {!isFiltered ? <BiFilter size={22} /> : " X"}
          </div>

          {sectionPermission?.includes("/section/create/") ||
          permissions[0].name === "Any" ? (
            <Button type="primary" onClick={() => showDrawer()}>
              Add Section
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
        {isFetching &&
          [...Array(12).keys()].map((_, index) => {
            return <ShimmerThumbnail key={index} height={125} />;
          })}
        {data?.data &&
          (sectionPermission.includes("/section/list/") ||
            permissions[0].name === "Any") &&
          (gradeId ? (
            sectionData !== null ? (
              sectionData?.data?.map((each, index) => (
                <SectionCard key={index} data={each} />
              ))
            ) : (
              <ErrorPage isFetching={isFetching} data={data} error={error} />
            )
          ) : (
            data?.data?.map((each, index) => (
              <SectionCard key={index} data={each} />
            ))
          ))}
      </div>
      {(!data?.data?.length ||
        (isFiltered && !sectionByGrade?.data?.length)) && (
        <div className="w-full  bg-white flex items-center justify-center rounded-md">
          <ErrorPage
            data={null}
            isFetching={false}
            error={false}
            title={"No Section to show"}
          />
        </div>
      )}

      <AddSection open={open} setOpen={setOpen} />
      <FilterByGrades
        open={openFilter}
        setOpen={setOpenFilter}
        title={"Filter section by grade"}
        setIsFiltered={setIsFiltered}
        setGradeId={setGradeId}
        gradeId={gradeId}
      />
    </div>
  );
}

export default SectionPage;

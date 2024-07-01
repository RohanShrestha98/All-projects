import React, { useMemo, useState } from "react";

import { useQueryData } from "../../hooks/useQueryData";

import { ShimmerTable } from "react-shimmer-effects";
import { Input, Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import { ReactTable } from "../../components/table/table";
import ErrorPage from "../../components/errorPage/errorPage";

function GradePage() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error } = useQueryData(
    ["grade", searchText],
    `api/v1/grade/list/?query=${searchText}`,
  );

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return (
            <Tooltip
              placement="top"
              title={row?.name}
              color="#1fb6ffff"
              className="line-clamp-1"
            >
              {row?.name}
            </Tooltip>
          );
        },
        id: "name",
        cell: info => info.getValue(),
        header: () => <span>Grade</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return (
            <Tooltip
              placement="top"
              title={row?.description}
              color="#1fb6ffff"
              className="line-clamp-1"
            >
              {row?.description?.slice(0, 100)}
            </Tooltip>
          );
        },
        id: "description",
        cell: info => info.getValue(),
        header: () => <span>Description</span>,
        footer: props => props.column.id,
      },
      {
        id: "sectionCount",
        cell: info => {
          return (
            <NavLink
              to="/section"
              state={{
                id: info?.row?.original?.id,
                name: info?.row?.original?.name,
              }}
            >
              {info?.row?.original?.noOfSections
                ? info?.row?.original?.noOfSections
                : 0}
            </NavLink>
          );
        },
        header: () => <span>No. of Sections</span>,
        footer: props => props.column.id,
      },
      {
        id: "studentCount",
        cell: info => {
          return (
            <NavLink
              to="/student"
              state={{
                id: info?.row?.original?.id,
                name: info?.row?.original?.name,
              }}
            >
              {info?.row?.original?.noOfStudents
                ? info?.row?.original?.noOfStudents
                : 0}
            </NavLink>
          );
        },
        header: () => <span>No. of Students</span>,
        footer: props => props.column.id,
      },
    ],
    [],
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-">
        <h3 className="text-xl md:text-lg font-bold sm:font-medium sm:text-base">
          Grades
        </h3>
        <Input
          placeholder="Search grades"
          value={searchText}
          allowClear
          type="search"
          onChange={e => setSearchText(e.target.value)}
          className="w-1/4 md:w-1/2 outline-none"
        />
      </div>
      {isLoading ? (
        <ShimmerTable col={5} row={10} />
      ) : data?.data ? (
        <ReactTable
          columns={columns}
          data={data?.data}
          currentPage={data?.currentPage}
          totalPage={data?.totalPage}
        />
      ) : (
        <ErrorPage
          data={data?.data}
          isFetching={isLoading}
          error={error}
          title={"No Grade found"}
        />
      )}
    </div>
  );
}

export default GradePage;

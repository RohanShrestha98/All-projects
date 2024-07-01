import React from "react";
import { useState, useMemo } from "react";
// import AddCycle from "./addCycle";
import { useQueryData } from "../../hooks/useQueryData";
import { ShimmerTable } from "react-shimmer-effects";
import { ReactTable } from "../../components/table/table";
import { Tooltip } from "antd";
import CustomModel from "../../components/modal/CustomModel";
import ErrorPage from "../../components/errorPage/errorPage";

export default function GradingCriteria() {
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading, isFetching } = useQueryData(
    ["grading-criteria"],
    "api/v1/grading-criteria/list/",
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
              title={row?.title}
              color="#1fb6ffff"
              className="line-clamp-1"
            >
              {row?.title}
            </Tooltip>
          );
        },
        id: "title",
        cell: info => info.getValue(),
        header: () => <span>Title</span>,
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
        id: "point",
        cell: info => {
          return (
            <p>{info?.row?.original?.point ? info?.row?.original?.point : 0}</p>
          );
        },
        header: () => <span>Points</span>,
        footer: props => props.column.id,
      },
    ],
    [],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
          Grading Criteria
        </h1>
        <button
          className="border-2 border-blue px-4 py-[2px] cursor-pointer text-white bg-blue font-semibold hover:text-blue hover:bg-white rounded"
          onClick={() => setOpen(true)}
        >
          Update Criteria
        </button>
      </div>
      {isFetching ? (
        <ShimmerTable col={5} row={10} />
      ) : data?.data ? (
        <ReactTable columns={columns} data={data?.data} gradingCard={true} />
      ) : (
        <ErrorPage
          data={data?.data}
          isFetching={isLoading}
          error={isError}
          title={"No Grading Criteria found"}
        />
      )}

      {open && (
        <CustomModel setIsModalOpen={setOpen} isModalOpen={open} data={data} />
      )}
    </div>
  );
}

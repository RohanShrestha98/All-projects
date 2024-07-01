import React from "react";
import { useState, useMemo } from "react";
// import AddCycle from "./addCycle";
import { useQueryData } from "../../hooks/useQueryData";
import { ShimmerTable } from "react-shimmer-effects";
import { ReactTable } from "../../components/table/table";
import AddCycle from "./addCycle";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import ConfirmModel from "../../containers/profile/confirmModel";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import ErrorPage from "../../components/errorPage/errorPage";
import noData2 from "../../assets/images/noData2.png";
import { TruncateText } from "../../utils/truncateText";

export default function Cycle() {
  const [open, setOpen] = useState();
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [selectedId, setSelectedId] = useState();
  const [confirmModel, setConfirmModel] = useState(false);
  const { data, isError, isLoading, isFetching } = useQueryData(
    ["cycle"],
    "api/v1/cycle/list/",
  );

  const useCycleDeleteMutation = () =>
    useMutate(["cycle"], `api/v1/cycle/delete/${selectedId}`, selectedId);

  const { mutateAsync } = useCycleDeleteMutation();

  const handleDeleteCycle = async () => {
    try {
      const response = await mutateAsync(["delete", ""]);
      if (response.success) {
        setOpen(false);
        toast.success("Cycle deleted successfully!");
        setConfirmModel(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.cycle);
    }
  };

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
          return <p>{TruncateText(row?.title, 100, 200)}</p>;
        },
        id: "title",
        cell: info => info.getValue(),
        header: () => <span>Title</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return <div>{row?.start?.slice(0, 10)}</div>;
        },
        id: "start",
        cell: info => info.getValue(),
        header: () => <span>Start</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return <div>{row?.end?.slice(0, 10)}</div>;
        },
        id: "end",
        cell: info => info.getValue(),
        header: () => <span>End</span>,
        footer: props => props.column.id,
      },
      {
        id: "action",
        cell: info => {
          return (
            <div className="flex items-center gap-3">
              <AiOutlineEdit
                className="cursor-pointer text-cyan text-lg"
                onClick={() => {
                  setOpen(true);
                  setEdit(true);
                  setEditData(info?.row?.original);
                }}
              />
              <BiTrash
                onClick={() => {
                  setConfirmModel(true);
                  setSelectedId(info?.row?.original?.id);
                }}
                className="text-red text-lg cursor-pointer"
              />
            </div>
          );
        },
        header: () => <span>Action</span>,
        footer: props => props.column.id,
      },
    ],
    [],
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
          Cycle
        </h1>
        <button
          className="border-2 border-blue px-4 py-[2px] cursor-pointer text-white bg-blue font-semibold hover:text-blue hover:bg-white rounded"
          onClick={() => {
            setOpen(!open);
            setEdit(false);
          }}
        >
          + Add Cycle
        </button>
        {open && (
          <AddCycle
            open={open}
            setOpen={setOpen}
            edit={edit}
            editData={edit && editData}
          />
        )}
        {confirmModel && (
          <ConfirmModel
            isOpen={confirmModel}
            setOpen={setConfirmModel}
            desc={"Are you sure you want to delete the cycle?"}
            btnName={"Delete"}
            className={"bg-red hover:text-red hover:bg-white "}
            handleConfirm={() => handleDeleteCycle()}
          />
        )}
      </div>
      {/* <div className="mt-10 flex items-center justify-between border-b-2 border-gray-6 bg-white py-4 px-4 rounded-t-3xl">
        <div className="w-1/3"></div>
        <p className="w-1/3 ">Total Cycle : {data?.data?.length}</p>
        <input
          type="text"
          className="w-1/4 bg-gray-16 outline-none border-none px-4 rounded-lg h-8"
          placeholder="Search.."
        />
      </div> */}
      {isFetching ? (
        <ShimmerTable col={5} row={10} />
      ) : data?.data ? (
        <ReactTable
          totalPage={data?.totalPage}
          currentPage={data?.currentPage}
          columns={columns}
          data={data ? data?.data : []}
        />
      ) : (
        <ErrorPage
          emptyImage={noData2}
          width={"350px"}
          height={"300px"}
          data={data?.data}
          isFetching={isLoading}
          error={isError}
          title={"No Cycle found"}
        />
      )}
    </div>
  );
}

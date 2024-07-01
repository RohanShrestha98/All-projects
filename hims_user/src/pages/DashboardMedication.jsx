/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useMedicationData } from "../hooks/useQueryData";
import { ReactTable } from "../components/Table";
import { RiEditLine } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import Button from "../components/Button";
import { RxCross2 } from "react-icons/rx";
import AddDocumentModal from "../modals/AddDocumentModal";
import ConfirmModal from "../components/ConfirmModal";
import { useMedicationMutation } from "../hooks/useMutateData";
import { toast } from "react-toastify";
import NoDataPage from "../components/UI/NoDataPage";
import { IoEyeOutline } from "react-icons/io5";
import loading from "../assets/loading.webp";

export default function DashboardMedication() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, isError } = useMedicationData({
    search: searchText,
  });
  const [openAddDocumentModal, setOpenAddDocumentModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [editData, setEditData] = useState();

  const medicationMutation = useMedicationMutation();
  const handleDelete = async () => {
    try {
      const result = await medicationMutation.mutateAsync([
        "delete",
        `${editData?.idx}/`,
        "",
      ]);
      if (result?.status === 204) {
        setConfirmModal(false);
        toast.success("Medication deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setError(error?.response?.data);
      toast.error("Something went wrong");
    }
  };
  const totalPage = Math.ceil(data?.total / data?.page_size);
  const columns = useMemo(
    () => [
      // {
      //   accessorFn: (_, index) => index + 1,
      //   id: "serialNo",
      //   cell: (info) => <div className="ml-5">{info.getValue()}</div>,
      //   header: () => <span className="ml-5">S/N</span>,
      //   footer: (props) => props.column.id,
      // },
      {
        accessorFn: (row) => {
          return <p>{row?.title}</p>;
        },
        id: "title",
        cell: (info) => info.getValue(),
        header: () => <span>Title</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => {
          return <p>{row?.description?.slice(0, 100)}</p>;
        },
        id: "description",
        cell: (info) => info.getValue(),
        header: () => <span>Description</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "action",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <a
                href={row?.original?.document}
                target="_blank"
                rel="noreferrer"
              >
                <IoEyeOutline
                  size={24}
                  className="text-green-700 border rounded-md cursor-pointer border-green-700 p-1"
                />
              </a>

              <RiEditLine
                onClick={() => {
                  setEditData(row?.original);
                  setOpenAddDocumentModal(true);
                  setEdit(true);
                }}
                size={24}
                className="text-blue-700 border rounded-md cursor-pointer border-blue-700 p-1"
              />
              <LuTrash2
                onClick={() => {
                  setEditData(row?.original);
                  setConfirmModal(true);
                }}
                size={24}
                className="text-red-600 border rounded-md cursor-pointer border-red-600 p-1"
              />
            </div>
          );
        },
        header: () => <span>Action</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h1>Medications</h1>
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 flex items-center justify-between sm:hidden rounded-full h-10 outline-none border-none px-4">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              value={searchText}
              placeholder={"Search ..."}
              className={
                "bg-gray-100 sm:hidden  h-10 outline-none border-none "
              }
            />
            {searchText && (
              <RxCross2
                className="cursor-pointer"
                onClick={() => setSearchText("")}
              />
            )}
          </div>

          <Button
            buttonName={"+ Add Medication"}
            className={"rounded-lg hover:opacity-80 px-4 sm:px-2 sm:h-8 "}
            handleButtonClick={() => {
              setEdit(false);
              setEditData();
              setOpenAddDocumentModal(true);
            }}
          />
        </div>
      </div>
      {isLoading && (
        <div className="h-[80vh] flex  items-center justify-center">
          <img className="w-20 h-20" src={loading} alt="" />
        </div>
      )}
      {data?.results?.length ? (
        <ReactTable
          loading={isLoading}
          error={isError}
          columns={columns}
          data={data?.results ?? []}
          currentPage={data?.page}
          totalPage={totalPage}
        />
      ) : (
        <NoDataPage />
      )}

      {openAddDocumentModal && (
        <AddDocumentModal
          edit={edit}
          data={editData}
          isOpen={openAddDocumentModal}
          setIsOpen={setOpenAddDocumentModal}
        />
      )}
      {confirmModal && (
        <ConfirmModal
          messeges={"Are you sure you wanna delete medication ?"}
          isOpen={confirmModal}
          setIsOpen={setConfirmModal}
          handleChange={handleDelete}
        />
      )}
    </div>
  );
}

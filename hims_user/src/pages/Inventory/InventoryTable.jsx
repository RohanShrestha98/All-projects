/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useInventoryData } from "../../hooks/useQueryData";
import { ReactTable } from "../../components/Table";
const columnHelper = createColumnHelper();
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import ConfirmModal from "../../components/ConfirmModal";
import { useInventoryMutation } from "../../hooks/useMutateData";
import { toast } from "react-toastify";
import loading from "../../assets/loading.webp";
import NoDataPage from "../../components/UI/NoDataPage";

export default function InventoryTable({ debouncedSearch }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(7);
  const { data, isError, isLoading } = useInventoryData({
    search: debouncedSearch,
    page: page,
    pageSize: pageSize,
  });

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    if (data) {
      const tableData = data?.results?.map((item) => ({
        idx: item?.idx,
        department: item?.department?.title,
        name: item?.form?.equipment?.title,
        hospital: item?.hospital?.title,
        data: item?.data,
      }));
      setInventoryData(tableData);
    }
  }, [data]);

  const inventoryMutation = useInventoryMutation();

  const handleDelete = async () => {
    try {
      const result = await inventoryMutation.mutateAsync([
        "delete",
        `${selectedIdx}/`,
        "",
      ]);
      if (result?.status === 204) {
        setConfirmDelete(false);
        toast.success("Inventory deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      // setError(Object.values(error?.response?.data)?.[0]);
    }
  };

  const totalEntries = data?.total;
  const totalPage = Math.ceil(data?.total / data?.page_size);

  const columns = useMemo(
    () => [
      columnHelper.accessor("department", {
        header: "Department",
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("hospital", {
        header: "Hospital Name",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex items-start gap-4">
              {/* <InventoryItemModal data={row.original.data}>
              <Tooltip content="View Details">
                <div className="cursor-pointer  text-primary">
                  <EyeOpenSvg className="h-6 w-6 p-1 rounded-lg border border-primary" />
                </div>
              </Tooltip>
            </InventoryItemModal>
            {[ROLES.hospitalAdmin, ROLES.hospitalManager].includes(
              auth.userDetails.roles[0]
            ) && (
                <>
                  <Tooltip content="Edit">
                    <Link
                      to="edit"
                      state={data?.results.find(
                        (inventory) => inventory.idx === row.original.idx
                      )}
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer text-grayHeading hover:text-primary"
                    >
                      <EditSvg className="p-[2px] rounded-lg border border-primary" />
                    </Link>
                  </Tooltip>
                  <span
                    onClick={(e) => e.stopPropagation()}
                    className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
                  >
                    <AlertDialog
                      description={deleteAlertDescription}
                      btnText="Yes, delete data"
                      clickHandler={() =>
                        deleteMutation.mutate(
                          { idx: row.original.idx },
                          {
                            onSuccess: () =>
                              updateToast(
                                "Inventory deleted successfully",
                                "success"
                              ),
                          }
                        )
                      }
                    >
                      <Tooltip content="Delete" asChild>
                        <span>
                          <DeleteSvg className="p-[2px] rounded-lg border border-danger" />
                        </span>
                      </Tooltip>
                    </AlertDialog>
                  </span>
                </>
              )} */}
              <Link
                state={data?.results.find(
                  (inventory) => inventory.idx === row.original.idx
                )}
                to={"/inventory/add"}
              >
                {" "}
                <BiEditAlt size={20} className="text-gray-500" />
              </Link>

              <FiTrash
                size={20}
                onClick={() => {
                  setSelectedIdx(row.original.idx);
                  setConfirmDelete(true);
                }}
                className="text-red-500"
              />
            </div>
          );
        },
      }),
    ],
    [data]
  );

  return (
    <>
      {isLoading && (
        <div className="h-[80vh] flex  items-center justify-center">
          <img className="w-12 h-12" src={loading} alt="" />
        </div>
      )}
      {!inventoryData.length && (
        <div>
          <NoDataPage />
        </div>
      )}
      {inventoryData.length && (
        <ReactTable
          data={inventoryData}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          totalEntries={totalEntries}
          showFooter
          containsActions
          containsCheckbox
          className="h-[calc(100vh-232px)]"
          pageSizeChangeHandler={(size) => setPageSize(size)}
          pageChangeHandler={(page) => setPage(page)}
          pageSize={pageSize}
          currentPage={page}
          totalPage={totalPage}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          messeges={"Are you sure you want to delete inventory?"}
          setIsOpen={setConfirmDelete}
          handleChange={() => {
            handleDelete();
          }}
          isOpen={confirmDelete}
        />
      )}
    </>
  );
}

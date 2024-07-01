/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const Table = ({
  data,
  columns,
  isLoading,
  isError,
  totalEntries,
  className = "",
  allowHover = false,
  handleRowClick,
  containsCheckbox = false,
  containsActions = false,
}) => {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    enableSorting: !isError,
    state: { sorting, rowSelection },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // console.log("data", data);

  return (
    <div>
      <div
        className={`rounded border h-[500px] border-primarySelect overflow-auto  mt-4 ${className}`}
      >
        <table className="w-full border-collapse table-fixed">
          <thead className="sticky top-0 z-10 bg-primarySelect text-sm bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`group py-3 text-start font-semibold first:pl-4  last:pr-4 first:w-[100px] `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center  justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {isLoading || isError || totalEntries === 0 ? null : (
            <tbody className="text-sm">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-y border-primaryHover ${
                    row.getIsSelected()
                      ? "bg-primarySelect"
                      : allowHover
                      ? "hover:bg-primaryHover"
                      : ""
                  } ${allowHover ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => handleRowClick && handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 first:pl-4">
                      <span className="flex items-center whitespace-nowrap w-full ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;

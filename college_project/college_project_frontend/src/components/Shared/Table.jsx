/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useImperativeHandle } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const ReactTable = React.forwardRef(
  (
    {
      columns,
      data,
      currentPage,
      totalPage,
      loading,
      error,
      setSelectedRows,
      rowSelectable,
      handlePageChange,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
      data,
      columns,
      state: {
        rowSelection,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: true,
      manualPagination: true,
    });

    useImperativeHandle(ref, () => ({
      clearSelection() {
        table.toggleAllRowsSelected(false);
      },
    }));

    useEffect(() => {
      const handleSelectedId = () => {
        const newData =
          data?.length > 0 &&
          setSelectedRows &&
          table
            ?.getSelectedRowModel()
            ?.flatRows?.map(
              (item) => item?.original?.id || item?.original?.student?.id
            );
        setSelectedRows && setSelectedRows(newData);
      };
      handleSelectedId();
    }, [table?.getSelectedRowModel()]);

    return (
      <div className="bg-white ">
        <table className="w-full">
          <thead className="border-b-[1px] w-full  border-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 py-2 text-left table_header font-medium text-sm text-slate-800"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {data?.length > 0 &&
              table?.getRowModel()?.rows?.map((row, index) => {
                return (
                  <tr className="border-b" key={row.id}>
                    {row?.getVisibleCells()?.map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-[6px] text-xs text-slate-700`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <ErrorPage isFetching={loading} data={data} error={error} /> */}
        {data && (
          <div
            className={`flex ${
              rowSelectable ? "justify-between" : "justify-end"
            }  items-center px-4 py-4 text-slate-600 text-xs`}
          >
            {rowSelectable && (
              <p>{Object?.keys(rowSelection)?.length} Rows Selected</p>
            )}
            {/* {data && data?.length ? (
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            ) : null} */}
          </div>
        )}
      </div>
    );
  }
);

ReactTable.displayName = "ReactTable";

export { ReactTable };

import React from "react";
import { useEffect, useImperativeHandle } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "../pagination/pagination";
import ErrorPage from "../errorPage/errorPage";
import noData1 from "../../assets/images/noData1.png";

const ReactTable = React.forwardRef(
  (
    {
      columns,
      data,
      currentPage,
      totalPage,
      loading,
      title,
      emptyImage,
      error,
      setSelectedRows,
      rowSelectable,
      gradingCard,
      handlePageChange,
    },
    ref,
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
              item => item?.original?.id || item?.original?.student?.id,
            );
        setSelectedRows && setSelectedRows(newData);
      };
      handleSelectedId();
    }, [table?.getSelectedRowModel()]);

    return (
      <div className="bg-white overflow-auto ">
        <table className="w-full">
          <thead className="border-b-[1px] border-slate-300">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 py-2 text-left table_header font-semibold text-sm  text-slate-800"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  <tr key={row.id}>
                    {row?.getVisibleCells()?.map(cell => {
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-[16px] text-[13px] text-slate-700 ${
                            index % 2 === 0 ? "bg-zinc-100" : "bg-white"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ErrorPage
          emptyImage={emptyImage ?? noData1}
          title={title}
          isFetching={loading}
          data={data}
          error={error}
        />
        {data && (
          <div
            className={`flex ${
              rowSelectable ? "justify-between" : "justify-end"
            }  items-center px-4 py-4 text-slate-600 text-xs`}
          >
            {rowSelectable && (
              <p>{Object?.keys(rowSelection)?.length} Rows Selected</p>
            )}
            {data && data?.length && !gradingCard ? (
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  },
);

ReactTable.displayName = "ReactTable";

export { ReactTable };

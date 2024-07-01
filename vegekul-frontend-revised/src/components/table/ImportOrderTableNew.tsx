import { forwardRef, useEffect } from 'react';
import { flexRender } from '@tanstack/react-table';

import ScrollArea from '../../ui/ScrollArea';

import { withTranslation } from 'react-i18next';
import TableFooter from '../shared/TableFooter';

const OrderImportTable = forwardRef(
  (
    {
      data,
      columns,
      table,
      setSelectedRowData,
      className = '',
      allowHover = false,
      showFooter = true,
      containsCheckbox = true,
      containsActions = false,
    }: any,
    ref: any
  ) => {
    // useEffect(() => {
    //   const selectedData = table
    //     .getSelectedRowModel()
    //     .flatRows.map(row => row.original);
    //   setSelectedRowData(selectedData);
    // }, [table.getSelectedRowModel().flatRows]);

    return (
      <div>
        {showFooter ? (
          <TableFooter
            totalEntries={data?.length}
            pageSize={table.getState().pagination.pageSize}
            setPageDetail={(page: number, pageSize: number) => {
              table.setPageSize(pageSize);
              table.setPageIndex(page - 1);
            }}
            page={table.getState().pagination.pageIndex + 1}
          />
        ) : null}
        <ScrollArea
          className={`rounded border border-primarySelect overflow-auto mt-4 ${className}`}
        >
          <table className="w-full overflow-x-scroll border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-primarySelect text-sm">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`group text-start font-semibold first:pl-4 last:pr-4 ${header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                        } ${containsCheckbox ? 'first:w-1' : ''} ${containsActions ? 'last:w-1' : ''
                        }`}
                      style={{
                        width: header.getSize(),
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-between">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `h-8 w-0.5 mr-2.5 bg-gray-500 cursor-col-resize select-none resizer touch-none ${header.column.getIsResizing()
                                ? ' bg-black opacity-100'
                                : ''
                              }`,
                          }}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-sm">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={`border-y border-primaryHover ${row.getIsSelected()
                      ? 'bg-primarySelect'
                      : allowHover
                        ? 'hover:bg-primaryHover'
                        : ''
                    } ${allowHover ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className=" first:pl-4">
                      <span className="flex items-center">
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
          </table>
        </ScrollArea>
      </div>
    );
  }
);

export default withTranslation()(OrderImportTable);

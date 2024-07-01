import { useEffect, useState } from 'react';
import {
  useReactTable,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  ColumnResizeMode,
} from '@tanstack/react-table';

import Error from './Error';
import ScrollArea from '../../ui/ScrollArea';
import TableFooter from './TableFooter';
import EmptySvg from '../../assets/empty.svg';
import LoadingSvg from '../../assets/loading.gif';
import './ResizeColumn.css';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import FooterCell from './FooterCell';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

interface Props<T extends { idx: string }> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading: boolean;
  isError: boolean;
  setPageDetail?: any;
  setCardData?: any;
  pageChangeHandler?: (selected: number) => void;
  className?: string;
  totalEntries: number | undefined;
  allowHover?: boolean;
  showFooter?: boolean;
  modal?: boolean;
  allowRowAddition?: boolean;
  containsCheckbox?: boolean;
  containsActions?: boolean;
  pageSize?: number;
  page?: number;
  selectedLength?: number;
  handleRowClick?: (data: any) => void;
  t: TFunction;
  clearSelection?: boolean;
  setClearSelection?: (data: boolean) => void;
  isAddClicked?: boolean;
  setIsAddClicked?: (data: boolean) => void;
}

const Table = <T extends { idx: string }>({
  data,
  columns,
  isLoading = false,
  isError = false,
  totalEntries,
  setPageDetail,
  setCardData,
  className = '',
  allowHover = false,
  allowRowAddition = false,
  handleRowClick,
  selectedLength,
  containsCheckbox = false,
  containsActions = false,
  pageSize = 7,
  page = 1,
  t,
  modal,
  clearSelection = false,
  setClearSelection,
  isAddClicked,
  setIsAddClicked,
}: Props<T>) => {
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>('onChange');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [originalData, setOriginalData] = useState(() => [...data]);
  const [tableData, setTableData] = useState(() => [...data]);

  useEffect(() => {
    setOriginalData(data);
    setTableData(data);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    columnResizeMode,
    enableSorting: !isError,
    state: { sorting, rowSelection },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      clearSelection,
      rowSelection,
      setRowSelection,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setTableData(old =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData(old =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setTableData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow = {
          delivery_time: '',
          order_body: '',
          internal_code: '',
          item_standard: '',
          desired_unit_code: '',
          unit_code: '',
          unit_code_amount: '',
          item_tax_classification: '',
          item_registration: '',
          change_classification: '',
          delivery_carrier_name: '',
          delivery_location_code: '',
          jan_code_2: '',
          ordering_comments: '',
          temperature_range: '',
          receipt_date: '',
          voucher_control_number: '',
          shipping_code: '',
          payment_agency: '',
          payment_category: '',
          price_quote_number: '',
          quote_request_number: '',
          original_voucher_number: '',
          quotation_number: '',
          order_number_secondary: '',
          place_name_delivery: '',
          site: '',
          subject: '',
          total_product_body: '',
          total_item_consumption_tax: '',
          total_shipping_fees: '',
          total_shipping_consumption_tax: '',
          total_other_total: '',
          expected_shipping_date: '',
          shipment_date: '',
          delivery_location: '',
          order_number: '',
          order_date: '',
          company_employee_name: '',
          company_name: '',
          company_unit_code: '',
          customer_name: '',
          employee_name_at_customer: '',
          food_category_2: '',
          food_category_code: '',
          invoice_view_number: '',
          my_catalog_id: '',
          quantity_unit_code: '',
          subtotal: '',
          tax_classification: '',
          transaction_id: '',
          transaction_status: '',
          transaction_status_id: '',
          unit_code_char: '',
          voucher_id: '',
          consumption_tax_subtotal: '',
          idx: '',
          created_at: '',
          created_date: '',
          updated_at: '',
          updated_at_manual: '',
          deleted_at: '',
          is_deleted: false,
          meta: '',
          invoice_date: '',
          invoice_number: '',
          customer_code: '',
          internal_item_id: '',
          food_category_1: '',
          food_category_3: '',
          item_name: '',
          package_qty: 0,
          package_qty_code: '',
          package_qty_unit: '',
          desired_unit_price: 0,
          desired_quantity: 0,
          requested_amount: 0,
          unit_price: 0,
          quantity: 0,
          amount: 0,
          total: 0,
          delivery_date: '',
          transmission_date: '',
          order_sent: '',
          update_date: '',
          sort_key: 0,
          batch_summary_code: '',
        };
        const setFunc = (old: any[]) => [newRow, ...old];
        setTableData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: any[]) =>
          old.filter((_row: any, index: number) => index !== rowIndex);
        setTableData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  useEffect(() => {
    const selectedData = table
      .getSelectedRowModel()
      .flatRows.map(row => row.original);
    setCardData && setCardData(selectedData);
  }, [table.getSelectedRowModel().flatRows]);

  useEffect(() => {
    if (clearSelection) {
      table.resetRowSelection();
      setClearSelection && setClearSelection(false);
    }
  }, [clearSelection]);

  useEffect(() => {
    if (tableData.length > data.length) {
      setIsAddClicked && setIsAddClicked(true);
    } else {
      setIsAddClicked && setIsAddClicked(false);
    }
  }, [tableData, data]);

  useEffect(() => {
    if (!isAddClicked) {
      setTableData(data);
    }
  }, [isAddClicked]);

  return (
    <div>
      {!isLoading && !isError && totalEntries ? (
        <>
          <TableFooter
            totalEntries={totalEntries}
            setPageDetail={setPageDetail}
            page={page}
            selectedLength={selectedLength}
            pageSize={pageSize}
          />
        </>
      ) : null}

      <ScrollArea
        className={`rounded border h-[500px] border-primarySelect overflow-auto  mt-4 ${className}`}
      >
        <table className="w-full border-collapse table-fixed">
          <thead className="sticky top-0 z-10 bg-primarySelect text-sm bg-secondary text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
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
                        {header.id !== 'edit' && (
                          <div className="flex items-center">
                            {sorting?.[0]?.desc === true ? (
                              <BsArrowDown />
                            ) : sorting?.[0]?.desc === false ? (
                              <BsArrowUp />
                            ) : (
                              <div className="flex items-center">
                                <BsArrowUp className="mr-[-6px]" />
                                <BsArrowDown />
                              </div>
                            )}
                          </div>
                        )}

                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `h-8 w-0.5 mr-2.5 bg-gray-500 cursor-col-resize select-none resizer touch-none ${header.column.getIsResizing()
                                ? ' bg-black opacity-100'
                                : ''
                              }`,
                            style: {
                              transform:
                                columnResizeMode === 'onEnd' &&
                                  header.column.getIsResizing()
                                  ? `translateX(${table.getState().columnSizingInfo
                                    .deltaOffset
                                  }px)`
                                  : '',
                            },
                          }}
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {isLoading || isError || totalEntries === 0 ? null : (
            <tbody className="text-sm">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={`border-y border-primaryHover ${row.getIsSelected()
                      ? 'bg-primaryHover'
                      : allowHover
                        ? 'hover:bg-primaryHover'
                        : ''
                    } ${allowHover ? 'cursor-pointer' : 'cursor-default'}`}
                  onClick={() => handleRowClick && handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className=" h-7 first:pl-4">
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
        {isLoading ? (
          <img
            src={LoadingSvg}
            className="mx-auto mt-16 h-16"
            alt="Loading Spinner"
          />
        ) : isError ? (
          <Error />
        ) : totalEntries === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 ">
            <img src={EmptySvg} alt="Empty" className="h-80 " />
            <span className="font-medium">
              {t('noDataAvailableForThisTable')}
            </span>
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );
};

export default withTranslation()(Table);

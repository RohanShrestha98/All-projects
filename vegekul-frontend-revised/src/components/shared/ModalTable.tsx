/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import ScrollArea from '../../ui/ScrollArea';
import LoadingSvg from '../../assets/loading.gif';
import EmptySvg from '../../assets/empty.svg';
import Error from './Error';

import { t } from 'i18next';

export default function ModalTable({ totalEntries, isError, isLoading, active, setActive, setCardData, mode, data, columns, columnResizeMode, }) {
    const [tableData, setTableData] = useState(() => [...data]);
    const [addTableData, setAddTableData] = useState(() => []);

    const table = useReactTable({
        data: !mode && active === "update" ? tableData : !mode && active === "add" ? addTableData : mode && active === "add" && addTableData,
        columns,
        columnResizeMode,
        enableSorting: !isError,
        enableRowSelection: true,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: {
            updateData: (rowIndex, columnId, value) => {
                setTableData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            }
                        }
                        return row
                    })
                )
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
                    transaction_id: '0',
                    transaction_status: '0',
                    transaction_status_id: '0',
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
                    invoice_date: '0',
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
                    batch_summary_code: '0',
                };
                const setFunc = () => [newRow];
                setAddTableData(setFunc);
            },
        },
    });
    useEffect(() => {
        setCardData(tableData)
        if (mode) {
            setActive("add")
        }

    }, [tableData, mode])




    const handleCellBlur = (rowId, columnId, newValue) => {
        const rowIndex = tableData.findIndex((row) => row.id === rowId);
        if (rowIndex) {
            setTableData((prevData) =>
                prevData?.map((row, index) => {
                    return index !== rowIndex
                        ? {
                            ...row,
                            [columnId]: newValue,
                        }
                        : row
                }
                )
            );
        }
    };
    const meta = table.options.meta;

    useEffect(() => {
        if (active === "add") {
            meta?.addRow()
        }
    }, [active])


    return (
        <div>
            {
                !mode && <div className='flex items-center justify-end '>
                    <p onClick={() => setActive("update")} className={`font-semibold inline-block cursor-pointer px-4 py-2 ${active === "update" ? "bg-[#0a438f] text-white" : "border-b-4 border-[#0a438f]  mt-[-2px]"}`}> {t('updateRow')}</p>
                    <p onClick={() => {
                        setActive("add")
                        meta?.addRow()
                    }

                    } className={`font-semibold inline-block cursor-pointer px-4 py-2 ${active === "add" ? "bg-[#0a438f] text-white" : "border-b-4 border-[#0a438f] mt-[-2px]"}`}>
                        {t('addRow')}
                    </p>
                </div>

            }

            <ScrollArea
                className={`rounded border h-[200px] border-primarySelect overflow-auto  mt-4`}
            >
                <table className="w-full border-collapse table-fixed">
                    <thead className="sticky top-0 z-10 bg-primarySelect text-sm bg-secondary text-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    index !== 0 ?
                                        <th
                                            key={header.id}
                                            className={`group text-start font-semibold first:pl-4 last:pr-4 ${header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : ''
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
                                        </th> : null
                                ))}
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
                                        : 'hover:bg-primaryHover'
                                        } ${'cursor-default'}`}
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        index !== 0 ?
                                            <td key={cell.id} className="h-7 first:pl-4">
                                                <span
                                                    className="flex items-center whitespace-nowrap w-full"
                                                    contentEditable
                                                    onBlur={(e) => handleCellBlur(row.id, cell.column.id, e.target.innerText)}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </span>
                                            </td> : null
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
}

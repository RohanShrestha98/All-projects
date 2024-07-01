import { createRef, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import ImportOrderDataTable from '../../components/table/ImportOrderTableNew';
import CSVUploader from '../../utils/csvReader';
import { useOrderMutation } from '../../hooks/Usemutatedata';
import {
  MorikiTableHeaderApiList,
  SmileTableHeaderApiList,
} from '../../components/table/OrderTableImport';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useApp } from '../../context/AppContext';

import { convertDateFormat, isEmptyObject } from '../../utils/string';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import moment from 'moment';

import {
  useReactTable,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import { SummaryCodeModal } from './SummaryCodeModal';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const commonValidationRules: { [key: string]: any } = {
  // unit_price: {
  //   validator: numberValidator,
  // },
  // delivery_date: {
  //   validator: dateStringValidator,
  // },
  // quantity: {
  //   validator: numberValidator,
  // },
};

const smileValidationRules: { [key: string]: any } = {
  // amount: {
  //   validator: numberValidator,
  // },
  // unit_of_measure: {
  //   validator: stringValidator,
  // },
  // ...commonValidationRules,
};

const morikiValidationRules: { [key: string]: any } = {
  // transaction_status_code: {
  //   validator: numberValidator,
  // },
  // amount_of_money: {
  //   validator: numberValidator,
  // },
  // quantity_unit_code: {
  //   validator: stringValidator,
  // },
  // ...commonValidationRules,
};

const morikiCellValidators: { [key: string]: any } = {
  //   // transaction_status_code: {
  //   //   cell: numberHeaderValidator,
  //   // },
  //   // amount_of_money: {
  //   //   cell: numberHeaderValidator,
  //   // },
  //   // unit_price: {
  //   //   cell: numberHeaderValidator,
  //   // },
  //   // quantity_unit_code: {
  //   //   cell: stringHeaderValidator,
  //   // },
  //   // delivery_date: {
  //   //   cell: dateHeaderValidator,
  //   // },
  //   // quantity: {
  //   //   cell: numberHeaderValidator,
  //   // },
};
const smileCellValidators = {
  //   amount: {
  //     cell: numberHeaderValidator,
  //   },
  //   unit_price: {
  //     cell: numberHeaderValidator,
  //   },
  //   unit_of_measure: {
  //     cell: stringHeaderValidator,
  //   },
  //   delivery_date: {
  //     cell: dateHeaderValidator,
  //   },
  //   quantity: {
  //     cell: numberHeaderValidator,
};

const removeAllEmptyValues = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (newObj[key] && typeof newObj[key] === 'object') {
      removeAllEmptyValues
        ? (newObj[key] = removeAllEmptyValues(newObj[key]))
        : newObj[key];
    } else if (
      newObj[key] === undefined ||
      newObj[key] === null ||
      newObj[key] === ''
    ) {
      delete newObj[key];
    }
  });
  return newObj;
};

const columnHelper = createColumnHelper<any>();

function ImportOrderData({ t }: { t: TFunction }) {
  const [tableData, setTableData] = useState<{
    headers: any;
    data: any;
  }>({
    headers: [],
    data: [],
  });
  const [errors, setErrors] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState();
  const [errorRows, setErrorRows] = useState<any>({});
  const exportRef = createRef<{
    handleExport: () => () => any;
  }>();
  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);
  const [summaryCode, setSummaryCode] = useState<string>('');

  const { isLoading, setIsLoading } = useApp();

  const orderMutate = useOrderMutation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: tableData.data,
    columns: tableData.headers,
    columnResizeMode: 'onChange',

    state: { sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const navigate = useNavigate();

  const handleRegistrationClick = (e: any, summaryCode: string) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmptyObject(errorRows)) {
      toast.error(t('pleaseImportValidFile'));
      setIsLoading(false);
      return;
    }

    const exportedData: any = tableData.data;

    if (exportedData) {
      const csvData = exportedData?.map((eachData: any) => {
        try {
          const date = moment(eachData.delivery_date);
          if (date.isValid()) {
            eachData.delivery_date = date.format('YYYY-MM-DD');
          }
        } catch (error) { }
        eachData.invoice_date = convertDateFormat(eachData.invoice_date);
        eachData.package_qty_unit = eachData.unit_code_amount;

        delete eachData.id;

        return removeAllEmptyValues(eachData);
      });

      const finalData = {
        order_data: csvData,
        batch_summary_code: summaryCode,
      };

      orderMutate
        .mutateAsync(['post', 'bulk/', finalData])
        .then(response => {
          // if (response?.errors?.length > 0) {
          //   toast.error(t('pleaseUploadValidFile'));
          // } else {
          toast.success(t('orderDataUploadedSuccessfully'));
          navigate('/list-inquiry');
          setOpenSummaryDialog(false);
          // }
        })
        .catch((err: AxiosError) => {
          const errData: any = err?.response?.data;

          errData &&
            Object.keys(errData).forEach(eachErr => {
              eachErr && toast.error(t('batchSummaryCodeIsInvalid'));
            });
        });
    }
    setIsLoading(false);
  };

  const handleFileUpload = (data: any) => {
    // convert data into json form
    const firstEntry = data.data[0];
    const lastEntry = data.data[data.data.length - 1];
    if (
      firstEntry[0] === '' ||
      firstEntry[1] === '' ||
      firstEntry[2] === '' ||
      firstEntry[3] === ''
    )
      data.data.shift();
    if (
      lastEntry[0] === '' ||
      lastEntry[1] === '' ||
      lastEntry[2] === '' ||
      lastEntry[3] === ''
    )
      data.data.pop();

    const headers: string[] = data.data[0];
    const headerIndex = 1;
    if (headers) {
      // check if the csv is from moriki or smile
      if (headers.length < 20) {
        // data is from smile
        setTableDataFromCSV(
          data.data.slice(headerIndex - 1),
          headers,
          SmileTableHeaderApiList,
          smileValidationRules,
          smileCellValidators
        );
      } else {
        // data is from moriki
        setTableDataFromCSV(
          data.data.slice(headerIndex - 1),
          headers,
          MorikiTableHeaderApiList,
          morikiValidationRules,
          morikiCellValidators
        );
      }
    } else {
    }
  };

  const setTableDataFromCSV = (
    data: any,
    csvHeaders: string[],
    TableHeaderApiList: string[],
    validationRules: { [key: string]: any },
    cellValidators: { [key: string]: any }
  ) => {
    // remove square brackets from headers

    const tanstackHeaders: ColumnDef<any, any>[] = [];
    const validationErrors: string | any[] = [];

    // processing columns
    csvHeaders.map((header: string, index: number) => {
      const fieldName = TableHeaderApiList[index];
      let tempHeaderTanstack = {
        header: header.trim().replace('［', '').replace('］', ''),
        enableResizing: true,
        size: 200,
        minSize: 200,
      };

      // adding extra properties for the columns if any
      if (cellValidators[TableHeaderApiList[index]]) {
        const extraHeaders = cellValidators[TableHeaderApiList[index]];
        extraHeaders &&
          (tempHeaderTanstack = { ...tempHeaderTanstack, ...extraHeaders });
        tempHeaderTanstack = {
          ...tempHeaderTanstack,
        };
      }

      // for tanstack table
      tanstackHeaders.push(
        columnHelper.accessor(fieldName, tempHeaderTanstack)
      );

      return header.trim().replace('［', '').replace('］', '');
    });

    let previousRow: any[] = [];
    // processing rows
    const jsonData = data?.slice(1).map((row: any[], rowIndex: number) => {
      const rowNumber = rowIndex + 1;
      // console.log('row', row.splice(12, 0, row?.[7]));
      // row.splice(12, 0, row?.[7]);

      // copying the previous row values if the transaction id is same from 37th index
      if (previousRow.length) {
        if (row[0] === previousRow[0]) {
          row.splice(37, 39, ...previousRow.slice(37));
        } else {
          previousRow = row;
        }
      } else {
        previousRow = row;
      }
      const rowObj = row.reduce((obj, value, index) => {
        const key = TableHeaderApiList[index];
        obj[key] = value;

        const rule = validationRules[key];
        if (rule) {
          const { validator } = rule;

          if (validator) {
            const validatorMessage = validator(value);
            if (validatorMessage) {
              const columnName = tanstackHeaders[index].header; // abc {abc: ''}
              validationErrors.push({
                row: rowNumber,
                column: columnName,
                error: validatorMessage,
              });
            }
          }
        }

        return obj;
      }, {});
      rowObj.id = rowNumber;
      return rowObj;
    });
    // jsonData.pop();
    setErrorRows(validationErrors);
    setTableData({
      headers: tanstackHeaders,
      data: jsonData,
    });
  };

  useEffect(() => {
    const idsToFilter = selectedRows;
    const deletingRows = tableData.data.filter(row =>
      idsToFilter.includes(row.id)
    );
    setSelectedRowData(deletingRows);
  }, [selectedRows]);

  const handleBulkDelete = (id: any) => {
    setIsLoading(true);
    const deletedItems = (deleteList, ids) =>
      deleteList.filter(item => !ids.includes(item.id));
    const result = deletedItems(tableData.data, id);
    table.resetRowSelection();
    toast.success('Deleted Successfully');
    setTableData({
      headers: tableData.headers,
      data: result,
    });
    setIsLoading(false);
  };

  return (
    <>
      <div className="rightSidePart">
        <Navbar pagetitle={t('orderDataImportHeading')} />
        <div className="dashboard_content_area">
          <CSVUploader source="moriki" handleFileUpload={handleFileUpload} />
          {errors.length > 0 && (
            <div className=" bg-red-200 justify-between items-center mt-5 max-h-60 overflow-y-scroll">
              <p className="text-bold">
                {t('errors')} ({errors.length}) {t('items')}
              </p>
              {errors.map((eachErr: any, index: number) => (
                <div key={index} className="flex flex-col border-b-4">
                  <p>
                    {t('row')}: {eachErr?.row}
                  </p>
                  <p>
                    {t('orderNumber')}:{eachErr?.order_number}
                  </p>
                  <p>
                    Message:{' '}
                    {eachErr?.errors &&
                      Object.keys(eachErr.errors).map(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (key: string, messageIndex: number) => (
                          <span key={messageIndex}>
                            {t(key)}: {t(eachErr.errors[key])}
                          </span>
                        )
                      )}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!isEmptyObject(errorRows) && (
            <div className=" bg-red-200 justify-between items-center mt-5 max-h-60 overflow-y-scroll">
              <p className="text-bold">
                Errors ({Object.keys(errorRows).length})items
              </p>
              {Object.keys(errorRows).map((eachErr: any, index: number) => (
                <div key={index} className="flex flex-col border-b-4">
                  <p>
                    {t('row')}: {errorRows[eachErr]?.row}
                  </p>
                  <p>
                    {t('column')}: {errorRows[eachErr]?.column}
                  </p>
                  <p>
                    {t('message')}: {t(errorRows[eachErr]?.error)}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="flex -flex-row justify-between items-center mt-5">
            <p className="text-base text-textColor">
              {t('orderImportListDesc')} ({tableData?.data?.length | 0}{' '}
              {t('items')})
            </p>

            <div className="flex gap-2 flex-row justify-between items-center">
              <button
                onClick={() => {
                  setOpenSummaryDialog(true);
                }}
                disabled={isLoading || !tableData?.data?.length}
                className="button flex items-center justify-center gap-2"
              >
                <div>
                  <FiUpload size={16} />
                </div>
                {t('bulkRegistration')}
              </button>
              <button
                onClick={() => setTableData({ ...tableData, data: [] })}
                disabled={isLoading}
                className="button flex items-center justify-center gap-2"
              >
                <div>
                  <FiRefreshCcw size={16} />
                </div>
                {t('reset')}
              </button>
            </div>
          </div>
          {tableData?.data?.length === 0 ? (
            <div className="flex -flex-row justify-between items-center mt-5">
              <p>{t('noDataToDisplay')}</p>
            </div>
          ) : (
            // <ImportOrderTable
            //   setSelectedRows={setSelectedRows}
            //   tableData={tableData}
            //   setExportData={setExportData}
            //   ref={exportRef}
            // />
            <ImportOrderDataTable
              columns={tableData.headers}
              data={tableData?.data}
              ref={exportRef}
              setSelectedRowData={setSelectedRowData}
              table={table}
            />
          )}
        </div>
      </div>
      <SummaryCodeModal
        openSummaryDialog={openSummaryDialog}
        setOpenSummaryDialog={setOpenSummaryDialog}
        submitHandler={(e: any, summaryCode: string) =>
          handleRegistrationClick(e, summaryCode)
        }
        cancelHandler={() => setTableData({ ...tableData, data: [] })}
        isSubmitting={orderMutate?.isLoading}
      />
    </>
  );
}

export default withTranslation()(ImportOrderData);

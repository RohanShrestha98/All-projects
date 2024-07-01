import { createRef, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import Navbar from '../../components/navbar/Navbar';
import CSVUploader from '../../utils/csvReader';

import { useApp } from '../../context/AppContext';
import { useCustomerMasterMutation } from '../../hooks/UseCustomerMasterMutatedData';
import ImportOrderDataTable from '../../components/table/ImportOrderTableNew';
import { CustomerImportHeaders } from '../../components/table/headers/CustomerHeader';
import { isEmptyObject } from '../../utils/string';
import { removeAllEmptyValues } from '../../utils/file';
import IndeterminateCheckbox from '../../components/shared/IndeterminateCheckbox';
import { ICustomerMasterBulkRegistrationTableProps } from '../../components/table/BulkRegistrationTables/CustomerBulkRegistrationTable';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper<any>();

function CustomerBulkRegistration({ t }: { t: TFunction }) {
  const [tableData, setTableData] = useState<{
    headers: any;
    data: any;
  }>({
    headers: [],
    data: [],
  });
  const [errors, setErrors] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [errorRows, setErrorRows] = useState<any>({});
  const exportRef = createRef<{
    handleExport: () => () => any;
  }>();

  const { isLoading, setIsLoading } = useApp();

  const customerMutation = useCustomerMasterMutation();
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

  const handleRegistrationClick = () => {
    setIsLoading(true);

    if (!isEmptyObject(errorRows)) {
      toast.error(t('pleaseImportValidFile'));
      setIsLoading(false);
      return;
    }

    const exportedData: any = tableData.data;

    if (exportedData) {
      const finalData = exportedData?.map((eachData: any) => {
        delete eachData.id;

        return removeAllEmptyValues(eachData);
      });

      customerMutation
        .mutateAsync(['post', 'import/', finalData])
        .then(response => {
          toast.success(t('customerMasterDataUploadedSuccessfully'));
          navigate('/customer-master');
          if (response?.errors?.length > 0) {
            setErrors(response?.errors);
          }
        })
        .catch((err: AxiosError) => {
          const errData: any = err?.response?.data;

          errData &&
            Object.keys(errData).forEach(eachErr => {
              eachErr && toast.error(`${eachErr}: ${errData[eachErr][0]}`);
            });
        });
    }
    setIsLoading(false);
  };

  const handleFileUpload = (data: any) => {
    // convert data into json form
    const firstEntry = data.data[0];
    const lastEntry = data.data[data.data.length - 1];

    if (firstEntry[0] === '' || firstEntry[1] === '' || firstEntry[2] === '')
      data.data.shift();
    if (lastEntry[0] === '' || lastEntry[1] === '') data.data.pop();

    const headers: string[] = data.data[0];
    const headerIndex = 1;
    if (headers) {
      setTableDataFromCSV(
        data.data.slice(headerIndex - 1),
        headers,
        CustomerImportHeaders
      );
    } else {
    }
  };

  const setTableDataFromCSV = (
    data: any,
    csvHeaders: string[],
    TableHeaderApiList: string[]
  ) => {
    // remove square brackets from headers

    const tanstackHeaders: ColumnDef<any, any>[] = [];
    const validationErrors: string | any[] = [];

    // processing columns
    csvHeaders.map((header: string, index: number) => {
      const fieldName = TableHeaderApiList[index];
      const tempHeaderTanstack = {
        header: header.trim().replace('［', '').replace('］', ''),
        enableResizing: true,
        size: 200,
        minSize: 200,
      };

      // for tanstack table
      tanstackHeaders.push(
        columnHelper.accessor(fieldName, tempHeaderTanstack)
      );

      return header.trim().replace('［', '').replace('］', '');
    });

    // processing rows
    const jsonData = data?.slice(1).map((row: any[], rowIndex: number) => {
      const rowNumber = rowIndex + 1;
      const rowObj = row.reduce((obj, value, index) => {
        const key = TableHeaderApiList[index];
        obj[key] = value;

        return obj;
      }, {});
      rowObj.id = rowNumber;
      return rowObj;
    });
    // jsonData.pop();
    setErrorRows(validationErrors);
    setTableData({
      headers: [...tanstackHeaders],
      data: jsonData,
    });
  };

  useEffect(() => {
    const idsToFilter: string[] = selectedRows;
    const deletingRows = tableData.data.filter(
      (row: ICustomerMasterBulkRegistrationTableProps) => {
        return idsToFilter.includes(row.id);
      }
    );
    setSelectedRowData(deletingRows);
  }, [selectedRows]);

  const handleBulkDelete = (id: any) => {
    setIsLoading(true);
    const deletedItems = (
      deleteList: ICustomerMasterBulkRegistrationTableProps[],
      ids: string[]
    ) =>
      deleteList.filter(
        (item: ICustomerMasterBulkRegistrationTableProps) =>
          !ids.includes(item.id)
      );
    const result = deletedItems(tableData.data, id);
    table.resetRowSelection();

    setTableData({
      headers: tableData.headers,
      data: result,
    });

    setIsLoading(false);
  };
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('customerBulkRegistration')} />
      <div className="dashboard_content_area">
        <CSVUploader source="moriki" handleFileUpload={handleFileUpload} />
        {/* {errors.length > 0 && (
          <div className=" bg-red-200 justify-between items-center mt-5 max-h-60 overflow-y-scroll">
            <p className="text-bold">Errors ({errors.length})items</p>
            {errors.map((eachErr: any, index: number) => (
              <div key={index} className="flex flex-col border-b-4">
                <p>Row: {eachErr?.row}</p>
                <p>
                  Message:{' '}
                  {eachErr?.errors &&
                    Object.values(eachErr.errors).map(
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      (
                        eachMessage: string | string[],
                        messageIndex: number
                      ) => <span key={messageIndex}>{eachMessage}</span>
                    )}
                </p>
              </div>
            ))}
          </div>
        )} */}
        <div className="flex -flex-row justify-between items-center mt-5">
          <p className="text-base text-textColor">
            {t('orderImportListDesc')} ({tableData?.data?.length | 0}
            {t('items')})
          </p>

          <div className="flex -flex-row justify-between items-center">
            <button
              onClick={handleRegistrationClick}
              disabled={isLoading}
              className="button flex items-center justify-center gap-2"
            >
              <div>
                <FiUpload size={16} />
              </div>
              {t('bulkRegistration')}
            </button>
            {/* <button
              className="button"
              onClick={() =>
                !isLoading &&
                handleBulkDelete(selectedRowData?.map((item: any) => item.id))
              }
              disabled={isLoading}
            >
              {t('bulkDelete')}
            </button> */}
          </div>
        </div>
        {tableData.data.length === 0 ? (
          <div className="flex -flex-row justify-between items-center mt-5">
            <p>{t('noDataToDisplay')}</p>
          </div>
        ) : (
          <ImportOrderDataTable
            table={table}
            columns={tableData.headers}
            data={tableData.data}
            setSelectedRowData={setSelectedRowData}
          />
        )}
      </div>
    </div>
  );
}

export default withTranslation()(CustomerBulkRegistration);

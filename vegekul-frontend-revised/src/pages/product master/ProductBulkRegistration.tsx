import { createRef, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import ImportOrderDataTable from '../../components/table/ImportOrderTableNew';
import CSVUploader from '../../utils/csvReader';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useApp } from '../../context/AppContext';
import { isEmptyObject } from '../../utils/string';

import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import IndeterminateCheckbox from '../../components/shared/IndeterminateCheckbox';
import { useItemOpsMutation } from '../../hooks/UseItemMutatedData';
import { ItemImportHeader } from '../../components/table/headers/ItemHeader';
import { removeAllEmptyValues } from '../../utils/file';
import { FiUpload } from 'react-icons/fi';
import { ProductCodeModal } from '../importorderdata/ProductCodeModal';
import { useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper<any>();

function ProductMasterBulkRegistration({ t }: { t: TFunction }) {
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

  const productMutation = useItemOpsMutation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const navigate = useNavigate();

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

  const handleRegistrationClick = (e: any, partnerCode: string) => {
    e.preventDefault();
    if (!isEmptyObject(errorRows)) {
      toast.error(t('pleaseImportValidFile'));
      return;
    }

    const exportedData: any = tableData.data;

    if (exportedData?.length) {
      const finalData = exportedData?.map((eachData: any) => {
        delete eachData.id;

        return removeAllEmptyValues(eachData);
      });
      const postData = {
        partner_code: partnerCode,
        product_data: finalData,
      };

      productMutation
        .mutateAsync(['post', 'import/', postData])
        .then(response => {
          toast.success(t('productDataUploadedSuccessfully'));
          navigate('/product-master');
          setOpenProductDialog(false);
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
  };

  const handleFileUpload = (data: any) => {
    // convert data into json form
    const firstEntry = data.data[0];
    const lastEntry = data.data[data.data.length - 1];
    if (firstEntry[0] === '' || firstEntry[1] === '' || firstEntry[2] === '')
      data.data.shift();
    if (lastEntry[0] === '' || lastEntry[1] === '' || lastEntry[2] === '')
      data.data.pop();

    const headers: string[] = data.data[0];
    const headerIndex = 1;
    if (headers) {
      setTableDataFromCSV(
        data.data.slice(headerIndex - 1),
        headers,
        ItemImportHeader
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
    const idsToFilter = selectedRows;
    const deletingRows = tableData.data.filter(row =>
      idsToFilter.includes(row.id)
    );
    setSelectedRowData(deletingRows);
  }, [selectedRows]);

  const handleBulkDelete = (id: any) => {
    const deletedItems = (deleteList, ids) =>
      deleteList.filter(item => !ids.includes(item.id));
    const result = deletedItems(tableData.data, id);
    table.resetRowSelection();

    setTableData({
      headers: tableData.headers,
      data: result,
    });
  };
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('productMasterBUlkRegister')} />
      <div className="dashboard_content_area">
        <CSVUploader source="moriki" handleFileUpload={handleFileUpload} />
        <div className="flex -flex-row justify-between items-center mt-5">
          <p className="text-base text-textColor">
            {t('orderImportListDesc')} ({tableData?.data?.length | 0}
            {t('items')})
          </p>

          <div className="flex -flex-row justify-between items-center">
            <button
              onClick={() => {
                setOpenProductDialog(true);
              }}
              disabled={productMutation?.isLoading}
              className={`button flex ${
                productMutation?.isLoading && 'opacity-50'
              } items-center justify-center gap-2`}
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
                handleBulkDelete(selectedRowData?.map(item => item.id))
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
          // <ImportOrderTable
          //   setSelectedRows={setSelectedRows}
          //   tableData={tableData}
          //   setExportData={setExportData}
          //   ref={exportRef}
          // />
          <ImportOrderDataTable
            table={table}
            columns={tableData.headers}
            data={tableData.data}
            ref={exportRef}
            setSelectedRowData={setSelectedRowData}
          />
        )}
      </div>
      <ProductCodeModal
        openProductDialog={openProductDialog}
        setOpenProductDialog={setOpenProductDialog}
        submitHandler={(e: any, partnerCode: string) =>
          handleRegistrationClick(e, partnerCode)
        }
        cancelHandler={() => setTableData({ ...tableData, data: [] })}
        isSubmitting={productMutation?.isLoading}
      />
    </div>
  );
}

export default withTranslation()(ProductMasterBulkRegistration);

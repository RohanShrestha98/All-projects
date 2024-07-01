import { createRef, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import CSVUploader from '../../utils/csvReader';
import {
  MorikiTableHeaderApiList,
  SmileCourseTableHeaderApiList,
} from '../../components/table/OrderTableImport';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useApp } from '../../context/AppContext';
import { useCourseMasterMutation } from '../../hooks/UseCourseMasterMutatedData';
import CourseMasterBulkRegistrationTable from '../../components/table/ProductMasterBulkRegistrationTable';
import { BiTrash } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface CourseTableHeader {
  id: number;
  field: string;
  headerName: string;
  headerNameEng?: any;
  headerNameJP?: string;
  width: number;
  editable: boolean;
}

function CourseBulkRegistration({ t }: { t: TFunction }) {
  const [tableData, setTableData] = useState<{
    headers: CourseTableHeader[];
    data: any[];
  }>({
    headers: [],
    data: [],
  });
  const [exportData, setExportData] = useState<any>([]);
  const [errors, setErrors] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState();
  const exportRef = createRef<{
    handleExport: () => () => any;
  }>();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useApp();

  const courseMutation = useCourseMasterMutation();

  const handleRegistrationClick = () => {
    setIsLoading(true);
    const exportedData: any = exportRef?.current?.handleExport();

    if (exportedData) {
      courseMutation
        .mutateAsync(['post', 'bulk/', exportedData])
        .then(response => {
          toast.success(t('courseDataUploadedSuccessfully'));
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

    // convert data into json form
    const headers: string[] = data.data[0];
    const headerIndex = 1;
    if (headers) {
      // check if the csv is from moriki or smile
      if (headers.length < 20) {
        // data is from smile
        setTableDataFromCSV(
          data.data.slice(headerIndex - 1),
          headers,
          SmileCourseTableHeaderApiList
        );
      } else {
        // data is from moriki
        setTableDataFromCSV(
          data.data.slice(headerIndex - 1),
          headers,
          MorikiTableHeaderApiList
        );
      }
    } else {
    }
  };

  const setTableDataFromCSV = (
    data: any,
    csvHeaders: string[],
    TableHeaderApiList: string[]
  ) => {
    // remove square brackets from headers
    const tableHeaders: CourseTableHeader[] = [];
    csvHeaders.map((header: string, index: number) => {
      tableHeaders.push({
        id: index + 1,
        field: TableHeaderApiList[index],
        headerName: header.trim().replace('［', '').replace('］', ''),
        headerNameJP: TableHeaderApiList[index].replaceAll('_', ' '),
        width: 150,
        editable: true,
      });
      return header.trim().replace('［', '').replace('］', '');
    });
    const jsonData = data?.slice(1).map((row: any[], index: number) => {
      const obj = row.reduce((obj, value, index) => {
        obj[TableHeaderApiList[index]] = value;

        return obj;
      }, {});
      obj.id = index + 1;

      return obj;
    });

    setTableData({
      headers: tableHeaders,
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
    setTableData({
      headers: tableData.headers,
      data: result,
    });
    setIsLoading(false);
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('courseBulkRegistration')} />
      <div className="dashboard_content_area">
        <CSVUploader source="moriki" handleFileUpload={handleFileUpload} />
        {errors.length > 0 && (
          <div className=" bg-red-200 justify-between items-center mt-5 max-h-60 overflow-y-scroll">
            <p className="text-bold">Errors ({errors.length})items</p>
            {errors.map((eachErr: any, index: number) => (
              <div key={index} className="flex flex-col border-b-4">
                <p>Row: {eachErr?.row}</p>
                <p>Order Number:{eachErr?.order_number}</p>
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
        )}
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
            <button
              type="submit"
              onClick={() =>
                !isLoading &&
                handleBulkDelete(selectedRowData?.map(item => item.id))
              }
              disabled={isLoading}
              className="button flex items-center justify-center gap-1"
            >
              <div>
                <BiTrash size={16} className="mt-[-2px]" />
              </div>
              {t('bulkDelete')}
            </button>
          </div>
        </div>
        {tableData.data.length === 0 ? (
          <div className="flex -flex-row justify-between items-center mt-5">
            <p>{t('noDataToDisplay')}</p>
          </div>
        ) : (
          <CourseMasterBulkRegistrationTable
            setSelectedRows={setSelectedRows}
            tableData={tableData}
            setExportData={setExportData}
            ref={exportRef}
          />
        )}
      </div>
    </div>
  );
}

export default withTranslation()(CourseBulkRegistration);

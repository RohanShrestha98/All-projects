import { useEffect, useMemo, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { CourseResponseType } from '../../types';
import { courseColumnHelper, coursemaster } from './headers/CourseHeader';
import CourseFormModel from '../../pages/coursemaster/CourseFormModel';
import '../../App.scss';
import './Table.scss';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { useAuth } from '../../context/Authcontext';
import AlertDialog from '../../ui/AlertDialog';
import { useApp } from '../../context/AppContext';

const columnHelper = createColumnHelper<CourseResponseType>();

interface Props {
  data: CourseResponseType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  handleDelete: (idx: string) => void;
  setPageDetail: (page: number, pageSize: number) => void;
  count: number | undefined;
  pageSize: number;
  page: number;
  selectedLength: number;
  setCardData: (data: any) => void;
  t: TFunction;
  clearSelection: boolean;
  setClearSelection: (value: boolean) => void;
}
const CourseMasterTable = ({
  data,
  isLoading = false,
  isError = false,
  handleDelete,
  setPageDetail,
  count,
  pageSize,
  page,
  setCardData,
  selectedLength,
  t,
  clearSelection,
  setClearSelection,
}: Props) => {
  const { roles } = useAuth();
  const { isPartnerDomain } = useApp();
  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,
        cell: ({ row }) => (
          <div className="flex items-center">
            <CourseFormModel
              isEdit={true}
              data={row.original}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
            >
              <BiEdit className="actionButton" />
            </CourseFormModel>
            <span
              onClick={e => e.stopPropagation()}
              className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
            >
              <AlertDialog
                clickHandler={() => handleDelete(row.original.idx)}
                btnText={''}
              >
                <span>
                  <BiTrash className="actionButton" />
                </span>
              </AlertDialog>
            </span>
          </div>
        ),
      }),
    ],
    [data]
  );

  const columns = useMemo(() => {
    if (roles.includes('Super Dashboard Admin')) {
      if (
        coursemaster.find((item: any) => item.accessorKey === 'partner_code')
      ) {
        return coursemaster;
      }
      coursemaster.splice(
        1,
        0,
        courseColumnHelper.accessor('partner_code', {
          minSize: 100,
          header: t('partnerCode'),
        })
      );
    }
    return coursemaster;
  }, [data?.length, roles.length]);

  const [tableRows, setTableRows] = useState<any>([]);
  useEffect(() => {
    const formatData = () => {
      if (data) {
        const finalData: any[] = data.map(
          (each: CourseResponseType, index: number) => {
            return {
              ...each,
              id: index + 1,
            };
          }
        );
        setTableRows(finalData);
      }
    };
    formatData();
  }, [data]);

  return (
    <Table
      data={data ?? []}
      columns={!isPartnerDomain ? columns.concat(columnsAction) : columns}
      isLoading={isLoading}
      selectedLength={selectedLength}
      isError={isError}
      totalEntries={count}
      allowHover
      showFooter
      containsActions
      containsCheckbox
      setPageDetail={setPageDetail}
      pageSize={pageSize}
      setCardData={setCardData}
      page={page}
      clearSelection={clearSelection}
      setClearSelection={setClearSelection}
    />
  );
};

export default withTranslation()(CourseMasterTable);

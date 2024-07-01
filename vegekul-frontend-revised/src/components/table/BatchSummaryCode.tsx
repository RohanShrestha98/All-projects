import { useMemo } from 'react';
import { withTranslation } from 'react-i18next';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { CourseResponseType } from '../../types';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import BatchSummaryFormModal from '../../pages/batchSummaryCodeMaster/batchSummaryFormModal';
import { BatchSummaryMasterResponseType } from '../../hooks/useBatchSummaryQueryData';
import { batchSummaryCodeHeader } from './headers/BatchSummaryCodeHeader';
import AlertDialog from '../../ui/AlertDialog';
import Tooltip from '../../ui/Tooltip';

const columnHelper = createColumnHelper<CourseResponseType>();

interface Props {
  data: BatchSummaryMasterResponseType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  handleDelete: (idx: string) => void;
  handleSuccess: () => void;
  setPageDetail: (page: number, pageSize: number) => void;
  count: number | undefined;
  pageSize: number;
  page: number;
  t: TFunction;
}
const BatchSummaryCodeTable = ({
  data,
  isLoading = false,
  isError = false,
  handleDelete,
  handleSuccess,
  setPageDetail,
  count,
  pageSize,
  page,
  t,
}: Props) => {
  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,
        cell: ({ row }) => (
          <div className=" flex items-center">
            <BatchSummaryFormModal
              isEdit={true}
              data={row.original}
              onSuccess={() => handleSuccess()}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
            >
              <BiEdit className="actionButton" />
            </BatchSummaryFormModal>
            <span
              onClick={e => e.stopPropagation()}
              className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
            >
              <AlertDialog
                clickHandler={() => handleDelete(row.original.idx)}
                btnText={''}
              >
                <Tooltip content="Delete" asChild>
                  <span>
                    <BiTrash className="actionButton" />
                  </span>
                </Tooltip>
              </AlertDialog>
            </span>
          </div>
        ),
      }),
    ],
    [data]
  );

  return (
    <Table
      data={data ?? []}
      columns={batchSummaryCodeHeader.concat(columnsAction)}
      isLoading={isLoading}
      isError={isError}
      totalEntries={count}
      allowHover
      showFooter
      containsActions
      containsCheckbox
      setPageDetail={setPageDetail}
      pageSize={pageSize}
      page={page}
    />
  );
};

export default withTranslation()(BatchSummaryCodeTable);

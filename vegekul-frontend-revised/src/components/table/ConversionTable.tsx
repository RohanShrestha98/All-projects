import { useMemo } from 'react';
import { withTranslation } from 'react-i18next';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { CourseResponseType } from '../../types';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import ConversionRatesFormModal from '../../pages/conversionRates/conversionRatesFormModal';
import { ConversionFactorResponseType } from '../../hooks/useConversionFactorQuery';
import { conversionFactorHeader } from './headers/ConversionTableHeader';

const columnHelper = createColumnHelper<CourseResponseType>();

interface Props {
  data: ConversionFactorResponseType[] | undefined;
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
const ConversionRatesTable = ({
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
          <div className="flex items-center">
            <ConversionRatesFormModal
              isEdit={true}
              data={row.original}
              onSuccess={() => handleSuccess()}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
            >
              <BiEdit className="actionButton" />
            </ConversionRatesFormModal>
            <div
              className="deleteButton"
              onClick={() => handleDelete(row.original.idx)}
            >
              <BiTrash className="actionButton" />
            </div>
          </div>
        ),
      }),
    ],
    [data]
  );

  return (
    <Table
      data={data ?? []}
      columns={conversionFactorHeader.concat(columnsAction)}
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

export default withTranslation()(ConversionRatesTable);

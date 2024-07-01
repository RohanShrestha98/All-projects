import { useMemo } from 'react';
import '../../App.scss';
import './Table.scss';
import { withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteSvg, EditSvg } from '../../icons/Allsvgs';
import Tooltip from '../../ui/Tooltip';

import { QuantityUnitResponseType } from '../../types';
import { quantityUnitHeaders, usermaster } from './Tableheader';
import { toast } from 'react-hot-toast';
import AlertDialog from '../../ui/AlertDialog';
import { useAuth } from '../../context/Authcontext';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useQuantityUnitMasterMutation } from '../../hooks/useQuantityUnitMutation';
import QuantityUnitFormModal from '../../pages/quantityUnitMaster/QuantityUnitFormModal';

const columnHelper = createColumnHelper<QuantityUnitResponseType>();

function QuantityUnitMasterTable({
  data,
  isLoading,
  isError,
  refetch,
  setPageDetail,
  page,
  pageSize,
  count,
  t,
}: any) {
  const { roles } = useAuth();
  const quantityUnitMutation = useQuantityUnitMasterMutation();

  const { isPartnerDomain } = useApp();

  const handleDelete = (idx: string) => {
    quantityUnitMutation.mutateAsync(['delete', `${idx}/`], {
      onSuccess: () => toast.success(t('quantityUnitDeletedSuccessfully')),
      onError: () => toast.error(t('errorDeletingQuantityUnit')),
    });
  };

  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <QuantityUnitFormModal
              isEdit={true}
              data={row.original}
              onSuccess={() => refetch()}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
            >
              <Tooltip content="Edit" asChild>
                <span>
                  <EditSvg className="h-6" />
                </span>
              </Tooltip>
            </QuantityUnitFormModal>
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
                    <DeleteSvg className="h-6" />
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

  const columns = useMemo(() => {
    return quantityUnitHeaders;
  }, [data?.length]);

  return (
    <Table
      data={data || []}
      columns={columns.concat(columnsAction)}
      isLoading={isLoading}
      isError={isError}
      totalEntries={count}
      allowHover
      showFooter
      containsActions
      containsCheckbox
      setPageDetail={setPageDetail}
      pageSize={pageSize}
      setCardData={() => null}
      page={page}
    />
  );
}

export default withTranslation()(QuantityUnitMasterTable);

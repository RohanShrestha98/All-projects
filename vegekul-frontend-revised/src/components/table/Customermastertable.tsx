import { useMemo } from 'react';
import { withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteSvg, EditSvg } from '../../icons/Allsvgs';
import Tooltip from '../../ui/Tooltip';
import { useItemOpsMutation } from '../../hooks/UseItemMutatedData';
import { toast } from 'react-hot-toast';
import AlertDialog from '../../ui/AlertDialog';
import CustomerMasterFormModel from '../../pages/customermaster/CustomerMasterFormModel';
import { CustomerMasterColumns } from './headers/CustomerHeader';
import { CustomerMasterResponseType } from '../../hooks/UseCustomerMasterQueryData';
import { useApp } from '../../context/AppContext';

const columnHelper = createColumnHelper<CustomerMasterResponseType>();

function CustomerMasterTable({
  data,
  isLoading,
  isError,
  setPageDetail,
  page,
  pageSize,
  count,
  t,
}: any) {
  const itemMutation = useItemOpsMutation();
  const { isPartnerDomain } = useApp();
  const handleDelete = (idx: string) => {
    itemMutation.mutateAsync(['delete', `${idx}/`], {
      onSuccess: () => toast.success(`${t('customerDeletedSuccessfully')}`),
      onError: () => toast.error(`${t('errorDeletingUser')}`),
    });
  };

  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,

        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <CustomerMasterFormModel
              isEdit={true}
              data={row.original}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
              error={undefined}
            >
              <Tooltip content="Edit" asChild>
                <span>
                  <EditSvg className="h-6" />
                </span>
              </Tooltip>
            </CustomerMasterFormModel>
            <span
              onClick={e => e.stopPropagation()}
              className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
            >
              <AlertDialog
                btnText="Yes, delete data"
                clickHandler={() => handleDelete(row.original.idx)}
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
    if (isPartnerDomain) {
      return CustomerMasterColumns.filter(
        item => item.accessorKey !== 'partner_code'
      );
    }

    return CustomerMasterColumns;
  }, [data, isPartnerDomain]);

  return (
    <Table
      data={data || []}
      columns={columns}
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

export default withTranslation()(CustomerMasterTable);

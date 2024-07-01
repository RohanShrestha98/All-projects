import { useMemo } from 'react';
import '../../App.scss';
import './Table.scss';
import { withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteSvg, EditSvg } from '../../icons/Allsvgs';
import Tooltip from '../../ui/Tooltip';
import UserFormModal from '../../pages/usermaster/Userformmodal';
import { UserResponseType } from '../../types';
import { usermaster } from './Tableheader';
import { useUserOpsMutation } from '../../hooks/UseUserMutated';
import { toast } from 'react-hot-toast';
import AlertDialog from '../../ui/AlertDialog';
import { useAuth } from '../../context/Authcontext';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BiEdit, BiTrash } from 'react-icons/bi';

const columnHelper = createColumnHelper<UserResponseType>();

function UserMasterTable({
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
  const userMutation = useUserOpsMutation();

  const { isPartnerDomain } = useApp();

  const handleDelete = (idx: string) => {
    userMutation.mutateAsync(
      [
        'delete',
        isPartnerDomain ? `business-partner-user/${idx}/` : `user/${idx}/`,
      ],
      {
        onSuccess: () => toast.success(t('userDeletedSuccessfully')),
        onError: () => toast.error(t('errorDeletingUser')),
      }
    );
  };

  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,
        cell: ({ row }) => (
          <div className="flex items-center ">
            <UserFormModal
              isEdit={true}
              data={row.original}
              onSuccess={() => refetch()}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
            >
              <span>
                <BiEdit className="actionButton" />
              </span>
            </UserFormModal>
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
      if (usermaster.find((item: any) => item.accessorKey === 'partner_code')) {
        return usermaster;
      }
      usermaster.splice(
        5,
        0,
        columnHelper.accessor('partner_code', {
          minSize: 100,
          header: t('partners'),
          cell: ({ row }) => {
            return (
              <Link
                to={`/partner-master?user=${row.original.idx}`}
                className="text-xs text-white border bg-blue-500 px-3 py-[2px] rounded-full"
              >
                {t('partnerList')}
              </Link>
            );
          },
        })
      );
    }
    return usermaster;
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

export default withTranslation()(UserMasterTable);

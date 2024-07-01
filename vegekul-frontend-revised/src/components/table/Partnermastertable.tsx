import { useMemo } from 'react';
import { withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteSvg, EditSvg } from '../../icons/Allsvgs';
import Tooltip from '../../ui/Tooltip';
import PartnerFormModal from '../../pages/partnermaster/PartnerMasterFormModel';
import AlertDialog from '../../ui/AlertDialog';
import { partnerHeaders } from './headers/PartnerHeader';
import UserAssignPartnerModal from '../../pages/partnermaster/UserAssignPartnerModal';
import { BusinessPartnerResponseType } from '../../hooks/UseBusinessPartnerQueryData';
import { BiEdit, BiTrash } from 'react-icons/bi';

const columnHelper = createColumnHelper<BusinessPartnerResponseType>();

function PartnerMasterTable({
  data,
  isLoading,
  isError,
  handleDelete,
  setPageDetail,
  pageDetail,
  count,
  user,
  t,
}: any) {
  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header:  () => <>{t('actions')}</>,
        cell: ({ row }) => (
          <div className="flex items-center ">
            {user ? (
              <UserAssignPartnerModal
                isEdit={true}
                data={row?.original}
                triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
              >
                <BiEdit className="actionButton" />
              </UserAssignPartnerModal>
            ) : (
              <PartnerFormModal
                isEdit={true}
                data={row.original}
                triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
              >
                <BiEdit className="actionButton" />
              </PartnerFormModal>
            )}
            <span
              onClick={e => e.stopPropagation()}
              className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
            >
              <AlertDialog clickHandler={() => handleDelete(row.original.idx)}>
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
  const columns = useMemo(() => partnerHeaders, [data]);

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
      pageSize={pageDetail?.pageSize}
      setCardData={() => null}
      page={pageDetail?.page}
    />
  );
}

export default withTranslation()(PartnerMasterTable);

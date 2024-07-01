import { useMemo, useState } from 'react';
import { Translation, withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteSvg } from '../../icons/Allsvgs';
import Tooltip from '../../ui/Tooltip';

import { useItemOpsMutation } from '../../hooks/UseItemMutatedData';
import { toast } from 'react-hot-toast';
import AlertDialog from '../../ui/AlertDialog';
import {
  MorikiItemHeaderType,
  morikiItemHeaders,
} from './headers/MorikiItemHeader';
import { AxiosError } from 'axios';
import { useProductMasterMutation } from '../../hooks/UseProductMasterMutation';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import { useApp } from '../../context/AppContext';

import { TableCell } from './MorikiListInquiry/TableCell';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

const columnHelper = createColumnHelper<MorikiItemHeaderType>();

function ProductMasterTable({
  data,
  isLoading,
  isError,
  setPageDetail,
  page,
  pageSize,
  count,
  t,
}: any) {
  const { roles } = useAuth();

  const { isPartnerDomain } = useApp();
  const itemMutation = useItemOpsMutation();

  const [selectedData, setSelectedData] = useState([]);
  const [clearSelection, setClearSelection] = useState<any>(false);

  const handleDelete = (idx: string) => {
    itemMutation.mutateAsync(['delete', `${idx}/`], {
      onSuccess: () => toast.success(`${t('productDeletedSuccessfully')}`),
      onError: () => toast.error(`${t('errorDeletingProduct')}`),
    });
  };

  const productMasterUpdateMutation = useProductMasterMutation();

  const handleResetTable = () => {
    productMasterUpdateMutation
      .mutateAsync(['delete', 'bulk-reset/'])
      .then(() => {
        toast.success(t('tableResetSuccessfully'));
      })
      .catch(() => {
        toast.error(t('errorOccuredWhileDeletingTheTable'));
      });
  };

  const handleBulkUpdate = () => {
    const data = selectedData;

    if (selectedData.length === 0) {
      toast.error(t('pleaseSelectAtLeastOneProductMaster'));
      return;
    }

    productMasterUpdateMutation
      .mutateAsync(['PATCH', 'bulk-update/', data])
      .then(response => {
        toast.success('Product master updated successfully');
        setClearSelection(true);
      })
      .catch((err: AxiosError) => {
        toast.error(t('errorUpdatingData'));
      });
  };

  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
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
    if (roles.includes('Super Dashboard Admin')) {
      morikiItemHeaders.concat(columnsAction);
    }

    if (isPartnerDomain) {
      return morikiItemHeaders.filter(item => item.id !== 'partner_code');
    }

    return morikiItemHeaders;
  }, [data, isPartnerDomain]);

  return (
    <div className="mt-6">
      <div className="flex flex-row  justify-end gap-3">
        <section className="flex justify-end gap-3 cursor-pointer">
          <Link
            to="/product-master/bulk-registration"
            className="button flex items-center justify-center gap-2"
          >
            <div>
              <FiUpload size={16} />
            </div>
            {t('bulkRegister')}
          </Link>
          {roles.includes('Super Dashboard Admin') && (
            <AlertDialog clickHandler={handleResetTable} btnText={''}>
              <button
                type="submit"
                className="button flex items-center justify-center gap-2"
              >
                <div>
                  <BiTrash size={16} className="mt-[-2px]" />
                </div>
                {t('resetTable')}
              </button>
            </AlertDialog>
          )}
        </section>
        {/* <button
          type="submit"
          onClick={handleBulkUpdate}
          className="button flex items-center justify-center gap-2"
        >
          <div>
            <AiOutlineEdit size={16} />
          </div>
          {t('bulkUpdate')}
        </button> */}
      </div>
      <Table
        data={data || []}
        columns={columns}
        selectedLength={selectedData?.length}
        isLoading={isLoading}
        isError={isError}
        totalEntries={count}
        allowHover
        // handleRowClick={handleProductMasterDetail}
        showFooter
        containsActions
        // containsCheckbox
        setPageDetail={setPageDetail}
        pageSize={pageSize}
        setCardData={setSelectedData}
        page={page}
        clearSelection={clearSelection}
        setClearSelection={() => setClearSelection(false)}
      />
    </div>
  );
}

export default withTranslation()(ProductMasterTable);

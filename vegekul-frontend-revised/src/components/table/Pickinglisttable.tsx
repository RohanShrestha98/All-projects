import { useMemo, useState } from 'react';
import { PickingListType } from '../../types';
import '../../App.scss';
import './Table.scss';
import { withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { pickinglist } from './Tableheader';
import download from '../../assets/download.png';
import fax from '../../assets/fax.png';
import { useNavigate } from 'react-router-dom';
import PickingListWarningModal from '../../pages/pickinglist/PickingListWarningModal';
import { useAuth } from '../../context/Authcontext';
import ConformDialog from '../../ui/ConformDialog';
import { useApp } from '../../context/AppContext';

const columnHelper = createColumnHelper<PickingListType>();

interface WarningModalDataProps {
  modalFor: string;
  data: any;
}
function PickingListTable({
  data,
  isLoading,
  isError,
  count,
  page,
  pageSize,
  setPageDetail,
  setMode,
  handlePickingListSubmit,
  t,
}: any) {
  const { isPartnerDomain } = useApp();
  const { roles } = useAuth();
  const navigate = useNavigate();
  const [warningModalData, setWarningModalData] =
    useState<WarningModalDataProps | null>();

  const handleSubmit = async (mode: any, data: any) => {
    await handlePickingListSubmit(mode, data);

    setMode(mode);
    setWarningModalData(null);
  };
  const handlePickingListDetail = (data: any) => {
    navigate(
      `/picking-list/${data.customer_code}/?customerCode=${data.customer_code}&&deliveryDate=${data.delivery_date}&from=picking-list`,
      { state: { from: 'pickinglist' } }
    );
  };
  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: () => <>{t('actions')}</>,

        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-4">
              <div
                onClick={e => {
                  e.stopPropagation();
                  if (row.original.last_pdf_made === null) {
                    handleSubmit('pdf', row.original);
                  } else {
                    setWarningModalData({
                      modalFor: 'pdf',
                      data: row.original,
                    });
                  }
                }}
              >
                <img src={download} className="w-7" alt="" />
              </div>
              {isPartnerDomain ? (
                ''
              ) : row.original.last_fax_sent === null ? (
                <span
                  onClick={e => e.stopPropagation()}
                  className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
                >
                  <ConformDialog
                    clickHandler={e => {
                      e.stopPropagation();
                      if (row.original.last_fax_sent === null) {
                        handleSubmit('fax', row.original);
                      } else {
                        setWarningModalData({
                          modalFor: 'fax',
                          data: row.original,
                        });
                      }
                    }}
                    btnText={''}
                  >
                    <span>
                      <img src={fax} alt="" className="w-6" />
                    </span>
                  </ConformDialog>
                </span>
              ) : (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    setWarningModalData({
                      modalFor: 'fax',
                      data: row.original,
                    });
                  }}
                  className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
                >
                  <span>
                    <img src={fax} alt="" className="w-6" />
                  </span>
                </span>
              )}
            </div>
          );
        },
      }),
    ],
    [data]
  );

  const columns = useMemo(() => {
    if (roles.includes('Super Dashboard Admin')) {
      if (
        pickinglist.find((item: any) => item.accessorKey === 'partner_code')
      ) {
        return pickinglist;
      }
      pickinglist.splice(
        1,
        0,
        columnHelper.accessor('partner_code', {
          minSize: 100,
          header: t('partnerCode'),
        })
      );
    }
    return pickinglist;
  }, [data.length, roles.length]);

  return (
    <>
      {warningModalData && (
        <PickingListWarningModal
          modalFor={warningModalData.modalFor}
          openWarningDialoge={true}
          setOpenWarningDialoge={() => setWarningModalData(null)}
          submitHandler={() =>
            handleSubmit(warningModalData.modalFor, warningModalData.data)
          }
          cancelHandler={function (): void {
            throw new Error('Function not implemented.');
          }}
          finalDate={
            warningModalData.modalFor === 'pdf'
              ? warningModalData.data.last_pdf_made
              : warningModalData.data.last_fax_sent
          }
        />
      )}
      <Table
        data={data || []}
        columns={columns.concat(columnsAction)}
        isLoading={isLoading}
        isError={isError}
        totalEntries={count}
        handleRowClick={handlePickingListDetail}
        allowHover
        showFooter
        containsActions
        containsCheckbox
        setPageDetail={setPageDetail}
        pageSize={pageSize}
        page={page}
      />
    </>
  );
}

export default withTranslation()(PickingListTable);

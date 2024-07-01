import { useMemo, useState } from 'react';
import { Translation, withTranslation } from 'react-i18next';
import Table from '../../shared/Table';
import {
  morikiOrderAddTableHeaders,
  morikiOrderTableHeaders,
} from '../headers/MorikiOrderHeader';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useOrderMutation } from '../../../hooks/Usemutatedata';
import moment from 'moment';
import { convertDateFormat } from '../../../utils/string';
import ListInquaryModal from './listInquaryModal';
import { morikiColumnHelper } from '../Tableheader';
import eye from '../../../assets/eye.png';
import FooterCell from '../../shared/FooterCell';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { HiOutlineDownload } from 'react-icons/hi';
import { useAuth } from '../../../context/Authcontext';
import AlertDialog from '../../../ui/AlertDialog';

function ListInquaryTable({
  data,
  isLoading,
  isError,
  count,
  setPageDetail,
  page,
  pageSize,
  handleListInquiryCsvDownload,
  selectedFilter,
  t,
  successHandler,
  from,
}: any) {
  const [selectedData, setSelectedData] = useState([]);
  const [selectedModalData, setSelectedModalData] = useState([]);
  const [clearSelection, setClearSelection] = useState<any>(false);
  const [open, setOpen] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  const removeAllEmptyValues = (obj: any) => {
    const newObj = { ...obj };
    Object.keys(newObj).forEach(key => {
      if (newObj[key] && typeof newObj[key] === 'object') {
        removeAllEmptyValues
          ? (newObj[key] = removeAllEmptyValues(newObj[key]))
          : newObj[key];
      } else if (
        newObj[key] === undefined ||
        newObj[key] === null ||
        newObj[key] === ''
      ) {
        delete newObj[key];
      }
    });
    return newObj;
  };
  const handleViewClick = rowData => {
    setSelectedModalData(rowData);
    setOpen(true);
  };

  const columns = useMemo(
    () =>
      from === 'picking-list'
        ? morikiOrderTableHeaders.filter(item => item.id !== 'edit')
        : selectedData.find(item => item.idx === '')
          ? morikiOrderAddTableHeaders
          : morikiOrderTableHeaders,
    [data, selectedData, selectedFilter]
  );

  const viewCommentAction = useMemo(
    () => [
      morikiColumnHelper.display({
        id: 'row',
        minSize: 80,
        maxSize: 80,
        header: () => {
          return (
            <Translation>
              {t => (
                <div>
                  <span>{t('view')}</span>
                </div>
              )}
            </Translation>
          );
        },
        cell: ({ row }) => (
          <img
            onClick={() => handleViewClick(row.original)}
            className="w-4"
            src={eye}
          />
        ),
      }),
    ],
    [selectedModalData]
  );

  const listInquiryUpdateMutation = useOrderMutation();
  const { roles } = useAuth();

  const handleRowAdd = () => {
    if (selectedData.length === 0) {
      toast.error(t('pleaseSelectAtLeastOneInquiryList'));
      return;
    }

    const csvData = selectedData?.map((eachData: any) => {
      try {
        const date = moment(eachData.delivery_date);
        if (date.isValid()) {
          eachData.delivery_date = date.format('YYYY-MM-DD');
        }
      } catch (error) { }
      eachData.invoice_date = convertDateFormat(eachData.invoice_date);
      delete eachData.id;

      return removeAllEmptyValues(eachData);
    });

    for (const element of csvData) {
      const {
        id,
        idx,
        is_deleted,
        deleted_at,
        updated_at,
        updated_at_manual,
        created_at,
        created_date,
        meta,
        batch_summary_code,
        order_body,
        ...updatedData
      } = element;

      const data = {
        batch_summary_code: element?.batch_summary_code,
        mode: 'individual',
        order_data: [updatedData],
      };

      listInquiryUpdateMutation
        .mutateAsync(['POST', 'bulk/', data])
        .then(response => {
          if (response?.errors?.length > 0) {
            toast.error(t('errorUploadingOrderData'));
          } else {
            successHandler();
            setIsAddClicked(false);
            setClearSelection(true);
            toast.success(t('orderDataUploadedSuccessfully'));
          }
        })
        .catch((err: AxiosError) => {
          const errData: any = err?.response?.data;

          errData &&
            Object.keys(errData).forEach(eachErr => {
              eachErr && toast.error(t('batchSummaryCodeIsInvalid'));
            });
        });
    }
  };

  const handleBulkUpdate = () => {
    const data = selectedData;
    if (selectedData.length === 0) {
      toast.error(t('pleaseSelectAtLeastOneInquiryList'));
      return;
    }

    listInquiryUpdateMutation
      .mutateAsync(['PATCH', 'bulk-update/', data])
      .then(response => {
        toast.success('Inquiry List updated successfully');
        successHandler();
        setClearSelection(true);
      })
      .catch((err: AxiosError) => {
        toast.error(t('errorUpdatingData'));
      });
  };

  const handleBulkDelete = () => {
    const filteredData = selectedData?.map((row: any) => row?.idx);

    if (selectedData.length === 0) {
      toast.error(t('pleaseSelectAtLeastOneInquiryList'));
      return;
    }
    listInquiryUpdateMutation
      .mutateAsync(['delete', 'bulk-delete/', filteredData])
      .then(() => {
        setClearSelection(true);
        toast.success(t('inquiryListDeletedSuccessfully'));
        successHandler();
      })
      .catch(() => {
        toast.error(t('errorOccuredWhileDeletingTheListInquires'));
      });
  };

  const handleResetTable = () => {
    listInquiryUpdateMutation
      .mutateAsync(['delete', 'bulk-reset/'])
      .then(() => {
        toast.success(t('tableResetSuccessfully'));
        successHandler();
      })
      .catch(() => {
        toast.error(t('errorOccuredWhileDeletingTheTable'));
      });
  };

  return (
    <>
      {from !== 'picking-list' && (
        <div className="flex -flex-row justify-between items-center my-5">
          <p></p>
          <div className="flex -flex-row justify-between items-center">
            {isAddClicked ? (
              <button
                type="submit"
                className="mx-4 button"
                onClick={handleRowAdd}
              >
                {t('save')}
              </button>
            ) : (
              <div className="flex gap-2">
                <FooterCell />
                {from !== 'picking-list' && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleListInquiryCsvDownload}
                      className="button flex items-center justify-center gap-2"
                    >
                      <div>
                        <HiOutlineDownload size={16} />
                      </div>
                      {t('download')}
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  onClick={handleBulkUpdate}
                  className="button flex items-center justify-center gap-2"
                >
                  <div>
                    <AiOutlineEdit size={16} />
                  </div>
                  {t('bulkUpdate')}
                </button>
                <button
                  type="submit"
                  onClick={handleBulkDelete}
                  className="button flex items-center justify-center gap-1"
                >
                  <div>
                    <BiTrash size={16} className="mt-[-2px]" />
                  </div>
                  {t('bulkDelete')}
                </button>
                {roles.includes('Super Dashboard Admin') && (
                  <AlertDialog clickHandler={handleResetTable} btnText={''}>
                    <button
                      type="submit"
                      className="button flex items-center justify-center gap-1"
                    >
                      <div>
                        <BiTrash size={16} className="mt-[-2px]" />
                      </div>
                      {t('resetTable')}
                    </button>
                  </AlertDialog>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <Table
        data={data || []}
        columns={
          selectedFilter === 'with_comments'
            ? viewCommentAction.concat(columns)
            : columns
        }
        selectedLength={selectedData?.length}
        isLoading={isLoading}
        isError={isError}
        totalEntries={count}
        allowHover
        allowRowAddition={from === 'picking-list' ? false : true}
        showFooter
        containsActions
        containsCheckbox
        setPageDetail={setPageDetail}
        pageSize={pageSize}
        setCardData={setSelectedData}
        page={page}
        clearSelection={clearSelection}
        setClearSelection={() => setClearSelection(false)}
        isAddClicked={isAddClicked}
        setIsAddClicked={setIsAddClicked}
      />
      {open && (
        <ListInquaryModal
          data={selectedModalData}
          open={open}
          setOpen={setOpen}
          successHandler={successHandler}
        ></ListInquaryModal>
      )}
    </>
  );
}

export default withTranslation()(ListInquaryTable);

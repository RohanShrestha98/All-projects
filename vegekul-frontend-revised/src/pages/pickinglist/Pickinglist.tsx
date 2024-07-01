import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import PickingListTable from '../../components/table/Pickinglisttable';
import { useEffect, useState } from 'react';
import { padSubstring } from '../../utils/string';
import axios from '../../utils/axios';
import { createDownloadableFile } from '../../utils/file';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import SearchButton from '../../components/button/SearchButton';
import { usePickingListData } from '../../hooks/UsePickingListQueryData';
import { useApp } from '../../context/AppContext';
import LoadingSvg from '../../assets/loading.gif';
import { BiSearch } from 'react-icons/bi';
import { useAuth } from '../../context/Authcontext';

function PickingList({ t }: { t: TFunction }) {
  const {
    pageSize: globalPageSize,
    setPageSize: setGlobalPageSize,
    isPartnerDomain,
  } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableRows, setTableRows] = useState<any>([]);
  const [mode, setMode] = useState('');
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: globalPageSize.pickingList,
  });
  const { register, handleSubmit, reset, watch } = useForm();
  const customerName = searchParams.get('customerName') || '';
  const customerCode = searchParams.get('customerCode') || '';
  const partnerCode = searchParams.get('partnerCode') || '';

  const deliveryDate = searchParams.get('deliveryDate') || '';
  const { data, isLoading, isError, refetch } = usePickingListData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    customerName,
    customerCode,
    deliveryDate,
    partnerCode,
  });
  const { roles } = useAuth();

  const filterHandler = (params: any) => {
    searchParams.set('customerName', params.customerName);
    searchParams.set('customerCode', params.customerCode);
    searchParams.set('deliveryDate', params.deliveryDate);
    if (roles.includes('Super Dashboard Admin')) {
      searchParams.set('partnerCode', params.partnerCode);
    }
    searchParams.set('page', '1');
    searchParams.set('pageSize', pageDetail.pageSize.toString());
    setSearchParams(searchParams);

    setPageDetail(prev => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
    setGlobalPageSize({ ...globalPageSize, pickingList: pageSize });
  };

  useEffect(() => {
    const formatData = () => {
      const finalData: any[] | undefined = data?.results.map(
        (each: any, index: number) => {
          return {
            ...each,
            rowno: padSubstring('0000', (index + 1).toString()),
            id: each.idx,
          };
        }
      );
      setTableRows(finalData);
    };
    formatData();
  }, [data]);

  const handlePickingListSubmit = (mode: string, item: any) => {
    // check if delivery date, customer code, customer name, partner code, batch summary code is empty

    // check one by one
    if (!item.delivery_date) {
      toast.error(t('deliveryDateRequired'));
      return;
    }
    if (!item.customer_code) {
      toast.error(t('customerCodeRequired'));
      return;
    }
    if (!item.customer_name) {
      toast.error(t('customerNameRequired'));
      return;
    }
    if (!item.partner_code) {
      toast.error(t('partnerCodeRequired'));
      return;
    }
    // if (!item.batch_summary_code) {
    //   toast.error(t('batchSummaryCodeRequired'));
    //   return;
    // }

    axios
      .post(
        `picking-list/generate/?mode=${mode}`,
        {
          delivery_date: item.delivery_date,
          customer_code: item.customer_code,
          customer_name: item.customer_name,
          partner_code: item.partner_code,
          // batch_summary_code: item.batch_summary_code,
        },
        {
          responseType: 'blob',
        }
      )
      .then((blob: { data: Blob | MediaSource }) => {
        if (['pdf', 'pdf_fax'].includes(mode))
          createDownloadableFile(
            blob,
            `${item.delivery_date}_${item.customer_code}`
          );
        refetch();
        if (['fax', 'pdf_fax'].includes(mode)) {
          toast.success(t('faxSentSuccessfully'));
        }
      });
  };

  const watchAllFields = watch();

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('pickingList')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-6 mb-5 searchField">
          <div className="">
            <h1 className="text-lg font-medium text-textColor">
              {t('searchFilter')}
            </h1>
            <form onSubmit={handleSubmit(filterHandler)}>
              <div className=" flex gap-3 mt-4 mb-4">
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('customerName')}</label>
                  <input
                    type="text"
                    placeholder={t('customerName')}
                    className=" px-3 py-2 rounded-4 font-normal text-sm border text-inputColor outline-none"
                    {...register('customerName')}
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4 ">
                  <label className="text-sm">{t('customerCode')}</label>
                  <input
                    type="text"
                    placeholder={t('customerCode')}
                    className=" px-3 py-2 rounded-4 font-normal text-sm border text-inputColor outline-none"
                    {...register('customerCode')}
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4 ">
                  <label className="text-sm">{t('deliveryDate')}</label>
                  <SearchButton
                    register={register}
                    placeholder={t('deliveryDate')}
                    defaultValue={deliveryDate}
                    registerValue={'deliveryDate'}
                    watchDateFields={watchAllFields.deliveryDate}
                    handleSubmit={handleSubmit}
                    handleResetDate={() => {
                      searchParams.set('deliveryDate', '');
                      reset({ deliveryDate: '' });
                      setSearchParams(searchParams);
                    }}
                  />
                </div>
                {!isPartnerDomain && (
                  <div className="flex flex-col gap-[2px] w-1/4">
                    <label className="text-sm">{t('partnerCode')}</label>
                    <input
                      type="text"
                      placeholder={t('partnerCode')}
                      className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                      {...register('partnerCode')}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="button flex items-center justify-center gap-1"
                >
                  <div>
                    <BiSearch size={16} />
                  </div>
                  {t('search')}
                </button>
              </div>
            </form>
          </div>
        </div>
        {!isLoading && tableRows ? (
          <PickingListTable
            data={data?.results}
            isError={isError}
            isLoading={isLoading}
            setPageDetail={handlePageChange}
            handlePickingListSubmit={handlePickingListSubmit}
            count={data?.count}
            setMode={setMode}
            pageSize={pageDetail.pageSize}
            page={pageDetail.page}
          />
        ) : (
          <img src={LoadingSvg} alt="" className="mx-auto mt-16 h-16" />
        )}
      </div>
    </div>
  );
}

export default withTranslation()(PickingList);

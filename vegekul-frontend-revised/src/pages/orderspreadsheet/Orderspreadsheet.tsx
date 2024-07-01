import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useOrderSummaryData } from '../../hooks/Usequerydata.js';
import axios from '../../utils/axios';
import { createDownloadableFile } from '../../utils/file';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { getLanguage } from '../../utils/cookie';
import OrderSpreadSheetTable from '../../components/table/Orderspreadsheettable';
import SearchButton from '../../components/button/SearchButton';
import LoadingSvg from '../../assets/loading.gif';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineDownload } from 'react-icons/hi';
import { useAuth } from '../../context/Authcontext';

function OrderSpreadSheet({ t }: { t: TFunction }) {
  const { pageSize: globalPageSize, setPageSize: setGlobalPageSize } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: globalPageSize.orderSpreadsheet,
  });
  const { roles } = useAuth();

  const { isLoading, setIsLoading } = useApp();

  const productName = searchParams.get('productName') || '';
  const partnerCode = searchParams.get('partnerCode') || '';
  const deliveryDate = searchParams.get('deliveryDate') || '';

  const {
    data,
    isLoading: fetchLoading,
    isError,
  } = useOrderSummaryData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    productName,
    deliveryDate,
    partnerCode,
    source: 'moriki',
  });

  const { register, handleSubmit, reset, watch } = useForm(); // initialize the hook form for order search filter

  const filterHandler = (params: any) => {
    searchParams.set('productName', params.productName);
    searchParams.set('deliveryDate', params.deliveryDate);
    searchParams.set('partnerCode', params.partnerCode);
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
    setGlobalPageSize({ ...globalPageSize, orderSpreadsheet: pageSize });
  };

  const handleOrderCsvDownload = () => {
    setIsLoading(true);
    axios
      .post(
        `order-summary/?product_name=${productName}&delivery_date=${deliveryDate}&partner_code=${partnerCode}&page=${
          pageDetail.page
        }&mode=csv&page_size=${pageDetail.pageSize}&language=${
          getLanguage() || 'jp'
        }`,
        {},
        {
          responseType: 'blob',
        }
      )
      .then((blob: { data: Blob | MediaSource }) => {
        createDownloadableFile(blob, `${t('orderSpreadsheet')}.csv`);
      });
    setIsLoading(false);
  };

  const watchAllFields = watch();

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('orderSpreadsheet')} />
      <div className="dashboard_content_area">
        <div className="Orderdatasearch w-full  px-5 py-6 mb-5 searchField">
          <div className="">
            <h1 className="text-lg font-medium text-textColor">
              {t('searchFilter')}
            </h1>
            <form onSubmit={handleSubmit(filterHandler)} method="get">
              <div className=" flex gap-3 mt-4">
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('productName')}</label>
                  <input
                    type="text"
                    placeholder={t('productName')}
                    className=" px-3 py-2  rounded-4 font-normal text-sm border outline-none text-inputColor"
                    {...register('productName')}
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
                {roles.includes('Super Dashboard Admin') && (
                  <div className="flex flex-col gap-[2px] w-1/4">
                    <label className="text-sm">{t('partnerCode')}</label>
                    <input
                      type="text"
                      placeholder={t('partnerCode')}
                      className="px-3 py-2 rounded-4 font-normal text-sm border outline-none text-inputColor"
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
        <div className="flex justify-end">
          <button
            onClick={handleOrderCsvDownload}
            className="button flex items-center justify-center gap-2"
          >
            <div>
              <HiOutlineDownload size={16} />
            </div>
            {t('download')}
          </button>
        </div>
        {!fetchLoading ? (
          <OrderSpreadSheetTable
            data={data?.results}
            isError={isError}
            isLoading={fetchLoading}
            setPageDetail={handlePageChange}
            count={data?.count}
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

export default withTranslation()(OrderSpreadSheet);

import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import ListInquiryTable from '../../components/table/MorikiListInquiry/ListInquirytable';
import { useOrdersData } from '../../hooks/Usequerydata';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import SearchButton from '../../components/button/SearchButton';
import axios from '../../utils/axios';
import { getLanguage } from '../../utils/cookie';
import { createDownloadableFile } from '../../utils/file';
import { useApp } from '../../context/AppContext';
import LoadingSvg from '../../assets/loading.gif';
import { BiSearch } from 'react-icons/bi';

function ListInquiry({ t }: { t: TFunction }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    pageSize: globalPageSize,
    setPageSize: setGlobalPageSize,
    isPartnerDomain,
  } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<any>('any');

  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: globalPageSize.listInquiry,
  });

  const customerName = searchParams.get('customerName') || '';
  const productName = searchParams.get('productName') || '';
  const deliveryDate = searchParams.get('deliveryDate') || '';
  const batchSummaryCode = searchParams.get('batchSummaryCode') || '';
  const customerCode = searchParams.get('customerCode') || '';
  const partnerCode = searchParams.get('partnerCode') || '';

  const from = searchParams.get('from') || '';

  const { data, isLoading, isError, refetch } = useOrdersData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    customerName,
    productName,
    deliveryDate,
    batchSummaryCode,
    customerCode,
    partnerCode,
    mode: selectedFilter,
    source: 'moriki',
  });

  const filter = [
    {
      label: 'all',
      value: 'all',
    },
    {
      label: 'withoutComments',
      value: 'without_comments',
    },
    {
      label: 'withComments',
      value: 'with_comments',
    },
  ];

  const { register, handleSubmit, reset, watch } = useForm(); // initialize the hook form for order search filter

  const filterHandler = (params: any) => {
    searchParams.set('customerName', params.customerName || '');
    searchParams.set('mode', params);
    searchParams.set('productName', params.productName || '');
    searchParams.set('deliveryDate', params.deliveryDate || '');
    searchParams.set('batchSummaryCode', params.batchSummaryCode || '');
    searchParams.set('page', '1');
    searchParams.set('pageSize', pageDetail.pageSize.toString());
    searchParams.set('partnerCode', params.partnerCode || '');
    from && searchParams.set('from', from);

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
    setGlobalPageSize({ ...globalPageSize, listInquiry: pageSize });
  };

  const handleListInquiryCsvDownload = () => {
    axios
      .post(
        `order/export/?customer_name=${customerName}&product_name=${productName}&delivery_date=${deliveryDate}&page=${
          pageDetail.page
        }&page_size=${
          pageDetail.pageSize
        }&batch_summary_code=${batchSummaryCode}&language=${
          getLanguage() || 'jp'
        }&partner_code=${partnerCode}`,

        {},
        {
          responseType: 'blob',
        }
      )
      .then((blob: { data: Blob | MediaSource }) => {
        createDownloadableFile(blob, `${t('listInquiryCSVFile')}.csv`);
      });
  };
  const handleSelectChange = (event: any) => {
    setSelectedFilter(event.target.value);
    filterHandler(event.target.value);
  };

  const watchAllFields = watch();
  return (
    <div className="rightSidePart">
      <Navbar
        pagetitle={
          from === 'picking-list' ? t('pickingListDetail') : t('listInquiry')
        }
      />
      <div className="dashboard_content_area">
        <div className="w-full px-5 py-6 mb-5 searchField">
          <div className="">
            <h1 className="text-lg font-medium text-textColor mb-4">
              {t('searchFilter')}
            </h1>
            <form onSubmit={handleSubmit(filterHandler)} method="get">
              <div className="flex gap-3 mb-4">
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('customerName')}</label>
                  <input
                    type="text"
                    placeholder={t('customerName')}
                    className=" px-3 py-2  outline-none rounded-4 font-normal text-sm border  text-inputColor"
                    defaultValue={customerName}
                    {...register('customerName')}
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('productName')}</label>
                  <input
                    type="text"
                    placeholder={t('productName')}
                    className=" px-3 py-2  outline-none rounded-4 font-normal text-sm border  text-inputColor"
                    defaultValue={productName}
                    {...register('productName')}
                  />
                </div>
                {!isPartnerDomain && (
                  <div className="flex flex-col gap-[2px] w-1/4">
                    <label className="text-sm">{t('partnerCode')}</label>
                    <input
                      type="text"
                      placeholder={t('partnerCode')}
                      className=" px-3 py-2  outline-none rounded-4 font-normal text-sm border text-inputColor"
                      defaultValue={partnerCode}
                      {...register('partnerCode')}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-[2px] w-1/4">
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
              </div>
              <div className="flex items-center justify-end gap-2">
                <select
                  className="bg-[#0a438f] h-8 rounded-md text-white px-2 outline-none"
                  value={selectedFilter}
                  onChange={handleSelectChange}
                >
                  {filter.map((filterItem, index) => (
                    <option key={index} value={filterItem.value}>
                      {t(`${filterItem.label}`)}
                    </option>
                  ))}
                </select>
                <div className="inline-block">
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
              </div>
            </form>
          </div>
        </div>
        {!isLoading ? (
          <ListInquiryTable
            selectedFilter={selectedFilter}
            data={data?.results}
            isError={isError}
            handleListInquiryCsvDownload={handleListInquiryCsvDownload}
            isLoading={isLoading}
            setPageDetail={handlePageChange}
            count={data?.count}
            pageSize={pageDetail.pageSize}
            page={pageDetail.page}
            successHandler={() => refetch()}
            from={from}
          />
        ) : (
          <img src={LoadingSvg} alt="" className="mx-auto mt-16 h-16" />
        )}
      </div>
    </div>
  );
}

export default withTranslation()(ListInquiry);

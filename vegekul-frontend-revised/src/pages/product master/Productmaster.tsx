import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/navbar/Navbar';
import ProductMasterTable from '../../components/table/Productmastertable';
import { useItemData } from '../../hooks/UseItemQueryData';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import LoadingSvg from '../../assets/loading.gif';
import { BiSearch } from 'react-icons/bi';
import { useApp } from '../../context/AppContext';
function ProductMaster({ t }: { t: TFunction }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm(); //for search
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });
  const { isPartnerDomain } = useApp();
  const productionArea = searchParams.get('productionArea') || '';
  const productName = searchParams.get('productName') || '';
  const partnerItemCode = searchParams.get('partnerItemCode') || '';
  const code = searchParams.get('code') || '';
  const { data, isLoading, isError } = useItemData({
    code,
    partnerItemCode,
    productionArea,
    productName,
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const filterHandler = (params: any, e) => {
    e.preventDefault();
    searchParams.set('productName', params.productName || '');
    searchParams.set('productionArea', params.productionArea);
    searchParams.set('partnerItemCode', params.partnerItemCode);
    searchParams.set('code', params.code);
    setSearchParams(searchParams);
    setPageDetail(prev => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('productMaster')} />
      <div className="dashboard_content_area">
        <div className="w-full px-5 py-4 searchField">
          <p className="text-lg font-medium text-textColor">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)} method="get">
            <div className=" mt-4">
              <div className="flex gap-3">
                <div className="flex flex-col gap-[2px] w-1/4 ">
                  <label className="text-sm">{t('productName')}</label>
                  <input
                    type="text"
                    placeholder={t('productName')}
                    className=" px-3 py-2 w-full rounded-4 font-normal text-sm border  text-inputColor outline-none"
                    defaultValue={productName}
                    {...register('productName')}
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4  ">
                  <label className="text-sm line-clamp-1">
                    {t('inhouseManagedProductCode')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('inhouseManagedProductCode')}
                    className="px-3 py-2 w-full rounded-4 font-normal text-sm border  text-inputColor outline-none"
                    defaultValue={code}
                    {...register('code')}
                  />
                </div>
                {!isPartnerDomain && (
                  <div className="flex flex-col gap-[2px] w-1/4 ">
                    <label className="text-sm">{t('partnerItemCode')}</label>
                    <input
                      type="text"
                      placeholder={t('partnerItemCode')}
                      defaultValue={partnerItemCode}
                      {...register('partnerItemCode')}
                      className="mb-5 mr-5 px-3 py-2 w-full rounded-4 font-normal text-sm border text-inputColor outline-none"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-[2px] w-1/4  ">
                  <label className="text-sm">{t('productionArea')}</label>
                  <input
                    type="text"
                    placeholder={t('productionArea')}
                    defaultValue={productionArea}
                    {...register('productionArea')}
                    className=" px-3 py-2 w-full rounded-4 font-normal text-sm border  text-inputColor outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
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

        {!isLoading ? (
          <ProductMasterTable
            data={data?.results}
            isError={isError}
            isLoading={isLoading}
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

export default withTranslation()(ProductMaster);

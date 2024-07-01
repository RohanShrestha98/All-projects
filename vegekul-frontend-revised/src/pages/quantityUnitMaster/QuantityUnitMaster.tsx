import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useQuantityUnitData } from '../../hooks/useQuantityUnitQueryData';
import QuantityUnitMasterTable from '../../components/table/QuantityUnitMasterTable';
import { BiSearch, BiTrash } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useQuantityUnitMutation } from '../../hooks/Usemutatedata';
import { useAuth } from '../../context/Authcontext';
import AlertDialog from '../../ui/AlertDialog';

function QuantityMasterPage({ t }: { t: TFunction }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm(); //for search
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    page_size: 10,
  });

  const quantityUnitMutation = useQuantityUnitMutation();

  const productCode = searchParams.get('productCode') || '';
  const productName = searchParams.get('productName') || '';

  const { data, isLoading, isError, refetch } = useQuantityUnitData({
    page: Number(pageDetail.page),
    page_size: Number(pageDetail.page_size),
    productCode,
    productName,
  });

  const handlePageChange = (page: number, page_size: number) => {
    setPageDetail({ page, page_size });
    searchParams.set('page', page.toString());
    searchParams.set('page_size', page_size.toString());
    setSearchParams(searchParams);
  };

  const { roles } = useAuth();

  const filterHandler = (params: any, e) => {
    e.preventDefault();
    searchParams.set('productCode', params.productCode);
    searchParams.set('productName', params.productName);

    setSearchParams(searchParams);
    setPageDetail(prev => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const handleResetTable = () => {
    quantityUnitMutation
      .mutateAsync(['delete', 'bulk-reset/'])
      .then(() => {
        toast.success(t('tableResetSuccessfully'));
      })
      .catch(() => {
        toast.error(t('errorOccuredWhileDeletingTheTable'));
      });
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('quantityUnitMaster')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-4 searchField">
          <p className="text-lg font-medium text-textColor">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)} method="get">
            <div className=" mt-4">
              <div className="flex gap-3">
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('productCode')}</label>
                  <input
                    type="text"
                    placeholder={t('productCode')}
                    className=" px-3 py-2 rounded-4 font-normal text-sm border  text-inputColor outline-none"
                    defaultValue={productCode}
                    {...register('productCode')}
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('productName')}</label>
                  <input
                    type="text"
                    placeholder={t('productName')}
                    className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                    defaultValue={productName}
                    {...register('productName')}
                  />
                </div>
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
            </div>
          </form>
        </div>
        <section className="flex justify-end gap-3 cursor-pointer mt-6 mb-2">
          <Link
            to="/quantity-unit-master/bulk-registration"
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
                className="button flex items-center justify-center gap-1"
              >
                <div>
                  <BiTrash size={16} className="mt-[-2px]" />
                </div>
                {t('resetTable')}
              </button>
            </AlertDialog>
          )}
        </section>
        <QuantityUnitMasterTable
          data={data?.results}
          isError={isError}
          isLoading={isLoading}
          refetch={refetch}
          setPageDetail={handlePageChange}
          count={data?.count}
          pageSize={pageDetail.page_size}
          page={pageDetail.page}
        />
      </div>
    </div>
  );
}

export default withTranslation()(QuantityMasterPage);

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

import Navbar from '../../components/navbar/Navbar';
import CustomerMasterTable from '../../components/table/Customermastertable';
import LoadingSvg from '../../assets/loading.gif';
import '../../App.scss';
import { useCustomerMasterData } from '../../hooks/UseCustomerMasterQueryData';
import { BiSearch, BiTrash } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCustomerMutation } from '../../hooks/Usemutatedata';
import { useAuth } from '../../context/Authcontext';
import { useApp } from '../../context/AppContext';
import AlertDialog from '../../ui/AlertDialog';

function CustomerMaster({ t }: { t: TFunction }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm(); //for search
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });

  const customerMutation = useCustomerMutation();

  const { isPartnerDomain } = useApp();
  const customerName = searchParams.get('customerName') || '';
  const customerCode = searchParams.get('customerCode') || '';
  const partnerCode = searchParams.get('partnerCode') || '';

  const { roles } = useAuth();

  const { data, isLoading, isError } = useCustomerMasterData({
    customerCode,
    customerName,
    partnerCode,

    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const filterHandler = (params: SubmitHandler<FieldValues>) => {
    searchParams.set('customerName', params.customerName);
    searchParams.set('customerCode', params.customerCode);
    searchParams.set('partnerCode', params.partnerCode);

    setSearchParams(searchParams);
    setPageDetail(prev => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const handleResetTable = () => {
    customerMutation
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
      <Navbar pagetitle={t('customerMaster')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-4 searchField">
          <p className="text-lg font-medium text-textColor">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)} method="get">
            <div className=" mt-4">
              <div className="flex gap-3">
                {!isPartnerDomain && (
                  <div className="flex flex-col gap-[2px] w-1/4">
                    <label className="text-sm">{t('partnerCode')}</label>
                    <input
                      type="text"
                      placeholder={t('partnerCode')}
                      className=" px-3 py-2 rounded-4 font-normal text-sm border  text-inputColor outline-none"
                      defaultValue={partnerCode}
                      {...register('partnerCode')}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('customerCode')}</label>
                  <input
                    type="text"
                    placeholder={t('customerCode')}
                    defaultValue={customerCode}
                    {...register('customerCode')}
                    className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('customerName')}</label>
                  <input
                    type="text"
                    placeholder={t('customerName')}
                    defaultValue={customerName}
                    {...register('customerName')}
                    className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
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
        <section className="flex justify-end gap-3 cursor-pointer mt-6">
          <Link
            to="/customer-master/bulk-registration"
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
        {!isLoading ? (
          <CustomerMasterTable
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

export default withTranslation()(CustomerMaster);

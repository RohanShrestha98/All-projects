import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import UserFormModal from './Userformmodal';
import { AddSvg } from '../../icons/Allsvgs';
import Navbar from '../../components/navbar/Navbar';
import UserMasterTable from '../../components/table/Usermastertable';
import { useUsersData } from '../../hooks/UseUserQueryData';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { BiSearch } from 'react-icons/bi';

function UsersPage({ t }: { t: TFunction }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPartnerDomain } = useApp();

  const { register, handleSubmit } = useForm(); //for search
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });

  const familyName = searchParams.get('familyName') || '';
  const email = searchParams.get('email') || '';

  const { data, isLoading, isError, refetch } = useUsersData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    familyName,
    email,
    isPartnerDomain,
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const filterHandler = (params: any, e) => {
    e.preventDefault();
    searchParams.set('familyName', params.familyName);
    searchParams.set('email', params.email);
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
      <Navbar pagetitle={t('userMaster')} />
      <div className="dashboard_content_area">
        <div className="w-full px-5 py-4 searchField">
          <p className="text-lg font-medium text-textColor">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)} method="get">
            <div className=" mt-4">
              <div className="flex gap-3">
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('familyName')}</label>
                  <input
                    type="text"
                    placeholder={t('familyName')}
                    className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                    defaultValue={familyName}
                    {...register('familyName')}
                  />
                </div>
                <div className="flex flex-col gap-[2px] w-1/4">
                  <label className="text-sm">{t('emailAddress')}</label>
                  <input
                    type="text"
                    placeholder={t('emailAddress')}
                    defaultValue={email}
                    className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                    {...register('email')}
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
        <section className="flex justify-end mt-6 mb-2">
          <UserFormModal triggerClassName="button flex flex-row justify-center">
            <AddSvg className="h-6" />
            <span>{t('addUser')}</span>
          </UserFormModal>
        </section>
        <UserMasterTable
          data={data?.results}
          isError={isError}
          isLoading={isLoading}
          refetch={refetch}
          setPageDetail={handlePageChange}
          count={data?.count}
          pageSize={pageDetail.pageSize}
          page={pageDetail.page}
        />
      </div>
    </div>
  );
}

export default withTranslation()(UsersPage);

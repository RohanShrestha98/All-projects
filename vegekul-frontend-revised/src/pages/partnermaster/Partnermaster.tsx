import { TFunction } from 'i18next';
import '../../App.scss';
import Navbar from '../../components/navbar/Navbar';
import PartnerMasterTable from '../../components/table/Partnermastertable';
import { withTranslation } from 'react-i18next';
import PartnerMasterFormModel from './PartnerMasterFormModel';
import { AddSvg } from '../../icons/Allsvgs';
import { useBusinessPartnerData } from '../../hooks/UseBusinessPartnerQueryData';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useBusinessPartnerMutation } from '../../hooks/UseBusinessPartnerMutatedData';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import UserAssignPartnerModal from './UserAssignPartnerModal';
import LoadingSvg from '../../assets/loading.gif';
import { BiSearch } from 'react-icons/bi';

function PartnerMaster({ t }: { t: TFunction }) {
  const partnerMutation = useBusinessPartnerMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });

  const userIdx = searchParams.get('user') || '';
  const name = searchParams.get('name') || '';
  const code = searchParams.get('code') || '';

  const { data, isLoading } = useBusinessPartnerData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    code,
    name,
    user: userIdx,
  });

  const filterHandler = (params: any) => {
    searchParams.set('name', params.name);
    searchParams.set('code', params.code);
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
  };

  const handleDelete = (idx: string) => {
    partnerMutation
      .mutateAsync(['delete', `${idx}/`])
      .then(resp => {
        toast.success(t('partnerDeletedSuccessfully'));
      })
      .catch((err: AxiosError) => {
        const errData: any = err?.response?.data;
        if (errData && errData.detail) {
          toast.error(errData.detail);
        } else if (errData) {
          Object.keys(errData).forEach(eachErr => {
            toast.error(`${eachErr}: ${errData[eachErr][0]}`);
          });
        } else {
          toast.error(t('anErrorOccurredWhileDeletingTheUser'));
        }
      });
  };
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('partnerMaster')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-4 searchField">
          <p className="text-lg font-medium text-textColor mb-4">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)}>
            <div className="flex gap-3">
              <div className="flex flex-col gap-[2px] w-1/4">
                <label className="text-sm">{t('partnerName')}</label>
                <input
                  type="name"
                  placeholder={t('partnerName')}
                  className=" px-3 py-2 rounded-4 font-normal text-sm border  text-inputColor outline-none"
                  defaultValue={name}
                  {...register('name')}
                />
              </div>
              <div className="flex flex-col gap-[2px] w-1/4">
                <label className="text-sm">{t('partnerCode')}</label>
                <input
                  type="text"
                  className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                  placeholder={t('partnerCode')}
                  defaultValue={code}
                  {...register('code')}
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
          </form>
        </div>
        <section className="flex justify-end mt-6 mb-2">
          {userIdx ? (
            <UserAssignPartnerModal triggerClassName="button flex flex-row justify-center ">
              <AddSvg className="h-5 mt-[2px]" />
              <span>{t('assignToPartner')}</span>
            </UserAssignPartnerModal>
          ) : (
            <PartnerMasterFormModel triggerClassName="button flex flex-row justify-center ">
              <AddSvg className="h-5 mt-[2px]" />
              <span>{t('addPartner')}</span>
            </PartnerMasterFormModel>
          )}
        </section>
        {!isLoading ? (
          <PartnerMasterTable
            data={data?.results}
            handleDelete={handleDelete}
            setPageDetail={handlePageChange}
            count={data?.count}
            pageDetail={pageDetail}
            user={userIdx}
          />
        ) : (
          <>
            <img src={LoadingSvg} alt="" className="mx-auto mt-16 h-16" />
          </>
        )}
      </div>
    </div>
  );
}

export default withTranslation()(PartnerMaster);

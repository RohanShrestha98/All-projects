import { TFunction } from 'i18next';
import '../../App.scss';
import Navbar from '../../components/navbar/Navbar';
import { withTranslation } from 'react-i18next';
import { AddSvg } from '../../icons/Allsvgs';
import { useCompanyMasterData } from '../../hooks/UseCompanyMasterQueryData';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CompanyMasterTable from '../../components/table/CompanyMasterTable';
import { useCompanyMasterMutation } from '../../hooks/useCompanyMutatedData';
import CompanyMasterFormModel from './CompanyMasterFormModel';
import LoadingSvg from '../../assets/loading.gif';
import { BiSearch } from 'react-icons/bi';

function CompanyMaster({ t }: { t: TFunction }) {
  const companyMutation = useCompanyMasterMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });

  const name = searchParams.get('name') || '';
  const code = searchParams.get('code') || '';

  const { data, isLoading } = useCompanyMasterData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    code,
    name,
  });

  const handleCreate = (data: any) => {
    companyMutation
      .mutateAsync(['post', '', data])
      .then(response => {
        toast.success(t('companyAddedSuccessfully'));
      })
      .catch((err: AxiosError) => {
        const errData: any = err?.response?.data;
        errData &&
          Object.keys(errData).forEach(eachErr => {
            eachErr && toast.error(` ${errData[eachErr][0]}`);
          });
      });
  };

  const filterHandler = (params: any, e) => {
    e.preventDefault();
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

  const handleUpdate = async (data: any) => {
    try {
      const patchData = {
        idx: data?.idx,
        code: data?.code,
        classification: data?.classification,
        text: data?.text,
        course: data?.course,
        post_number: data?.post_number,
        prefacture: data?.prefacture,
        city: data?.city,
        street: data?.street,
        telephone: data?.telephone,
        fax: data?.fax,
      };
      const response = companyMutation
        .mutateAsync(['patch', `${patchData.idx}/`, patchData])
        .then(resp => {
          toast.success(t('companyDetailsUpdatedSuccessfully'));
        })
        .catch((err: AxiosError) => {
          const errData: any = err?.response?.data;

          errData && errData.detail
            ? toast.error(errData.detail)
            : Object.keys(errData).forEach(eachErr => {
              eachErr && toast.error(`${eachErr}: ${errData[eachErr][0]}`);
            });
        });

      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response) {
        error.response.detail.forEach((eachError: string) => {
          toast.error(eachError);
        });
      }
      return error;
    }
  };
  const handleDelete = (idx: string) => {
    companyMutation
      .mutateAsync(['delete', `${idx}/`])
      .then(resp => {
        toast.success(t('companyDeletedSuccessfully'));
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
        <section className="flex justify-end">
          <CompanyMasterFormModel
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            triggerClassName="button flex flex-row justify-center mb-4"
          >
            <AddSvg className="h-5 mt-[2px]" />
            <span>{t('addCompany')}</span>
          </CompanyMasterFormModel>
        </section>
        <div className="w-full border px-5 py-4">
          <p className="text-lg font-medium text-textColor mb-4">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)}>
            <div className="">
              <input
                type="text"
                placeholder={t('companyName')}
                className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
                defaultValue={name}
                {...register('name')}
              />
              <input
                type="text"
                className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
                placeholder={t('companyCode')}
                defaultValue={code}
                {...register('code')}
              />
              <br />
              <div className="flex justify-end">
                <div>
                  <BiSearch />
                </div>
                <button type="submit" className="button">
                  {t('search')}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex -flex-row justify-between items-center mt-5">
          <p>
            {t('masterDataSearch')} {t('result')}
          </p>
          {/* <div className="flex -flex-row justify-between items-center">
                        <button className="button">Download</button>
                    </div> */}
        </div>
        {!isLoading ? (
          <CompanyMasterTable
            data={data?.results}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            setPageDetail={handlePageChange}
            count={data?.count}
            pageDetail={pageDetail}
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

export default withTranslation()(CompanyMaster);

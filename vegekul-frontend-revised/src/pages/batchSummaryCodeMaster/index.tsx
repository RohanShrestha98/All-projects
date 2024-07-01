import { forwardRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import { AddSvg } from '../../icons/Allsvgs';
import { useAuth } from '../../context/Authcontext';
import BatchSummaryFormModal from './batchSummaryFormModal';
import BatchSummaryCode from '../../components/table/BatchSummaryCode';
import { useBatchSummaryCodeMasterMutation } from '../../hooks/useBatchSummaryCodeMutation';
import { useBatchSummaryMasterData } from '../../hooks/useBatchSummaryQueryData';

const BatchSummaryCodeMaster = forwardRef(({ t }: { t: TFunction }) => {
  const { roles } = useAuth();

  const batchSummaryCodeMutation = useBatchSummaryCodeMasterMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });

  const { data, isLoading, isError, refetch } = useBatchSummaryMasterData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const handleDelete = (idx: string) => {
    batchSummaryCodeMutation.mutateAsync(['delete', `${idx}/`], {
      onSuccess: () => {
        toast.success(t('batchSummaryCodeDeletedSuccessfully'));
        refetch();
      },
      onError: (err: AxiosError) => {
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
      },
    });
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('batchSummaryCodeMaster')} />
      <div className="dashboard_content_area">
        {roles.includes('Super Dashboard Admin') && (
          <section className="flex justify-end">
            <BatchSummaryFormModal
              onSuccess={() => refetch()}
              triggerClassName="button flex flex-row justify-center mb-4 min-w-max"
            >
              <AddSvg className="h-6 pl-2" />
              <span className="whitespace-nowrap ">
                {t('addBatchSummaryCode')}
              </span>
            </BatchSummaryFormModal>
          </section>
        )}
        <BatchSummaryCode
          data={data?.results ?? []}
          handleDelete={handleDelete}
          handleSuccess={() => refetch()}
          setPageDetail={handlePageChange}
          count={data?.count}
          isLoading={isLoading}
          isError={isError}
          pageSize={pageDetail.pageSize}
          page={Number(pageDetail.page)}
        />
      </div>
    </div>
  );
});

export default withTranslation()(BatchSummaryCodeMaster);

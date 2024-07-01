import { forwardRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import { AddSvg, LeftArrowSvg } from '../../icons/Allsvgs';
import { useAuth } from '../../context/Authcontext';
import ConversionRatesFormModal from './conversionRatesFormModal';
import ConversionTable from '../../components/table/ConversionTable';
import { useConversionFactorData } from '../../hooks/useConversionFactorQuery';
import { useConversionFactorMutation } from '../../hooks/useConversionFactorMutation';

const ConversionRates = forwardRef(({ t }: { t: TFunction }) => {
  const { roles } = useAuth();
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const conversionFactorMutation = useConversionFactorMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });

  const { data, isLoading, isError, refetch } = useConversionFactorData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    product_code: code || '',
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const handleDelete = (idx: string) => {
    conversionFactorMutation.mutateAsync(['delete', `${idx}/`], {
      onSuccess: () => {
        toast.success(t('conversionRateDeletedSuccessfully'));
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
          toast.error(t('anErrorOccurredWhileDeletingTheData'));
        }
      },
    });
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('conversionRates')} />
      <div className="dashboard_content_area">
        {roles.includes('Super Dashboard Admin') && (
          <section className="flex items-center justify-between cursor-pointer">
            <span
              className="flex items-center gap-x-1 hover:text-secondary"
              onClick={() => navigate(-1)}
            >
              <LeftArrowSvg className="h-6" /> {t('goBack')}
            </span>
            <ConversionRatesFormModal
              onSuccess={() => refetch()}
              triggerClassName="button flex flex-row justify-center mb-4 min-w-max"
            >
              <AddSvg className="h-6 pl-2" />
              <span className="whitespace-nowrap pl-2 pr-4">
                {t('addConversionRate')}
              </span>
            </ConversionRatesFormModal>
          </section>
        )}
        <ConversionTable
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

export default withTranslation()(ConversionRates);

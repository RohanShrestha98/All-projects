import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { PaginatedResponse } from '../types';

export interface BatchSummaryMasterResponseType {
  idx: string;
  code: string;
  partner_code: string;
}

interface IGetParamsType {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  page: number;
  pageSize?: number;
  status?: string;
  ordering?: string;
  page_size?: number;
}

const generateFormattedParams = (params: IGetParamsType) => {
  params.page_size = params.pageSize;
  delete params.sortBy;
  delete params.pageSize;
  return params;
};

export const getBatchSummaryMasterData = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<BatchSummaryMasterResponseType>
  >('batch-summary-code/', {
    params,
  });
  return data;
};

export const useBatchSummaryMasterData = ({
  page = 1,
  pageSize = 10,
}: {
  page: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ['batch-master', page, pageSize],
    queryFn: async () =>
      getBatchSummaryMasterData({
        page,
        pageSize,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { PaginatedResponse } from '../types';

export interface ConversionFactorResponseType {
  conversion_factor: string;
  idx: string;
  product_code: string;
  quantity_unit: string;
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

export const getConversionFactorData = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<ConversionFactorResponseType>
  >('quantity-unit/', {
    params,
  });
  return data;
};

export const useConversionFactorData = ({
  page = 1,
  pageSize = 10,
  product_code = '',
}: {
  page: number;
  pageSize: number;
  product_code: string;
}) => {
  return useQuery({
    queryKey: ['conversion-factor', page, pageSize, product_code],
    queryFn: async () =>
      getConversionFactorData({
        page,
        pageSize,
        product_code,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

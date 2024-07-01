import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { PaginatedResponse } from '../types';

export interface ListType<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}

export interface CustomerMasterResponseType {
  idx: string;
  customer_code: string;
  customer_name: string;
  partner_code: string;
  address: string;
  post_number: string;
  telephone: string;
  course_code: string;
  course_name: string;
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

export const getCustomerMasterData = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<CustomerMasterResponseType>
  >('customer/', {
    params,
  });
  return data;
};

export const useCustomerMasterData = ({
  page = 1,
  pageSize = 10,
  customerCode = '',
  customerName = '',
  partnerCode = '',
}: {
  page: number;
  pageSize: number;
  customerCode: string;
  customerName: string;
  partnerCode: string;
}) => {
  return useQuery({
    queryKey: [
      'customer-master',
      page,
      pageSize,
      customerCode,
      customerName,
      partnerCode,
    ],
    queryFn: async () =>
      getCustomerMasterData({
        page,
        pageSize,
        customer_code: customerCode,
        customer_name: customerName,
        partner_code: partnerCode,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

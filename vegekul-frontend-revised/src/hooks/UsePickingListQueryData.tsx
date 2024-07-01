import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { PaginatedResponse } from '../types';

export interface ListType<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}

export interface InterventionType {
  idx: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface PickingListResponseType {
  idx: string;
  invoice_date: string;
  customer_code: string;
  customer_name: string;
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

export const getPickingList = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<PickingListResponseType>
  >('picking-list/all/', {
    params,
  });
  return data;
};

export const usePickingListData = ({
  page = 1,
  pageSize = 10,
  customerName = '',
  customerCode = '',
  deliveryDate = '',
  partnerCode = '',
}) => {
  return useQuery({
    queryKey: [
      'pickinglist',
      page,
      customerName,
      customerCode,
      deliveryDate,
      partnerCode,
      pageSize,
    ],
    queryFn: async () =>
      getPickingList({
        page,
        pageSize,
        customer_name: customerName,
        customer_code: customerCode,
        delivery_date: deliveryDate,
        partner_code: partnerCode,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

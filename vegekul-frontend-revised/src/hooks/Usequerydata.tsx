import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { OrderList, PaginatedResponse } from '../types';

export interface UserType {
  idx: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
}

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

export interface UserResponseType {
  idx: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: string;
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
  if (params.ordering === 'ascending') {
    params.ordering = params.sortBy;
  } else {
    params.ordering = '-' + params.sortBy;
  }

  params.page_size = params.pageSize;
  delete params.sortBy;
  delete params.pageSize;
  delete params.orderBy;
  return params;
};

export const getOrders = async (params: any) => {
  params = generateFormattedParams(params);

  const { data } = await backendApi.get<PaginatedResponse<OrderList>>(
    'order/all/',
    { params }
  );
  return data;
};

const getOrderSummary = async (params: any) => {
  params = generateFormattedParams(params);

  const { data } = await backendApi.get<PaginatedResponse<OrderList>>(
    'order-summary/',
    { params }
  );
  return data;
};
export const useOrdersData = ({
  sortBy = 'title',
  mode,
  page = 1,
  pageSize = 10,
  customerName = '',
  productName = '',
  deliveryDate = '',
  batchSummaryCode = '',
  customerCode = '',
  partnerCode = '',
  source = 'moriki',
}) => {
  page === 0 && (page = 1);
  return useQuery({
    queryKey: [
      'list-inquiry-order',
      page,
      sortBy,
      mode,
      customerName,
      productName,
      customerCode,
      deliveryDate,
      batchSummaryCode,
      pageSize,
      partnerCode,
      source,
    ],
    queryFn: async () =>
      getOrders({
        page,
        pageSize,
        sortBy,
        mode,
        customer_name: customerName,
        product_name: productName,
        delivery_date: deliveryDate,
        batch_summary_code: batchSummaryCode,
        customer_code: customerCode,
        partner_code: partnerCode,
        source,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
export const useOrderSummaryData = ({
  sortBy = 'title',
  page = 1,
  pageSize = 10,
  productName = '',
  deliveryDate = '',
  source = 'moriki',
  partnerCode = '',
}) => {
  page === 0 && (page = 1);
  return useQuery({
    queryKey: [
      'order-summary',
      page,
      sortBy,
      productName,
      deliveryDate,
      partnerCode,
      pageSize,
      source,
    ],
    queryFn: async () =>
      getOrderSummary({
        page,
        pageSize,
        sortBy,
        product_name: productName,
        delivery_date: deliveryDate,
        partner_code: partnerCode,
        source,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

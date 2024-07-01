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

export interface ItemResponseType {
  idx: string;
  code: string;
  text: string;
  sort_key: number;
  supplier_code: string;
  unit: string;
  variety: string;
  production_area: string;
  partner: string;
  partner_product_code: string;
  size: string;
}

interface IGetParamsType {
  search?: string;
  sortBy?: string;
  page: number;
  pageSize?: number;
  page_size?: number;
}

const generateFormattedParams = (params: IGetParamsType) => {
  params.page_size = params.pageSize;
  delete params.sortBy;
  delete params.pageSize;
  return params;
};

export const getItems = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<PaginatedResponse<ItemResponseType>>(
    // `item/`,
    'item/moriki-list/',
    {
      params,
    }
  );
  return data;
};

export const useItemData = ({
  code = '',
  partnerItemCode = '',
  productionArea = '',
  productName = '',
  page = 1,
  pageSize = 10,
}) => {
  return useQuery({
    queryKey: [
      'items',
      page,
      code,
      partnerItemCode,
      productionArea,
      productName,
      pageSize,
    ],
    queryFn: async () =>
      getItems({
        page,
        pageSize,
        code: code,
        partner_item_code: partnerItemCode.replace(/^0+/, ''),
        production_area: productionArea,
        product_name: productName,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

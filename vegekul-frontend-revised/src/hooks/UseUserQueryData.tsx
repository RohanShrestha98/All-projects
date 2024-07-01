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

export interface UserResponseType {
  idx: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: string;
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

const pageSize = 10;

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

export const getUsers = async (params: any) => {
  params = generateFormattedParams(params);
  const url = `${params?.isPartnerDomain ? '/business-partner-user' : '/user'}`;
  const { data } = await backendApi.get<PaginatedResponse<UserResponseType>>(
    url,
    {
      params,
    }
  );
  return data;
};

export const useUsersData = ({
  page = 1,
  pageSize = 10,
  familyName = '',
  email = '',
  isPartnerDomain = false,
}) => {
  return useQuery({
    queryKey: ['users', page, familyName, email, pageSize],
    queryFn: async () =>
      getUsers({
        page,
        pageSize,
        last_name: familyName,
        email: email,
        isPartnerDomain,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

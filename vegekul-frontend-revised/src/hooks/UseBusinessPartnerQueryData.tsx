import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { PaginatedResponse, UserResponseType } from '../types';

export interface ListType<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}

export interface BusinessPartnerResponseType {
  idx: string;
  code: string;
  name: string;
  address: string;
  telephone: string;
  fax: string;
  manager?: UserResponseType;
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

export const getBusinessPartner = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<BusinessPartnerResponseType>
  >('business-partner/', {
    params,
  });
  return data;
};

export const getCurrentUserPartners = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<BusinessPartnerResponseType>
  >('partner-user/', {
    params,
  });
  return data;
};

export const useBusinessPartnerData = ({
  page = 1,
  pageSize = 10,
  code = '',
  name = '',
  user = '',
}) => {
  return useQuery({
    queryKey: ['businesspartner', code, name, page, pageSize, user],
    queryFn: async () =>
      getBusinessPartner({
        page,
        pageSize,
        code,
        name,
        user,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

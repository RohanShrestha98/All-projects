import { useQuery } from "@tanstack/react-query";
import { backendApi } from "../utils/axios";
import { PaginatedResponse } from "../types";

export interface ListType<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}

export interface CompanyMasterResponseType {
  idx: string;
  code: string;
  name: string;
  post_number: string;
  prefacture: string;
  city: string;
  street: string;
  telephone: string;
  fax: string;
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

export const getCompanyMaster = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<
    PaginatedResponse<CompanyMasterResponseType>
  >(`company/`, {
    params,
  });
  return data;
};

export const useCompanyMasterData = ({
  page = 1,
  pageSize = 10,
  code = "",
  name = "",
}) => {
  return useQuery({
    queryKey: ["company"],
    queryFn: async () =>
      getCompanyMaster({
        page,
        pageSize,
        code: code,
        name: name,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

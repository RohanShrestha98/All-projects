import { useQuery } from '@tanstack/react-query';
import { PaginatedResponse, QuantityUnitResponseType } from '../types';
import { backendApi } from '../utils/axios';

export const getQuantityUnitList = async (params: any) => {
  const { data } = await backendApi.get<
    PaginatedResponse<QuantityUnitResponseType>
  >('/quantity-unit/', {
    params,
  });
  return data;
};

export const useQuantityUnitData = ({
  page = 1,
  page_size = 10,
  productCode = '',
  productName = '',
}) => {
  return useQuery({
    queryKey: ['quantity-unit', page, productCode, page_size, productName],
    queryFn: async () =>
      getQuantityUnitList({
        page,
        page_size,
        product_code: productCode,
        product_name: productName,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

import { useQuery } from '@tanstack/react-query';
import { backendApi } from '../utils/axios';
import { CourseResponseType, PaginatedResponse } from '../types';

export interface ListType<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
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

export const getCourses = async (params: any) => {
  params = generateFormattedParams(params);
  const { data } = await backendApi.get<PaginatedResponse<CourseResponseType>>(
    'course/',
    {
      params,
    }
  );
  return data;
};

export const useCourseData = ({
  page = 1,
  pageSize = 10,
  code = '',
  name = '',
}) => {
  return useQuery({
    queryKey: ['course-master', page, code, name, pageSize],
    queryFn: async () =>
      getCourses({
        page,
        pageSize,
        code: code,
        name: name,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

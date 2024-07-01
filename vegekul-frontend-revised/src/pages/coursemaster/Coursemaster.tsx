import { createRef, forwardRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import CourseMasterTable from '../../components/table/Coursemaster';
import CourseFormModel from './CourseFormModel';
import { AddSvg } from '../../icons/Allsvgs';
import { useCourseMasterMutation } from '../../hooks/UseCourseMasterMutatedData';
import { useCourseData } from '../../hooks/UseCourseMasterQuery';
import '../../App.scss';
import { CourseResponseType } from '../../types';
import { useAuth } from '../../context/Authcontext';
import { BiSearch, BiTrash } from 'react-icons/bi';

const CourseMaster = forwardRef(({ t }: { t: TFunction }, ref: any) => {
  const { roles } = useAuth();

  const courseMutation = useCourseMasterMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const [pageDetail, setPageDetail] = useState({
    page: searchParams.get('page') || 1,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [clearSelection, setClearSelection] = useState<any>(false);

  const tableRef = createRef<{
    resetRowSelection: () => () => void;
  }>();

  const name = searchParams.get('name') || '';
  const code = searchParams.get('code') || '';

  const { data, isLoading, isError, refetch } = useCourseData({
    page: Number(pageDetail.page),
    pageSize: Number(pageDetail.pageSize),
    code,
    name,
  });

  const filterHandler = (params: any, e: any) => {
    e.preventDefault();
    searchParams.set('name', params.name);
    searchParams.set('code', params.code);
    setSearchParams(searchParams);
    setPageDetail(prev => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPageDetail({ page, pageSize });
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const handleDelete = (idx: string) => {
    courseMutation.mutateAsync(['delete', `${idx}/`], {
      onSuccess: () => {
        toast.success(t('coursesDeletedSuccessfully'));
        refetch();
      },
      onError: (err: AxiosError) => {
        const errData: any = err?.response?.data;
        if (errData && errData.detail) {
          toast.error(errData.detail);
        } else if (errData) {
          Object.keys(errData).forEach(eachErr => {
            toast.error(`${eachErr}: ${errData[eachErr][0]}`);
          });
        } else {
          toast.error(t('anErrorOccurredWhileDeletingTheUser'));
        }
      },
    });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.error(t('pleaseSelectAtLeastOneCourse'));
      return;
    }
    courseMutation
      .mutateAsync(['delete', 'bulk/', { course_ids: selectedRows }])
      .then(() => {
        setClearSelection(true);
        toast.success(t('coursesDeletedSuccessfully'));
        refetch();
      })
      .catch(() => {
        toast.error(t('errorOccuredWhileDeletingTheCourses'));
      });
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('courseMaster')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-4 searchField">
          <p className="mb-4 text-lg font-medium text-textColor">
            {t('masterDataSearch')}
          </p>
          <form onSubmit={handleSubmit(filterHandler)}>
            <div className="flex gap-3">
              <div className="flex flex-col gap-[2px] w-1/4">
                <label className="text-sm">{t('courseName')}</label>
                <input
                  type="text"
                  placeholder={t('courseName')}
                  className=" px-3 py-2  rounded-4 font-normal text-sm border  text-inputColor outline-none"
                  defaultValue={name}
                  {...register('name')}
                />
              </div>
              <div className="flex flex-col gap-[2px] w-1/4">
                <label className="text-sm">{t('courseCode')}</label>
                <input
                  type="text"
                  className=" px-3 py-2 rounded-4 font-normal text-sm border  text-inputColor outline-none"
                  placeholder={t('courseCode')}
                  defaultValue={code}
                  {...register('code')}
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="button flex items-center justify-center gap-1"
              >
                <div>
                  <BiSearch size={16} />
                </div>
                {t('search')}
              </button>
            </div>
          </form>
        </div>
        <div className="flex -flex-row justify-end gap-3 mt-5">
          {roles.includes('Super Dashboard Admin') && (
            <section className="flex justify-end">
              <CourseFormModel triggerClassName="button flex flex-row justify-center ">
                <AddSvg className="h-5 mt-[2px]" />
                <span>{t('addCourse')}</span>
              </CourseFormModel>
            </section>
          )}
          {roles.includes('Super Dashboard Admin') && (
            <div className="flex -flex-row justify-between items-center">
              <button
                type="submit"
                onClick={handleBulkDelete}
                className="button flex items-center justify-center gap-1"
              >
                <div>
                  <BiTrash size={16} className="mt-[-2px]" />
                </div>
                {t('bulkDelete')}
              </button>
            </div>
          )}
        </div>

        <CourseMasterTable
          data={data?.results && data.results}
          handleDelete={handleDelete}
          setPageDetail={handlePageChange}
          count={data?.count}
          selectedLength={selectedRows?.length}
          setCardData={(rows: CourseResponseType[]) => {
            setSelectedRows(rows.map(each => each.idx));
          }}
          isLoading={isLoading}
          isError={isError}
          clearSelection={clearSelection}
          setClearSelection={() => setClearSelection(false)}
          pageSize={pageDetail.pageSize}
          page={Number(pageDetail.page)}
        />
      </div>
    </div>
  );
});

export default withTranslation()(CourseMaster);

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useQueryData = (key, path, params = "", enabled = true) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: params,
      }).then(res => res?.data && res?.data),
    enabled,
  });
};

const useInfiniteQueryData = (queryKey, path, params) => {
  const axiosPrivate = useAxiosPrivate();
  return useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) =>
      axiosPrivate
        .get(path, { params: { role: params.role, page: pageParam } })
        .then(res => res?.data),
    {
      getNextPageParam: lastPage => {
        const nextPage =
          lastPage?.data?.length === 10 ? lastPage.currentPage + 1 : undefined;
        return nextPage;
      },
      enabled: params?.role > 0,
    },
  );
};

export const useSingleUserData = () =>
  useQueryData(["singleUser", "api/v1/user/"]);

export const useStudentData = () =>
  useQueryData(["student"], "api/v1/student/list/");

export const useStudentByGradeData = ({ gradeId }) =>
  useQueryData(
    ["studentByGrade", gradeId],
    `api/v1/student/list/?grade=${gradeId}`,
    "",
    !!gradeId,
  );

export const useRoleData = () => useQueryData(["roles"], "api/v1/role/list/");

export const useRolePermissionData = () =>
  useQueryData(["roles_Permission"], "api/v1/role/permissions/");

export const useCategoryPermissionData = () =>
  useQueryData(["category_Permission"], "api/v1/category/permissions/");

export const useCourseData = () =>
  useQueryData(["course"], "api/v1/course/list/");

export const useCourseByGradeData = ({ gradeId }) =>
  useQueryData(
    ["courseByGrade", gradeId],
    `api/v1/grade/courses/${gradeId}`,
    "",
    !!gradeId,
  );

export const useUnitData = () => useQueryData(["unit"], "api/v1/unit/list/");

export const useUnitByCourseData = ({ courseId }) =>
  useQueryData(
    ["unitByCourse", courseId],
    `api/v1/course/units/${courseId}`,
    "",
    !!courseId,
  );

export const useCourseSkillData = () =>
  useQueryData(["courseSkill"], "api/v1/course/");

export const usePermissionsByRole = ({ roleId }) => {
  return useQueryData(
    ["permissionByRole", roleId],
    `api/v1/role/permissions/${roleId}/`,
    "",
    !!roleId,
  );
};

export const useRoleByUserData = params => {
  return useInfiniteQueryData(
    ["userByRole", params],
    "api/v1/user/list/",
    params,
    !!params?.role,
  );
};

export const useGradeData = () => useQueryData(["grade"], "api/v1/grade/list/");

export const useUserByGrade = ({ gradeId }) =>
  useQueryData(
    ["allStudentsListByGrade", gradeId],
    `api/v1/student/list/?grade=${gradeId}`,
    "",
    !!gradeId,
  );

export const useSectionData = () =>
  useQueryData(["section"], "api/v1/section/list/");

export const useSectionByGradeData = ({ gradeId }) =>
  useQueryData(
    ["sectionByGrade", gradeId],
    `api/v1/section/grade/${gradeId}`,
    "",
    !!gradeId,
  );

export const useNoteByCourseData = ({ courseId }) =>
  useQueryData(
    ["noteByCourse", courseId],
    `api/v1/notes/list/course/${courseId}`,
    "",
    !!courseId,
  );

export const useNoteByContentData = ({ contentId }) =>
  useQueryData(
    ["noteByContent", contentId],
    `api/v1/notes/list/content/${contentId}`,
    "",
    !!contentId,
  );

export const useConsultCommentByContentData = ({
  contentId,
  askTeacherClick,
}) =>
  useQueryData(
    ["consult-comment", contentId, askTeacherClick],
    `api/v1/consult/list/content/${contentId}`,
    "",
    !!contentId,
  );

export const useBlogData = ({ search }) =>
  useQueryData(["blog", search], `api/v1/blog/list/?search=${search}`);

export const useBlogDetailsData = ({ blogId, refetch }) =>
  useQueryData(
    ["blogDetails", blogId, refetch],
    `api/v1/blog/details/${blogId}`,
    "",
    !!blogId,
  );

export const useTopBlogData = () =>
  useQueryData(["blog"], `api/v1/blog/list/?search=topThisMonth`);

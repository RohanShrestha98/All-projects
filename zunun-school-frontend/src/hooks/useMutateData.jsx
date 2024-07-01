import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useMutate = (
  queryKey,
  basePath,
  contentType = "application/json",
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async params => {
      const requestData = {
        method: params[0],
        url: basePath + params[1],
        data: params[2],
        headers: {
          "Content-Type": contentType,
        },
      };
      const response = await axiosPrivate(requestData);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: err => {
      return err?.response?.data;
    },
  });
  return mutation;
};

export const useAuthMutation = () =>
  useMutate(["auth"], "auth/v1/account/login/");

export const useStudentProfileMutation = () =>
  useMutate(["student-profile"], "api/v1/student/");

export const useLogoutMutation = () =>
  useMutate(["logout"], "auth/v1/account/logout/");

export const useUserMutation = () => useMutate(["user"], "api/v1/user/");

export const useFileUploadMutation = () =>
  useMutate(["upload-file"], "api/v1/file/upload/", "multipart/form-data");
export const useStudentBulkUploadMutation = () =>
  useMutate(
    ["allStudents"],
    "/api/v1/student/create/csv/",
    "multipart/form-data",
  );

export const useUserSearchMutation = () =>
  useMutate(["user-search"], "api/v1/user/search/");

export const useConsultCommentMutation = ({ contentId }) =>
  useMutate(
    ["consult-comment", contentId],
    `api/v1/consult/create/${contentId}`,
  );

export const useBlogMutation = () => useMutate(["blog"], "api/v1/blog/");

export const useBlogCommentMutation = ({ blogId }) =>
  useMutate(["blog-comment", blogId], `api/v1/blog/comment/${blogId}`);

export const useBlogCommentDeleteMutation = ({ commentId }) =>
  useMutate(
    ["blog-comment-delete", commentId],
    `api/v1/blog/delete-comment/${commentId}`,
  );

export const useBlogCommentUpdateMutation = ({ commentId }) =>
  useMutate(
    ["blog-comment-update", commentId],
    `api/v1/blog/update-comment/${commentId}/`,
  );

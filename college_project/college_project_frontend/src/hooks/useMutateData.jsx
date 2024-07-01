import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useMutate = (
  queryKey,
  basePath,
  contentType = "application/json"
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (params) => {
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
    onError: (err) => {
      return err?.response?.data;
    },
  });
  return mutation;
};

export const useAuthMutation = () => useMutate(["auth"], "api/users/login");
export const useAuthRegisterMutation = () =>
  useMutate(["register"], "api/users/register");
export const useAdminAuthRegisterMutation = () =>
  useMutate(["admin-register"], "api/admins/register");
export const useDocumentMutation = () =>
  useMutate(["admin-documemt"], "api/admins/document/", "multipart/form-data");
export const useFileMutation = () =>
  useMutate(["file-upload"], "api/file/upload/", "multipart/form-data");
export const useDocumentUpdateMutation = () =>
  useMutate(["admin-documemt"], "api/admins/document/");
export const useCategoryMutation = () =>
  useMutate(["category"], "api/category/");
export const useCreateContactMutation = () =>
  useMutate(["contact"], "api/contacts");
export const useApproveShopMutation = () =>
  useMutate(["shop-approve"], "api/shop/approve");

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { publicApiRoute, privateApiRoute } from "../config/config";

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
        method: params?.[0],
        url:
          (queryKey[0] === "auth" || queryKey[0] === "verify-otp"
            ? publicApiRoute
            : privateApiRoute) +
          basePath +
          params?.[1],
        data: params?.[2],
        headers: {
          "Content-Type": contentType,
        },
      };

      const response = await axiosPrivate(requestData);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (err) => {
      return err?.response?.data;
    },
  });
  return mutation;
};

export const useAuthMutation = () => useMutate(["auth"], "login/");

export const useAuthSignupMutation = () => useMutate(["auth"], "register");
export const useOTPVerifyMutation = () =>
  useMutate(["verify-otp"], "verify-otp/");

export const useResendOTPMutation = () => useMutate(["auth"], "resend-otp/");

export const useResetPasswordMutation = () =>
  useMutate(["auth"], "reset-password/");

export const useRemoveEnrollCourseMutation = (currentModule) =>
  useMutate(["remove-enroll-course"], `${currentModule}/access/remove/`);
export const useEnrollCourseMutation = () =>
  useMutate(["enroll-course"], `course/enroll/`);

export const usetestSubmitMutation = () =>
  useMutate(["test-submit"], "test/submit/");

export const useBookmarkMutation = () => useMutate(["bookmark"], "bookmark/");
export const useVerifyPayment = () =>
  useMutate(["payment-verify"], "payment/verify/");

export const useStudentProfileMutation = () =>
  useMutate(["studentProfile"], "api/v1/student/");

export const useLogoutMutation = () => useMutate(["auth"], "auth/v3/logout/");

export const useUserMutation = () => useMutate(["user"], "api/v1/user/");

export const useFileUploadMutation = () =>
  useMutate(["upload-file"], "api/v1/file/upload/", "multipart/form-data");

export const useProfileMutation = (moduleId) =>
  useMutate(["profile"], `${moduleId}/profile`);

export const useProfileImageUploadMutation = (moduleId) =>
  useMutate(
    ["profile-image"],
    `${moduleId}/profile/upload`,
    "multipart/form-data"
  );

export const useDiscussionMutation = () =>
  useMutate(["discussion"], `discussion/create/`);

export const usePollMutation = () => useMutate(["poll"], `poll/create/`);

export const usePollVoteMutation = () => useMutate(["poll-vote"], `poll/vote`);

export const useDiscussionVoteMutation = (discussionId) =>
  useMutate(["discussion-vote"], `discussion/vote/${discussionId}/`);

export const useDiscussionReplyMutation = () =>
  useMutate(["discussion-reply"], `reply/create/`);

export const useVideoCommentMutation = (moduleId, videoId) =>
  useMutate(["video-comment"], `${moduleId}/video/comment?videoId=${videoId}`);

export const useKhaltiPaymentMutation = () =>
  useMutate(["khalti-initiate"], `payment/initiate-khalti/`);

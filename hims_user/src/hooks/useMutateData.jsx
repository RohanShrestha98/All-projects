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
      return response;
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

export const useAuthMutation = () => useMutate(["auth"], "/accounts/login/");
export const useAuthRegisterMutation = () =>
  useMutate(["register"], "/accounts/register/");
export const useProfileInfoMutation = () =>
  useMutate(
    ["profile-info"],
    "/mobile_user/profile-info/",
    "multipart/form-data"
  );
export const useEducationInfoMutation = () =>
  useMutate(["education"], "/mobile_user/education/");
export const useExperienceInfoMutation = () =>
  useMutate(["experience"], "/mobile_user/work-experience/");
export const useCertificateMutation = () =>
  useMutate(["certification"], "/mobile_user/certification/");
export const useContactDetailsMutation = () =>
  useMutate(["contact-details"], "/mobile_user/contact-details/");
export const useApplyJobMutation = () =>
  useMutate(["jobs"], "/vacancy/applicant-management/");
export const useJoinProgramMutation = () =>
  useMutate(
    ["programs"],
    "/programs/program-info/join-by-program/",
    "multipart/form-data"
  );
export const useApplyJobSaveMutation = () =>
  useMutate(["jobs"], "/vacancy/jobs-management-save/");
export const useVitalMutation = () =>
  useMutate(["vital"], "/mobile_user/vital/");
export const useMedicationMutation = () =>
  useMutate(["medication"], "/mobile_user/medication/", "multipart/form-data");
export const useCreateContactMutation = () =>
  useMutate(["contact"], "api/contacts");
export const useHospitalMutation = () =>
  useMutate(["hospitals"], "hospital/hospital-management/");
export const useInventoryMutation = () =>
  useMutate(
    ["inventory"],
    "inventory/inventory-management/",
    "multipart/form-data"
  );
export const usePartnerMutation = () =>
  useMutate(
    ["partner-data-collection"],
    "/partner/partner-data-collection/",
    "multipart/form-data"
  );
export const useServiceDataMutation = () =>
  useMutate(["service-data"], "services/hospital-services-management/");

export const useServiceDataUpdateMutation = () =>
  useMutate(
    ["service-data-update"],
    `services/services-data-collection-management/`
  );
export const useInventoryUpdateMutation = (idx) =>
  useMutate(
    ["inventory", "details", idx],
    "PUT",
    `inventory/inventory-management/${idx}/`,
    true
  );

export const useHospitalServiceMutation = () =>
  useMutate(["hospital-service"], `services/hospital-services-management/`);
export const usePersonalInfoMutation = () =>
  useMutate(["profile-info"], `mobile_user/profile-info/`);
export const useProfileDocumentMutation = () =>
  useMutate(["profile-document"], `mobile_user/documents/`);
export const useWorkExperienceMutation = () =>
  useMutate(["work-experience"], `mobile_user/work-experience/`);
export const useEducationMutation = () =>
  useMutate(["education"], `mobile_user/education/`);
export const useTrainingMutation = () =>
  useMutate(["training"], `mobile_user/training/`);
export const useCertificationMutation = () =>
  useMutate(["certification"], `mobile_user/certification/`);

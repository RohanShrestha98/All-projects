import { useQuery } from "@tanstack/react-query";
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
      }).then((res) => res?.data && res?.data),
    enabled,
  });
};

export const useContactData = () => useQueryData(["contacts"], "api/contacts");
export const useHospitalData = () =>
  useQueryData(["hospital"], "/hospital/hospital-dropdown/all/");
export const useProfileInfoData = () =>
  useQueryData(["profile-info"], "/mobile_user/profile-info/");
export const useSingleContactDetailData = ({ id }) =>
  useQueryData(
    ["single-contact-details"],
    `/mobile_user/contact-details/${id}`
  );
export const useContactDetailData = () =>
  useQueryData(["contact-details"], `/mobile_user/contact-details/`);
export const useEducationData = () =>
  useQueryData(["education"], "/mobile_user/education/");
export const useDocumentData = () =>
  useQueryData(["profile-document"], "/mobile_user/documents/");
export const useExperienceData = () =>
  useQueryData(["experience"], "/mobile_user/work-experience/");
export const useLibaryData = () =>
  useQueryData(["library"], "/library/book-management/");
export const useFormStatusData = () =>
  useQueryData(["form-status"], "/accounts/form-status/");
export const useNoticeData = () =>
  useQueryData(["notice"], "/communication/notice/");
export const useProgramsData = () =>
  useQueryData(["programs"], "/programs/program-info/");
export const useProgramsAttendanceData = ({ idx }) =>
  useQueryData(
    ["programs", idx],
    `/programs/program-info/${idx}/get_content_by_program/`,
    "",
    !!idx
  );
export const useVitalData = () =>
  useQueryData(["vital"], "/mobile_user/vital/");
export const useMedicationData = ({ search }) =>
  useQueryData(
    ["medication", search],
    `/mobile_user/medication/?search=${search}`
  );
export const useNotificationData = () =>
  useQueryData(["notification"], "/accounts/notification/");
export const useLibaryDetailsData = ({ idx }) =>
  useQueryData(["book-details"], `/library/book-management/${idx}/get_book/`);

export const useInventoryData = ({
  search = "",
  ordering = "",
  filter_type = "",
  page = 1,
  pageSize = 7,
}) =>
  useQueryData(
    ["inventory", search, ordering, page, pageSize, filter_type].filter(
      (str) => str !== ""
    ),
    "inventory/inventory-management/",
    { page, page_size: pageSize, search, ordering, filter_type }
  );

export const useAllDepartmentData = () =>
  useQueryData(
    ["all-department"],
    "inventory/hospital-department-management/all/"
  );
export const usePartnerFormData = ({ title }) =>
  useQueryData(
    ["partner-form-management", title],
    `/partner/partner-form-management/filter-by-title/?title=${title}`
  );

export const useSubDepartmentsAllList = (idx) =>
  useQueryData(
    ["sub-departments-all-list", idx],
    `inventory/department-management/${idx}/get_departments/`
  );

export const usePartnerFormTitleData = () =>
  useQueryData(
    ["partner-form-management", "titles"],
    "/partner/partner-form-management/get-dropdown/"
  );

export const usePartnerCollectionData = () =>
  useQueryData(
    ["partner-data-collection"],
    "/partner/partner-data-collection/"
  );
export const useHospitalSubDepartmentsAllList = () =>
  useQueryData(
    ["hospital-sub-departments-all-list"],
    "inventory/hospital-sub-department-management/all/"
  );
export const useDepartnmentManagementHospitalDepartnment = ({ idx }) =>
  useQueryData(
    ["hospital-sub-departments-all-list"],
    `/inventory/department-management/${idx}/hospital_department/`
  );
export const useDepartmentItemsData = ({ department = "" }) =>
  useQueryData(
    ["department-items", department],
    "inventory/form-management/onlyitems/",
    { department }
  );
export const useFetchAllDynamicFormData = ({ department = "", item = "" }) =>
  useQueryData(
    ["inventory", "dynamic", "form", department, item],
    `inventory/form-management/all/`,
    { department, item }
  );
export const useHospitalServicesDataList = ({
  search = "",
  page = 1,
  pageSize = 7,
}) =>
  useQueryData(
    ["hospital-services-data-list", search, page, pageSize],
    `inventory/department-management/available_departments/`,
    { page, page_size: pageSize, search }
  );

export const useAddressData = (type, title) =>
  useQueryData(
    type && title ? ["address", type, title] : ["address"],
    "accounts/address/",
    { type, title }
  );

export const useExperienceCategoryData = ({ service }) =>
  useQueryData(
    ["experience-category", service],
    `mobile_user/experience-category/all/?service=${service}`,
    "",
    !!service
  );
export const useExperienceSubCategoryData = ({ category }) =>
  useQueryData(
    ["experience-category", category],
    `mobile_user/experience-subcategory/all/?category=${category}`,
    "",
    !!category
  );
export const useServiceData = () =>
  useQueryData(["service"], "mobile_user/service/all/");
export const useLevelData = () =>
  useQueryData(["level"], "mobile_user/level/all/");
export const usePostData = () =>
  useQueryData(["post"], "mobile_user/post/all/");
export const useResponsibilityData = () =>
  useQueryData(["responsibility"], "mobile_user/responsibility/all/");
export const useCertificationData = () =>
  useQueryData(["certification"], "mobile_user/certification/");
export const useSubResponsibilityData = ({ responsibility }) =>
  useQueryData(
    ["sub-responsibility", responsibility],
    `mobile_user/subresponsibility/all/?responsibility=${responsibility}`,
    "",
    !!responsibility
  );

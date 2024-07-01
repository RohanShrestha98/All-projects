import { useMutate } from "./Usemutatedata";

export const useCompanyMasterMutation = () =>
  useMutate(["company"], "company/");

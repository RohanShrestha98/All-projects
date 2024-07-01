import { useMutate } from "./Usemutatedata";

export const usePickingListOpsMutation = () =>
  useMutate(["pickinglist"], "picking-list/");

import { useMutate } from './Usemutatedata';

export const useQuantityUnitMasterMutation = () =>
  useMutate(['quantity-unit'], 'quantity-unit/');
export const useQuantityUnitBulkRegistration = () =>
  useMutate(['quantity-bulk-registration'], '');

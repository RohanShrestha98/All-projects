import { useMutate } from './Usemutatedata';

export const useConversionFactorMutation = () =>
  useMutate(['conversion-factor'], 'quantity-unit/');

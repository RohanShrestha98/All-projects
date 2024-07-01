import { useMutate } from './Usemutatedata';

export const useUserOpsMutation = () => useMutate(['users'], '/');

export const usePartnerUserOpsMutation = () => useMutate(['parnter-users'], '');

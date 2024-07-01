import { useMutate } from './Usemutatedata';

export type CustomerRequestProps = {
  partner_code: string;
  customer_code: string;
  customer_name1: string;
  customer_name2: string;
  post_number: string;
  address: string;
  telephone: string;
  course_code: string;
};

export const useCustomerMasterMutation = () =>
  useMutate(['customer'], 'customer/');

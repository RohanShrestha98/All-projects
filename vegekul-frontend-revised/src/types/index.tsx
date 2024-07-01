export interface PaginatedResponseType {
  links: { next: string; previous: string };
  page: number;
  page_size: number;
  total: number;
}

export interface UserType {
  idx: string;
  email?: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  oldPassword?: string;
  newPassword1?: string;
  newPassword2?: string;
  imageFile?: File | null;
  avatar?: File | null;
}

export interface UserResponseType {
  avatar?: any;
  idx: string;
  email: string;
  first_name: string;
  partner_code: string;
  last_name: string;
  is_active: string;
  roles?: string[];
}
export interface CourseResponseType {
  idx: string;
  code: string;
  name: string;
  partner_code: string;
  type_of_delivery: string;
}

export interface UserType {
  idx: string;
  email?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
  roles?: string[];
  oldPassword?: string;
  newPassword1?: string;
  newPassword2?: string;
  imageFile?: File | null;
  avatar?: File | null;
}

export interface OrderList {
  amount: number;
  customer_code: string;
  customer_name: string;
  delivery_date: string;
  id: number;
  idx: string;
  item_quantity: number;
  order_number: string;
  product_code: string;
  product_name: string;
  row: number;
  unit_of_measure: string;
  unit_price: number;
}

export interface PickingListType {
  idx: string;
  batch_summary_code: string;
  customer_name: string;
  customer_code: string;
  delivery_date: string;
  partner_code: string;
  last_fax_sent?: string;
  last_pdf_made?: string;
}
export const ItemTypes = {
  CARD: 'card',
};

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface QuantityUnitResponseType {
  idx: string;
  partner_code: string;
  product_code: string;
  product_name: string;
  alternate_quantity_unit: string;
  product_code_by_unit: string;
  unit_quantity: string;
  cargo_classification: string;
  cargo_category_name: string;
  order_classification: string;
  order_packaging_category: string;
  procurement_classification: string;
  purchase_cargo_classification: string;
  conversion_factor: string;
}

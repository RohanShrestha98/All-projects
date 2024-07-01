import { createColumnHelper } from '@tanstack/react-table';
import { Translation } from 'react-i18next';
import { dateHeaderValidator } from '../../../pages/importorderdata/renderers';
import { TableCell } from '../MorikiListInquiry/TableCell';
import EditCell from '../MorikiListInquiry/EditCell';
import IndeterminateCheckbox from '../../shared/IndeterminateCheckbox';

export interface MorikiOrderHeaderType {
  id: number;
  delivery_time: string;
  order_body: string;
  internal_code: string;
  item_standard: string;
  desired_unit_code: string;
  unit_code: string;
  unit_code_amount: string;
  item_tax_classification: string;
  item_registration: string;
  change_classification: string;
  delivery_carrier_name: string;
  delivery_location_code: string;
  jan_code_2: string;
  ordering_comments: string;
  temperature_range: string;
  receipt_date: string;
  voucher_control_number: string;
  shipping_code: string;
  payment_agency: string;
  payment_category: string;
  price_quote_number: string;
  quote_request_number: string;
  original_voucher_number: string;
  quotation_number: string;
  order_number_secondary: string;
  place_name_delivery: string;
  site: string;
  subject: string;
  total_product_body: string;
  total_item_consumption_tax: string;
  total_shipping_fees: string | string;
  total_shipping_consumption_tax: string;
  total_other_total: string | string;
  expected_shipping_date: string;
  shipment_date: string | string;
  delivery_location: string;
  order_number: string;
  order_date: string;
  company_employee_name: string;
  company_name: string;
  company_unit_code: string;
  customer_name: string;
  employee_name_at_customer: string;
  food_category_2: string;
  food_category_code: string;
  invoice_view_number: string;
  my_catalog_id: string;
  quantity_unit_code: string;
  subtotal: string;
  tax_classification: string;
  transaction_id: string;
  transaction_status: string;
  transaction_status_id: string;
  unit_code_char: string;
  voucher_id: string;
  consumption_tax_subtotal: string;
  idx: string;
  created_at: Date;
  created_date: Date;
  updated_at: Date;
  updated_at_manual: string;
  deleted_at: string;
  is_deleted: boolean;
  meta: string;
  invoice_date: Date;
  invoice_number: string;
  customer_code: string;
  internal_item_id: string;
  food_category_1: string;
  food_category_3: string;
  item_name: string;
  package_qty: number;
  package_qty_code: string;
  package_qty_unit: string;
  desired_unit_price: number;
  desired_quantity: number;
  requested_amount: number;
  unit_price: number;
  quantity: number;
  amount: number;
  total: number | string;
  delivery_date: Date;
  transmission_date: string;
  order_sent: string;
  update_date: Date | string;
  sort_key: number;
  batch_summary_code: string;
}

const morikiColumnHelper = createColumnHelper<MorikiOrderHeaderType>();

export const morikiOrderTableHeaders = [
  morikiColumnHelper.display({
    minSize: 80,
    maxSize: 80,
    id: 'edit',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          indeterminate: table.getIsSomeRowsSelected(),
          checked: table.getIsAllRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row, table }) => {
      return <EditCell row={row} table={table} />;
    },
  }),
  morikiColumnHelper.display({
    id: 'row',
    minSize: 80,
    maxSize: 80,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('row')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => <div>{(row.index + 1).toString().padStart(4, '0')}</div>,
  }),
  morikiColumnHelper.accessor('batch_summary_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('batchSummaryCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_code_bpaas', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('partnerItemCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('transaction_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transactionId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('invoice_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('invoiceDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('transaction_status_id', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transactionStatusId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('transaction_status', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transactionStatus')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('invoice_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('invoiceNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('invoice_view_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('invoiceViewNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('internal_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('internalCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('company_name', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('company_employee_name', {
    minSize: 350,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyEmployeeName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('customer_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('customerCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('customer_name', {
    minSize: 450,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('customerName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('employee_name_at_customer', {
    minSize: 350,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('employeeNameAtCustomer')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('internal_item_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('internalItemId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategoryCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_1', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategory1')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_2', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategory2')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_3', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategory3')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_name', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_standard', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemStandard')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packageQty')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty_code', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packageQtyCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty_unitsaduhha', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packageQtyUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('desired_unit_price', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('desiredUnitPrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('desired_quantity', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('desiredQuantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('desired_unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('desiredUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('requested_amount', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('requestedAmount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_price', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitPrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quantity', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_code_char', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitCodeChar')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty_unit', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitCodeAmount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('amount', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('amount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('tax_classification', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('taxClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('consumption_tax_subtotal', {
    minSize: 300,
    size: 300,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('consumptionTaxSubtotal')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('subtotal', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('subtotal')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('my_catalog_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('myCatalogId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('voucher_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('voucherId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_tax_classification', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemTaxClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_registration', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemRegistration')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('change_classification', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('changeClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_product_body', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalProductBody')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_item_consumption_tax', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalItemConsumptionTax')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_shipping_fees', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalShippingFees')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_shipping_consumption_tax', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalShippingConsumptionTax')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_other_total', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalOtherTotal')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('total')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('expected_shipping_date', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('expectedShippingDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('shipment_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('shipmentDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('delivery_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('delivery_time', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryTime')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('temperature_range', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('temperatureRange')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('receipt_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('receiptDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('subject', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('subject')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('voucher_control_number', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('voucherControlNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('place_name_delivery', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('placeNameDelivery')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('delivery_location', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryLocation')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('shipping_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('shippingCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('delivery_carrier_name', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryCarrierName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('payment_agency', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('paymentAgency')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('payment_category', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('paymentCategory')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('price_quote_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('priceQuoteNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quote_request_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quoteRequestNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quotation_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quotationNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_number_secondary', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderNumberSecondary')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('original_voucher_number', {
    minSize: 280,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('originalVoucherNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('site', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('site')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('transmission_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transmissionDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_sent', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderSent')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('update_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('updateDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('delivery_location_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryLocationCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('company_unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quantity_unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quantityUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('jan_code_2', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('janCode2')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('ordering_comments', {
    minSize: 600,
    size: 600,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderingComments')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  /* listInquaryColumnHelper.display({
      id: "row",
      minSize: 60,
      maxSize: 60,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("row")}</span>
              </div>
            )}
          </Translation>
        );
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
    }),
    listInquaryColumnHelper.accessor("delivery_date", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("deliveryDate")}</span>
              </div>
            )}
          </Translation>
        );
      },
      cell: dateHeaderValidator,
    }),
    listInquaryColumnHelper.accessor("customer_code", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("customerCode")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("customer_name", {
      minSize: 650,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("customerName")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("product_code", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("productCode")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("product_name", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("productName")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("item_quantity", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("itemQuantity")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("unit_of_measure", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("unitOfMeasure")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("unit_price", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("unitPrice")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }),
    listInquaryColumnHelper.accessor("amount", {
      minSize: 140,
      header: () => {
        return (
          <Translation>
            {(t) => (
              <div>
                <span>{t("amountOfMoney")}</span>
              </div>
            )}
          </Translation>
        );
      },
    }), */
];

export const morikiOrderAddTableHeaders = [
  morikiColumnHelper.display({
    minSize: 80,
    maxSize: 80,
    id: 'edit',
    cell: ({ row, table }) => {
      return <EditCell row={row} table={table} />;
    },
  }),
  morikiColumnHelper.display({
    id: 'row',
    minSize: 80,
    maxSize: 80,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('row')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => <div>{(row.index + 1).toString().padStart(4, '0')}</div>,
  }),
  morikiColumnHelper.accessor('batch_summary_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('batchSummaryCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_code_bpaas', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemCodeBpaas')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('transaction_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transactionId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('invoice_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('invoiceDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('transaction_status_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transactionStatusId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('transaction_status', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transactionStatus')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('invoice_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('invoiceNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('invoice_view_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('invoiceViewNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('internal_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('internalCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('company_name', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('company_employee_name', {
    minSize: 350,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyEmployeeName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('customer_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('customerCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('customer_name', {
    minSize: 450,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('customerName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('employee_name_at_customer', {
    minSize: 350,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('employeeNameAtCustomer')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('internal_item_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('internalItemId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategoryCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_1', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategory1')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_2', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategory2')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('food_category_3', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodCategory3')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_name', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_standard', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemStandard')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packageQty')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packageQtyCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('package_qty_unit', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packageQtyUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('desired_unit_price', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('desiredUnitPrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('desired_quantity', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('desiredQuantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('desired_unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('desiredUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('requested_amount', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('requestedAmount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_price', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitPrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quantity', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_code_char', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitCodeChar')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('unit_code_amount', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitCodeAmount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('amount', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('amount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('tax_classification', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('taxClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('consumption_tax_subtotal', {
    minSize: 300,
    size: 300,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('consumptionTaxSubtotal')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('subtotal', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('subtotal')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('my_catalog_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('myCatalogId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('voucher_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('voucherId')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_tax_classification', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemTaxClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('item_registration', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('itemRegistration')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('change_classification', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('changeClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_product_body', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalProductBody')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_item_consumption_tax', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalItemConsumptionTax')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_shipping_fees', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalShippingFees')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_shipping_consumption_tax', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalShippingConsumptionTax')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total_other_total', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('totalOtherTotal')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('total', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('total')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('expected_shipping_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('expectedShippingDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('shipment_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('shipmentDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('delivery_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('delivery_time', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryTime')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('temperature_range', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('temperatureRange')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('receipt_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('receiptDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('subject', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('subject')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('voucher_control_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('voucherControlNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('place_name_delivery', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('placeNameDelivery')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('delivery_location', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryLocation')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('shipping_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('shippingCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('delivery_carrier_name', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryCarrierName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('payment_agency', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('paymentAgency')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('payment_category', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('paymentCategory')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('price_quote_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('priceQuoteNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quote_request_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quoteRequestNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quotation_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quotationNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('order_number_secondary', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderNumberSecondary')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('original_voucher_number', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('originalVoucherNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('site', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('site')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('transmission_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('transmissionDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('order_sent', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderSent')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('update_date', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('updateDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
    meta: {
      type: 'date',
    },
  }),
  morikiColumnHelper.accessor('delivery_location_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('deliveryLocationCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('company_unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('quantity_unit_code', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quantityUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('jan_code_2', {
    minSize: 200,
    size: 200,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('janCode2')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.accessor('ordering_comments', {
    minSize: 600,
    size: 600,
    enableResizing: true,
    cell: TableCell,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderingComments')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
];

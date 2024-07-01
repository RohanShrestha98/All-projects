import { Translation } from 'react-i18next';
import { dateHeaderValidator } from '../../pages/importorderdata/renderers';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  PickingListType,
  QuantityUnitResponseType,
  UserResponseType,
} from '../../types';
import { ItemResponseType } from '../../hooks/UseItemQueryData';
import moment from 'moment';
import TimeZoneFunction from '../shared/TimeZoneFunction';
// import '../src/Mycomponents/style.css';
export const morikiColumnHelper = createColumnHelper();
export const productMasterColumnHelper = createColumnHelper<ItemResponseType>();
export const userMasterColumnHelper = createColumnHelper<UserResponseType>();
export const pickingListColumnHelper = createColumnHelper<PickingListType>();
export const quantiyUnitColumnHelper =
  createColumnHelper<QuantityUnitResponseType>();
export const morikiTableHeaders: ColumnDef[] = [
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
    cell: dateHeaderValidator,
  }),
  morikiColumnHelper.accessor('transaction_status_id', {
    minSize: 200,
    size: 200,
    enableResizing: true,
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
    minSize: 200,
    size: 200,
    enableResizing: true,
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
    cell: dateHeaderValidator,
  }),
  morikiColumnHelper.accessor('delivery_time', {
    minSize: 200,
    size: 200,
    enableResizing: true,
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
    minSize: 200,
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
    minSize: 200,
    size: 200,
    enableResizing: true,
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

export const quantityUnitHeaders = [
  quantiyUnitColumnHelper.display({
    id: 'row',
    minSize: 100,
    maxSize: 100,
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
  quantiyUnitColumnHelper.accessor('partner_code', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('partnerCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('product_code', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('product_name', {
    minSize: 300,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('alternate_quantity_unit', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('alternateQuantityUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('product_code_by_unit', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productCodeByUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('unit_quantity', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unitQuantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('cargo_classification', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('cargoClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('cargo_category_name', {
    minSize: 650,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('cargoCategoryName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('order_classification', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('order_packaging_category', {
    minSize: 650,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('orderPackagingCategory')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('procurement_classification', {
    minSize: 260,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('procurementClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.accessor('purchase_cargo_classification', {
    minSize: 300,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('purchaseCargoClassification')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  quantiyUnitColumnHelper.display({
    id: 'row',
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('conversionFactor')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {parseFloat(row.original.conversion_factor) !== 0.0
            ? (
              Math.ceil(parseFloat(row.original.conversion_factor) * 10) / 10
            ).toFixed(1)
            : 0.1}
        </div>
      );
    },
  }),
];

/* export const orderspreadsheettable: ColumnDef[] = [
  listInquaryColumnHelper.display({
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
              <span>{t("quantity")}</span>
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
              <span>{t("amountOfMOney")}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
]; */

export const usermaster: ColumnDef[] = [
  userMasterColumnHelper.display({
    id: 'row',
    minSize: 80,
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
  userMasterColumnHelper.accessor('email', {
    minSize: 350,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('emailAddress')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  userMasterColumnHelper.accessor('last_name', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('familyName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
];

export const orderSpreadSheetHeader: ColumnDef[] = [
  morikiColumnHelper.display({
    id: 'row',
    minSize: 80,
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
  // morikiColumnHelper.accessor('batch_summary_code', {
  //   minSize: 240,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('batchSummaryCode')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  // morikiColumnHelper.accessor('customer_name1', {
  //   minSize: 240,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('customerName')}1</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  // morikiColumnHelper.accessor('customer_name2', {
  //   minSize: 240,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('customerName')}2</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  // morikiColumnHelper.accessor('customer_code', {
  //   minSize: 140,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('customerCode')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  // morikiColumnHelper.accessor('customer_name', {
  //   minSize: 500,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('customerName')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  morikiColumnHelper.accessor('item_code', {
    minSize: 240,
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
  morikiColumnHelper.accessor('item_name', {
    minSize: 240,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('item')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  // morikiColumnHelper.accessor('unit_code_amount', {
  //   minSize: 240,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('unitCodeAmount')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  morikiColumnHelper.accessor('base_unit', {
    minSize: 240,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('baseUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiColumnHelper.display({
    id: 'row',
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('convertedQuantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.sum_qty_equivalent}</div>;
    },
  }),
  morikiColumnHelper.accessor('delivery_date', {
    minSize: 140,
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
    cell: dateHeaderValidator,
  }),
];

export const productmaster: ColumnDef[] = [
  productMasterColumnHelper.display({
    id: 'row',
    minSize: 80,
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
  productMasterColumnHelper.accessor('code', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('code')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('text', {
    minSize: 160,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('text')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('sort_key', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sortKey')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('supplier_code', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('supplierCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('unit', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('variety', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('variety')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('production_area', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productionArea')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  productMasterColumnHelper.accessor('partner', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('partner')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => <div>{row.original.partner?.bp_item_code}</div>,
  }),
  productMasterColumnHelper.accessor('size', {
    minSize: 200,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('size')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
];

export const pickinglist = [
  pickingListColumnHelper.display({
    id: 'row',
    minSize: 80,
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

  pickingListColumnHelper.accessor('customer_name', {
    minSize: 650,
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
  pickingListColumnHelper.accessor('customer_name2', {
    minSize: 650,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('customerName')}2</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  pickingListColumnHelper.accessor('customer_code', {
    minSize: 140,
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
  pickingListColumnHelper.accessor('delivery_date', {
    minSize: 140,
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
    cell: dateHeaderValidator,
  }),
  pickingListColumnHelper.accessor('last_fax_sent', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('lastFaxSent')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => {
      const lastFaxSentDate = TimeZoneFunction(
        `${row?.original?.last_fax_sent}`,
        'Asia/Tokyo'
      );
      const formatMonent = moment(lastFaxSentDate).format(
        'YYYY/MM/DD HH:mm:ss'
      );
      return <div>{row?.original?.last_fax_sent ? formatMonent : null}</div>;
    },
  }),
  pickingListColumnHelper.accessor('last_pdf_made', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('lastPdfMade')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => {
      const lastFaxSentDate = TimeZoneFunction(
        `${row?.original?.last_pdf_made}`,
        'Asia/Tokyo'
      );
      const formatMonent = moment(lastFaxSentDate).format(
        'YYYY/MM/DD HH:mm:ss'
      );
      return <div>{row?.original?.last_pdf_made ? formatMonent : null}</div>;
    },
  }),
  pickingListColumnHelper.accessor('status', {
    minSize: 140,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('status')}</span>
            </div>
          )}
        </Translation>
      );
    },
    cell: ({ row }) => {
      let status = '';
      if (!row.original.last_pdf_made && !row.original.last_fax_sent) {
        status = 'notProcessed'; // for translation purpose, key for translation file is user i.e. notProcessed
      } else if (row.original.last_fax_sent) {
        status = 'faxSent'; // for translation purpose, key for translation file is user i.e. pdfMade
      } else if (row.original.last_pdf_made) {
        status = 'pdfMade'; // for translation purpose, key for translation file is user i.e. faxSent
      }
      return (
        <Translation>
          {t => (
            <div>
              <span>{t(status)}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
];
export const orderlistentry: ColumnDef[] = [
  {
    field: 'rowno',
    headerName: 'Row No',
    width: 50,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('rowNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'merchandise',
    headerName: 'Merchandise',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('merchandise')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 120,
    renderHeader: () => {
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
  },
  {
    field: 'unitprice',
    headerName: 'Unit Price',
    width: 120,
    renderHeader: () => {
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
  },
  {
    field: 'unit',
    headerName: 'Unit',
    width: 50,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('unit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'salesvolume',
    headerName: 'Sales Volume',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('salesVolume')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'costamount',
    headerName: 'Cost Amount',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('costAmount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'salesamount',
    headerName: 'Sales Amount',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('salesAmount')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'storehouse',
    headerName: 'Store House',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('storeHouse')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'packing',
    headerName: 'Packing',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('packing')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'kgquantity',
    headerName: 'Kg Quantity',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('kgQuantity')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'feed',
    headerName: 'Feed',
    width: 160,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('feed')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];
export const faxorder: ColumnDef[] = [
  {
    field: 'customercode',
    headerName: 'Customer code',
    width: 150,
    renderHeader: () => {
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
  },
  {
    field: 'customername',
    headerName: 'Customer Name',
    width: 650,
    renderHeader: () => {
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
  },
];

export const customermaster: ColumnDef[] = [
  {
    field: 'rowno',
    headerName: 'Row No',
    width: 120,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('rowNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'customercode',
    headerName: 'Customer Code',
    width: 150,
    renderHeader: () => {
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
  },
  {
    field: 'customername',
    headerName: 'Customer Name',
    width: 650,
    renderHeader: () => {
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
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('address')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'coursecode',
    headerName: 'Course Code',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('courseCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'telephoneno',
    headerName: 'Telephone No',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('telephoneNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'faxno',
    headerName: 'Fax No',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('faxNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'manager',
    headerName: 'Manager',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('manager')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'billingcode',
    headerName: 'Billing Code',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('billingCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'termsofsale',
    headerName: 'Term of Sale',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('termOfSale')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];

export const partnermaster: ColumnDef[] = [
  {
    field: 'id',
    headerName: 'Row No',
    width: 50,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('rowNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'code',
    headerName: 'Partner Code',
    width: 120,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('partnerCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'text',
    headerName: 'Partner Name',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('partnerName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'city',
    headerName: 'Address',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('address')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'course.code',
    headerName: 'Course Code',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('courseCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'telephone',
    headerName: 'Telephone No',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('telephoneNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'fax',
    headerName: 'Fax No',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('faxNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'manager',
    headerName: 'Manager',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('manager')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];
export const companymaster: ColumnDef[] = [
  {
    field: 'id',
    headerName: 'Row No',
    width: 50,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('rowNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'code',
    headerName: 'Company Code',
    width: 120,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('companyCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Company Name',
    width: 150,
    renderHeader: () => {
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
  },
  {
    field: 'post_number',
    headerName: ' postNumber',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('postNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'city',
    headerName: 'Address',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('address')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'telephone',
    headerName: 'Telephone No',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('telephoneNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'fax_number',
    headerName: 'faxNumber',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('faxNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];

export const coursemaster: ColumnDef[] = [
  {
    field: 'code',
    headerName: 'Course Code',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('courseCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'fax_number',
    headerName: 'Fax Number',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('faxNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'text',
    headerName: 'Course Name',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('courseName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];

export const productmasterbycustomer: ColumnDef[] = [
  {
    field: 'rowno',
    headerName: 'Row No',
    width: 50,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('rowNumber')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },

  {
    field: 'customercode',
    headerName: 'Customer Code',
    width: 140,
    renderHeader: () => {
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
  },
  {
    field: 'customername',
    headerName: 'Customer Name',
    width: 650,
    renderHeader: () => {
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
  },
  {
    field: 'productcode',
    headerName: 'Product Code',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'productname',
    headerName: 'Product Name',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'productorder',
    headerName: 'Product Order',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productOrder')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];

export const capturelayoutmaster: ColumnDef[] = [
  {
    field: 'templatename',
    headerName: 'Template Name',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('templateName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'registeredperson',
    headerName: 'Registered Person',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('registeredPerson')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'registrationdate',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('registrationDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'updater',
    headerName: 'Updater',
    width: 140,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('updater')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
  {
    field: 'updatedate',
    headerName: 'Update Date',
    width: 150,
    renderHeader: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('updatedDate')}</span>
            </div>
          )}
        </Translation>
      );
    },
  },
];

import { createColumnHelper } from '@tanstack/react-table';
import { Trans, Translation } from 'react-i18next';
import EditCell from '../MorikiListInquiry/EditCell';
import { TableCell } from '../MorikiListInquiry/TableCell';
import { Link } from 'react-router-dom';
import IndeterminateCheckbox from '../../shared/IndeterminateCheckbox';

export interface MorikiItemHeaderType {
  base_item_code?: string;
  product_system_code: string;
  in_house_managed_product_code: string;
  product_name: string;
  product_name_furigana: string;
  in_house_managed_product_name: string;
  manufacture_name: string;
  food_major_classification_name: string;
  food_medium_classification_name: string;
  food_subclass_name: string;
  food_classification_code: string;
  catch_copy: string;
  explanation: string;
  producing_area: string;
  retail_unit_price_setting: string;
  retail_unit_price: string;
  retail_unit_code: string;
  reference_wholesale_price_setting: string;
  reference_wholesale_price: string;
  reference_wholesale_unit_code: string;
  reference_wholesale_price_unit: string;
  reference_wholesale_price_including_tax_code: string;
  reference_wholesale_price_including_tax: string;
  standard: string;
  quantity: string;
  quantity_unit: string;
  sample_product_price: string;
  sample_product_unit_code: string;
  sample_product_unit: string;
  sample_products_for_free: string;
  sample_product_tax_included: string;
  sample_product_shipping_fee_included: string;
  tax_exempt: string;
  selling_discontinued: string;
  registration_date: string;
  update_date: string;
  item_code_im: string;
  item_code_smile: string;
  item_code_bpaas: string;
}

export const morikiItemColumnHelper =
  createColumnHelper<MorikiItemHeaderType>();

export const morikiItemHeaders = [
  morikiItemColumnHelper.display({
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

  morikiItemColumnHelper.accessor('partner_item_code', {
    id: 'partner_item_code',
    minSize: 200,

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
  morikiItemColumnHelper.accessor('partner_code', {
    id: 'partner_code',
    minSize: 200,

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

  morikiItemColumnHelper.accessor('product_system_code', {
    id: 'product_system_code',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productSystemCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),

  morikiItemColumnHelper.accessor('in_house_managed_product_code', {
    id: 'in_house_managed_product_code',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('inHouseManagedProductCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('product_name', {
    id: 'product_name',
    minSize: 200,

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
  morikiItemColumnHelper.accessor('product_name_furigana', {
    id: 'product_name_furigana',
    minSize: 280,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('productNameFurigana')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('in_house_managed_product_name', {
    id: 'in_house_managed_product_name',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('inHouseManagedProductName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('manufacture_name', {
    id: 'manufacture_name',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('manufactureName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),

  morikiItemColumnHelper.accessor('food_major_classification_name', {
    id: 'food_major_classification_name',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodMajorClassificationName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('food_medium_classification_name', {
    id: 'food_medium_classification_name',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodMediumClassificationName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('food_subclass_name', {
    id: 'food_subclass_name',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodSubclassName')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('food_classification_code', {
    id: 'food_classification_code',
    minSize: 280,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('foodClassificationCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('catch_copy', {
    id: 'catch_copy',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('catchCopy')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('explanation', {
    id: 'explanation',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('explanation')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('producing_area', {
    id: 'producing_area',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('producingArea')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('retail_unit_price_setting', {
    id: 'retail_unit_price_setting',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('retailUnitPriceSetting')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('retail_unit_price', {
    id: 'retail_unit_price',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('retailUnitPrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('retail_unit_code', {
    id: 'retail_unit_code',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('retailUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('reference_wholesale_price_setting', {
    id: 'reference_wholesale_price_setting',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('referenceWholesalePriceSetting')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('reference_wholesale_price', {
    id: 'reference_wholesale_price',
    minSize: 250,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('referenceWholesalePrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('reference_wholesale_unit_code', {
    id: 'reference_wholesale_unit_code',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('referenceWholesaleUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('reference_wholesale_price_unit', {
    id: 'reference_wholesale_price_unit',
    minSize: 300,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('referenceWholesalePriceUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor(
    'reference_wholesale_price_including_tax_code',
    {
      id: 'reference_wholesale_price_including_tax_code',
      minSize: 450,

      header: () => {
        return (
          <Translation>
            {t => (
              <div>
                <span>{t('referenceWholesalePriceIncludingTaxCode')}</span>
              </div>
            )}
          </Translation>
        );
      },
    }
  ),
  morikiItemColumnHelper.accessor('reference_wholesale_price_including_tax', {
    id: 'reference_wholesale_price_including_tax',
    minSize: 350,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('referenceWholesalePriceIncludingTax')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('standard', {
    id: 'standard',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('standard')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('quantity', {
    id: 'quantity',
    minSize: 200,

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
  morikiItemColumnHelper.accessor('quantity_unit', {
    id: 'quantity_unit',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('quantityUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('sample_product_price', {
    id: 'sample_product_price',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sampleProductPrice')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('sample_product_unit_code', {
    id: 'sample_product_unit_code',
    minSize: 280,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sampleProductUnitCode')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('sample_product_unit', {
    id: 'sample_product_unit',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sampleProductUnit')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('sample_products_for_free', {
    id: 'sample_products_for_free',
    minSize: 280,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sampleProductsForFree')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('sample_product_tax_included', {
    id: 'sample_product_tax_included',
    minSize: 350,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sampleProductTaxIncluded')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('sample_product_shipping_fee_included', {
    id: 'sample_product_shipping_fee_included',
    minSize: 400,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sampleProductShippingFeeIncluded')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('tax_exempt', {
    id: 'tax_exempt',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('taxExempt')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('selling_discontinued', {
    id: 'selling_discontinued',
    minSize: 200,

    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('sellingDiscontinued')}</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  morikiItemColumnHelper.accessor('registration_date', {
    id: 'registration_date',
    minSize: 200,

    header: () => {
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
  }),
  morikiItemColumnHelper.accessor('update_date', {
    id: 'update_date',
    minSize: 200,

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
];

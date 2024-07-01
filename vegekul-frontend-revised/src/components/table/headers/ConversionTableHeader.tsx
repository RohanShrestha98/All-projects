import { createColumnHelper } from '@tanstack/react-table';
import { Translation } from 'react-i18next';
import { ConversionFactorResponseType } from '../../../hooks/useConversionFactorQuery';

export const conversionFactorColumnHelper =
  createColumnHelper<ConversionFactorResponseType>();

export const conversionFactorHeader = [
  conversionFactorColumnHelper.accessor('product_code', {
    minSize: 100,
    size: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('productCode')}</>}</Translation>;
    },
  }),
  conversionFactorColumnHelper.accessor('quantity_unit', {
    minSize: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('quantityUnit')}</>}</Translation>;
    },
  }),
  conversionFactorColumnHelper.accessor('conversion_factor', {
    minSize: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('conversionFactor')}</>}</Translation>;
    },
  }),
];

import { createColumnHelper } from '@tanstack/react-table';
import { Translation } from 'react-i18next';
import { BatchSummaryMasterResponseType } from '../../../hooks/useBatchSummaryQueryData';

export const batchSummaryCodeColumnHelper =
  createColumnHelper<BatchSummaryMasterResponseType>();

export const batchSummaryCodeHeader = [
  batchSummaryCodeColumnHelper.accessor('name', {
    minSize: 300,
    size: 300,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('batchSummaryCodeName')}</>}</Translation>;
    },
  }),
  batchSummaryCodeColumnHelper.accessor('code', {
    minSize: 100,
    size: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('code')}</>}</Translation>;
    },
  }),
  batchSummaryCodeColumnHelper.accessor('partner_name', {
    minSize: 200,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('partnerName')}</>}</Translation>;
    },
  }),
  batchSummaryCodeColumnHelper.accessor('partner_code', {
    minSize: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('partnerCode')}</>}</Translation>;
    },
  }),
];

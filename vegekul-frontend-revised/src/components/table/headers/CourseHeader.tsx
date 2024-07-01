import { createColumnHelper } from '@tanstack/react-table';
import { CourseResponseType } from '../../../types';
import { Translation } from 'react-i18next';
import IndeterminateCheckbox from '../../shared/IndeterminateCheckbox';

export const courseColumnHelper = createColumnHelper<CourseResponseType>();

export const coursemaster = [
  courseColumnHelper.display({
    id: 'edit',
    maxSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          indeterminate: table.getIsSomeRowsSelected(),
          checked: table.getIsAllRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        {...{
          indeterminate: row.getIsSomeSelected(),
          checked: row.getIsSelected(),
          onChange: row.getToggleSelectedHandler(),
          disabled: !row.getCanSelect(),
        }}
      />
    ),
    size: 50,
    minSize: 50,
  }),
  courseColumnHelper.accessor('code', {
    minSize: 100,
    size: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('courseCode')}</>}</Translation>;
    },
  }),
  courseColumnHelper.accessor('name', {
    minSize: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('courseName')}</>}</Translation>;
    },
  }),
  // courseColumnHelper.accessor('allocation_partner_code', {
  //   minSize: 100,
  //   enableSorting: false,
  //   header: () => {
  //     return (
  //       <Translation>{t => <>{t('allocationPartnerCode')}</>}</Translation>
  //     );
  //   },
  // }),
  courseColumnHelper.accessor('type_of_delivery', {
    minSize: 100,
    enableSorting: true,
    header: () => {
      return <Translation>{t => <>{t('typeOfDelivery')}</>}</Translation>;
    },
  }),
];

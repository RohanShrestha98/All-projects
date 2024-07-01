import { createColumnHelper } from '@tanstack/react-table';
import { CustomerMasterResponseType } from '../../../hooks/UseCustomerMasterQueryData';
import { Translation } from 'react-i18next';

const columnHelper = createColumnHelper<CustomerMasterResponseType>();

export const CustomerImportHeaders = [
  'customer_code',
  'customer_name1',
  'customer_name2',
  'address1',
  'address2',
  'address3',
  'shop_category',
  'course_code',
  'course_name',
  'sales_person_code',
  'sales_person_name',
  'telephone',
  'start_trading_date',
  'billing_address_code',
  'using_infomart_code',
];

export const CustomerMasterColumns = [
  columnHelper.display({
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
  columnHelper.accessor('partner_code', {
    minSize: 100,
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
  columnHelper.accessor('customer_code', {
    minSize: 100,
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
  // columnHelper.accessor('customer_name', {
  //   minSize: 300,
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
  columnHelper.accessor('customer_name1', {
    minSize: 300,
    header: () => {
      return (
        <Translation>
          {t => (
            <div>
              <span>{t('customerName')}1</span>
            </div>
          )}
        </Translation>
      );
    },
  }),
  columnHelper.accessor('customer_name2', {
    minSize: 300,
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
  columnHelper.accessor('address', {
    minSize: 500,
    header: () => {
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
    cell: ({ row }) => (
      <div>
        {row.original.address1} {row.original.address2} {row.original.address3}
      </div>
    ),
  }),
  columnHelper.accessor('telephone', {
    minSize: 250,
    header: () => {
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
  }),
  columnHelper.accessor('course_code', {
    minSize: 150,
    header: () => {
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
  }),

  columnHelper.accessor('course_name', {
    minSize: 150,
    header: () => {
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
  }),
  // columnHelper.accessor('start_trading_date', {
  //   minSize: 250,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('startTradingDate')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  // columnHelper.accessor('billing_address_code', {
  //   minSize: 100,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('billingAddressCode')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
  // columnHelper.accessor('using_infomart_code', {
  //   minSize: 100,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('usingInfomartCode')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),

  // columnHelper.accessor('post_number', {
  //   minSize: 150,
  //   header: () => {
  //     return (
  //       <Translation>
  //         {t => (
  //           <div>
  //             <span>{t('zipCode')}</span>
  //           </div>
  //         )}
  //       </Translation>
  //     );
  //   },
  // }),
];

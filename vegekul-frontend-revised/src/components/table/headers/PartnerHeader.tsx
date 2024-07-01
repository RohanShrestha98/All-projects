import { createColumnHelper } from '@tanstack/react-table';
import { BusinessPartnerResponseType } from '../../../hooks/UseBusinessPartnerQueryData';
import { Translation } from 'react-i18next';

const partnerColumnHelper = createColumnHelper<BusinessPartnerResponseType>();

export const partnerHeaders = [
  partnerColumnHelper.display({
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
  partnerColumnHelper.accessor('code', {
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
  partnerColumnHelper.accessor('name', {
    minSize: 200,
    header: () => {
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
  }),

  partnerColumnHelper.accessor('address', {
    minSize: 400,
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
  }),

  partnerColumnHelper.accessor('telephone', {
    minSize: 200,
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
  partnerColumnHelper.accessor('fax', {
    minSize: 200,
    header: () => {
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
  }),
  partnerColumnHelper.accessor('manager', {
    minSize: 350,
    header: () => {
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
    cell: ({ row }) => {
      return <div>{row.original.manager?.email}</div>;
    },
  }),
];

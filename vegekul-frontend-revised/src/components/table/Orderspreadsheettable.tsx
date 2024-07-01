import { useMemo } from 'react';
import '../../App.scss';
import './Table.scss';
import { withTranslation } from 'react-i18next';
import Table from '../shared/Table';
import { morikiColumnHelper, orderSpreadSheetHeader } from './Tableheader';
import { useAuth } from '../../context/Authcontext';

function OrderSpreadSheetTable({
  data,
  isLoading,
  isError,
  count,
  setPageDetail,
  page,
  pageSize,
  t,
}: any) {
  const { roles } = useAuth();
  const columns = useMemo(() => {
    if (roles.includes('Super Dashboard Admin')) {
      if (
        orderSpreadSheetHeader.find(item => item.accessorKey === 'partner_code')
      ) {
        return orderSpreadSheetHeader;
      }
      orderSpreadSheetHeader.splice(
        1,
        0,
        morikiColumnHelper.accessor('partner_code', {
          minSize: 100,
          header: () => <>{t('partnerCode')}</>,
        })
      );
    }
    //  else if (
    //   roles.includes('Partner Admin') ||
    //   roles.includes('Partner Staff')
    // ) {
    //   if (
    //     orderSpreadSheetHeader.find(
    //       item =>
    //         item.accessorKey === 'customer_name1' ||
    //         item.accessorKey === 'customer_name2'
    //     )
    //   ) {
    //     return orderSpreadSheetHeader;
    //   }
    //   orderSpreadSheetHeader.splice(
    //     2,
    //     0,
    //     morikiColumnHelper.accessor('customer_name1', {
    //       minSize: 200,
    //       header: () => <>{t('customerName')} 1</>,
    //     })
    //   );
    //   orderSpreadSheetHeader.splice(
    //     3,
    //     0,
    //     morikiColumnHelper.accessor('customer_name2', {
    //       minSize: 200,
    //       header: () => <>{t('customerName')} 2</>,
    //     })
    //   );
    // }
    return orderSpreadSheetHeader;
  }, [data?.length, roles.length]);
  return (
    <Table
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      totalEntries={count}
      allowHover
      showFooter
      containsActions
      containsCheckbox
      setPageDetail={setPageDetail}
      pageSize={pageSize}
      page={page}
      setCardData={() => null}
    />
  );
}

export default withTranslation()(OrderSpreadSheetTable);

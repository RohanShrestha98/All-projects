import Select from '../../ui/Select';
import Pagination from '../../ui/Pagination';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props {
  totalEntries: number;
  pageSize: number;
  selectedLength: number;
  setPageDetail: any;
  page?: number;
  t: TFunction;
}

const TableFooter = ({
  totalEntries,
  pageSize,
  setPageDetail,
  selectedLength,
  page = 10,
  t,
}: Props) => {
  const totalPageCount = Math.ceil(totalEntries / pageSize);
  return (
    <div className="flex items-center justify-between pt-4 text-[15px] font-medium">
      <span className="text-grayText">
        {t('showing')} <b>{(page - 1) * pageSize + 1}</b> {t('to')}{' '}
        <b>{Math.min(pageSize * page, totalEntries)}</b> {t('of')}{' '}
        <b> {totalEntries} </b>
        {t('entries')}
      </span>
      <p>
        {selectedLength > 0 && (
          <>
            <b>{selectedLength}</b>
            {selectedLength === 1 ? ' row' : ' rows'} selected
          </>
        )}
      </p>
      <div className="flex flex-row gap-2">
        <div className="flex items-center gap-4">
          <span className="text-grayText">{t('itemsPerPage')}</span>
          <Select
            options={['10', '20', '30', '40', '50']}
            value={pageSize.toString()}
            onValueChange={value => setPageDetail(1, Number(value))}
            triggerClassName="py-0.5"
          />
        </div>
        <Pagination
          totalPageCount={totalPageCount}
          pageChangeHandler={value => setPageDetail(value, pageSize)}
          page={page}
        />
      </div>
    </div>
  );
};

export default withTranslation()(TableFooter);

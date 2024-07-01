import '../../App.scss';
import Navbar from '../../components/navbar/Navbar';
import { SlLocationPin } from 'react-icons/sl';
import OrderListEntryTable from '../../components/table/Orderlistentrytable';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

function OrderListEntry({ t }: { t: TFunction }) {
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('orderEntryList')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-4">
          <p>{t('orderEntry')}</p>
          <div className="">
            <input
              type="text"
              placeholder={t('slipNumber')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="date"
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  bg-white text-inputColor outline-none"
            />
            <br />
            <input
              type="text"
              placeholder={t('slipNumber')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('slipNumber')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('slipNumber')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <br />
            <input
              type="text"
              placeholder={t('slipNumber')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('slipNumber')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <h2 className="flex flex-row items-center">
              <SlLocationPin /> {t('deliveryDestination')}
            </h2>
            <input
              type="text"
              placeholder={t('city')}
              className="mb-5 mr-5 mt-4 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('town')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('zone')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <br />
            <input
              type="text"
              placeholder={t('transactions')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('taxRate')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('aggregationCode')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="text"
              placeholder={t('storeHouse')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <br />
            <div className="flex flex-row justify-end">
              <button className="button">{t('register')}</button>
            </div>
          </div>
        </div>
        <OrderListEntryTable />
      </div>
    </div>
  );
}

export default withTranslation()(OrderListEntry);

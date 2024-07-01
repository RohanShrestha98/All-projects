import { TFunction } from 'i18next';
import '../../App.scss';
import Navbar from '../../components/navbar/Navbar';
import ProductMasterbyCustomerTable from '../../components/table/Productmasterbycustomertable';
import { withTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';

function ProductMasterbyCustomer({ t }: { t: TFunction }) {
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('productMasterByCustomer')} />
      <div className="dashboard_content_area">
        <div className="w-full  px-5 py-4 searchField">
          <p className="text-lg font-medium text-textColor">
            {t('masterDataSearch')}
          </p>
          <div className="">
            <input
              type="text"
              placeholder={t('customerName')}
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
            />
            <input
              type="number"
              className="mb-5 mr-5 p-3 w-1/4 rounded-4 font-normal text-sm border  text-inputColor outline-none"
              placeholder={t('customerCode')}
            />
            <br />
            <div className="flex justify-end">
              <button
                type="submit"
                className="button flex items-center justify-center gap-1"
              >
                <div>
                  <BiSearch size={16} />
                </div>
                {t('search')}
              </button>
            </div>
          </div>
        </div>
        <div className="flex -flex-row justify-between items-center mt-5">
          <p>
            {t('masterDataSearch')} {t('result')}
          </p>
          {/* <div className="flex -flex-row justify-between items-center">
                        <button className="button">Download</button>
                    </div> */}
        </div>
        <ProductMasterbyCustomerTable />
      </div>
    </div>
  );
}

export default withTranslation()(ProductMasterbyCustomer);

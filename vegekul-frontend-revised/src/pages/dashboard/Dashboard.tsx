import { Link } from 'react-router-dom';
import '../../App.scss';
import Navbar from '../../components/navbar/Navbar';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import {
  SUPER_ADMIN_AND_PARTNER_ADMIN,
  SUPER_DASHBOARD_ADMIN,
} from '../../utils/constants';
import { useAuth } from '../../context/Authcontext';

function Dashboard({ t }: { t: TFunction }) {
  const { roles } = useAuth();
  const transactionManagement = [
    {
      id: 1,
      title: 'orderData',
      link: '/import-order-data',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 3,
      title: 'orderSummaryData',
      link: '/order-spreadsheet',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 4,
      title: 'pickingList',
      link: '/picking-list',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
  ];
  const masterAdmin = [
    {
      id: 1,
      title: 'customerMaster',
      link: '/customer-master',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 2,
      title: 'productMaster',
      link: '/product-master',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 3,
      title: 'partnerMaster',
      link: '/partner-master',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 4,
      title: 'courseMaster',
      link: '/course-master',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
  ];
  const systemMaster = [
    {
      id: 1,
      title: 'userMaster',
      link: '/user-master',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 2,
      title: 'batchSummaryCodeMaster',
      link: '/batch-summary-code',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      id: 3,
      title: 'quantityUnitMaster',
      link: '/quantity-unit-master',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
  ];
  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t('dashboard')} />
      <div className="dashboard_content_area">
        <div className="dashboard p-5">
          <div className="flex flex-col pb-4">
            <h3 className="text-xl font-semibold text-slate-900">
              {t('transactionManagement')}
            </h3>
            <div className="h-1 w-20 border border-yellow-400 rounded-xl bg-yellow-400"></div>
          </div>
          <div className="Transaction_management flex flex-row items-center flex-wrap gap-6 justify-start">
            {transactionManagement.map(
              item =>
                item.permittedRoles.some((role: string) =>
                  roles.includes(role)
                ) && (
                  <Link
                    to={item.link}
                    className="w-1/5 py-5 mb-4  text-center border border-gray  flex items-center justify-center min-h-[130px] dashboardPannel"
                    key={item.id}
                  >
                    <h1>{t(item.title)}</h1>
                  </Link>
                )
            )}
          </div>
          {roles.includes('Super Dashboard Admin') && (
            <div className="flex flex-col pb-4">
              <h3 className="text-xl font-semibold text-slate-900">
                {t('masterAdmin')}
              </h3>
              <div className="h-[3px] w-20 border border-yellow-400 rounded-xl bg-yellow-400"></div>
            </div>
          )}

          <div className="Transaction_management flex flex-row items-center flex-wrap gap-6 justify-start">
            {masterAdmin.map(
              item =>
                item.permittedRoles.some((role: string) =>
                  roles.includes(role)
                ) && (
                  <Link
                    to={item.link}
                    className="w-1/5 py-5 mb-4  text-center border border-gray  flex items-center justify-center min-h-[130px]  dashboardPannel"
                    key={item.id}
                  >
                    <h1>{t(item.title)}</h1>
                  </Link>
                )
            )}
          </div>
          {roles.includes('Super Dashboard Admin') && (
            <div className="flex flex-col pb-4">
              <h3 className="text-xl font-semibold text-slate-900">
                {t('systemManagement')}
              </h3>
              <div className="h-1 w-20 border border-yellow-400 rounded-xl bg-yellow-400"></div>
            </div>
          )}
          <div className="Transaction_management flex flex-row items-center flex-wrap gap-6 justify-start">
            {systemMaster.map(
              item =>
                item.permittedRoles.some((role: string) =>
                  roles.includes(role)
                ) && (
                  <Link
                    to={item.link}
                    className="w-1/5 py-5 mb-4 dashboardPannel text-center border border-gray  flex items-center justify-center min-h-[130px] "
                    key={item.id}
                  >
                    <h1>{t(item.title)}</h1>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(Dashboard);

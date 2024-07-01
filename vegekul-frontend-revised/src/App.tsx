import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoute';
import BaseLayout from './layout/Baselayout';
import Dashboard from './pages/dashboard/Dashboard';
import ListInquiry from './pages/listinquiry/Listinquiry';
import OrderListEntry from './pages/orderlistentry/Orderlistentry';
import FaxOrder from './pages/faxorder/Faxorder';
import ProductMaster from './pages/product master/Productmaster';
import ImportOrderData from './pages/importorderdata/Importorderdata';
import UserMaster from './pages/usermaster/Usermaster';
import OrderSpreadSheet from './pages/orderspreadsheet/Orderspreadsheet';
import PickingList from './pages/pickinglist/Pickinglist';
import CustomerMaster from './pages/customermaster/Customermaster';
import PartnerMaster from './pages/partnermaster/Partnermaster';
import CourseMaster from './pages/coursemaster/Coursemaster';
import ProductMasterbyCustomer from './pages/productmasterbycustomer/Productmasterbycustomer';
import CaptureLayoutMaster from './pages/capturelayoutmaster/Capturelayoutmaster';
import ResetPage from './pages/passwordreset';
import { RoleHandler } from './context/RoleHandler';
import {
  SUPER_ADMIN_AND_PARTNER_ADMIN,
  SUPER_DASHBOARD_ADMIN,
} from './utils/constants';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getLanguage, setLanguage } from './utils/cookie';
import CompanyMaster from './pages/company master/CompanyMaster';
import PageNotFound from './components/error page/PageNotFound';
import CourseBulkRegistration from './pages/coursemaster/CourseBulkRegistration';
import AuthPage from './pages/auth/Authpage';
import ProductBulkRegistration from './pages/product master/ProductBulkRegistration';
import CustomerBulkRegistration from './pages/customermaster/CustomerBulkRegistration';
import BatchSummaryCodeMaster from './pages/batchSummaryCodeMaster';
import QuantityMasterPage from './pages/quantityUnitMaster/QuantityUnitMaster';
import ConversionRates from './pages/conversionRates';
import QuantityBulkRegistration from './pages/quantityUnitMaster/QuantityBulkRegistration';
import SettingsPage from './pages/profile page/Setting';

export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = getLanguage();
    if (!lang) {
      i18n.changeLanguage('jp');
      setLanguage('jp');
    }
    i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <Routes>
      <Route path="login" element={<AuthPage />} />
      <Route path="reset-password" element={<ResetPage />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<BaseLayout />}>
          {/* Put this in the route you want to protect with the role */}
          <Route path="profile-settings" element={<SettingsPage />} />
          <Route
            element={
              <RoleHandler permittedRoles={SUPER_ADMIN_AND_PARTNER_ADMIN} />
            }
          >
            <Route path="user-master" element={<UserMaster />} />
            <Route path="picking-list" element={<PickingList />} />
            <Route path="order-spreadsheet" element={<OrderSpreadSheet />} />
            <Route path="course-master" element={<CourseMaster />} />
            <Route
              path="batch-summary-code"
              element={<BatchSummaryCodeMaster />}
            />
            <Route path="list-inquiry" element={<ListInquiry />} />
            <Route path="product-master" element={<ProductMaster />} />
            <Route path="product-master/:code" element={<ConversionRates />} />
          </Route>
          <Route
            element={<RoleHandler permittedRoles={SUPER_DASHBOARD_ADMIN} />}
          >
            <Route path="import-order-data" element={<ImportOrderData />} />
            {/* <Route path="user-master" element={<UserMaster />} /> */}
            <Route
              path="quantity-unit-master"
              element={<QuantityMasterPage />}
            />
          </Route>
          <Route path="" element={<Dashboard />} />
          <Route path="picking-list/:customerCode" element={<ListInquiry />} />
          <Route path="order-list-entry" element={<OrderListEntry />} />
          <Route path="fax-order" element={<FaxOrder />} />
          <Route path="customer-master" element={<CustomerMaster />} />
          <Route
            path="customer-master/bulk-registration"
            element={<CustomerBulkRegistration />}
          />
          <Route
            path="quantity-unit-master/bulk-registration"
            element={<QuantityBulkRegistration />}
          />
          <Route path="partner-master" element={<PartnerMaster />} />
          <Route
            path="course-master/bulk-registration"
            element={<CourseBulkRegistration />}
          />
          <Route
            path="product-master/bulk-registration"
            element={<ProductBulkRegistration />}
          />
          <Route path="company-master" element={<CompanyMaster />} />
          <Route
            path="product-master-by-customer"
            element={<ProductMasterbyCustomer />}
          />
          <Route
            path="capture-layout-master"
            element={<CaptureLayoutMaster />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

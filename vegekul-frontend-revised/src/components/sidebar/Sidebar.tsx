import React, { useEffect, useRef, useState } from 'react';
import {
  BiListUl,
  BiHome,
  BiImport,
  BiEdit,
  BiPlus,
  BiNotepad,
  BiBuilding,
  BiMedal,
  BiBookmark,
} from 'react-icons/bi';
import { FiUsers, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { TbUsers } from 'react-icons/tb';
import { HiOutlineCollection } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import dashboard from '../../assets/dashboard.svg';
import {
  getRefreshToken,
  removeAccessToken,
  removePartnerCode,
  removeRefreshToken,
} from '../../utils/cookie';
import axios, { backendApi } from '../../utils/axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/Authcontext';
import {
  ALL_ROLES,
  SUPER_ADMIN_AND_PARTNER_ADMIN,
  SUPER_ADMIN_AND_STAFF,
  SUPER_DASHBOARD_ADMIN,
} from '../../utils/constants';
import '../../App.scss';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useApp } from '../../context/AppContext';

type SidebarNavItemType = {
  to: string;
  display: string;
  section?: string;
  icon?: React.ReactElement;
  permittedRoles: string[];
  type?: string;
};

const Sidebar = ({ t }: { t: TFunction }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const { isPartnerDomain } = useApp();
  const [menu, setMenu] = useState<boolean>(false);
  const [path, setPath] = useState<string>();
  const [active, setActive] = useState(false);
  const style = {
    color: active ? '#0a438f' : '#333333',
  };
  const sidebarNavItems1: SidebarNavItemType[] = [
    {
      display: 'orderDataSidebarHeaderMain',
      to: '',
      permittedRoles: ALL_ROLES,
      type: 'header',
    },
    {
      display: 'importOrderData',
      icon: <BiImport style={style} />,
      to: '/import-order-data',
      section: '',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      display: 'listInquiry',
      icon: <BiListUl style={style} />,
      to: '/list-inquiry',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
    // {
    //   display: 'orderEntryList',
    //   icon: <BiEdit style={style} />,
    //   to: '/order-list-entry',
    //   section: '',
    //   permittedRoles: SUPER_DASHBOARD_ADMIN,
    // },

    {
      display: 'report',
      to: '',
      permittedRoles: ALL_ROLES,
      type: 'header',
    },
    {
      display: 'orderSpreadsheet',
      icon: <BiPlus style={style} />,
      to: '/order-spreadsheet',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
    {
      display: 'pickingList',
      icon: <BiNotepad style={style} />,
      to: '/picking-list',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
    // {
    //   display: 'faxOrder',
    //   icon: <BiPrinter style={style} />,
    //   to: '/fax-order',
    //   section: '',
    //   permittedRoles: SUPER_DASHBOARD_ADMIN,
    // },

    {
      display: 'masterData',
      to: '',
      permittedRoles: ALL_ROLES,
      type: 'header',
    },
    {
      display: 'productMaster',
      icon: <BiBookmark style={style} />,
      to: '/product-master',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
    {
      display: 'userMaster',
      icon: <AiOutlineUser style={style} />,
      to: '/user-master',
      section: '',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    // {
    //   display: "companyMaster",
    //   icon: <FiUsers style={style} />,
    //   to: "/company-master",
    //   section: "",
    //   permittedRoles: SUPER_DASHBOARD_ADMIN,
    // },
    {
      display: 'customerMaster',
      icon: <TbUsers style={style} />,
      to: '/customer-master',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
    {
      display: 'partnerMaster',
      icon: <BiBuilding style={style} />,
      to: '/partner-master',
      section: '',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    {
      display: 'courseMaster',
      icon: <FiShoppingCart style={style} />,
      to: '/course-master',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_PARTNER_ADMIN,
    },
    {
      display: 'batchSummaryCodeMaster',
      icon: <BiMedal style={style} />,
      to: '/batch-summary-code',
      section: '',
      permittedRoles: SUPER_ADMIN_AND_STAFF,
    },
    {
      display: 'quantityUnitMaster',
      icon: <HiOutlineCollection style={style} />,
      to: '/quantity-unit-master',
      section: '',
      permittedRoles: SUPER_DASHBOARD_ADMIN,
    },
    // {
    //   display: 'productMasterByCustomer',
    //   icon: <TbCarrot style={style} />,
    //   to: '/product-master-by-customer',
    //   section: '',
    //   permittedRoles: SUPER_DASHBOARD_ADMIN,
    // },
    // {
    //   display: 'captureLayoutMaster',
    //   icon: <BsFiletypeCsv style={style} />,
    //   to: '/capture-layout-master',
    //   section: '',
    //   permittedRoles: SUPER_DASHBOARD_ADMIN,
    // },
  ];

  useEffect(() => {
    const curPath = window.location.pathname;
    setPath(curPath);
  }, [location]);

  const pathname = window.location.pathname;
  const handleClick = () => {
    setMenu(!menu);
  };

  const handleLogout = (isPartnerDomain = false) => {
    const refresh = getRefreshToken();
    if (!refresh) navigate('/login');
    axios
      .post('auth/logout/', {
        refresh,
      })
      .then(res => {
        removeAccessToken();
        removeRefreshToken();
        if (isPartnerDomain) {
          removePartnerCode();
          try {
            delete backendApi.defaults.headers.partner;
          } catch (e) { }
        }
        toast.success(`${t('logoutSuccessful')}`);
        navigate('/login');
      });
  };

  function renderSidebarLists1() {
    return (
      <>
        {sidebarNavItems1.map((item, index) => {
          const isActive = path === item.to;
          return (
            item.permittedRoles.some((role: string) => roles.includes(role)) &&
            (item?.type === 'header' ? (
              <p key={index} className="text-sm px-7 py-4 text-black font-bold">
                {t(item.display)}
              </p>
            ) : (
              <div key={index}>
                <div
                  className={
                    ' flex flex-row items-center justify-between font-normal text-lg  cursor-pointer'
                  }
                >
                  {!menu ? (
                    <React.Fragment>
                      <Link
                        to={item.to}
                        className={
                          isActive // Use isActive to determine the class
                            ? 'flex flex-row w-full py-2 pl-9 pr-2 items-center active '
                            : 'flex flex-row w-full py-2 pl-10 pr-2 items-center hover:bg-gray-100 text-sideBarColor'
                        }
                      >
                        {item.icon}
                        <h2
                          className={`ml-3  text-sm my-1 font-medium ${isActive ? 'text-secondary' : 'text-sidebar'
                            }`}
                        >
                          {t(item.display)}
                        </h2>
                      </Link>
                      {/* <BiChevronDown /> */}
                    </React.Fragment>
                  ) : (
                    item.icon
                  )}
                </div>
              </div>
            ))
          );
        })}
      </>
    );
  }

  return (
    <div className="sidebar w-20% min-w-20% h-screen flex flex-col sticky top-0 overflow-auto">
      <div className="sticky top-0 bg-white z-10 ">
        <Link to="/">
          <img src={logo} className="px-7 max-w-250 mt-2 w-full" alt="" />
        </Link>
      </div>
      <div ref={sidebarRef} className="mt-6 h-[80vh] overflow-auto">
        <Link
          to=""
          className={`cursor-pointer flex flex-row  items-center  ${pathname === '/'
              ? 'active px-9 py-4'
              : 'px-10 py-4 hover:bg-gray-100'
            }`}
        >
          <img src={dashboard} className="mr-4 " alt="" />
          <h1
            className={`${pathname === '/'
                ? 'text-secondary text-sm'
                : 'text-sidebar text-sm'
              }`}
          >
            {t('dashboard')}
          </h1>
        </Link>

        {renderSidebarLists1()}
      </div>
      <div
        className="flex flex-row fixed bottom-0 items-center pl-7 py-4 bg-white w-[20%] text-red-700 cursor-pointer"
        onClick={() => handleLogout(isPartnerDomain)}
      >
        <FiLogOut />
        <h3 className="ml-2">{t('logout')}</h3>
      </div>
    </div>
  );
};

export default withTranslation()(Sidebar);

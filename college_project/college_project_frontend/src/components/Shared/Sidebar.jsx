import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineChartPie } from "react-icons/hi";
import { BsBox2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import { useAuthContext } from "../../context/authContext";
import Cookies from "universal-cookie";

export default function Sidebar() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();
  const cookies = new Cookies({ path: "/" });
  const [activePathname, setActivePathname] = useState(
    window.location.pathname
  );
  const sidebarlinks = [
    {
      id: 1,
      title: "Dashboard",
      icon: <LuLayoutDashboard size={18} />,
      link: "/",
    },
    // {
    //   id: 2,
    //   title: "Revenue",
    //   icon: <MdOutlineInsertChartOutlined size={18} />,
    //   link: "/revenue",
    // },
    {
      id: 3,
      title: "Staff",
      icon: <FaRegUser size={16} />,
      link: "/staff",
    },
    // {
    //   id: 4,
    //   title: "Analytics",
    //   icon: <HiOutlineChartPie size={18} />,
    //   link: "/analytics",
    // },
    {
      id: 8,
      title: "Category",
      icon: <HiOutlineChartPie size={18} />,
      link: "/category",
    },
    {
      id: 7,
      title: "Product",
      icon: <HiOutlineChartPie size={18} />,
      link: "/product",
    },
    // {
    //   id: 5,
    //   title: "Inventory",
    //   icon: <BsBox2 size={16} />,
    //   link: "/inventory",
    // },
    {
      id: 6,
      title: "Apply",
      icon: <MdOutlineInsertChartOutlined size={18} />,
      link: "/shop/apply",
    },
  ];
  const handleLogout = () => {
    setAuth();
    cookies.remove("accessToken");
    cookies.remove("userDetails");
  };
  return (
    <div className="w-full flex flex-col justify-between h-full overflow-x-hidden">
      <div>
        <div className="flex items-center gap-2 px-4 pt-4">
          <img src={logo} className="w-12 h-12" alt="" />
          <div className="flex flex-col ">
            <h1 className="font-semibold text-sm text-gray-900">
              {auth?.user?.username === ""
                ? "SuperAdmin"
                : auth?.user?.username ?? "SuperAdmin"}
            </h1>
            <p className="font-normal text-gray-500 text-xs">
              {auth?.user?.email ?? "superadmin@gmail.com"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-6">
          {sidebarlinks?.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() => {
                  navigate(item?.link);
                  setActivePathname(item?.link);
                }}
                className={`${
                  activePathname === item?.link
                    ? " border-blue-600 bg-blue-50 text-blue-600"
                    : "text-gray-600 border-transparent hover:bg-gray-50"
                } border-l-4 text-sm flex items-center font-medium  gap-2 px-4 py-3 cursor-pointer `}
              >
                <p>{item?.icon}</p>
                <h1>{item?.title}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => {
          handleLogout();
        }}
        className="px-6 py-4 cursor-pointer flex text-red-600 font-semibold items-center gap-2"
      >
        <FiLogOut size={18} />
        <p>Logout</p>
      </div>
    </div>
  );
}

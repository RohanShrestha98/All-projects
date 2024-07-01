/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { VscNotebook } from "react-icons/vsc";
import { TiShoppingBag } from "react-icons/ti";
import { PiBooksLight } from "react-icons/pi";
import ConfirmModal from "./ConfirmModal";
import { useAuthContext } from "../context/authContext";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { LuLogOut } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import { BsArrowBarRight } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";

export default function SideBar({ sideBarOpen, setSideBarOpen }) {
  const [pathName, setPathname] = useState(window.location.pathname);
  const [isOpen, setIsOpen] = useState(false);

  const cookies = new Cookies({ path: "/" });
  const { setAuth } = useAuthContext();
  const { auth } = useAuthContext();
  const hasInventoryAccess =
    auth?.user?.roles?.[0] === "HospitalManager" ||
    auth?.user?.roles?.[0] === "HospitalAdmin" ||
    auth?.user?.roles?.[0] === "SuperManager";
  const navigate = useNavigate();

  const isLibraryENV = import.meta.env.VITE_IS_LIBRARY;

  const sidebar = [
    {
      id: 1,
      name: "Home",
      icon: <AiOutlineHome />,
      link: "/",
    },
    {
      id: 2,
      name: "Notices",
      icon: <VscNotebook />,
      link: "/notices",
    },
    {
      id: 3,
      name: "Library",
      icon: <PiBooksLight />,
      link: "/library",
    },
    {
      id: 4,
      name: "Programs",
      icon: <TiShoppingBag />,
      link: "/programs",
    },
    {
      id: 6,
      name: "Partner",
      icon: <RiGroupLine />,
      link: "/partner",
    },
    {
      id: 7,
      name: "Services",
      icon: <MdOutlineHomeRepairService />,
      link: "/services",
    },
    {
      id: 5,
      name: "Inventory",
      icon: <MdOutlineInventory />,
      link: "/inventory",
    },
  ];
  const librarySideBar = [
    {
      id: 3,
      name: "Library",
      icon: <PiBooksLight />,
      link: "/library",
    },
  ];

  const sideBarAccess =
    isLibraryENV == "true"
      ? librarySideBar
      : hasInventoryAccess
      ? sidebar
      : sidebar?.slice(0, 4);

  return (
    <div className="w-full h-screen overflow-auto flex flex-col justify-between  border-r no-scrollbar">
      <div>
        <div
          onClick={() => {
            navigate("/");
            setPathname("/");
          }}
          className="flex items-center lg:justify-center cursor-pointer my-4  px-4 gap-2"
        >
          <img src={logo} className="w-14 lg:w-10" alt="" />
          {sideBarOpen && (
            <p className="font-bold text-xl text-[#265cc0] lg:hidden">
              HIMS-WHO
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-1 lg:hidden text-gray-500">
          <div className="border-b w-full"></div>
          {sideBarOpen ? (
            <BsArrowBarLeft
              size={24}
              className="min-w-[24px] cursor-pointer"
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          ) : (
            <BsArrowBarRight
              size={24}
              className="min-w-[24px] cursor-pointer"
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          )}
          <div className="border-b w-full"></div>
        </div>

        <div className=" flex flex-col gap-1  mt-6">
          {sideBarAccess?.map((item) => {
            return (
              <Link
                to={item?.link}
                onClick={() => setPathname(item?.link)}
                className={`flex items-center gap-2 px-4 py-3 ${
                  pathName === item?.link
                    ? "border-l-4 border-[#265cc0] bg-blue-50 text-[#265cc0]"
                    : "border-l-4 border-transparent text-gray-500 hover:bg-gray-50"
                }`}
                key={item?.id}
              >
                <div className="text-xl">{item?.icon}</div>
                {sideBarOpen && (
                  <p className="font-medium text-base lg:hidden">
                    {item?.name}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      {isOpen && (
        <ConfirmModal
          messeges={"Are you sure you want to logout?"}
          setIsOpen={setIsOpen}
          handleChange={() => {
            setAuth({});
            cookies.remove("refreshToken");
            cookies.remove("userDetails");
            toast.success("Logout success");
            navigate("/");
          }}
          isOpen={isOpen}
        />
      )}
      <p
        onClick={() => setIsOpen(true)}
        className="text-red-600 flex items-center gap-2 font-semibold text-base cursor-pointer mb-4 ml-4"
      >
        <LuLogOut size={20} />
        {sideBarOpen && <p className="lg:hidden">Logout</p>}
      </p>
    </div>
  );
}

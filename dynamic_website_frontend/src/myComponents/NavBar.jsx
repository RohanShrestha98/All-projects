import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactSelect from "./REactSelect";
import { FiShoppingCart } from "react-icons/fi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";

export default function NavBar() {
  const { control } = useForm();
  const navigate = useNavigate();
  const sidebar = [
    {
      id: 1,
      icon: <LiaShippingFastSolid />,
      name: "Orders",
      link: "/orders",
    },
    {
      id: 2,
      icon: <FiShoppingCart />,
      name: "My cart",
      link: "/my-cart",
    },
    {
      id: 3,
      icon: <FaRegUser />,
      name: "Profile",
      link: "/profile",
    },
  ];
  return (
    <>
      <div className="h-[70px] flex items-center justify-between gap-4 px-28">
        <h1
          className="font-bold text-2xl cursor-pointer text-blue-400 mr-20"
          onClick={() => navigate("/")}
        >
          Phonex
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 h-9 border px-3 rounded border-gray-300 outline-none focus:border-blue-400"
          />
          <ReactSelect
            width={"w-32"}
            options={[]}
            title={""}
            control={control}
            registerName={"product_category"}
          />
          <button className="h-[38px] mb-[1px] px-5 bg-[#0d78ff] text-white">
            Search
          </button>
        </div>
        <div className="flex items-center gap-3">
          {sidebar.map((nav) => {
            return (
              <Link
                key={nav.id}
                to={nav.link}
                className="flex flex-col items-center gap-1"
              >
                <>{nav.icon}</>
                <p className="cursor-pointer text-sm font-base text-gray-600">
                  {nav.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="h-10 border border-gray-400"></div>
    </>
  );
}

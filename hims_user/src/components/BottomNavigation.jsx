import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { TiShoppingBag } from "react-icons/ti";
import { VscNotebook } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function BottomNavigation() {
  const [pathName, setPathname] = useState(window.location.pathname);
  const navigation = [
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
      id: 4,
      name: "Programs",
      icon: <TiShoppingBag />,
      link: "/programs",
    },
    {
      id: 5,
      name: "Library",
      icon: <PiBooksLight />,
      link: "/library",
    },
  ];
  return (
    <div className="flex items-center justify-around h-16 bg-white border-t">
      {navigation?.map((item) => {
        return (
          <Link
            to={item?.link}
            onClick={() => setPathname(item?.link)}
            className={`flex flex-col gap-1 items-center ${
              pathName === item?.link ? "text-blue-500" : "text-gray-600"
            }`}
            key={item?.id}
          >
            <div className="text-lg">{item?.icon}</div>
            <p className="text-xs font-semibold">{item?.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

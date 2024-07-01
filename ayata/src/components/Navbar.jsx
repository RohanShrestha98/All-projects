import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import logo from "../../public/logo.png";
import { GoArrowRight } from "react-icons/go";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const header = useRef();
  const [activeNav, setActiveNav] = useState(window.location.pathname);

  const navlinks = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "About us",
      link: "/about-us",
    },
    {
      id: 3,
      name: "Our Works",
      link: "/our-works",
    },
    {
      id: 8,
      name: "Our Products",
      link: "/our-products",
    },
    {
      id: 4,
      name: "Clients",
      link: "/clients",
    },
    {
      id: 5,
      name: "Team",
      link: "/team",
    },
    {
      id: 6,
      name: "Careers",
      link: "/careers",
    },
    {
      id: 7,
      name: "Contact us",
      link: "/contact-us",
    },
  ];
  useGSAP(
    () => {
      gsap.fromTo(
        ".header",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 3,
        }
      );
    },
    { scope: header }
  );
  return (
    <div ref={header} className="top-0 border-b bg-white sticky z-30 ">
      <div className="header py-4 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4  flex items-center justify-between">
        <Link to={"/"}>
          {" "}
          <img
            src={logo}
            onClick={() => setActiveNav("/")}
            className=""
            alt=""
          />
        </Link>
        <div className="flex gap-6 items-center  md:hidden  z-40">
          {navlinks?.map((nav) => {
            return (
              <Link
                to={nav?.link}
                onClick={() => setActiveNav(nav?.link)}
                className={`text-sm  cursor-pointer  ${
                  activeNav === nav?.link
                    ? "text-[#4E5BA6] font-medium"
                    : "text-[#596273] hover:text-[#4E5BA6]"
                } `}
                key={nav?.id}
              >
                {nav?.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3 hover:text-[#4E5BA6] text-[#596273] text-sm  cursor-pointer">
          Lets Collaborate <GoArrowRight size={20} />
        </div>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import logo from "../src/assets/logo.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GoArrowRight } from "react-icons/go";

export default function Header() {
  const header = useRef();
  var tl = gsap.timeline();
  const [activeNav, setActiveNav] = useState(window.location.pathname);

  //sequenced one-after-the-other
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
      tl.from(".header", {
        duration: 2,
        y: -140,
      }).to(".header", {
        y: 0,
        duration: 4,
      });
    },
    { scope: header }
  );
  return (
    <div ref={header}>
      <div className="px-32 header py-4 top-0 bg-white sticky z-30 flex items-center justify-between">
        <img src={logo} className="" alt="" />
        <div className="flex gap-6 items-center  z-40">
          {navlinks?.map((nav) => {
            return (
              <div
                // to={nav?.link}
                onClick={() => setActiveNav(nav?.link)}
                className={`text-sm  cursor-pointer  ${
                  activeNav === nav?.link
                    ? "text-[#4E5BA6] font-medium"
                    : "text-[#596273] hover:text-[#4E5BA6]"
                } `}
                key={nav?.id}
              >
                {nav?.name}
              </div>
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

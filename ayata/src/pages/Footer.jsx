import logo from "../../public/logo.png";
import footer from "../assets/footer.svg";
import wave from "../assets/wave.svg";
import { FiInstagram } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { BsSend } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Footer() {
  const logoRef = useRef();
  const socialMedia = [
    { id: 1, icon: <FiFacebook />, link: "okey" },
    { id: 1, icon: <FiInstagram />, link: "okey" },
    { id: 1, icon: <FiGithub />, link: "okey" },
    { id: 1, icon: <SlSocialLinkedin />, link: "okey" },
    { id: 1, icon: <BsSend />, link: "okey" },
  ];

  useGSAP(
    () => {
      gsap.to(".logo", {
        rotate: "+=360",
        duration: 4,
        repeat: -1,
      });
    },
    { scope: logoRef }
  );
  return (
    <div
      ref={logoRef}
      className="flex items-center flex-col gap-8  pt-20 border-t"
    >
      <img className="logo" src={logo} alt="" />
      <p className="text-[#667085] md:px-6 sm:px-4 w-[50%] md:w-full text-sm font-normal text-center leading-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia velit interdum, ac aliquet odio
        mattis. Class aptent taciti sociosqu ad litora torquent per conubia
      </p>
      <div className="flex items-center gap-4">
        {socialMedia?.map((item) => {
          return (
            <div
              key={item?.id}
              className="border p-[6px] rounded-full shadow text-gray-500 cursor-pointer"
            >
              {item?.icon}
            </div>
          );
        })}
      </div>
      <p className="text-[#3E4784] border-y md:px-6 sm:px-4 w-full flex items-center justify-center gap-4 text-center text-sm py-2">
        <div className="flex items-center gap-2">
          <IoLocationOutline size={18} /> Anamnagar - 10, Kathmandu
        </div>
        <div className="flex items-center gap-2">
          <GoMail size={16} /> hi@ayata.com.np
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <FiPhoneCall size={16} /> 92384878484
        </div>
      </p>
      <p className="text-center text-[#818181] text-xs">
        © Copyright 2022 Ayata Incorporation. All rights reserved. Ayata
        Incorporation is a registered 501(c)(3) for-profit organization
      </p>
      <img src={wave} className="object-cover w-full ransform rotate-180" alt="" />
    </div>
  );
}

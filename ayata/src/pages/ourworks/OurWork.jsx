import Heading from "../../components/Heading";
import DescriptionText from "../../components/DescriptionText";
import mobile from "../../assets/mobile.svg";
import ourTeam from "../../assets/ourteam.svg";
import ourTeam2 from "../../assets/ourteam2.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function OurWork() {
  const ourWorks = useRef();
  gsap.registerPlugin(ScrollTrigger);
  var tl = gsap.timeline();

  useGSAP(() => {
    // gsap.from(".firstMobile", {
    //   y: -400,
    //   duration: 2,
    //   rotate: "90",
    //   width: "360px",
    // });
    // gsap.to(".firstMobile", {
    //   scrollTrigger: {
    //     trigger: ".firstMobile",
    //     toggleActions: "restart none none none",
    //     scrub: true,
    //   },
    //   y: 0,
    // });
    // gsap.from(".secondMobile", {
    //   y: -200,
    //   x: 200,
    //   duration: 2,
    //   width: "360px",
    // });
    // gsap.to(".secondMobile", {
    //   scrollTrigger: {
    //     trigger: ".secondMobile",
    //     toggleActions: "restart none none none",
    //     scrub: true,
    //   },
    //   y: 0,
    //   x: 0,
    // });
    // gsap.from(".mobileApplication", {
    //   y: 200,
    //   duration: 2,
    // });
    // gsap.to(".mobileApplication", {
    //   scrollTrigger: {
    //     trigger: ".mobileApplication",
    //     scrub: true,
    //   },
    //   y: 0,
    // });
  });

  return (
    <div ref={ourWorks} className="grid grid-cols-2 md:grid-cols-1 gap-10">
      <div className="flex flex-col gap-8 mobileApplication">
        <Heading title={"Mobile Application Development"} />
        <DescriptionText
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
          }
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="relative w-full">
            <img src={ourTeam} className="h-full object-cover w-full" alt="" />
            <div className="absolute top-0 w-full h-full hover:bg-blue-800 z-20 opacity-25 rounded-lg"></div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <img src={ourTeam2} alt="" className="w-full" />
              <div className="absolute top-0 w-full h-full hover:bg-blue-800 z-20 opacity-25 rounded-lg"></div>
            </div>
            <div className="relative w-full">
              <img src={ourTeam2} className="w-full" alt="" />
              <div className="absolute top-0 w-full h-full hover:bg-blue-800 z-20 opacity-25 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-start md:hidden">
        <img className="z-10 w-[260px] firstMobile" src={mobile} alt="" />
        <img
          className="-ml-20 w-[260px] pt-10 secondMobile"
          src={mobile}
          alt=""
        />
      </div>
    </div>
  );
}

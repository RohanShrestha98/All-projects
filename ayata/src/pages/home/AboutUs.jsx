import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";

export default function AboutUs() {
  const aboutUs = useRef();
  gsap.registerPlugin(ScrollTrigger);
  var tl = gsap.timeline();

  useGSAP(() => {
    gsap.from(".aboutUsTitle", {
      x: -200,
    });
    gsap.to(".aboutUsTitle", {
      scrollTrigger: {
        trigger: ".aboutUs",
        toggleActions: "restart none none none",
      },
      x: 0,
      duration: 0.6,
    });
    gsap.from(".aboutUsDesc", {
      x: 200,
    });
    gsap.to(".aboutUsDesc", {
      scrollTrigger: {
        trigger: ".aboutUs",
        toggleActions: "restart none none none",
      },
      x: 0,
      duration: 0.6,
    });
    gsap.from(".lorem", {
      x: 200,
    });
    gsap.to(".lorem", {
      scrollTrigger: {
        trigger: ".aboutUs",
        toggleActions: "restart none none none",
      },
      x: 0,
      duration: 0.9,
    });
    gsap.from(".learnMore", {
      x: 200,
    });
    gsap.to(".learnMore", {
      scrollTrigger: {
        trigger: ".aboutUs",
        toggleActions: "restart none none none",
      },
      x: 0,
      duration: 1,
    });
  });

  return (
    <div
      ref={aboutUs}
      className="h-screen md:h-full  px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 md:pt-16 md:pb-10 flex flex-col justify-center items-center"
    >
      <div className="flex  justify-between md:flex-col items-start   gap-4 ">
        <div className="w-[30%]    h-[400px] md:h-full md:w-full">
          <p className="text-[#667085] aboutUsTitle font-normal">About us</p>
        </div>
        <div className="w-[70%]  h-[400px] md:h-full md:w-full flex flex-col gap-10 md:gap-6 sm:gap-4">
          <h1 className="font-normal aboutUsDesc text-5xl md:text-3xl sm:text-xl text-[#293056] leading-tight">
            Ayata was created in order to provide a new paradigm for digital
            knowledge sharing.
          </h1>
          <p className="leading-8 lorem w-[75%] md:w-full text-[#667085]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </p>
          <div className="px-10 border learnMore border-[#596273] text-[#596273] hover:bg-[#596273] hover:text-white cursor-pointer rounded-full w-[220px] py-2 flex justify-center items-center gap-3">
            Learn more <IoMdArrowForward size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

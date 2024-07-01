import { useGSAP } from "@gsap/react";
import logo from "../src/assets/logo.svg";
import { useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const loading = useRef();
  var tl = gsap.timeline();
  useGSAP(
    () => {
      tl.to(".name", {
        opacity: 0,
        y: -140,
        duration: 2,
      })
        .to(".desc", {
          opacity: 0,
          duration: 1,
        })
        .from(".about", {
          opacity: 0,
          display: "none",
        })
        .to(".about", {
          opacity: 1,
          y: -280,
          duration: 2,
        })
        .from(".completeLoading", {
          opacity: 1,
          duration: 2,
        })
        .to(".completeLoading", {
          opacity: 0,
          duration: 2,
          display: "none",
        });
    },
    { scope: loading }
  );
  useGSAP(() => {
    gsap.to(".desc", {
      y: -280,
      duration: 2,
    });
  });
  return (
    <div ref={loading}>
      <div className="flex flex-col h-screen completeLoading justify-between px-32 py-4">
        <img src={logo} className="w-10 h-10 " alt="" />
        <h1 className="text-[#3F3D8F] text-5xl name text-center">Ayata Inc.</h1>
        <div className=" font-normal desc">
          <p className="text-[#667085]   text-center text-md">
            More than 5 years ago, we envisioned ourselves as a digital game
            changer.
          </p>
          <p className="text-[#4E5BA6]  text-md text-center ">
            And today we're proving it.
          </p>
        </div>
        <h1 className="about text-center text-[#475467] text-3xl leading-[40px]">
          Ayata Inc creates optimized internet-based interfaces that are <br />
          accessible, interactive, functional and interoperable.
        </h1>
      </div>
    </div>
  );
}

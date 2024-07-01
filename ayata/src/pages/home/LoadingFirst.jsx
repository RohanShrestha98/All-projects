import logo from "../../../public/logo.png";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";

export default function LoadingFirst() {
  const loading = useRef();
  var tl = gsap.timeline();
  gsap.registerPlugin(TextPlugin);

  useGSAP(() => {
    tl.fromTo(
      ".ayataInc",
      { color: "#3F8F3D" },
      {
        text: " Ayata Inc.",
        color: "#3F3D8F",
        ease: "expo",
        duration: 3,
      }
    );
    tl.fromTo(
      ".desc",
      { y: 0, color: "green" },
      { y: -200, color: "black", duration: 2 }
    );
    tl.fromTo(".ayataInc", { opacity: 1 }, { opacity: 0, duration: 2 });
    tl.fromTo(".desc", { opacity: 1 }, { opacity: 0, duration: 2 });
    tl.fromTo(
      ".about",
      { y: 0, display: "none", opacity: 0 },
      { y: -280, display: "block", duration: 1, opacity: 1 }
    );
    tl.fromTo(
      ".completeLoading",
      { opacity: 1 },
      { display: "none", duration: 2, opacity: 0 }
    );
  });
  return (
    <div ref={loading}>
      <div className="flex flex-col h-screen md:h-full  completeLoading justify-between px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4  py-4">
        <img src={logo} className="w-10 h-10 " alt="" />
        <h1 className="text-[#3F3D8F] text-5xl ayataInc  text-center"></h1>
        <div className=" font-normal desc">
          <p className="text-[#667085]   text-center text-md">
            More than 5 years ago, we envisioned ourselves as a digital game
            changer.
          </p>
          <p className="text-[#4E5BA6]  text-md text-center ">
            And today we're proving it.
          </p>
        </div>
        <h1 className="about text-center text-[#475467] hidden text-3xl leading-[40px]">
          Ayata Inc creates optimized internet-based interfaces that are <br />
          accessible, interactive, functional and interoperable.
        </h1>
      </div>
    </div>
  );
}

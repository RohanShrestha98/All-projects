import gsap from "gsap";
import circle from "../src/assets/circle.svg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Header from "./Header";
export default function Hero() {
  const hero = useRef();
  var tl = gsap.timeline();
  useGSAP(
    () => {
      tl.from(".circle", {
        rotate: "+=360",
        duration: 4,
        repeat: -1,
      }).to(".circle", {
        duration: 4,
      });
    },
    { scope: hero }
  );
  useGSAP(
    () => {
      gsap.from(".rights", {
        duration: 2,
        y: 140,
      });
      gsap.to(".rights", {
        y: 0,
        duration: 2,
      });
      gsap.from(".mouse", {
        y: 0,
        duration: 1,
        repeat: -1,
      });
      gsap.to(".mouse", {
        y: 10,
        repeat: -1,
        height: "10px",
        duration: 2,
      });
    },
    { scope: hero }
  );
  return (
    <div>
      <Header />
      <div ref={hero} className="px-32">
        <div className="h-[84vh] relative flex flex-col items-center justify-center">
          <h1 className="text-[200px] text-center text-[#F7F7F7E5]">
            Ayata Inc.
          </h1>
          <img
            src={circle}
            className="absolute circle min-w-[600px]  min-h-[600px]"
            alt=""
          />
          <p className="text-[#293056] future absolute font-medium text-xl">
            INTO THE FUTURE
          </p>
        </div>
        <div className="flex text-[#667085] rights  text-xs bottom-0 items-center justify-between">
          <div className="">— © 2024 by Ayata. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <p>Discover more</p>
            <div className="w-5 h-7 flex justify-center items-start rounded-full border-[#293056] border">
              <div className="w-[2px] bg-[#293056] mouse rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

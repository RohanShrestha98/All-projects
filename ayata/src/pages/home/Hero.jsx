import gsap from "gsap";
import circle from "../../assets/circle.svg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/all";
export default function Hero() {
  const hero = useRef();
  var tl = gsap.timeline();
  gsap.registerPlugin(TextPlugin);

  useGSAP(
    () => {
      tl.from(".circle", {
        rotate: "+=360",
        duration: 4,
        repeat: -1,
        yoyo: true,
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
      gsap.to(".intoTheFuture", {
        duration: 2,
        text: "INTO THE FUTURE",
        ease: "2",
      });
      gsap.from(".mouse", {
        y: 0,
        duration: 1,
        repeat: -1,
      });
      gsap.to(".mouse", {
        y: 6,
        repeat: -1,
        height: "10px",
        duration: 2,
      });
    },
    { scope: hero }
  );
  return (
    <div ref={hero} className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4">
      <div className="h-[84vh] relative flex flex-col items-center justify-center">
        <h1 className="text-[200px] md:text-[160px] sm:text-[100px] text-center text-[#F7F7F7E5]">
          Ayata Inc.
        </h1>
        <img
          src={circle}
          className="absolute circle min-w-[600px]  min-h-[600px] md:min-w-[400px] md:min-h-[400px] sm:min-w-[300px] sm:min-h-[300px]"
          alt=""
        />
        <p className="text-[#293056] intoTheFuture tracking-[10px] future absolute font-medium text-xl"></p>
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
  );
}

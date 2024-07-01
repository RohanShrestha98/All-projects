import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroPage() {
  const home = useRef();
  var tl = gsap.timeline();
  //sequenced one-after-the-other

  useGSAP(
    () => {
      tl.to(".box1", { duration: 2, x: 100 })
        .to(".box2", { duration: 1, y: 200 })
        .to(".box3", { duration: 3, rotation: 360 })
        .from(".desc", {
          // backgroundColor: "red",
          // fontSize: 12,
          color: "gray",
          duration: 2,
          y: 140,
        })
        .to(".desc", {
          y: 0,
          // xPercent: -50,
          yPercent: -50,
          // backgroundColor: "yellow",
          // fontSize: 32,
          // fontWeight: 700,
          color: "black",
          duration: 6,
        });
    },
    { scope: home }
  );
  // useGSAP(
  //   () => {
  //     gsap.from(".title", {
  //       // backgroundColor: "red",
  //       // fontSize: 12,
  //       y: 10,
  //     });
  //     gsap.to(".title", {
  //       y: 0,
  //       // xPercent: -50,
  //       yPercent: -20,
  //       // backgroundColor: "yellow",
  //       // fontSize: 32,
  //       // fontWeight: 700,
  //       color: "green",
  //       duration: 2,
  //     });
  //     gsap.from(".desc", {
  //       // backgroundColor: "red",
  //       // fontSize: 12,
  //       color: "gray",
  //       duration: 2,
  //       y: 140,
  //     });
  //     gsap.to(".desc", {
  //       y: 0,
  //       // xPercent: -50,
  //       yPercent: -50,
  //       // backgroundColor: "yellow",
  //       // fontSize: 32,
  //       // fontWeight: 700,
  //       color: "black",
  //       duration: 6,
  //     });
  //     gsap.from(".box", {
  //       duration: 0,
  //       rotate: "+=360",
  //       // scale: 1.5,
  //       // rotationY: 45,
  //       // x: 10,
  //       y: 0,
  //       // z: -200,
  //     });
  //     gsap.to(".box", {
  //       transformPerspective: 500,
  //       rotation: 120,
  //       // y: 50,
  //       rotate: "+=360",
  //       repeat: -1,
  //       duration: 4,
  //       background: "red",
  //       // scale: 1.5,
  //       // rotationY: 45,
  //       // x: 10,
  //       y: 0,
  //       // z: -200,
  //     });
  //   },
  //   { scope: home }
  // );
  return (
    <div
      ref={home}
      className="flex justify-center flex-col gap-4 h-screen items-center px-20 border"
    >
      <div className=" box1 bg-green-500 h-40 w-40"></div>
      <div className=" box2 bg-orange-500 h-40 w-40"></div>
      <div className=" box3 bg-gray-500 h-40 w-40"></div>
      {/* <div className="relative h-80 w-80">
        <div className="box absolute h-80 w-80 rounded-3xl bg-gray-500">
          <div className="bg-white h-72 w-72"></div>
        </div>
        <div className="box absolute h-80 w-80 rounded-full  bg-gray-500">
          <div className="bg-black opacity-60 h-72 w-72"></div>
        </div>
      </div> */}
      <div className="absolute">
        <div className="title text-center  text-3xl font-bold">
          Rohan Shrestha
        </div>
        <div className="desc  text-lg text-center font-medium mt-6 px-20">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque ipsum
          nisi magni laudantium eaque adipisci magnam sit, molestiae ducimus
          asperiores quis aperiam quos deleniti nam totam ipsam in vitae
          reiciendis?
        </div>
      </div>
    </div>
  );
}

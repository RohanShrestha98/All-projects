import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function Gsap() {
  const box = useRef();
  const parm = useRef();
  const randomX = gsap.utils.random(-200, 200, 1, true);
  const [randomXValue, setRandomXValue] = useState();

  useGSAP(
    () => {
      gsap.to(".square", {
        rotate: "+=360",
        x: randomXValue,
        duration: 3,
      });
    },
    { dependencies: [randomXValue], scope: box, revertOnUpdate: true }
  );
  const handleParmClick = () => {
    gsap.to(".parm", { rotate: 360, duration: 2, repeat: -1 });
  };

  return (
    <div className="App">
      <div ref={box} className="border flex gap-24 ">
        <div className="square h-40 w-40 rounded-3xl bg-green-600"></div>
        <div className="square h-40 w-40 rounded-3xl bg-green-600"></div>
        <div className="square h-40 w-40 rounded-3xl bg-green-600"></div>
      </div>
      <div ref={parm}>
        <div className="h-40 parm w-40 rounded-tl-3xl rounded-br-3xl  bg-red-600"></div>
      </div>
      <div onClick={() => handleParmClick()}>Parm</div>

      <div
        className="mt-40 border cursor-pointer border-gray-600 px-6 py-2 rounded"
        onClick={() => setRandomXValue(randomX())}
      >
        Rotate
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import DescriptionText from "../../components/DescriptionText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function AboutProject({ isReverse, title, description, img }) {

  const navigate = useNavigate()
  const aboutProjectRef = useRef();
  useGSAP(() => {
    gsap.to(".arrowHover", {
      // display: "flex",
      duration: 3,
    });
  });

  return (
    <div
      ref={aboutProjectRef}
      onClick={() => navigate("/project-summary")}
      className={`flex ${
        isReverse && "flex-row-reverse sm:flex-row"
      } sm:flex-col  gap-6 `}
    >
      <div className="relative w-3/5 md:w-1/2 sm:w-full ">
        <img  className="w-full  object-cover" src={img} alt="" />
        <div className="absolute top-0 w-full h-full hover:bg-blue-800 z-20 opacity-25 rounded-lg"></div>
      </div>

      <div className="flex w-2/5 md:w-1/2 sm:w-full flex-col gap-4 mt-4">
        <h1 className="text-[#363F72] font-semibold text-2xl">{title}</h1>
        <DescriptionText
          className={"leading-loose"}
          description={description}
        />
      </div>
    </div>
  );
}

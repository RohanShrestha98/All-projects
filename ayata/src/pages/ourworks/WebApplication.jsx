import Heading from "../../components/Heading";
import DescriptionText from "../../components/DescriptionText";
import project1 from "../../assets/client1.png";
import project2 from "../../assets/client2.png";
import fulllaptop from "../../assets/fulllaptop.svg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function WebApplication() {
  const webApplicationRef = useRef();
  useGSAP(() => {
    gsap.to(".laptopImage", {
      scrollTrigger: {
        trigger: ".laptopImage",
        toggleActions: "restart none none none",
        scrub: true,
      },
      display: "none",
      x: 400,
      duration: 5,
    });
    gsap.from(".description", {
      display: "none",
      y: 100,
      duration: 0,
    });
    gsap.to(".description", {
      scrollTrigger: {
        trigger: ".description",
        toggleActions: "restart none none none",
        scrub: true,
      },
      display: "flex",
      y: 0,
      duration: 5,
    });
  });
  return (
    <div ref={webApplicationRef}>
      {/* <div className="flex justify-center">
        <img
          className="h-full object-cover fullLaptop "
          src={fulllaptop}
          alt=""
        />
      </div> */}

      <div className="grid grid-cols-2 fullLaptop md:grid-cols-1 gap-10">
        <div className=" flex-col  description gap-8 md:gap-6 sm:gap-4">
          <Heading title={"Web Application Development"} />
          <DescriptionText
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <img src={project1} className="h-full object-cover w-full" alt="" />
            <img src={project2} className="h-full object-cover w-full" alt="" />
          </div>
        </div>
        <div className="md:hidden">
          <img
            className="h-full object-cover laptopImage w-full"
            src={fulllaptop}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

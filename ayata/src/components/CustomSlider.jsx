import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import background from "../assets/background.svg";

export default function CustomSlider() {
  const arrowRef = useRef();

  const settings = {
    className: "activeSlider",
    centerMode: true,
    infinite: true,
    autoPlay: true,
    centerPadding: "300px",
    slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: "0px",
        },
      },
    ],
  };

  const number = [];
  for (let i = 0; i <= 10; i++) {
    number.push({
      img: background,
    });
  }

  return (
    <div className="slider-container">
      <Slider ref={arrowRef} {...settings}>
        {number?.map((item) => {
          return (
            <div
              key={item?.value}
              className="px-12 lg:px-10 ml:px-8 outline-none"
            >
              <div className="h-96 overflow-hidden ">
                <img
                  src={item?.img}
                  className="w-full h-full object-cover object-center z-50"
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="flex items-center gap-8 mt-4 justify-center">
        <button
          onClick={() => arrowRef.current.slickPrev()}
          className=" w-8 h-8 bg-gray-200 rounded-full text-gray-700 flex items-center justify-center focus:outline-none"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={() => arrowRef.current.slickNext()}
          className=" w-8 h-8 bg-gray-200 rounded-full text-gray-700 flex items-center justify-center focus:outline-none"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

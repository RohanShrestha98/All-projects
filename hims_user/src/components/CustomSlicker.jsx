/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { useRef } from "react";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#0076d3" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#0076d3" }}
      onClick={onClick}
    />
  );
};

const CustomSlicker = ({ children, rows = 1, slidesToShow }) => {
  const slider = useRef(null);

  const settings = {
    arrows: true,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    rows: rows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => {
      return (
        <div className="dot" onClick={() => slider?.current?.slickGoTo(i)}>
          <p className="invisible">{i + 1}</p>
        </div>
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="lg:px-[90px] px-[36px] mt-8 mb-8 w-full">
      <Slider {...settings} className="flex gap-x-3 py-5" ref={slider}>
        {children}
      </Slider>
    </div>
  );
};

export default CustomSlicker;

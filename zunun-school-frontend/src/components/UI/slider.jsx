import React from "react";
import { Carousel, Row, Col } from "antd";
import image from "../../assets/images/register.png";
import image2 from "../../assets/images/slider.png";
import image3 from "../../assets/images/slider2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const contentStyle = {
  margin: 10,
  height: "80px",
};

const CarouselItems = [
  {
    id: 1,
    img: image,
    text: "We provide the best learning courses and great mentors!",
  },
  {
    id: 2,
    img: image2,
    text: "You will enjoy a friendly and cooperative environment.",
  },
  {
    id: 3,
    img: image3,
    text: "But the assignments must be done at a scheduled time.",
  },
];

const MySlider = () => {
  return (
    <Row className="w-96 max-w-full justify-center items-center">
      <Col>
        <Carousel autoplay={5000} className="w-full ">
          {CarouselItems.map(item => {
            return (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center"
              >
                <div className="flex justify-center w-full">
                  <LazyLoadImage
                    src={item.img}
                    alt={item.text}
                    effect="blur"
                    className="flex-shrink h-56"
                  />
                </div>

                <p
                  style={contentStyle}
                  className="font-semibold font-Urbanist text-xl text-center"
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};

export default MySlider;

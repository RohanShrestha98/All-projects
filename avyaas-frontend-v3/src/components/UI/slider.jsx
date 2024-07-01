import React from "react";
import { Carousel, Row, Col } from "antd";

const contentStyle = {
  margin: 10,
  height: "80px",
};

const MySlider = () => {
  return (
    <Row className="w-96 max-w-full justify-center items-center">
      <Col>
        <Carousel autoplay={5000} className="w-full">
          <div>
            <h3 style={contentStyle} className="font-bold text-xl text-center">
              We provide the best learning courses and great mentors!
            </h3>
          </div>
          <div>
            <h3 style={contentStyle} className="font-bold text-xl  text-center">
              You will enjoy on friendly and co-operative environment.
            </h3>
          </div>
          <div>
            <h3 style={contentStyle} className="font-bold text-xl  text-center">
              But the assignments must be done at a scheduled time.
            </h3>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default MySlider;

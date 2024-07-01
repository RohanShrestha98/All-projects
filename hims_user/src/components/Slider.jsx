import Slider from "react-slick";

export default function SlickSlider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const number = [];
  for (let i = 0; i <= 10; i++) {
    number.push({
      value: i,
    });
  }

  return (
    <div>
      <h2 className="mb-10"> Multiple Item</h2>
      <Slider {...settings}>
        {number?.map((item) => {
          return (
            <div key={item?.value} className="px-3 outline-none">
              <div className="border h-32 py-10 rounded-2xl bg-blue-400 text-white text-2xl font-bold">
                <h3>{item?.value}</h3>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

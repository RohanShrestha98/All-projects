import { QuoteSvg, PumaSvg } from "../../assets/allSvg";
import Slider from "react-slick";

export default function BestService() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const clientSliderList = [
    {
      id: 1,
      title: "The best service in the market.",
      icon: <PumaSvg />,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "The best service in the market.",
      icon: <PumaSvg />,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "The best service in the market.",
      icon: <PumaSvg />,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      title: "The best service in the market.",
      icon: <PumaSvg />,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero etLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];
  return (
    <div className="text-[#FCFCFD] relative bg-[#1F1F1F] py-12 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4">
      <div className="absolute top-0 -mt-10">
        <QuoteSvg />
      </div>
      <Slider {...settings}>
        {clientSliderList.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 text-center"
            >
              <p className="text-xl font-medium uppercase">{item.title}</p>
              <p className="italic leading-8 my-4">{item.message}</p>
              <div className=" flex justify-center ">{item.icon}</div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

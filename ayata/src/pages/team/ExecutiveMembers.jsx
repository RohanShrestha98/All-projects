/* eslint-disable react/prop-types */
import { FaQuoteLeft } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function ExecutiveMembers({
  img,
  name,
  position,
  isReverse,
  description,
}) {
  const socialLinkList = [
    {
      id: 1,
      img: <FaFacebook />,
    },
    {
      id: 2,
      img: <RiInstagramFill size={20} />,
    },
    {
      id: 3,
      img: <FaTwitter />,
    },
    {
      id: 4,
      img: <FaGithub />,
    },
    {
      id: 5,
      img: <FaLinkedin />,
    },
  ];
  return (
    <div
      className={`flex md:flex-col items-start gap-10 md:gap-6 sm:gap-4 w-[92%] md:w-full ${
        isReverse && "ml-[8%] md:ml-0 flex-row-reverse"
      }`}
    >
      <img className="w-2/5 md:w-full" src={img} alt="" />
      <div className="flex w-3/5 md:w-full flex-col gap-8 md:gap-6 sm:gap-4">
        <div className="flex flex-col gap-2">
          <p
            className={`text-[#475467] font-semibold uppercase ${
              isReverse && "text-end md:text-start"
            } `}
          >
            {name}
          </p>
          <p
            className={`text-[#98A2B3] text-sm ${
              isReverse && "text-end md:text-start"
            }`}
          >
            {position}
          </p>
          <div
            className={`flex gap-3 items-center  ${
              isReverse && "justify-end md:justify-start"
            }`}
          >
            {socialLinkList?.map((item) => {
              return (
                <div key={item?.id} className="text-gray-400 text-lg">
                  {item?.img}
                </div>
              );
            })}
          </div>
        </div>

        <FaQuoteLeft className="text-[#475467] text-[40px] md:text-[30px] sm:text-[20px]" />
        <p className="text-[#667085] italic leading-loose md:text-base sm:text-sm">
          {" "}
          {description}
        </p>
      </div>
    </div>
  );
}

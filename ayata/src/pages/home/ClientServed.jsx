import logoOne from "../../assets/clientimage/one.svg";
import logoTwo from "../../assets/clientimage/two.svg";
import logoThree from "../../assets/clientimage/three.svg";
import logoFour from "../../assets/clientimage/four.svg";
import logoFive from "../../assets/clientimage/five.svg";
import logoSix from "../../assets/clientimage/six.svg";
import logoSeven from "../../assets/clientimage/seven.svg";
import logoEight from "../../assets/clientimage/eight.svg";
import logoNine from "../../assets/clientimage/nine.svg";
import logoTen from "../../assets/clientimage/ten.svg";
import logoEleven from "../../assets/clientimage/eleven.svg";
import logoTwelve from "../../assets/clientimage/twelve.svg";
import logoThirteen from "../../assets/clientimage/thirteen.svg";
import { GoArrowRight } from "react-icons/go";

export default function ClientServed() {
  const logoList = [
    logoOne,
    logoTwo,
    logoThree,
    logoFour,
    logoFive,
    logoSix,
    logoSeven,
    logoEight,
    logoNine,
    logoTen,
    logoEleven,
    logoTwelve,
    logoThirteen,
  ];
  return (
    <div className="h-full flex flex-col px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 gap-10 bg-white  py-20">
      <div className="grid grid-cols-2 md:grid-cols-1">
        <div className="flex flex-col gap-6 md:gap-4">
          <h1 className="font-semibold text-6xl md:text-4xl text-[#293056] leading-tight">
            Clients <br /> we’ve served
          </h1>
          <p className="leading-8  text-[#667085]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. libero
            etc.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {logoList?.map((item) => {
          return <img className="grayscale " key={item} src={item} alt="" />;
        })}
      </div>
      <div className="flex items-center justify-center  ">
        <div className="flex items-center justify-center w-[200px] py-2 border-[#596273] hover:bg-[#596273] hover:text-white rounded-full cursor-pointer border gap-3 text-[#596273]">
          View all clients <GoArrowRight size={20} />
        </div>
      </div>
    </div>
  );
}

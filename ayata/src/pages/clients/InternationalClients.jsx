import React from "react";
import Header from "../../components/Header";
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

export default function InternationalClients() {
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
    <div className="py-10 flex flex-col gap-12 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 bg-[#1F1F1F]">
      <Header
        className={"text-white"}
        title={"International Clients"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        }
      />
      <div className="flex flex-wrap gap-14 items-center justify-center">
        {logoList.map((item) => {
          return <img key={item?.id} src={item} alt="" />;
        })}
      </div>
    </div>
  );
}

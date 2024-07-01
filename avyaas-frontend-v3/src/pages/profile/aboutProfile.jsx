import React from "react";
import prof1 from "../../images/prof1.png";
import prof2 from "../../images/prof2.png";
import prof3 from "../../images/prof3.png";
import prof4 from "../../images/prof4.png";
import MobileHeader from "../../components/navbar/mobileHeader";
import { ShieldLockSvg,TermsSvg, QandASvg, VersionSvg } from "../../assets/allSvg";

export default function AboutProfile() {
  const aboutList = [
    {
      id: 1,
      img: <ShieldLockSvg/>,
      title: "Privacy Policy",
    },
    {
      id: 2,
      img: <TermsSvg/>,
      title: "Terms & Conditions",
    },
    {
      id: 3,
      img: <QandASvg/>,
      title: "FAQs",
    },
    {
      id: 4,
      img: <VersionSvg/>,
      title: "App Version",
      version: "2.0.0 (Beta)",
    },
  ];
  return (
    <>
      <MobileHeader headerName={"About"}  noProfile={true} />
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-3 md:px-3">
        {aboutList.map((item) => {
          return (
            <div
              className="border border-[#F7F7F7] rounded-xl flex items-center py-4 md:py-3 px-6 md:px-4 shadow cursor-pointer justify-between"
              key={item.id}>
              <div className="flex items-center gap-6 md:gap-4">
                <p className="bg-[#849890] rounded-full text-white p-2 px-[9px] md:p-[5px] ">
                  {item?.img}</p>
                <p className="text-[#333333] text-sm whitespace-nowrap font-medium">
                  {item.title}
                </p>
              </div>
              <p className="text-[#666666] text-[11px] flex ">{item.version}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

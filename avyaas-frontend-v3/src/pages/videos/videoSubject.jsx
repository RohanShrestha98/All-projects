import React from "react";
// import {
//   BotanySvg,
//   ChemistrySvg,
//   MathematicsSvg,
//   PhysicsSvg,
//   ZoologySvg,
// } from "../../assets/allSvg";

import MobileHeader from "../../components/navbar/mobileHeader";
import Subjects from "../../containers/home/subjects";

export default function VideoSubject() {
  // const subjectData = [
  //   {
  //     id: 1,
  //     Icon: PhysicsSvg,
  //     subject: "Physics",
  //   },
  //   {
  //     id: 2,
  //     Icon: ChemistrySvg,
  //     subject: "Chemistry",
  //   },
  //   {
  //     id: 3,
  //     Icon: MathematicsSvg,
  //     subject: "Math",
  //   },
  //   {
  //     id: 4,
  //     Icon: ZoologySvg,
  //     subject: "Zoology",
  //   },
  //   {
  //     id: 5,
  //     Icon: BotanySvg,
  //     subject: "Botany",
  //   },
  // ];
  return (
    <>
      {/* <div className="flex items-center gap-2 mb-10 cursor-pointer">
        <IoMdArrowBack />
        <h1 className="text-[#1A0203] font-medium text-base">Videos</h1>
      </div> */}
      <MobileHeader headerName={"Subjects"} noArrow={true} />
      <Subjects page="videos" />
    </>
  );
}

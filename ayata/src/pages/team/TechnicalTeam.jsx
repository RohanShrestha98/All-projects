import { useState } from "react";
import Header from "../../components/Header";
import teammember1 from "../../assets/teammember/teammember1.svg";
import teammember2 from "../../assets/teammember/teammember2.svg";
import teammember3 from "../../assets/teammember/teammember3.svg";
import teammember4 from "../../assets/teammember/teammember4.svg";
import teammember5 from "../../assets/teammember/teammember5.svg";
import teammember6 from "../../assets/teammember/teammember6.svg";
import teammember7 from "../../assets/teammember/teammember7.svg";
import teammember8 from "../../assets/teammember/teammember8.svg";
import teammember9 from "../../assets/teammember/teammember9.svg";
import teammember10 from "../../assets/teammember/teammember10.svg";
import TeamMember from "../../components/TeamMember";

export default function TechnicalTeam() {
  const [selectedId, setSelectedId] = useState(1);
  const teamTitle = [
    {
      id: 1,
      name: "Frontend Developers",
      images: [],
    },
    {
      id: 2,
      name: "Backend Developers",
      images: [],
    },
    {
      id: 3,
      name: "Product Designers",
      images: [],
    },
    {
      id: 4,
      name: "Quality Assurance",
      images: [],
    },
    {
      id: 5,
      name: "Flutter Developers",
      images: [],
    },
  ];
  const teamImages = [
    {
      id: 1,
      name: "Aadarsha Lamichhane",
      img: teammember1,
      positionName: "POSITION NAME",
    },
    {
      id: 2,
      name: "Emery Gouse",
      img: teammember2,
      positionName: "POSITION NAME",
    },
    {
      id: 3,
      name: "Kritartha KC",
      img: teammember3,
      positionName: "POSITION NAME",
    },
    {
      id: 4,
      name: "Rohan Shrestha",
      img: teammember4,
      positionName: "POSITION NAME",
    },
    {
      id: 5,
      name: "Simran rana",
      img: teammember5,
      positionName: "POSITION NAME",
    },
    {
      id: 6,
      name: "Mukesh Bhatt",
      img: teammember6,
      positionName: "POSITION NAME",
    },
    {
      id: 7,
      name: "Nicole Sandy",
      img: teammember7,
      positionName: "POSITION NAME",
    },
    {
      id: 8,
      name: "Swasti Pradhan",
      img: teammember8,
      positionName: "POSITION NAME",
    },
    {
      id: 9,
      name: "Tanuja Bastola",
      img: teammember9,
      positionName: "POSITION NAME",
    },
    {
      id: 10,
      name: "Kripa Thapa",
      img: teammember10,
      positionName: "POSITION NAME",
    },
  ];

  return (
    <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 py-20 md:py-16 flex flex-col gap-10">
      <Header
        title={"Meet our Technical team"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        }
      />
      <div className="flex justify-center flex-wrap md:grid md:grid-cols-2 md:gap-2 gap-4">
        {teamTitle?.map((item) => {
          return (
            <div
              onClick={() => setSelectedId(item?.id)}
              className={`border font-medium ${
                item?.id === selectedId
                  ? "border-[#4E5BA6]  text-[#4E5BA6]"
                  : "border-[#666666]"
              } cursor-pointer overflow-hidden line-clamp-1 text-sm px-6 md:px-4 py-1 rounded-full`}
              key={item?.id}
            >
              {item?.name}
            </div>
          );
        })}
      </div>
      <TeamMember data={teamImages} />
    </div>
  );
}

import DescriptionText from "../../components/DescriptionText";
import Heading from "../../components/Heading";
import benifit from "../../assets/benifit.svg";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

export default function BenifitAtAyata() {
  const benifitOfAyata = [
    {
      id: 1,
      name: "Attractive Salary for deserving Candidates",
      icon: "",
    },
    {
      id: 1,
      name: "Occasional Retreat & Outings",
      icon: "",
    },
    {
      id: 1,
      name: "Public Holidays and Paid Holidays",
      icon: "",
    },
    {
      id: 1,
      name: "Working with diverse group of team members",
      icon: "",
    },
    {
      id: 1,
      name: "Opportunity to extend a long-term career plan",
      icon: "",
    },
    {
      id: 1,
      name: "Good exposure to your portfolio / career",
      icon: "",
    },
    {
      id: 1,
      name: "Opportunity to extend a long-term career plan",
      icon: "",
    },
  ];
  return (
    <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4  py-16">
      <div className="flex flex-col justify-center items-center gap-6">
        <Heading title={"Benefits at Ayata"} />
        <DescriptionText
          className={"w-[50%] md:w-[90%] text-center"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        />
      </div>
      <div className="grid mt-8 grid-cols-2 md:grid-cols-1 gap-8">
        <img src={benifit} alt="" />
        <div className="flex flex-col gap-4">
          {benifitOfAyata?.map((item) => {
            return (
              <div
                className="text-[#667085] text-base flex items-center gap-4"
                key={item?.id}
              >
                <div className="bg-[#F2F4F7] p-3 rounded-full">
                  <LiaMoneyBillWaveSolid size={20} />
                </div>
                <p>{item?.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

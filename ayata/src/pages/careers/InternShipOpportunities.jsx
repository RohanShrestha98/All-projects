import DescriptionText from "../../components/DescriptionText";
import Heading from "../../components/Heading";
import OpeningCard from "./OpeningCard";

export default function InternShipOpportunities() {
  const data = [
    {
      id: 1,
      title: "UI/UX Designer",
      level: "Senior Level",
      deadline: "Oct 5, 2023 12:00 PM",
      opening: "1",
    },
    {
      id: 1,
      title: "UI/UX Designer",
      level: "Entry Level",
      deadline: "Oct 5, 2023 12:00 PM",
      opening: "1",
    },
    {
      id: 1,
      title: "UI/UX Designer",
      level: "Mid Level",
      deadline: "Oct 5, 2023 12:00 PM",
      opening: "1",
    },
  ];
  return (
    <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4  py-16">
      <div className="flex flex-col justify-center items-center gap-6">
        <Heading title={"Internship Opportunities"} />
        <DescriptionText
          className={"w-[50%] md:w-[90%] text-center"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full mt-12">
        {data?.map((item) => {
          return <OpeningCard key={item?.id} item={item} />;
        })}
      </div>
    </div>
  );
}

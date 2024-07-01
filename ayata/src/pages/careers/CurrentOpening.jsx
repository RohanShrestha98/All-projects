import Heading from "../../components/Heading";
import DescriptionText from "../../components/DescriptionText";
import OpeningCard from "./OpeningCard";
import { CiSearch } from "react-icons/ci";
import CustomSlider from "../../components/CustomSlider";

export default function CurrentOpening() {
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
    {
      id: 1,
      title: "UI/UX Designer",
      level: "Senior Level",
      deadline: "Oct 5, 2023 12:00 PM",
      opening: "1",
    },
  ];
  return (
    <div className="  pt-16">
      <CustomSlider />
      <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 pt-16">
        <div className="flex flex-col justify-center items-center gap-6">
          <Heading title={"Current Openings"} />
          <DescriptionText
            className={"w-[50%] md:w-[90%] text-center"}
            description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. libero et"
          />
          <div className="flex items-center gap-3 px-4 h-10 w-[60%] md:w-[90%] rounded-full border">
            <CiSearch size={22} className="text-[#667085]" />
            <input
              className=" h-full outline-none w-full"
              type="text"
              placeholder="Search for Job Openings"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full mt-12">
          {data?.map((item) => {
            return <OpeningCard key={item?.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

import SummeryPart from "../../components/SummeryPart";
import team from "../../assets/team.png";
import ExecutiveMembers from "./ExecutiveMembers";
import Header from "../../components/Header";
import ceo1 from "../../assets/ceo1.svg";
import ceo2 from "../../assets/ceo2.svg";
import TechnicalTeam from "./TechnicalTeam";
import Button from "../../components/Button";

export default function TeamPage() {
  return (
    <div className="pb-20">
      <SummeryPart
        title1={"Meet the team of "}
        title2={"Ayata Incorporation"}
        // className={"h-[50vh] w-[90%]"}
        message={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        }
      />
      <img
        src={team}
        className="w-full  h-[360px] md:h-full object-cover"
        alt=""
      />
      <div className="py-20 md:py-16 flex flex-col gap-16 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 ">
        <Header
          title={"Executive Members"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
          }
        />
        <ExecutiveMembers
          img={ceo2}
          name={"Abishek Mahat"}
          position={"CEO"}
          description="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum”"
        />
        <ExecutiveMembers
          img={ceo1}
          name={"Aadarsh Bajahain"}
          position={"CEO"}
          isReverse
          description="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum”"
        />
      </div>
      <img
        src={team}
        className="w-full h-[360px] md:h-full object-cover"
        alt=""
      />
      <TechnicalTeam />

      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-5xl md:text-3xl sm:text-2xl text-center text-[#293056] leading-snug">
          Wanna be a part of Team Ayata?
        </h1>
        <Button buttonName={"hi@ayata.com.np"} width={240} />
      </div>
    </div>
  );
}

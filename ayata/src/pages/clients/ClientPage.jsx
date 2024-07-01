import SummeryPart from "../../components/SummeryPart";
import BestService from "./BestService";
import NationalClients from "./NationalClients";
import NationalProjects from "./NationalProjects";
import InternationalClients from "./InternationalClients";
import InternationalProjects from "./InternationalProjects";
import LetsCollaborate from "./LetsCollaborate";

export default function ClientPage() {
  return (
    <div className="w-[100vw] ">
      <SummeryPart
        title1={"Our Trusted"}
        title2={"Partners"}
        // className={"h-[60vh]"}
        message={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        }
      />
      <BestService />
      <NationalClients />
      <NationalProjects />
      <InternationalClients />
      <InternationalProjects />
      <LetsCollaborate />
    </div>
  );
}

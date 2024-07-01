import BenifitAtAyata from "./BenifitAtAyata";
import CareerBanner from "./CareerBanner";
import CurrentOpening from "./CurrentOpening";
import Hiring from "./Hiring";
import InternShipOpportunities from "./InternShipOpportunities";
import SendYourCv from "./SendYourCv";

export default function CareersPage() {
  return (
    <div>
      <SendYourCv />
      <CurrentOpening />
      <InternShipOpportunities />
      <CareerBanner />
      <BenifitAtAyata />
      <Hiring />
    </div>
  );
}

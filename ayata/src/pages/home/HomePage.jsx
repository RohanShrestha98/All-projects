import AboutUs from "./AboutUs";
import BriefHistory from "./BriefHistory";
import ClientServed from "./ClientServed";
import ContactUs from "./ContactUs";
import Hero from "./Hero";
import WhatWeDo from "./WhatWeDo";

function HomePage() {
  return (
    <div className="element" id="containerElement">
      <Hero />
      <AboutUs />
      <BriefHistory />
      <WhatWeDo />
      <ClientServed />
      <ContactUs />
    </div>
  );
}

export default HomePage;

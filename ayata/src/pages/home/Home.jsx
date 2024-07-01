import Header from "../Header";
import avyaasImage from "./images/services/4.png"
import MedicordImage from "./images/services/3.png"
import StrategyImage from "./images/icons/1.png"
import DesignImage from "./images/icons/2.png"
import DevelopmentImage from "./images/icons/3.png"
import WWFImage from "./images/companies/1.png"
import WHOImage from "./images/companies/2.png"
import GBIMEImage from "./images/companies/3.png"
import NIBLImage from "./images/companies/4.png"
import SBLImage from "./images/companies/5.png" 
import DHImage from "./images/companies/6.png" 
import UTAANImage from "./images/companies/7.png" 
import KYORINImage from "./images/companies/8.png" 
import KMCImage from "./images/companies/9.png" 
import ASHAImage from "./images/companies/10.png" 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import WaveAnimation from "../../components/WaveAnimation";

export default function Home() {
    
    var T = {
        intro: function() {
            var t = gsap.timeline();
            t.to(".logo-illustration", {opacity: 1, duration: 0.8})
              .to(".logo", {opacity: 1, y: 0, duration: 0.3})
              .to(".request", {opacity: 1, y: 0, duration: 0.3})
              .to(".hamburger-menu", {opacity: 1, y: 0, duration: 0.3}, "-=0.3")
              .staggerTo("#intro .js-fadeIn", {opacity: 1, y: 0, duration: 0.6}, 0.2, "sync")
              .to(".copyright", {opacity: 1, y: 0, duration: 0.3}, "sync")
              .fromTo(".meter", {x: "-8px"}, {opacity: 1, rotation: "-90deg", x: "0", duration: 0.3}, "sync")
              .staggerTo(".sidebar-item", {opacity: 1, x: "0%", duration: 0.5}, 0.2, "-=0.3");
        },
        reIntro: function() {
            gsap.to("#intro", {opacity: 1, y: "0px", duration: 0.3});
        },
        // Add similar functions for other animations...
    };

    window.onload = function() {
        T.intro();
        T.reIntro();
    };
    
    
  return (
    <div>
        <Header/>
      <div className="content-container">
        <div id="intro">
            <div className="inner-container">
                <div className="intro-message">
                    <div className="col-8 col-center">
                        <h1 className="headline-big center js-fadeIn text-black land-text-big">Into the Future</h1>
                    </div>
                    <div className="col-4 col-center">
                        <div className="type-divider js-fadeIn"></div>
                        <p className="copy center js-fadeIn mob-font-13">
                            More than 5 years ago, we envisioned ourselves as a digital game changer. And today we're proving it. 
                            <br></br>
                            <strong style={{fontWeight: "800",fontSize: "15px"}}>We are the leap into the future.</strong>
                        </p>
                    </div>
                </div>
            </div>
            <WaveAnimation/>
            {/* <canvas id="canvas" className="logo-illustration"></canvas> */}
        </div>
        <div id="problem">
            <div className="inner-container">
                <div className="problem-message">
                    <div className="col-12">
                        <div className="section-num dark">
                            <span className="section-num-label">002</span>
                            <svg viewBox="0 0 50 50">
                                <defs>
                                    <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%"   stopColor="#5BA2E2"/>
                                        <stop offset="100%" stopColor="#5B65C8"/>
                                    </linearGradient>
                                </defs>
                                <circle className='circle' cx='25' cy='25' r='24' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='200'></circle>
                            </svg>
                        </div>
                        <h2 className="headline dark js-fadeIn vision-headline">
                            Ayata was created in order to provide a new paradigm for digital knowledge sharing.
                        </h2>
                        <div style={{textAlign: "center"}}>
                            <div className="col-3 vision-statement">
                                <img className="js-fadeIn vision-img" src={StrategyImage}/>
                                <h6 className="copy js-fadeIn" style={{fontWeight: "600",fontSize: "20px",color:"white",marginTop:"30px",marginBottom: "20px"}}>Strategy</h6>
                                <p className="copy js-fadeIn" style={{color:"white"}}>
                                    In our continuous strategy process, we analyze customer needs, identify product problems and advise on important future decisions.
                                </p>
                            </div>
                            <div className="col-3 vision-statement">
                                <img className="js-fadeIn vision-img" src={DesignImage}/>
                                <h6 className="copy js-fadeIn" style={{fontWeight: "600",fontSize: "20px",color:"white",marginTop:"30px",marginBottom: "20px"}}>Design</h6>
                                <p className="copy js-fadeIn" style={{color:"white"}}>
                                    Our design process is about making complex solutions simple. We combine thoughtful user experience with clear visual strength.
                                </p>
                            </div>
                            <div className="col-3 vision-statement">
                                <img className="js-fadeIn vision-img" src={DevelopmentImage}/>
                                <h6 className="copy js-fadeIn" style={{fontWeight: "600",fontSize: "20px",color:"white",marginTop:"30px",marginBottom: "20px"}}>Development</h6>
                                <p className="copy js-fadeIn" style={{color:"white"}}>
                                    We bring products to life using the latest technologies while focusing on a perfect visual realization and clean and maintainable code.
                                </p>
                            </div>
                            <div className="col-3  explore-projects" >
                                <a className="copy js-fadeIn" href="https://ayata.com.np" style={{textAlign: "center"}}>
                                    <button className="button">
                                        Explore Projects
                                        <div className="button__horizontal"></div>
                                        <div className="button__vertical"></div>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="solution">
            <div className="inner-container pb-40">
                <div className="col-10">
                    <div className="section-num">
                        <span className="section-num-label">003</span>
                        <svg viewBox="0 0 50 50">
                            <defs>
                                <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%"   stopColor="#5BA2E2"/>
                                    <stop offset="100%" stopColor="#5B65C8"/>
                                </linearGradient>
                            </defs>
                            <circle className='circle' cx='25' cy='25' r='24' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='200'></circle>
                        </svg>
                    </div>
                    <div className="col-4 copy js-fadeIn">
                        <h2 className="headline js-fadeIn" style={{fontWeight:"600",fontSize: "36px"}}>Digital Information in Nepal Reimagined</h2>
                    </div>
                    <p className="col-6 copy js-fadeIn">
                        Nepal has enjoyed incredible success in digital adoption compared to its neighbors, with mobile penetration exceeding 100% and Internet penetration reaching 63%.
                        <br/>
                        This opens the door for new technologies to be adopted and improvised in a rapid rate. This was the opportunity Ayata saw and is acting upon on wich includes three main areas of Health, Education and Finance Technology.
                    </p>
                </div>
            </div>
            <div id="solution-illustration">
                <ul className="waves">
                    <li className="wave"></li>
                    <li className="wave"></li>
                    <li className="wave"></li>
                    <li className="wave"></li>
                    <li className="wave"></li>
                </ul>
                <div className="s_laptop">
                    <div className="s_laptop-screen">
                        <div className="circle-container">
                            <svg viewBox="0 0 96 96">
                                <defs>
                                    <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%"   stopColor="#5BA2E2"/>
                                        <stop offset="100%" stopColor="#5B65C8"/>
                                    </linearGradient>
                                </defs>
                                <circle className='circle-big' cx='48' cy='48' r='47' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='302' strokeDashoffset="302"></circle>
                            </svg>
                            <div className="icon icon-lock"></div>
                            <div className="icon icon-unlocked"></div>
                        </div>
                    </div>
                </div>
                <div className="s_phone">
                    <div className="s_phone-screen">
                        <div className="circle-container">
                            <svg viewBox="0 0 96 96">
                                <defs>
                                    <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%"   stopColor="#5BA2E2"/>
                                        <stop offset="100%" stopColor="#5B65C8"/>
                                    </linearGradient>
                                </defs>
                                <circle className='circle' cx='48' cy='48' r='47' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='0'></circle>
                            </svg>
                            <div className="icon icon-Ayata"></div>
                        </div>
                    </div>
                </div>
                <div className="s_watch">
                    <div className="s_watch-screen">
                        <div className="circle-container">
                            <svg viewBox="0 0 96 96">
                                <defs>
                                    <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%"   stopColor="#5BA2E2"/>
                                        <stop offset="100%" stopColor="#5B65C8"/>
                                    </linearGradient>
                                </defs>
                                <circle className='circle' cx='48' cy='48' r='47' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='400'></circle>
                            </svg>
                            <div className="icon icon-Ayata"></div>
                        </div>
                    </div>
                </div>
                <ul className="s_server">
                    <li className="s_server-light"></li>
                </ul>
            </div>
            <div className="d-center" style={{textAlign:"center"}}>
                <p className="copy col-7 js-fadeIn mob-w-80">
                    Despite rapid urbanization in recent years, Nepal remains one of the least urbanized countries in the world.
                    The World Bank estimates that only one-fifth of the Nepali population lives in urban areas, while more than 80% of the population resides in rural areas.
                    Ayata focuses on this mass of population and wants to encourage and facilitate digial adoption to this rural mass.
                </p>
                <p className="copy col-6 js-fadeIn para-end">So, we have begun.</p>
            </div>
        </div>
        <div id="usecases">
            <div className="inner-container pb-0">
                <div className="col-12">
                    <div className="section-num">
                        <span className="section-num-label">004</span>
                        <svg viewBox="0 0 50 50">
                            <defs>
                                <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%"   stopColor="#5BA2E2"/>
                                    <stop offset="100%" stopColor="#5B65C8"/>
                                </linearGradient>
                            </defs>
                            <circle className='circle' cx='25' cy='25' r='24' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='200'></circle>
                        </svg>
                    </div>
                    <div className="text-left">
                        <h1 className="headline js-fadeIn fw-600" style={{marginBottom: "5px"}}>
                            Solutions we crafted for our clients
                        </h1>
                        <p className="col-6 copy js-fadeIn" style={{marginBottom:"80px"}}>
                           We have been adamant to make normal lives better with our technology. Designs by the Ayata team regularly get recognition from the professional community via design platforms.
                        </p>
                    </div>
                    <div className="col-5">
                        <img className="js-fadeIn" src={avyaasImage} style={{width: "100%",borderRadius: "20px"}}/>
                        <h6 className="js-fadeIn work-titles">Avyaas</h6>
                        <p className="copy-work js-fadeIn" style={{paddingLeft: "20px"}}>
                            Avyaas is an online exam preparation application with the aim to create a free knowledge sharing platform. Avyaas has interactive features such as 3D learning which enables students to visualize concepts and figures.
                        </p>
                    </div>
                    <div className="col-5">
                        <img className="js-fadeIn" src={MedicordImage} style={{width: "100%",borderRadius: "20px"}}/>
                        <h6 className="js-fadeIn work-titles">Medicord</h6>
                        <p className="copy-work js-fadeIn" style={{paddingLeft:"20px"}}>
                            Medicord is an online health portal that helps the user to digitize health data. It is a replacement for the physical paper-based health reports. It is currently a work-in progress for blockchain protected health platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div id="partner">
            <div className="inner-container">
                <div className="col-12">
                    <div className="section-num">
                        <span className="section-num-label">005</span>
                        <svg viewBox="0 0 50 50">
                            <defs>
                                <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%"   stopColor="#5BA2E2"/>
                                    <stop offset="100%" stopColor="#5B65C8"/>
                                </linearGradient>
                            </defs>
                            <circle className='circle' cx='25' cy='25' r='24' fill='transparent' stroke='url(#linear)' strokeWidth='1' strokeDasharray='200'></circle>
                        </svg>
                    </div>
                    <div className="text-left">
                        <h1 className="headline js-fadeIn fw-600" style={{marginBottom: "5px"}}>
                            Our clients and partners
                        </h1>
                        <p className="col-6 copy js-fadeIn mob-text" style={{marginBottom:"80px"}}>
                           Some of our Direct and 3rd Party Clients around the globe that love our work process and have been our long term partner
                        </p>
                    </div>
                </div>
                <div className="col-12" style={{width:"100%",paddingTop: "60px"}}>
                <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono" src={WWFImage}/><br/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">WWF</p>
                            World Wide Fund
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono" src={WHOImage}/>
                        <p className="font-14 mb-2">
                            <p className="bold font-14 mt--30 mb-5">WHO</p>
                            World Health Organization
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono" src={GBIMEImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">GBIME</p>
                            Global IME Bank
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono" src={NIBLImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">NIBL</p>
                            Nepal Investment Bank
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono" src={SBLImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">SBL</p>
                            Siddhartha Bank
                        </p>
                    </div>

                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono mt-50" src={DHImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">DH</p>
                            Dhulikhel Hospital
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono mt-50" src={UTAANImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">UTAAN</p>
                            University of Tokyo 
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono mt-50" src={KYORINImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">KYORIN</p>
                            Kyorin University
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center">
                        <img className="mono mt-50" src={KMCImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">KMC</p>
                            Kathmandu Medical College
                        </p>
                    </div>
                    <div className="col-2 mob-font-10 js-fadeIn text-center mob-none">
                        <img className="mono mt-50" src={ASHAImage}/>
                        <p className="mb-2 font-14">
                            <p className="bold font-14 mt--30 mb-5">ASHA</p>
                            ASHA Japan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

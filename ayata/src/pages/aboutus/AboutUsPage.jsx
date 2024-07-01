import React from 'react'
import SummeryPart from '../../components/SummeryPart'
import team from "../../assets/team.png";
import Quoted from './Quoted';
import AyataInc from './AyataInc';
import WhatWeDo from './WhatWeDo';
import Revolutionizing from './Revolutionizing';
import NumbersAchieved from './NumbersAchieved';
import FutureTechnology from './FutureTechnology';
import BOD from './BOD';
import TechnologiesUsed from './TechnologiesUsed';
import Button from '../../components/Button';


export default function AboutUsPage() {
    return (
        <div>
            <SummeryPart aboutUs className={"text-[40px] h-[50%] pt-16 py-5"} title1={"Tech Solutions with a Personal Touch: Crafting Your Digital Success Story"}/>
            <img src={team} className="w-full  h-[480px] object-cover" alt="" />
            <Quoted/>
            <AyataInc/>
            <WhatWeDo/>
            <Revolutionizing/>
            <NumbersAchieved/>
            <FutureTechnology/>
            <BOD/>
            <TechnologiesUsed/>
            <div className="flex flex-col gap-12 md:gap-8 sm:gap-6 items-center mb-[120px]">
                <h1 className="text-5xl md:text-3xl sm:text-2xl text-center text-[#293056] leading-snug">
                Have a project in mind? <br /> Lets collaborate
                </h1>
                <Button buttonName={"hi@ayata.com.np"} width={240} />
            </div>
        </div>
    )
}

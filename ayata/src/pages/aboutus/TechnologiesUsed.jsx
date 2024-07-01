import React from 'react'
import Header from '../../components/Header'
import technoUsed from "../../assets/TechnoUsed.png";
import react from "../../assets/technologyUsed/react.png";
import figma from "../../assets/technologyUsed/figma.png";
import python from "../../assets/technologyUsed/python.png";
import django from "../../assets/technologyUsed/django.png";
import adobe from "../../assets/technologyUsed/adobe.png";
import go from "../../assets/technologyUsed/go.png";
import html from "../../assets/technologyUsed/html.png";
import css from "../../assets/technologyUsed/css.png";
import flutter from "../../assets/technologyUsed/flutter.png";
import tech from "../../assets/technologyUsed/tech.png";


export default function TechnologiesUsed() {
    const technologyList = [
        react, figma, python, django, adobe, go, html, css, flutter, css, flutter,
    ]
    return (
        <div className='py-[120px] flex flex-col gap-10'>
            <Header title={"Technologies Used"} 
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"}
            />
            <div className='relative w-full'>
                <div className=' flex justify-center pt-60'>
                    <img className='absolute top-0' src={tech} alt="" />
                </div>
                <img className='w-full' src={technoUsed} alt="" />

                <p className='absolute leading-[57.6px] text-5xl font-medium text-[#F8F9FC] w-[50%] bottom-[30%] pl-32'>
                    Cutting edge technologies
                    <span className='text-[#9EA5D1]'> to meet the industry standard and keep up the pace with</span>  modern world.
                </p>
                <div className='absolute flex justify-center  gap-5 bottom-[5%] flex-wrap px-40 '> 
                    {technologyList.map((items) => {
                        return(
                            <div>
                                <img src={items} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

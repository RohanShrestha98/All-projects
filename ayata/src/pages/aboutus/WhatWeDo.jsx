import React from 'react'
import aboutUs from "../../assets/aboutUs.png";

export default function WhatWeDo() {
    const whatWeDoList = [
        {id:1, num:1, title: "Web Application"},
        {id:2, num:2, title: "Mobile Application"},
        {id:3, num:3, title: "Product Design"},
    ]
    return (
        <div className='flex py-[120px] px-32'>
            <div className='w-[60%] flex flex-col gap-6 pe-20'>
                <p className='text-[#667085]'>What we do</p>
                <div className='flex flex-col gap-6'>
                    {
                        whatWeDoList.map((item) => {
                            return(
                                <div key={item.id} className='flex items-center gap-4'>
                                    <p className='text-xl text-[#293056] border-2 font-semibold border-[#293056] rounded-full py-1 px-[14px]'>{item.num}</p>
                                    <div className='border-[#E6E6E6] border w-full'></div>
                                    <p className='text-4xl font-semibold whitespace-nowrap text-[#293056]'>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
            <div><img src={aboutUs} alt="" /></div>
        </div>
    )
}

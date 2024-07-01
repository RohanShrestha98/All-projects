import React from 'react'
import dishHome from "../../assets/dishHome.svg";

export default function ProjectClient() {
    return (
        <div className='bg-[#F8F7F7] px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 py-10'>
            <div className='grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-[80px] md:gap-5 sm:gap-8 '>
                <div className='flex flex-col gap-6 md:gap-3'>
                    <p className='uppercase text-[#475467] text-[13px] font-semibold'>
                        Project Client
                    </p>
                    <img src={dishHome} alt="" />
                </div>
                <div className='flex flex-col gap-6 md:gap-3'>
                    <p className='uppercase text-[#475467] text-[13px] font-semibold'>
                        Project Managed Under
                    </p>
                    <p className='text-[#293056] font-medium'>Tanuja Bastola</p>
                </div>
                <div className='flex flex-col gap-6 md:gap-3'>
                    <p className='uppercase text-[#475467] text-[13px] font-semibold'>
                        Product Design
                    </p>
                    <p className='text-[#293056] font-medium'>Aadarsha Lamichhane</p>
                </div>
                <div className='flex flex-col gap-6 md:gap-3'>
                    <p className='uppercase text-[#475467] text-[13px] font-semibold'>
                        Frontend Engineer(s)
                    </p>
                    <div className='text-[#293056] font-medium flex flex-col gap-3  md:gap-3'>
                        <ul>
                            <li>Rishek Pandey</li>
                            <li>Anish Chaulagain</li>
                            <li>Basant Chaudary</li>
                            <li>Shiv Shah</li>
                            <li>Aman Shrestha</li>
                            <li>Anjesh Shahani</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <p className='uppercase text-[#475467] text-[13px] font-semibold'>
                        Backend Engineer(s)
                    </p>
                    <div className='text-[#293056] font-medium flex flex-col gap-3'>
                    <ul>
                            <li>Rishek Pandey</li>
                            <li>Anish Chaulagain</li>
                            <li>Basant Chaudary</li>
                            <li>Shiv Shah</li>
                            <li>Aman Shrestha</li>
                            <li>Anjesh Shahani</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

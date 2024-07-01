import React from 'react'
import Button from '../../components/Button'
import mobileApp from "../../assets/mobileApp.png";
import { MdArrowOutward } from "react-icons/md";

import appStore from "../../assets/appStore.svg";
import googlePlay from "../../assets/googlePlay.svg";

export default function MobileApp() {
    return (
        <div className='flex flex-col gap-20 md:gap-5 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4'>
            <div className='flex flex-col gap-6 md:gap-3 justify-center items-center'>
                <p className='text-[#667085]'>Project Summary</p>
                <p className='text-[#293056] text-[40px] md:text-3xl font-semibold'>DishHome Mobile Application</p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-1 gap-20 md:gap-10'>
                <div className='flex flex-col gap-6'>
                    <p className='text-[#4E5BA6] font-medium md:text-center'>2023</p>
                    <p className='text-[#667085] leading-10 tracking-tight md:text-center md:text-sm md:leading-8'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor
                    </p>
                    <div className='flex flex-col gap-4 w-fit md:w-full md:items-center'>
                        <div className='flex justify-center'> 
                            <p className='text-[#999999]'>Also Available in</p>
                        </div>
                        <div className='flex gap-3 '>
                            <img src={googlePlay} alt="" />
                            <img src={appStore} alt="" />
                        </div>
                    </div>
                    <div className='md:flex md:justify-center'>
                        <Button icon={<MdArrowOutward/>} buttonName={"View Project"}/>
                    </div>
                </div>
                <div className='md:flex md:justify-center'>
                    <img src={mobileApp} alt="" />
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import summary from "../../assets/summary.png";
import summary2 from "../../assets/summary2.png";
import Button from '../../components/Button';

export default function Summary() {
    return (
        <div className='px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 py-10 flex flex-col gap-[120px] md:gap-10'>
            <div className='flex gap-24 md:flex-col'>
                <div className='flex flex-col gap-10 w-[60%] md:w-full'>
                    <p className='text-5xl font-medium text-[#293056]'>Project Summary</p>
                    <p className='text-[#667085] leading-10 md:text-sm md:leading-[30px]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputateLorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <img className='md:hidden' src={summary} alt="" />
            </div>
            <img src={summary2} alt="" />
            <p className='text-[#667085] leading-10 md:text-sm md:leading-[30px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputateLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet
            </p>
            <img src={summary2} alt="" />
            <div className='flex flex-col gap-10 '>
                <p className='text-5xl md:text-3xl text-[#293056] leading-[57.6px] text-center'>Get insights on various other projects successfully delivered by Ayata</p>
                <div className='flex justify-center'>
                    <Button isArrow={true} buttonName={"View all Projects"} className='whitespace-nowrap '/>
                </div>
            </div>
        </div>
    )
}

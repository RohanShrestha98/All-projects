import React from 'react'
import aboutUs1 from "../../assets/aboutUs1.png";
import aboutUs2 from "../../assets/aboutUs2.png";

export default function FutureTechnology() {
    return (
        <div className='py-[120px] px-32 flex flex-col gap-20'>
            <div className='flex justify-center'>    
                <p className='text-5xl font-medium text-[#293056] leading-[57.6px] text-center w-[80%]'>
                    Building a Future where  
                    <span className='text-[#4E5BA6]'>Technology Transforms Lives</span>: Pioneering Solutions that Inspire Progress and Connectivity.
                </p>
            </div>
            <div className='grid grid-cols-2 gap-10'>
                <p className='text-[#667085] text-[15px] font-light leading-10'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum  ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.
                </p>
                <img src={aboutUs1} alt="" />
            </div>
            <div className='grid grid-cols-2 gap-10'>
                <img src={aboutUs2} alt="" />
                <div className='flex flex-col gap-4'>
                    <p className='text-[#4E5BA6] font-medium'>Our Goals</p>
                    <p className='text-[#667085] text-[15px] font-light leading-10'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum  ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.                
                    </p>
                </div>
            </div>
        </div>
    )
}

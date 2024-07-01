import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";


export default function Quoted() {
    return (
        <div className='h-[54vh]  flex flex-col  items-center justify-center'>
            {/* <FaQuoteLeft className='text-[#475467] h-6 w-8'/> */}
            <h1 className="text-[200px] md:text-[160px] relative sm:text-[100px] text-center text-[#F7F7F7E5]">
                Ayata Inc.
            </h1>
            <div className='absolute text-[#667085] text-[15px] leading-8 text-center w-[45%] flex flex-col gap-7'>
                <div className='flex justify-center'>
                    <FaQuoteLeft className='text-[#475467] h-6 w-8  '/>
                </div>
                <p> “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum”</p>
                <div>
                    <p className='uppercase text-[#475467] font-semibold'>Abishek Mahat</p>
                    <p>CEO</p>
                </div>
            </div>
        </div>
    )
}

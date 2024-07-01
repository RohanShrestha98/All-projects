import React from 'react'

export default function ProductDescription({dark, isImage, image}) {
    return (
        <div className={`  flex flex-col gap-12 ${!dark ? "px-32 py-[120px]" : "px-0"}`} >
            <p className={`text-5xl  font-medium leading-[57.6px] w-[77%] ${dark? "text-[#EAECF5]" : "text-[#293056]"}`}>
                Revolutionizing Industries Through Innovative IT Solutions: Empowering Businesses to Thrive in the Digital Age.
            </p>
            {/* <div className='flex gap-20 ps-28'> */}
            <div className='grid grid-cols-2 gap-20 ps-28'>
                {isImage &&
                    <img src={image} alt=""  className=' object-cover'/>
                }
                <p className={` text-[15px] font-light leading-10  ${dark? "text-[#F2F4F7]" : "text-[#667085]"}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum  ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum
                </p>
            </div>
        </div>
    )
}

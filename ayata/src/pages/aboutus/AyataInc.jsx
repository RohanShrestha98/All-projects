import React from 'react'
import office from "../../assets/office.png";

export default function AyataInc() {
    return (
        <div className='grid grid-cols-2 bg-[#1D1D20] '>
            <img src={office} className='h-full object-cover' alt="" />
            <div className='flex flex-col gap-10 py-10 px-6'>
                <p className='text-[#EAECF5] text-2xl font-semibold'>Ayata Incorporation</p>
                <div className='flex flex-col gap-4 text-[#C8CCE5] pe-32'>
                    <p className='font-medium'>ESTD 2019</p>
                    <p className='text-[15px] text-[#D0D5DD] leading-10 font-light'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et velit interdum, ac aliquetLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquetLorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc 
                    </p>
                </div>
            </div>
        </div>
    )
}

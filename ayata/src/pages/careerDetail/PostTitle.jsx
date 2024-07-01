import React from 'react'
import Button from '../../components/Button'

export default function PostTitle() {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <p className='text-[#293056] text-[40px] font-semibold'>UI/UX Designer</p>
                <p className='text-[#667085]'>Ayata Inc.</p>
            </div>
            <p className='text-[#667085] leading-8'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <Button isArrow className='bg-[#4E5BA6] text-[#FCFCFD] w-[20%] xl:w-[22%] whitespace-nowrap' buttonName={"Apply now"}/>
        </div>
    )
}

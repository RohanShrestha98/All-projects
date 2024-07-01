import React from 'react'
import { MdArrowBack } from "react-icons/md";

export default function BackButton({className}) {
    return (
        <div className={`${className}`}>
            <MdArrowBack onClick={() => navigate(-1)} className='cursor-pointer w-[29.37px] h-[24.33px] '/>
        </div>
    )
}

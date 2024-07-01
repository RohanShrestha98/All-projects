import React from 'react'
import { GlobeSvg } from '../assets/allSvg'
import Button from './Button'

export default function NoVacanies() {
    return (
        <div className='flex flex-col gap-4 items-center'>
            <div className=''>
                <GlobeSvg/>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <p className='text-[#1D2939] font-medium leading-5'>There is no vacancies at the moment.</p>
                <p className='text-[#667085] leading-[30px]'>Apply anyway and our team will definitely get back to you after a while.</p>
            </div>
            <Button buttonName={"Send your CV"} className='my-10'/>
        </div>
    )
}

import React from 'react'
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MobileApp from './MobileApp';
import ProjectClient from './ProjectClient';
import Summary from './Summary';
import BackButton from '../../components/BackButton';

export default function ProjectSummary() {
    const navigate = useNavigate()
    return (
        <div className=' py-16 flex flex-col '>
            {/* <MdArrowBack onClick={() => navigate(-1)} className='ms-32 cursor-pointer w-[29.37px] h-[24.33px] '/> */}
            <BackButton className={"px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4"}/>
            <div className=' flex flex-col gap-24 md:gap-16 sm:gap-10'>
                <MobileApp/>  
                <ProjectClient/>
                <Summary/>
            </div>
        </div>
    )
}

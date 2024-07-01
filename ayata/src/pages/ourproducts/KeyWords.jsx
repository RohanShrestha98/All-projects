import React from 'react'
import { GoDotFill } from "react-icons/go";

export default function KeyWords() {
        return (
            <div className='flex flex-col gap-4 justify-center items-center py-5 mb-32 md:mb-10'>
                <p className='uppercase text-[#363F72] text-xl'>LearnVista</p>
                <div className=' flex gap-6'>
                    <p className='uppercase text-[#363F72] text-xl'>LearnVista</p>
                    <GoDotFill className='text-[#D9D9D9]'/>
                    <p className='uppercase text-[#363F72] text-xl'>EduSphere</p>
                    <GoDotFill className='text-[#D9D9D9]'/>
                    <p className='uppercase text-[#363F72] text-xl'>InsightQuest</p>
                </div>
                <div className=' flex gap-6'>
                    <p className='uppercase text-[#363F72] text-xl'>LearnVista</p>
                    <GoDotFill className='text-[#D9D9D9]'/>
                    <p className='uppercase text-[#363F72] text-xl'>VisualEdge</p>
                </div>
                <p className='uppercase text-[#363F72] text-xl'>MindMeld</p>
            </div>
        )
}

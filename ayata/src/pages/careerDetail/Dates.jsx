import React from 'react'
import { CiMail, CiCalendarDate } from "react-icons/ci";
import { BsClock } from "react-icons/bs";

export default function Dates() {
    const dateList = [
        {id:1, icon: <CiCalendarDate/>, value: "2023-02-12", title: "Posted Date"},
        {id:2, icon: <CiCalendarDate/>, value: "2023-02-27", title: "Application Deadline"},
        {id:3, icon: <BsClock/>, value: "Full Time", title: "Job Type"},
        {id:4, icon: <CiMail/>, value: "hi@ayata.com.np", title: "Contact Email"},
    ]
    return (
        <div className='grid grid-cols-5 gap-3'>
            {
                dateList.map((item) => {
                    return(
                        <div key={item.id} className='bg-[#D9D9D94D] rounded-lg p-3 pb-5 flex items-start gap-4'>
                            <p  className='bg-white rounded-full p-[6px] text-[#4E5BA6]'>{item.icon}</p>
                            <div className='flex flex-col gap-2'>
                                <p className='text-[#4E5BA6] text-[15px] font-medium leading-[19.53px]'>
                                    {item.value}</p>
                                <p className='text-[#667085] text-[13px] font-light leading-[16.93px]'>
                                    {item.title}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

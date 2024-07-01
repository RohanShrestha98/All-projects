import React from 'react'

export default function NumbersAchieved() {
    const amountList = [
        {id:1, amount:"5", title: "Years of Experience", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
        {id:2, amount:"100+", title: "Clients Served", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et"},
        {id:3, amount:"200+", title: "Projects Handled", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum"},
        {id:4, amount:"30+", title: "Team Members", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit"},
    ]
    return (
        <div className='grid grid-cols-4 md:grid-cols-2 md:gap-5 bg-[#1D1D20] py-10 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4'>
            {amountList.map((amountItem) => {
                return(
                    <div key={amountItem.id} className='flex flex-col px-5 gap-6 items-center'>
                        <div className='flex flex-col  items-center'>
                            <p className='text-[56px] md:text-4xl text-[#F8F9FC]'>{amountItem.amount}</p> 
                            <p className='text-[13px] text-[#EAECF5]'>{amountItem.title}</p>
                        </div>
                        <p className='text-[15px] md:text-sm text-[#F2F4F7] leading-8 font-thin text-center'>{amountItem.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

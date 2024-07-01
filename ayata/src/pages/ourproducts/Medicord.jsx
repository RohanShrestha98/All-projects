import React from 'react'
import dashboard from "../../assets/dashboard.png";

import ProductDescription from '../../components/ProductDescription';
// import product4 from "../../assets/product4.png"
import product2 from "../../assets/product2.png";


export default function Medicord() {
    const amountList = [
        {id:1, amount:"5", title: "Years of Experience", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
        {id:2, amount:"100+", title: "Clients Served", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et"},
        {id:3, amount:"200+", title: "Projects Handled", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum"},
        {id:4, amount:"30+", title: "Team Members", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit"},
    ]
    return (
        <div className='bg-[#1D1D20] px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 py-20 flex flex-col gap-[120px]'>
            <div className='flex gap-[66px] '>
                <div className='flex w-[60%] flex-col gap-6'>
                    <p className='text-[#EAECF5] text-6xl font-medium '>Medicord</p>
                    <p className='leading-[40px] text-[#D0D5DD]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum
                    </p>
                </div>
                <img src={dashboard} className='absolute right-0 pe-10 -mt-36' alt="" />
            </div>

            <div className='grid grid-cols-4  py-10  gap-4'>
                {amountList.map((amountItem) => {
                    return(
                        <div key={amountItem.id} className='flex flex-col px-5 py-6 gap-6 items-center bg-[#D9D9D914] rounded-[15px]'>
                            <div className='flex flex-col  items-center'>
                                <p className='text-[56px] text-[#F8F9FC]'>{amountItem.amount}</p> 
                                <p className='text-[13px] text-[#EAECF5]'>{amountItem.title}</p>
                            </div>
                            <p className='text-[15px] text-[#F2F4F7] leading-8 font-thin text-center'>{amountItem.message}</p>
                        </div>
                    )
                })}
            </div>
            <ProductDescription dark isImage image={product2}/>
        </div>
    )
}

import React from 'react'
import Header from '../../components/Header'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { LuUploadCloud } from "react-icons/lu";


export default function ApplicationForm() {
    return (
        <div className='flex  justify-center  '>
            <div className='w-[45%] shadow-md  p-10 flex flex-col gap-6 '>
                <div className='flex flex-col gap-3'>
                    <p className='text-[#193E4D] text-2xl font-medium'>Application Form</p>
                    <p className='text-[#858585] text-[13px] leading-5 '>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
                    </p>
                </div>
                <form className='flex flex-col gap-3'>
                    <InputField required label={"Your Name"}/>
                    <InputField required label={"Your Email"}/>
                    <InputField required label={"Your Contact Number"}/>
                    <InputField required label={"Your Address"}/>
                    <InputField required label={"Your Subject"}/>
                    <div className='flex flex-col gap-[6px]'>
                        <label className="text-sm text-[#667085] leading-5 ">Write a cover letter</label>
                        <textarea id=""
                            cols="20"
                            rows="6"
                            className="border outline-none h-20 rounded-lg px-4 py-2"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="attachment"
                            className=" bg-[#F5F5F5] font-medium text-[#344054] cursor-pointer flex flex-grow justify-center items-center gap-2 outline-none w-full rounded px-4 py-2"
                        >
                            <LuUploadCloud /> Add Attachment
                        </label>
                        <input id="attachment" className="hidden" type="file" />
                    </div>
                    <Button buttonName={"SUBMIT"} isArrow={false} className='bg-[#4E5BA6] text-white'/>
                </form>
            </div>
        </div>
    )
}

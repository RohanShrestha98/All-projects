import React from 'react'
// import { MailSvg } from "../../assets/allSvg";
import Button from './Button';
import { CiMail } from "react-icons/ci";


export default function LetsCollaborateComp({className}) {
    return (
        <div className={`flex flex-col gap-10 items-center justify-center ${className}`}>
            <p className="text-[#293056] text-5xl md:text-3xl sm:text-2xl text-center">
                Have a project in mind? <br />
                Lets collaborate
            </p>
            <Button icon={<CiMail/>} buttonName={"hi@ayata.com.np"} />
        </div>
    )
}

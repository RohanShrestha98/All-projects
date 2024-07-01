import React, { useState } from 'react'
import DiscussionDetails from './discussionDetails';
import empty from "../../images/empty.svg";
import circle from "../../images/circle.svg";
import MobileHeader from '../../components/navbar/mobileHeader';
import { DynamicFooter } from '../../components/footer/dynamicFooter';
import send from "../../images/send.svg";

export default function Replies() {
    const [value, setValue] = useState("");
    const discussionData = [
        {
        id: 1,
        name: "Kripa Thapa",
        date: "March 30, 2023",
        subject: "Physics",
        profile: empty,
        comment: "It was an eye-opener.",
        },
    ];
    const commentData = [
        {
        id: 1,
        name: "Ram Bahadur",
        date: "March 30, 2023",
        subject: "Physics",
        profile: circle,
        comment: "hahahhasdnaskl",
        },
        {
        id: 2,
        name: "Nepal bharati",
        date: "March 30, 2023",
        subject: "Physics",
        profile: circle,
        comment: "Loved it",
        },
        {
        id: 3,
        name: "Jiwan Maran",
        date: "March 30, 2023",
        subject: "Physics",
        profile: circle,
        comment: "Not worth-it",
        },
    ];
    return (
        <div className='mb-20'>
            <MobileHeader headerName={"Comments"} noProfile={true}/>
            <DiscussionDetails data={discussionData} />
            <div className="p-3 flex flex-col gap-3  overflow-scroll no-scrollbar tracking-tight">
                {commentData.map((item) => {
                    return (
                    <div key={item?.id} className="bg-[#F7F7F7] rounded-xl p-2 flex flex-col gap-1">
                        <div className="flex gap-3 mb-3">
                            <img src={item.profile} className="h-[40px]" alt="image" />
                            <span className=" flex flex-col gap-[5px]">
                                <p className="text-[#4D4D4D] text-xs font-semibold  leading-4">
                                {item.name}
                                </p>
                                <p className="text-[#666] text-[10px] leading-3">
                                {item.date}
                                </p>
                            </span>
                        </div>
                        <p className="text-[#4D4D4D] text-[13px]">{item.comment}</p>
                    </div>
                    );
                })}
            </div>
            <div  className={`hidden md:flex gap-3 items-center  bottom-0  w-full fixed py-2 px-3`} 
                style={{ boxShadow: "-5px 2px 4px 0px" }}>
                    <input className='border border-[#D0D5DD] w-full rounded-lg py-2 px-3 text-sm' placeholder='write your comment'  type="text" />
                    <div >
                        <img src={send} alt="" />
                    </div>
            </div>
        </div>
    )
}

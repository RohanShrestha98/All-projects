import React from 'react'

export default function SideBarItems({item, handleActive, active, hideSidebar}) {
    return (
        <div key={item?.id} onClick={() => handleActive(item)} 
            className={`flex  px-4 py-[2px] font-semibold items-center  gap-2 
                ${item?.link === active ? "text-[#4365A7] cursor-default border-l-4 border-[#4365A7]" 
                : "text-[#333333] border-l-4 border-transparent cursor-pointer hover:text-[#4365A7]"}`}>
                <div className="text-lg">{item?.icon}</div>
                {
                !hideSidebar && <div className="line-clamp-1">{item?.name}</div>
                }
        </div>
    )
}

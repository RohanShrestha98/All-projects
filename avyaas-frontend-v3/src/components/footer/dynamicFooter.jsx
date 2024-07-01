import React from "react";
import { RightArrow } from "../../assets/allSvg";

export const DynamicFooter = ({
buttonName,
className,
noArrow,
handleButtonClick,
}) => {
    return (
        <div  className={`hidden md:flex bg-white bottom-0  w-full fixed py-2 ${className}`}
            style={{ boxShadow: "-5px 2px 4px 0px" }} onClick={handleButtonClick}>
            <div className={`px-3  hidden md:inline-block ${className}`}>
                <div className={`flex gap-2 bg-theme-color justify-center py-[10px] px-4 items-center text-white cursor-pointer rounded-lg `}>
                    <button className=" text-sm  text-center ">{buttonName}</button>
                    {!noArrow && <RightArrow />}
                </div>
            </div>
        </div>
    );
};

import React from "react";
import MobileHeader from "../../components/navbar/mobileHeader";
import Subjects from "../../containers/home/subjects";

export const Qbank = () => {
  return (
    <div>
      <MobileHeader headerName={"QBank"} noArrow={true} />
      <div className=" flex flex-col gap-3 ">
        {/* <p className='hidden md:block text-[#595959] text-sm md:px-3'>Subjects</p> */}
        <Subjects page="qBank" />
      </div>
    </div>
  );
};

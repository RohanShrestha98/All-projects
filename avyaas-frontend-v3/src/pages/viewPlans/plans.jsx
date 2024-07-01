import React, { useState } from "react";
import { CircleSvg, DotCicleSvg } from "../../assets/allSvg";
import calculateDiscountedAmount from "../../utils/calculateDiscountedAmount";

export default function Plans({ planTypeData, isLoading, isError,setSelectedPackage }) {
  const [selectedPlanId, setSelectedPlanId] = useState(planTypeData?.[0]?.id);

  return (
    <div className="grid grid-cols-3 xl:grid-cols-2 md:grid-cols-1 gap-6 md:gap-3 ">
      {isLoading ? (
        [...Array(3)]?.map((_, id) => {
          return (
            <div key={id} className="shadow rounded-md p-4  w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-6 rounded" />
                  <div className="h-2 bg-gray-6 rounded" />
                  <div className="h-4 bg-gray-6 rounded" />
                  <div className="h-2 bg-gray-6 rounded" />
                </div>
              </div>
            </div>
          );
        })
      ) : isError ? (
        <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">Error</h1>
      ) : planTypeData?.length === 0 ? (
        <>No data found</>
      ) : (
        planTypeData?.map((item) => {
          return (
            <div
              onClick={() => {
                setSelectedPlanId(item.id) 
                setSelectedPackage(item)}
              }
              className={` font-medium border border-[#DADADA] rounded-lg cursor-pointer bg-white`}
              key={item.id}>
              {item?.recommended && (
                <div className=" md:grid grid-cols-2 md:grid-cols-3 mt-3 hidden">
                  <p className="text-white bg-[#E5A400] rounded-r-full text-xs py-1 px-3">
                    {item?.recommended}
                  </p>
                </div>
              )}
              <div className="p-4 md:p-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[#262626] font-normal text-[24px] md:text-[15px] leading-8 tracking-tight">
                      {item?.period} days plan
                    </p>
                    <p className="text-theme-color text-xs leading-4 bg-[#E4F2FF] rounded-full  px-3 hidden md:inline-block">
                      {item?.discount}% off
                    </p>
                  </div>
                  <div
                    onClick={() => setSelectedPlanId(item.id)}
                    className={` ${item?.recommended ? "md:mt-[-30px]" : ""}`}>
                    {selectedPlanId === item?.id ? (
                      <DotCicleSvg hasCircleLine={true} />
                    ) : (
                      <CircleSvg hasCircleLine={true} color="#dadada" />
                    )}
                  </div>
                </div>
                <p className="text-theme-color text-xs leading-4 bg-[#E4F2FF] rounded-full inline px-3 md:hidden">
                  {item?.discount}% off
                </p>
                <div className="md:flex md:justify-between md:items-end">
                  <div className="flex md:flex-col items-baseline gap-[11px] mt-6 md:mt-2">
                    <p className="text-[#818181] text-xs line-through leading-4">
                      Rs. {item?.price}
                    </p>
                    <p className="text-[#008024] leading-7 text-xl font-medium tracking-tight">
                      Rs.{" "}
                      {calculateDiscountedAmount(item?.price, item?.discount??0)}
                    </p>
                  </div>
                  <p className="text-[#666] text-[10px] leading-3 tracking-tight">
                    Total (Incl. of all charges)
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

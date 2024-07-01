import React, { useEffect } from "react";
import MobileHeader from "../../components/navbar/mobileHeader";
import { RightArrow } from "../../assets/allSvg";

import { useVideoStore } from "../../store/useVideoStore";
export default function TopicSidebar({ data, isLoading, isError, initial }) {
  const { setCurrentUnit, currentUnit } = useVideoStore();

  const filterCurrentUnit = data?.filter((item) => item?.currentUnit);
  useEffect(() => {
    (!filterCurrentUnit || !currentUnit) && setCurrentUnit(data?.[0]?.id);
  }, [filterCurrentUnit]);

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-3 md:mt-[-22px]">
        <MobileHeader
          headerName={"Physics"}
          className={"hidden md:flex"}
          noProfile={true}
        />
        <p className="text-[#999999] text-sm md:hidden">Topics</p>
        <div className="overflow-y-auto no-scrollbar h-[520px] xlg:h-[550px] flex flex-col gap-6 md:gap-3">
          {isLoading || initial ? (
            [...Array(6)]?.map((_, id) => {
              return (
                <div key={id} className="w-full rounded">
                  <div className="animate-pulse">
                    <div className="bg-gray-6 h-12 w-36 lg:w-28 rounded-lg" />
                  </div>
                </div>
              );
            })
          ) : isError ? (
            <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
              Error
            </h1>
          ) : data?.length === 0 ? (
            <>No data found</>
          ) : (
            data?.map((unitItem) => {
              return (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentUnit(unitItem?.id);
                  }}
                  key={unitItem?.id}
                  className={`cursor-pointer ps-2 md:shadow md:p-2 md:justify-between md:items-center md:flex ${
                    currentUnit === unitItem?.id
                      ? "border-l-2  border-theme-red md:border-transparent"
                      : "border-l-2  border-transparent"
                  }`}>
                  <div>
                    <p
                      className={`text-left text-sm hover:text-theme-color  ${
                        currentUnit === unitItem?.id
                          ? "text-theme-color md:text-[#4D4D4D] font-medium"
                          : "text-[#4D4D4D] font-medium"
                      }`}>
                      {unitItem?.title}
                    </p>
                    <p className="text-[#808080] text-[12px]">
                      {!unitItem?.chapter
                        ? "0 chapter"
                        : unitItem?.chapter?.length > 1
                        ? `${unitItem?.chapter?.length} chapters`
                        : `${unitItem?.chapter?.length} chapter`}
                    </p>
                  </div>
                  <RightArrow className="hidden md:flex" currentColor="gray" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

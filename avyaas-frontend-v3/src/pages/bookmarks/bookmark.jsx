import React, { useState } from "react";
import MobileHeader from "../../components/navbar/mobileHeader";
import Button from "../../components/UI/button";
import { useBookmarkData } from "../../hooks/useQueryData";
import { FilledBookmarkSvg, LockSvg, PdfSvg, UnLockSvg } from "../../assets/allSvg";
import Empty from "../../components/shared/empty";
import Error from "../../components/shared/error";

export const Bookmark = () => {
  const buttonNames = [{ label: "Question", value: "question" }, { label: "Content", value: "content" }];
  const [activeButton, setActiveButton] = useState("question");
  const { data, isLoading, isError } = useBookmarkData(activeButton)
  return (
    <div>
      <MobileHeader headerName={"Bookmarks"} noArrow={true} noProfile={true} />
      <div className="flex flex-col md:px-3">
        <div className="flex  gap-3 md:gap-2 md:w-full overflow-scroll no-scrollbar">
          {buttonNames.map((item, id) => {
            return (
              <Button
                handleClick={() => setActiveButton(item?.value)}
                className={`${activeButton === item?.value
                  ? "bg-theme-red border-theme-red text-white"
                  : "text-[#666] border-[#666]"
                  } px-4 xl:px-3 lg:px-2 py-1 text-sm  border  flex items-center gap-2 rounded-full`}
                key={id}
                buttonName={item?.label}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1">
          {
            isError ? (
              <Error message="Something went wrong" />
            ) : data?.data ?
              (
                data?.data?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer"
                      onClick={() => { }}>
                      <div className="bg-[#E5EEFF] rounded-full p-1 text-theme-color">
                        <PdfSvg size={25} />
                      </div>
                      <div className="w-full space-y-2 md:space-y-[4px]">
                        <div className="flex items-center justify-between">
                          <p className=" text-[#333] font-medium text-xs md:text-[11px] tracking-wide">
                            {item?.title}
                          </p>
                          <FilledBookmarkSvg color="#FFC534" />
                        </div>
                        <p className="text-[#808080] text-[10px] md:text-[9px] font-light tracking-wide">
                          Shared publicly 8 months ago{" "}
                        </p>
                      </div>
                    </div>
                  )
                })
              )
              : < Empty className="bg-white" message="No Bookmark found!" />
          }
        </div>
      </div>
    </div>
  );
};

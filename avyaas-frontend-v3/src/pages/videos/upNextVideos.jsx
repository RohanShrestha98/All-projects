import React from "react";
import {
  EmptyVideoSvg,
  LockSvg,
  SolidRightArrowSvg,
  TimeSvg,
} from "../../assets/allSvg";
import { convertSecondsToHMS } from "../../utils/convertSecondsToHMS";
import { useVideoStore } from "../../store/useVideoStore";

const UpNextVideos = ({ upNextData, isLoading, isError, initial }) => {
  const { setCurrentVideo } = useVideoStore();
  // const currentVideoIndex = [...upNextData]?.findIndex(
  //   (item) => item?.id === currentVideo?.id
  // );

  // 9e9  is a ES6 feature to prevent a memory leak as length cause a memory leak
  // const filteredUpNextVideos = [...upNextData]?.splice(
  //   currentVideoIndex + 1,
  //   9e9
  // );

  return (
    <div className="flex flex-col gap-4 md:gap-2 h-[320px] mt-6 md:mt-4 md:h-full  overflow-y-auto no-scrollbar sm:pb-16">
      {isLoading || initial ? (
        [...Array(2)]?.map((_, id) => {
          return (
            <div key={id} className="shadow w-full pt-2 pb-4">
              <div className="animate-pulse space-y-4">
                <div className="w-full flex items-center gap-2 py-1">
                  <div className="rounded-full bg-gray-6 h-8 w-8" />
                  <div className="space-y-3 w-full">
                    <div className="h-4 bg-gray-6 rounded" />
                    <div className="h-2  bg-gray-6 rounded" />
                    <div className="h-4  bg-gray-6 rounded" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : isError ? (
        <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">Error</h1>
      ) : upNextData?.length === 0 ? (
        <div className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer">
          <div className="p-1 text-theme-color">
            <EmptyVideoSvg />
          </div>
          <div className="w-full space-y-2 md:space-y-[4px]">
            <p className="text-[#808080] text-[10px] md:text-[9px] font-light tracking-wide">
              No next videos available
            </p>
          </div>
        </div>
      ) : (
        upNextData?.map((video) => {
          return (
            <div
              key={video?.id}
              className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer"
              onClick={() => {
                setCurrentVideo(video);
              }}
            >
              <div className=" bg-[#E5EEFF] rounded-full p-1 text-theme-color ">
                <SolidRightArrowSvg size={25} />
              </div>
              <div className="w-full space-y-2 md:space-y-[4px]">
                <div className="flex items-center justify-between">
                  <p className=" text-[#333] font-medium text-xs md:text-[11px] tracking-wide">
                    {video?.title}
                  </p>
                  <LockSvg className="text-[#D92626]" />
                </div>
                <div className="flex items-center gap-2 md:gap-1">
                  <TimeSvg className="h-4 w-4" />
                  <p className="text-[#7F7F7F] text-[10px] tracking-tight">
                    {video?.length > 0
                      ? convertSecondsToHMS(video?.length)
                      : null}
                  </p>
                </div>
                <p className="text-[#808080] text-[10px] md:text-[9px] font-light tracking-wide">
                  Shared publicly 8 months ago{" "}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UpNextVideos;

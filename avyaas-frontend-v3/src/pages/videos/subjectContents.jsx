import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmptyFileSvg,
  EmptyVideoSvg,
  LockSvg,
  PdfSvg,
  SolidRightArrowSvg,
  TimeSvg,
  UnLockSvg,
} from "../../assets/allSvg";
import { convertSecondsToHMS } from "../../utils/convertSecondsToHMS";
import { useVideoStore } from "../../store/useVideoStore";
import Empty from "../../components/shared/empty";

export default function SubjectContents({
  unitData,
  activeContent,
  isLoading,
  isError,
}) {
  const navigate = useNavigate();
  const { setCurrentVideo, currentUnit } = useVideoStore();
  const [initial, setInitial] = useState(true);

  const selectedUnit = unitData?.find((item) => item?.id === currentUnit);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [1000]);
  }, []);

  return (
    <>
      {selectedUnit?.chapter?.length ? (
        <div className="h-fit max-h-[60vh] md:max-h-[70vh] overflow-y-auto no-scrollbar">
          {isLoading || initial ? (
            [...Array(5)]?.map((_, id) => {
              return (
                <div key={id} className="w-full pt-2 pb-4">
                  <div className="animate-pulse space-y-4">
                    <div className="h-2 w-24 bg-gray-6 rounded" />
                    <div className="w-full flex items-center gap-2 py-1">
                      <div className="rounded-full bg-gray-6 h-8 w-8" />
                      <div className="space-y-3 w-full">
                        <div className="grid grid-cols-9 gap-4">
                          <div className="h-4 bg-gray-6 rounded col-span-8" />
                          <div className="h-4 bg-gray-6 rounded col-span-1" />
                        </div>
                        <div className="h-3 w-1/3 bg-gray-6 rounded" />
                        <div className="h-4 w-2/3 bg-gray-6 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : isError ? (
            <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
              Error
            </h1>
          ) : unitData?.length === 0 ? (
            <Empty message="No data Found!!" />
          ) : (
            selectedUnit?.chapter?.map((chapter) => {
              const hasContentTypeVideo =
                chapter?.content?.filter(
                  (item) => item?.contentType === "VIDEO"
                ) || [];
              const hasContentTypeResources =
                chapter?.content?.filter(
                  (item) => item?.contentType !== "VIDEO"
                ) || [];
              return (
                <div key={chapter.id} className="mb-5">
                  {activeContent !== "videoDetails" && (
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-2 md:gap-1">
                        <span className="flex gap-2 items-center text-[#4D4D4D] font-bold text-base md:text-xs tracking-wide">
                          {chapter?.title}
                          <p className="text-[#7F7F7F] text-xs tracking-tight leading-3">
                            {activeContent === "resources"
                              ? `${
                                  hasContentTypeResources?.length === 0
                                    ? ""
                                    : hasContentTypeResources?.length === 1
                                    ? "(1 file)"
                                    : `(${hasContentTypeResources?.length} files)`
                                } `
                              : `${
                                  hasContentTypeVideo?.length === 0
                                    ? ""
                                    : hasContentTypeVideo?.length === 1
                                    ? "(1 video)"
                                    : `(${hasContentTypeVideo?.length} videos)`
                                } `}
                          </p>
                        </span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`mt-6 md:mt-4  gap-4 md:gap-2 grid grid-cols-2 md:grid-cols-1`}
                  >
                    {activeContent === "resources" ? (
                      chapter?.content?.length === 0 ? (
                        chapter?.content?.map((file) => {
                          const isPremium = file?.premium === 1 ? true : false;
                          if (file?.contentType !== "VIDEO" || !file) {
                            return (
                              <div
                                key={file?.id}
                                className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer"
                                onClick={() => {}}
                              >
                                <div className="bg-[#E5EEFF] rounded-full p-1 text-theme-color">
                                  <PdfSvg size={25} />
                                </div>
                                <div className="w-full space-y-2 md:space-y-[4px]">
                                  <div className="flex items-center justify-between">
                                    <p className=" text-[#333] font-medium text-xs md:text-[11px] tracking-wide">
                                      {file?.title}
                                    </p>
                                    {isPremium ? (
                                      <UnLockSvg className="text-[#008024] min-w-[24px]  min-h-[24px]" />
                                    ) : (
                                      <LockSvg className="text-[#D92626] min-w-[24px]  min-h-[24px]" />
                                    )}
                                  </div>
                                  <p className="text-[#808080] text-[10px] md:text-[9px] font-light tracking-wide">
                                    Shared publicly 8 months ago{" "}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer">
                          <div className="p-1 text-theme-color">
                            <EmptyFileSvg />
                          </div>
                          <div className="w-full space-y-2 md:space-y-[4px]">
                            <p className="text-[#808080] text-[10px] md:text-[9px] font-light tracking-wide">
                              No file available
                            </p>
                          </div>
                        </div>
                      )
                    ) : chapter?.content?.length ? (
                      chapter?.content?.map((video) => {
                        const isPremium = video?.premium === 1 ? true : false;
                        if (video?.contentType === "VIDEO") {
                          return (
                            <div
                              key={video?.id}
                              className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer"
                              onClick={() => {
                                setCurrentVideo(video);
                                navigate(
                                  `${
                                    isPremium
                                      ? "/subscriptionPlans"
                                      : "/subjects/videos/details"
                                  } `,
                                  {
                                    state: { chapterVideos: chapter?.content },
                                  }
                                );
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
                                  {isPremium ? (
                                    <LockSvg className="text-[#D92626] min-w-[24px]  min-h-[24px]" />
                                  ) : (
                                    <UnLockSvg className="text-[#008024] min-w-[24px]  min-h-[24px]" />
                                  )}
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
                        }
                      })
                    ) : (
                      <div className="flex items-center gap-4 md:gap-2  p-4 md:px-2 bg-[#F7F7F7] rounded-xl cursor-pointer">
                        <div className="p-1 text-theme-color">
                          <EmptyVideoSvg />
                        </div>
                        <div className="w-full space-y-2 md:space-y-[4px]">
                          <p className="text-[#808080] text-[10px] md:text-[9px] font-light tracking-wide">
                            No video available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <Empty message="No Content found!!" />
      )}
    </>
  );
}

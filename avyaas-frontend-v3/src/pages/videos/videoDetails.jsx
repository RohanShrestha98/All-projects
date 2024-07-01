import React, { useEffect, useState } from "react";
import Button from "../../components/UI/button";
import MobileHeader from "../../components/navbar/mobileHeader";
import {
  BookmarkSvg,
  CheckSvg,
  CommentSvg,
  FilledBookmarkSvg,
  SkipNextSvg,
  SolarNoteSvg,
} from "../../assets/allSvg";
import { useContentDetails } from "../../hooks/useQueryData";
import { useVideoStore } from "../../store/useVideoStore";
// import { useLocation } from "react-router-dom";
import { Comments } from "./comments";
import UpNextVideos from "./upNextVideos";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import { useBookmarkMutation } from "../../hooks/useMutateData";
import { decryptedDataInByte } from "../../utils/crypto";
import { useAuthStore } from "../../store/useAuthStore";

export default function VideoDetails() {
  const [activeTab, setActiveTab] = useState("upNext");
  const { currentVideo, recentVideo, setRecentVideo } = useVideoStore();
  const location = useLocation();
  const chapterVideos = location?.state?.chapterVideos;
  const [mark, setMark] = useState(false);
  const {user} = useAuthStore()

  console.log("user",user)


  const {
    data: singleVideoDetail,
    isLoading,
    isError,
  } = useContentDetails(currentVideo?.id);

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  console.log("singleVideoDetail",singleVideoDetail)

  useEffect(() => {
    // Make sure recentVideo is an array and not falsy
    if (!recentVideo) {
      setRecentVideo([singleVideoDetail?.video].filter((item) => !!item));
    } else {
      // Check if the video is not already in recent videos
      if (
        recentVideo.every((item) => item?.id !== singleVideoDetail?.video?.id)
      ) {
        // Limit recent videos to 4 items
        const updatedRecentVideos = [
          singleVideoDetail?.video,
          ...recentVideo.slice(0, 3), // Keep only the latest video
        ].filter((item) => !!item);
        setRecentVideo(updatedRecentVideos);
      }
    }
  }, [singleVideoDetail?.video]);

  const elementData = [
    {
      id: 1,
      title: "Bookmark",
      icon: <BookmarkSvg color="black" />,
    },
    {
      id: 2,
      title: "Notes",
      icon: <SolarNoteSvg />,
    },
    {
      id: 3,
      title: "Completed",
      icon: <CheckSvg />,
    },
  ];

  const videoJsOptions = {
    // autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src:singleVideoDetail?.data?.url,
      },
    ],
  };


const bookmarkMutation = useBookmarkMutation()


  const handleBookmark = async () => {
    const postData ={
      contentID:singleVideoDetail?.data?.id
    }
    try {
      const result = await bookmarkMutation.mutateAsync(["post", mark?`delete/${singleVideoDetail?.data?.id}`:`create`,!mark && postData]);
     setMark(!mark);
     {
      !mark && message.success("Question bookmarked Successfully", [2]);
     }
      
    } catch (error) {
      let errorMessage = error?.response?.data?.error
        ? error?.response?.data?.message?.toString()
        : error?.message?.toString();
        error?.response?.data?.errors?.error && message.error(error?.response?.data?.errors?.error, [2]);
        error?.response?.data?.errors?.student_content_id && message.error(error?.response?.data?.errors?.student_content_id, [2]);
    }
  };

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player;

  //   // You can handle player events here, for example:
  //   player.on('waiting', () => {
  //     videojs.log('player is waiting');
  //   });

  //   player.on('dispose', () => {
  //     videojs.log('player will dispose');
  //   });
  // };

  return (
    <div className="flex gap-16 md:gap-0 pt-8 md:pt-0 px-32  lg:px-16 md:px-0 sm:px-0 pb-28">
      <div className="space-y-10 md:space-y-0 w-full">
        <MobileHeader
          headerName={currentVideo?.title}
          noProfile={true}
          className={"md:px-3"}
        />
        <div className="flex gap-10 md:gap-0 md:flex-col md:h-full h-[50vh] overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-4 w-[45%] xl:w-[50%] md:mt-[-16px] md:w-full md:px-0">
            {isLoading || initial ? (
              <div className="shadow rounded-md p-4  w-full">
                <div className="animate-pulse space-y-4">
                  <div className=" bg-gray-6 h-80 xl:h-72 lg:h-56 md:h-48" />
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-gray-6 rounded col-span-1" />
                      <div className="h-4 bg-gray-6 rounded col-span-1" />
                      <div className="h-4 bg-gray-6 rounded col-span-1" />
                    </div>
                    <hr className="text-[#EFEFEF] md:hidden" />
                    <div className="h-8 bg-gray-6 rounded" />
                  </div>
                </div>
              </div>
            ) : isError ? (
              <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
                Error
              </h1>
            ) : singleVideoDetail?.length === 0 ? (
              <>No data found</>
            ) : (
              <>
                <div
                // className="h-80 xl:h-72 lg:h-56 md:h-48 md:sticky md:top-0 bg-white"
                >
                  <VideoPlayer options={videoJsOptions} />
                  {/* <video
                    className="h-80 xl:h-72 lg:h-56 md:h-48 md:sticky md:top-0 bg-white"
                    preload={true}
                    // height="100%"
                    // width="100%"
                    controls
                    src={singleVideoDetail?.video?.signedUrl}
                  /> */}
                </div>
                <h1 className="text-[#130d0d] font-semibold text-base md:text-sm md:px-4  md:block">
                  {singleVideoDetail?.data?.title}
                </h1>
                <p className="hidden md:block md:text-xs text-[#595959] text-sm leading-5 font-light md:px-4 ">
                  {singleVideoDetail?.data?.description ??
                    "Always specify both the height and width attributes for videos. If these attributes are set, the required space for the video is reserved when the page is loaded. However, without these attributes, the browser does not know the size of the video, and cannot reserve the appropriate space to it. The effect will be that the page layout will change during loading (while the video loads "}
                </p>
                <div className="flex items-center gap-5 md:px-4 ">
                  {elementData.map((item) => {
                    return (
                      <div
                        onClick={() => {}}
                        className="flex flex-col gap-1 cursor-pointer items-center"
                        key={item.id}
                      >
                        {
                          item?.id === 1? <div onClick={()=>handleBookmark()}>{mark ? (
                            <FilledBookmarkSvg color="#FFC534" />
                          ) : (
                            <BookmarkSvg />
                          )}</div>: <p className="">{item.icon}</p>
                        }
                       
                        <p className="text-[#666666] text-xs md:text-[10px]">
                          {item.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <hr className="text-[#EFEFEF] md:hidden" />
                <div className="h-3 bg-[#EFEFEF] hidden md:block"></div>
                <p className="text-[#595959] text-sm leading-5 font-light md:px-4 md:hidden">
                  {singleVideoDetail?.video?.description ||
                    "Always specify both the height and width attributes for videos. If these attributes are set, the required space for the video is reserved when the page is loaded. However, without these attributes, the browser does not know the size of the video, and cannot reserve the appropriate space to it. The effect will be that the page layout will change during loading (while the video loads"}
                </p>
              </>
            )}
          </div>
          <div className="w-[30%] md:h-[78vh]  xl:w-[50%] md:w-full md:px-4">
            <div className="flex gap-3 overflow-x-scroll no-scrollbar md:mt-4">
              <Button
                handleClick={() => setActiveTab("upNext")}
                icon={<SkipNextSvg />}
                buttonName={"Up Next"}
                className={`${
                  activeTab === "upNext"
                    ? "bg-theme-color border-theme-color text-white"
                    : "text-[#666] border-[#666]"
                } px-4 xl:px-3 lg:px-2 py-1 text-sm  border  flex items-center gap-2 rounded-full`}
              />
              <Button
                handleClick={() => setActiveTab("comments")}
                icon={<CommentSvg />}
                buttonName={"Comments"}
                className={`${
                  activeTab === "comments"
                    ? "bg-theme-color border-theme-color text-white"
                    : "text-[#666] border-[#666]"
                } px-4 xl:px-3 lg:px-2 py-1 text-sm border flex items-center gap-2 rounded-full`}
              />
            </div>
            {activeTab === "upNext" && (
              <p className="text-[#999999] text-xs mt-4 uppercase">
                Playing Next
              </p>
            )}

            {activeTab === "comments" ? (
              <Comments videoId={currentVideo?.id} />
            ) : (
              <UpNextVideos
                upNextData={chapterVideos}
                isLoading={isLoading}
                isError={isError}
                initial={initial}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

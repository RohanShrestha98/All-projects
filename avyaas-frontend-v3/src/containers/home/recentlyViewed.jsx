import React from "react";
import { Progress } from "antd";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerTitle,
} from "react-shimmer-effects";
import { PlaySvg } from "../../assets/allSvg";
import { useVideoStore } from "../../store/useVideoStore";
import { convertSecondsToHMS } from "../../utils/convertSecondsToHMS";
import { useNavigate } from "react-router-dom";

const RecentlyViewed = ({ initial }) => {
  const { recentVideo, setCurrentVideo } = useVideoStore();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center w-full gap-4 md:gap-3">
      {initial ? (
        <div className="w-32">
          <ShimmerText line={1} />
        </div>
      ) : (
        <section className="flex items-center gap-3">
          <span className="border border-l-1 h-4 text-[#595959] md:hidden" />
          <h2 className="text-base font-semibold md:text-xs font-semi-bold text-[#595959]">
            Recently Viewed
          </h2>
        </section>
      )}
      <div className="flex items-center gap-4 md:gap-2 overflow-x-scroll no-scrollbar pl-3 md:pl-0">
        {recentVideo?.map((item) => {
          return (
            <div
              onClick={() => {
                navigate("/subjects/videos/details");
                setCurrentVideo(item);
              }}
              className="w-[294px] flex px-4 py-3 md:p-2 bg-white gap-4 items-center hover:shadow-md border border-[#C6D3EC] rounded-xl cursor-pointer"
              key={item?.id}>
              {initial ? (
                <ShimmerCircularImage size={40} />
              ) : (
                <div className="bg-[#E5EEFF] flex items-center justify-center rounded-full p-3">
                  <PlaySvg color="#4365A7" />
                </div>
              )}
              <div className="flex flex-col flex-grow">
                {initial ? (
                  <div className="w-32">
                    <ShimmerTitle line={1} />
                  </div>
                ) : (
                  <p className="text-[17px] md:text-sm sm:text-xs text-black-gray font-bold line-clamp-1">
                    {item?.title}
                  </p>
                )}
                {initial ? (
                  <div className="w-32">
                    <ShimmerTitle line={1} />
                  </div>
                ) : (
                  <p className="text-xs text-[#737373] whitespace-nowrap sm:text-[10px]">
                    {convertSecondsToHMS(item?.length)}
                  </p>
                )}
                {initial ? (
                  <ShimmerText line={1} />
                ) : (
                  <div className="w-44 sm:w-40">
                    <Progress
                      percent={90}
                      showInfo={false}
                      strokeColor="#4365A7"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewed;

import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { Progress } from "antd";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerTitle,
} from "react-shimmer-effects";

const recentContents = [
  {
    subject: "English",
    progress: <Progress percent={50} showInfo={false} strokeColor="#00B9D6" />,
  },
  {
    subject: "Astronomy",
    progress: <Progress percent={50} showInfo={false} strokeColor="#00B9D6" />,
  },
  {
    subject: "Mathematics",
    progress: <Progress percent={50} showInfo={false} strokeColor="#00B9D6" />,
  },
  {
    subject: "Chemistry",
    progress: <Progress percent={50} showInfo={false} strokeColor="#00B9D6" />,
  },
];

const RecentlyViewed = ({ initial }) => {
  return (
    <div className="flex flex-col justify-center w-full gap-4">
      {initial ? (
        <div className="w-32">
          <ShimmerText line={1} />
        </div>
      ) : (
        <p className="text-xl font-bold sm:text-lg">Recently Viewed</p>
      )}
      <div className="flex items-center gap-5 overflow-x-scroll">
        {recentContents?.map(({ subject, progress }, id) => {
          return (
            <div
              className="w-[294px] flex p-4 bg-white rounded-[10px] gap-4 items-center hover:shadow-md"
              key={id}
            >
              {initial ? (
                <ShimmerCircularImage size={50} />
              ) : (
                <div className="bg-cyan-light flex items-center justify-center rounded-full w-12 h-12">
                  <BsFillPlayFill className="text-blue-light text-3xl" />
                </div>
              )}
              <div className="flex flex-col flex-grow">
                {initial ? (
                  <div className="w-32">
                    <ShimmerTitle line={1} />
                  </div>
                ) : (
                  <p className="text-[17px] text-black-gray font-bold whitespace-nowrap sm:text-[16px]">
                    {subject}
                  </p>
                )}
                {initial ? (
                  <ShimmerText line={1} />
                ) : (
                  <div className="w-44">{progress}</div>
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

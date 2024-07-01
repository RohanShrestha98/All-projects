import React from "react";
import liveUpdate from "../../assets/liveUpdate.svg";
import live from "../../assets/live.svg";
import watch from "../../assets/watch.svg";
import crown from "../../assets/crown.svg";
import Button from "../../components/UI/button";
import { useMeetingContext } from "../../components/context/meetingContext";
import { Link } from "react-router-dom";
import { useLiveList } from "../../hooks/useQueryData";
import {  decryptedDataInByte } from "../../utils/crypto";

const LiveUpdates = () => {
  const { data, isLoading } = useLiveList(9);
  const { setMeeting } = useMeetingContext();

  const decriptedData = decryptedDataInByte(data?.data)

  // console.log("decriptedData",decriptedData)

  const liveUpdates = [
    {
      id: 1,
      name: "Biology Test 1",
      questionCount: 300,
      duration: 120,
      isPremium: true,
      fees: 1000,
      image: liveUpdate,
    },
    {
      id: 2,
      name: "Physics Test 1",
      questionCount: 200,
      duration: 100,
      isPremium: false,
      fees: 400,
      image: liveUpdate,
    },
  ];


  return (
    <div className="flex flex-col gap-4 md:gap-3">
      {/* <section className="flex items-center gap-3">
        <span className="border border-l-1 h-4 text-[#595959] md:hidden" />
        <h2 className="text-base font-semibold md:text-xs font-semi-bold text-[#595959] ">
          Live Updates
        </h2>
      </section> */}
      <section className="grid grid-cols-2 md:grid-cols-1 md:flex-col lg:flex overflow-auto no-scrollbar  gap-4 xl:pr-0 pr-12  md:pl-0 mb-2 ">
        {liveUpdates?.map((item) => {
          return (
            <div
              key={item.id}
              className="gap-4 sm:min-w-[75vw] md:min-w-[60vw] bg-gray-light justify-between rounded-xl p-4 lg:p-3 md:p-2"
            >
              <div className="flex gap-4">
                <img
                  src={liveUpdate}
                  className="h-12 lg:h-11 md:h-10 w-12 md:w-10 bg-theme-color p-2 rounded-full"
                />
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    <div className="space-y-2 md:space-y-1">
                      <span className="flex xlg:flex-col lg:flex-row gap-2 text-blue text-[13px] lg:text-xs md:text-[10px]">
                        {item?.questionCount} Que{" "}
                        {!item?.isFree && (
                          <section className="bg-[#DFA820] px-2 w-fit rounded-full flex gap-2 md:gap-1 items-center">
                            <img src={crown} />
                            <p className="text-white text-[12px] lg:text-[11px] md:text-[10px]">
                              Premium
                            </p>
                          </section>
                        )}
                      </span>
                      <h4 className="text-black font-medium lg:text-xs">
                        {item?.topic}
                      </h4>
                      <div className="flex gap-4 sm:gap-2 items-center">
                        <span className="flex gap-2 md:gap-1">
                          <img src={watch} alt="watch" />
                          <p className="text-xs md:text-[10px] text-[#737373]">
                            {item?.duration} Mins
                          </p>
                        </span>
                        <span className="text-[#008024] md:text-[12px]">
                          {" "}
                          Fees: {item?.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      {item?.isLive && (
                        <span className="flex gap-2 md:gap-[6px] items-center ">
                          <img
                            src={live}
                            alt="live"
                            className="animate-pulse "
                          />
                          <p className="text-red uppercase text-sm md:text-[12px]">
                            Live
                          </p>
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/live/meeting`}
                    onClick={() => {
                      setMeeting({
                        meetingId: item?.meetingID,
                        meetingPw: item?.password,
                        meetingMsdkKey: "XTLewwauRhaSDJOpGCR8GA",
                      });
                    }}
                  >
                    <Button
                      buttonName="Join"
                      className="bg-theme-color text-white rounded-md px-2 py-2 text-xs md:text-[10px] w-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default LiveUpdates;

import React from "react";
import { UpVoteSvg } from "../../assets/allSvg";
import empty from "../../images/empty.svg";
import dayjs from "dayjs";
import { usePollVoteMutation } from "../../hooks/useMutateData";
import { message } from "antd";
import Empty from "../../components/shared/empty";

const optionAlphabet = ["A", "B", "C", "D"];

export default function PollDetails({ data, isLoading, isError }) {

  const pollVoteMutation = usePollVoteMutation();

  const handlePollVote = (data) => {
    const postData ={
       optionID:data?.pollOptionId
    }
    pollVoteMutation.mutateAsync(["patch", `/${data?.pollId}`, postData], {
      onSuccess: () => {
        message.success("Vote provided successfully", [2]);
      },
      onError: (error) => {
        message.error(error?.response?.data?.errors?.error, [2]);
      },
    });
  };


  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        [...Array(5)]?.map((_, id) => {
          return (
            <div key={id} className="shadow rounded-md p-4  w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-6 h-10 w-10" />
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-gray-6 rounded" />
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-gray-6 rounded col-span-2" />
                      <div className="h-2 bg-gray-6 rounded col-span-1" />
                    </div>
                    <div className="h-2 bg-gray-6 rounded" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : isError ? (
        <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">Error</h1>
      ) : !data?.length ? (
        <Empty className="bg-white" message="No Poll found!!" />

      ) : (
        data?.map((pollItem, id) => {
          const totalVoteCount = pollItem?.options.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.voteCount;
        }, 0);
          return (
            <div
              key={id}
              className="tracking-tight bg-[#ffffff] rounded-xl p-3 ">
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-3 mb-3">
                    <img
                      src={empty || pollItem?.user?.imageId}
                      className="h-[24px]"
                      alt="image"
                    />
                    <span className=" flex flex-col gap-[3px]">
                      <p className="text-[#4D4D4D] text-[10px] font-semibold  leading-4">
                        {pollItem?.createdBy?.name === " " ?"Rohan Shrestha":pollItem?.createdBy?.name}
                      </p>
                      <p className="text-[#666] text-[8px] leading-3">
                        {dayjs(pollItem?.createdAt).format("MMM D, YYYY ")}
                      </p>
                    </span>
                  </div>
                  <div className="text-theme-color font-medium text-[10px] leading-5 bg-[#E4F2FF] h-6 rounded-full px-4 inline-block cursor-pointer">
                    {pollItem?.subject?.title}
                  </div>
                </div>
                <p className="text-[#4D4D4D] text-[10px]">
                  {pollItem?.question || "No comment"}
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 md:gap-[6px]">
                {pollItem?.options?.map((pollOption, id) => {
                  const pollVoteCount = pollOption?.voteCount;
                  const pollVotePercentage =
                    pollVoteCount === 0
                      ? 0
                      : Math.round((pollVoteCount / totalVoteCount) * 100);
                  return (
                    <div
                      key={pollOption?.id}
                      className="rounded-xl bg-[#EBEBEB] flex justify-between  items-center">
                      <div
                      style={{width:pollVotePercentage+"%"}}
                        className={` rounded-xl flex items-center py-2  px-4 md:px-2 gap-4 md:gap-3 ${
                          pollVotePercentage >= 90
                            ? "bg-[#D5E7BE] "
                            : pollVotePercentage >= 80
                            ? "bg-[#B2DCE5CC]"
                            : pollVotePercentage >= 60
                            ? "bg-[#E6E7BE]"
                            : pollVotePercentage >= 40
                            ? "bg-[#E6E7BE] "
                            : pollVotePercentage >= 20
                            ? "bg-[#E7CFBE]"
                            : ""
                        } `}>
                        <p className="bg-[#FAFAFA] text-[#595959]  rounded-full text-base md:text-xs font-semibold leading-6 whitespace-nowrap tracking-widest inline-block px-2 md:py-1 py-[3px]">
                          {optionAlphabet?.[id]}
                        </p>
                        <p className="text-[#4D4D4D] text-sm md:text-xs tracking-tight font-bold md:whitespace-nowrap">
                          {pollOption?.tile || "No name"}
                        </p>
                      </div>
                      <div className="min-w-28 rounded-xl py-2 px-4 ">
                        <div className="flex items-center justify-center gap-2 md:gap-1  bg-white rounded-full px-2 py-1">
                          <i
                            onClick={() =>{
                              !pollItem?.votedOption &&
                              handlePollVote({
                                pollId: pollItem?.id,
                                pollOptionId: pollOption?.id,
                              })}
                            }>
                            <UpVoteSvg
                              fillColor={
                                pollOption?.voteCount === 0 ? "#7F7F7F" : "#4365A7"
                              }
                              className={`${
                                !pollItem?.votedOption
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              } h-[13px] `}
                            />
                          </i>

                          <p className="text-[#4D4D4D]  whitespace-nowrap text-xs md:text-[10px] md:whitespace-nowrap">
                            {pollOption?.voteCount > 1
                              ? `${pollOption?.voteCount} votes`
                              : `${pollOption?.voteCount} vote`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

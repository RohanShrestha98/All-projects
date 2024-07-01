import React, { useState } from "react";
import CommentModal from "./commentModal";
import { BubbleCommentSvg, ClapSvg } from "../../assets/allSvg";
import empty from "../../images/empty.svg";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDiscussionVoteMutation } from "../../hooks/useMutateData";
import { message } from "antd";
import Empty from "../../components/shared/empty";
import Error from "../../components/shared/error";

export default function DiscussionDetails({ data, isLoading, isError }) {
  const navigate = useNavigate();
  const width = useWindowsDimensions();
console.log("data",data)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState("");
  const discussionVoteMutation =
    useDiscussionVoteMutation(selectedDiscussion?.id);

  const handleDiscussionVote = () => {
    discussionVoteMutation.mutateAsync(["patch", "", ""], {
      onSuccess: () => {
        message.success("Vote provided successfully", [2]);
      },
      onError: (error) => {
        let errorMessage = error?.response?.data?.error
          ? error?.response?.data?.message?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 md:gap-2">
      {isLoading ? (
        [...Array(5)]?.map((_, id) => {
          return (
            <div key={id} className="shadow rounded-md p-4  w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-6 h-8 w-8"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-gray-6 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-gray-6 rounded col-span-2"></div>
                      <div className="h-2 bg-gray-6 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-gray-6 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : isError ? (
        <Error message="Something went wrong" />
      ) : !data ? (
        <Empty className="bg-white" message="No Discussion found!!" />
      ) : (
        data?.map((item) => (
          <div
            key={item?.id}
            className=" bg-white rounded-2xl p-4  tracking-tight">
            <div className="flex justify-between items-center md:items-start mb-6 md:mb-4">
              <div className="flex gap-3">
                <img
                  src={empty || item?.user?.imageId}
                  alt="image"
                  className="md:h-8"
                />
                <span className=" flex flex-col gap-[10px] md:gap-[6px]">
                  <p className="text-[#4D4D4D] text-sm md:text-xs font-semibold  leading-4">
                  {item?.createdBy?.name === " " ?"Rohan Shrestha":item?.createdBy?.name}
                  </p>
                  <p className="text-[#666] text-xs md:text-[10px] leading-3">
                    {dayjs(item?.ent_date).format("MMM D, YYYY ")}
                  </p>
                </span>
              </div>
              <div className="text-theme-color font-medium text-sm md:text-xs leading-5 bg-[#E4F2FF] rounded-full px-6 py-1 inline-block cursor-pointer">
                {item?.subject?.title}
              </div>
            </div>
            <p className="text-[#4D4D4D] text-sm">
              {item?.title || "No title"}
            </p>
            <hr className="text-[#F2F2F2] my-3" />
            <div className="flex md:justify-between gap-6 text-[#4D4D4D] text-sm leading-4 ">
              <span className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    setSelectedDiscussion(item);
                    handleDiscussionVote();
                  }}>
                  <ClapSvg
                    className={`${
                      item?.hasVoted && "text-theme-color"
                    } h-[18px] w-[18px] `}
                  />
                </button>
                <p className="text-sm md:text-xs ">
                  {item?.voteCount > 1
                    ? `${item?.voteCount} Claps`
                    : `${item?.voteCount} Clap`}
                </p>
              </span>

              <span
                onClick={() => {
                  setSelectedDiscussion(item);
                  width > 768
                    ? setIsModalOpen(true)
                    : navigate("/discussion/replies", {
                        state: selectedDiscussion?.id,
                      });
                }}
                className="flex gap-2 cursor-pointer items-center">
                <BubbleCommentSvg className="h-[18px] w-[18px]" />
                <p className="text-sm md:text-xs">
                  {item?.replyCount > 1
                    ? `${item?.replyCount} Replies`
                    : `${item?.replyCount} Reply`}
                </p>
              </span>
            </div>
          </div>
        ))
      )}
      {isModalOpen && (
        <CommentModal
          id={selectedDiscussion?.id}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          submit={() => setIsModalOpen(true)}
          cancel={() => setIsModalOpen(false)}
          data={data}
          selectedDiscussion={selectedDiscussion}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import Button from "../../components/UI/button";
import DiscussionDetails from "./discussionDetails";
import PollDetails from "./pollDetails";
import { useNavigate } from "react-router-dom";
import { PlusSvg } from "../../assets/allSvg";
import MobileHeader from "../../components/navbar/mobileHeader";
import {
  useDiscussion,
  usePoll,
  useSubjectData,
} from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import { ShimmerButton } from "react-shimmer-effects";

export default function Discussion() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [activeSubjectId, setActiveSubjectId] = useState("all");
  const { currentModule } = useModuleStore();
  const { data: subjectData, isLoading: subjectDataLoading } = useSubjectData(
    currentModule?.id
  );
  const {
    data: discussionData,
    isLoading: discussionLoading,
    isError: discussionError,
  } = useDiscussion(activeSubjectId);

  const {
    data: pollData,
    isLoading: pollLoading,
    isError: pollError,
  } = usePoll(activeSubjectId);

  console.log("pollData",pollData?.data)

  return (
    <>
      <MobileHeader
        headerName={active ? "Discussion" : "Poll"}
        noProfile={true}
        noArrow={true}
      />
      <div className=" flex flex-col gap-6 ">
        <div className="flex flex-col md:px-3 gap-6">
          <div className="flex  bg-theme-color rounded-lg justify-between mt-6 md:mt-0 py-3 px-7 md:px-4 items-center">
            <p className="text-white font-medium text-xl md:text-[13px] tracking-[-0.2px]">
              Ask your question or Discuss a topic
            </p>
            <p
              onClick={() => navigate("/discussion/addDiscussion")}
              className="bg-white rounded-full p-[11px] md:p-2 text-theme-color cursor-pointer">
              <PlusSvg />
            </p>
          </div>
          <div className="flex gap-3 overflow-auto no-scrollbar">
            <Button
              handleClick={() => setActiveSubjectId("all")}
              className={`${
                activeSubjectId === "all"
                  ? "bg-theme-red border-theme-red text-white"
                  : "text-[#666] border-[#666]"
              } px-4 xl:px-3 lg:px-2 py-1 text-sm  border  flex items-center gap-2 rounded-full`}
              buttonName={"All"}
            />
            {subjectData?.data?.map((item, id) => {
              return (
                <div key={item?.id}>
                  {subjectDataLoading ? (
                    <ShimmerButton
                      key={id}
                      size="md"
                      className="rounded-full"
                    />
                  ) : (
                    <Button
                      handleClick={() => setActiveSubjectId(item?.id)}
                      className={`${
                        activeSubjectId === item?.id
                          ? "bg-theme-red border-theme-red text-white"
                          : "text-[#666] border-[#666]"
                      } px-4 xl:px-3 lg:px-2 py-1 text-sm  border  flex items-center gap-2 rounded-full`}
                      key={id}
                      buttonName={item?.title}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg bg-[#F7F7F7] p-6 md:p-3 md:pb-14">
          <div className="flex gap-4 text-sm font-semibold leading-4 tracking-tight mb-4">
            <p
              onClick={() => setActive(true)}
              className={`   pb-[2px] cursor-pointer 
                          ${
                            active
                              ? "border-theme-red border-b-2 text-theme-color"
                              : " text-[#4D4D4D]"
                          }`}>
              Discussion
            </p>
            <p
              onClick={() => setActive(false)}
              className={`cursor-pointer pb-[2px]
                          ${
                            !active
                              ? "border-theme-red border-b-2 text-theme-color"
                              : " text-[#4D4D4D]"
                          }`}>
              Poll
            </p>
          </div>
          <div className="overflow-y-auto no-scrollbar h-fit  md:max-h-[70vh]">
            {active ? (
              <DiscussionDetails
                isLoading={discussionLoading}
                isError={discussionError}
                data={discussionData?.data}
              />
            ) : (
              <PollDetails
                isLoading={pollLoading}
                isError={pollError}
                data={pollData?.data}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Button from "../../components/UI/button";
import MobileHeader from "../../components/navbar/mobileHeader";
import TopicSidebar from "./topicSidebar";
import { useSubjectDetails } from "../../hooks/useQueryData";
import { useVideoStore } from "../../store/useVideoStore";
import SubjectContents from "./subjectContents";

export default function InsideSubject() {
  const [activeContent, setActiveContent] = useState("videos");
  const [initial, setInitial] = useState(true);
  const { currentSubject } = useVideoStore();

  const { data, isLoading, isError } = useSubjectDetails(currentSubject?.id);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [1000]);
  }, []);

  return (
    <div className="flex gap-8 md:gap-0 pt-8 md:pt-0 px-32  lg:px-16 md:px-0 sm:px-0 pb-28">
      <div className="w-[20%] md:w-full md:hidden pb-64 h-screen">
        <TopicSidebar
          data={data?.data?.unit}
          isLoading={isLoading}
          isError={isError}
          initial={initial}
        />
      </div>
      <div className="pb-64 md:pb-0 w-[80%] md:w-full">
        <MobileHeader headerName={currentSubject?.title} noProfile={true} />
        <div className="md:px-4 flex flex-col ">
          <div className="flex items-center gap-[11px] md:gap-2 mt-[25px] md:mt-0 mb-10 md:mb-6 ">
            <Button
              handleClick={() => setActiveContent("videos")}
              buttonName={"Videos"}
              className={`${
                activeContent === "videos"
                  ? "bg-theme-red border-theme-red text-white"
                  : "text-[#666] border-[#666]"
              } px-6 xl:px-3 lg:px-4 py-2 lg:py-1 text-sm text-[#666] border border-[#666] flex items-center gap-2 rounded-full`}
            />
            <Button
              handleClick={() => setActiveContent("resources")}
              buttonName="Resources"
              className={`${
                activeContent === "resources"
                  ? "bg-theme-red border-theme-red text-white"
                  : "text-[#666] border-[#666]"
              } px-6 xl:px-3 lg:px-4 py-2 lg:py-1 text-sm  border  flex items-center gap-2 rounded-full`}
            />
          </div>
          <SubjectContents
            isLoading={isLoading}
            isError={isError}
            activeContent={activeContent}
            unitData={data?.data?.unit}
          />
        </div>
      </div>
    </div>
  );
}

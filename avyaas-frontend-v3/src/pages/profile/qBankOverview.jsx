import React, { useState } from "react";
import Button from "../../components/UI/button";
import {
  ChatBubbleSvg,
  CrossCircleSvg,
  ReplayCircleSvg,
  TickCircleSvg,
} from "../../assets/allSvg";
import { useQbankStat, useSubjectListByCourse } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";

const buttonNames = ["All", "Physics", "Chemistry", "Zoology", "Botany"];

const QBankOverview = () => {
  const { currentModule } = useModuleStore();
  const [activeButton, setActiveButton] = useState("All");
  const { data:subjectData, isLoading, isError } = useSubjectListByCourse({
    courseID: currentModule?.id,
  });

  const { data } = useQbankStat(currentModule?.module_id);
  console.log(data, "qbank data===19");

  const qBanks = [
    { id: 1, title: "Question Attempted", count: 36, Icon: ChatBubbleSvg },
    { id: 2, title: "Correct Answers", count: 25, Icon: TickCircleSvg },
    { id: 3, title: "Incorrect Answers", count: 30, Icon: CrossCircleSvg },
    { id: 4, title: "Revision", count: 10, Icon: ReplayCircleSvg },
  ];

  return (
    <div className="space-y-6 md:space-y-4">
      <p className="text-[#4B4B4B] font-medium text-base md:text-xs">
        QBank Overview
      </p>
      <div className="flex gap-3 md:gap-2 md:w-full overflow-scroll no-scrollbar">
        <Button
              handleClick={() => setActiveButton("All")}
              buttonName={"All"}
              className={`${
                activeButton === "All"
                  ? "bg-theme-red border-theme-red text-white"
                  : "text-[#666] border-[#666]"
              } px-4 xl:px-3 lg:px-2 py-1 text-sm border flex items-center gap-2 rounded-full`}
            />
        {subjectData?.data?.map((item) => {
          return (
            <Button
              handleClick={() => setActiveButton(item)}
              key={item?.id}
              buttonName={item?.title}
              className={`${
                activeButton === item
                  ? "bg-theme-red border-theme-red text-white"
                  : "text-[#666] border-[#666]"
              } px-4 xl:px-3 lg:px-2 py-1 text-sm border flex items-center gap-2 rounded-full`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-2">
        {qBanks?.map(({ id, title, count, Icon }) => {
          return (
            <div
              key={id}
              className="border border-[#F2F2F2] rounded-md py-2 px-4 md:px-2 flex gap-4 md:gap-3">
              <Icon className="text-start" />
              <div className="flex flex-col gap-2">
                <p className="text-[#5A5A5A] text-xs md:text-[10px] leading-3 ">
                  {title}
                </p>
                <h3 className="text-[#757575] text-lg md:text-base font-medium">
                  {count}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QBankOverview;

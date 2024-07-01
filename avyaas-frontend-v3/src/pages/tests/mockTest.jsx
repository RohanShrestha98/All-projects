import React from "react";
import { CircleSvg, FilledBookmarkSvg } from "../../assets/allSvg";

export default function MockTest({ data, questionCount }) {
  const ansData = [
    {
      id: 1,
      title: "2 Unanswered",
    },
    {
      id: 2,
      title: "0 Answered",
    },
    {
      id: 3,
      title: "0 Marked",
    },
  ];
  const number = [];
  for (let i = 1; i <= data?.length; i++) {
    number.push({
      value: i,
    });
  }
  return (
    <div className="flex flex-col  justify-between ">
      <div>
        <p className="mb-3 text-[#4D4D4D] text-sm font-medium leading-4 md:hidden">
          Mock Test
        </p>
        <div className="grid grid-cols-3 gap-2">
          {ansData.map((item) => {
            return (
              <div
                className="bg-[#FAFAFA] rounded-xl items-center flex gap-2 p-1 md:p-2 whitespace-nowrap md:grid md:grid-cols-1"
                key={item.id}>
                <CircleSvg
                  color={`${
                    item.id === 1
                      ? " #9A9A9A"
                      : item.id === 2
                      ? "#00CA39"
                      : item?.id === 3
                      ? "#FFC534"
                      : ""
                  }  `}
                />
                <p className="text-[10px] text-[#676767] ">{item.title}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 md:bg-[#F7F7F7] rounded-lg md:p-3 ">
          <p className="mb-3  text-[#4D4D4D] text-sm font-medium leading-4">
            Questions
          </p>
          <div className="grid grid-cols-8 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-9 sm:grid-cols-6 gap-2   overflow-auto no-scrollbar">
            {number.map((item, id) => {
              return (
                <div
                  key={id}
                  className={`border flex flex-col flex-grow rounded justify-center items-center h-10 max-h-[40px] max-w-[40px] cursor-pointer 
                                        ${
                                          questionCount === item.value
                                            ? "border-theme-color text-theme-color"
                                            : "border-[#818181]"
                                        }
                                        ${
                                          questionCount >= item.value
                                            ? "bg-[#00CA39] text-white"
                                            : "border-[#818181]"
                                        }`}>
                  <div className="flex justify-end w-full">
                    {questionCount === item.value && (
                      <FilledBookmarkSvg
                        className="h-3 w-3 absolute mt-[-8px]"
                        color={"#FFC534"}
                      />
                    )}
                  </div>
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

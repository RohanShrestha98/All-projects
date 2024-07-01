import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function ToggleUnit({ name, lessons, setNotes,notes }) {
  const [activeUnit, setActiveUnit] = useState(true);
  const [activeLesson, setActiveLesson] = useState(true);
  const [activeContent, setActiveContent] = useState(true);
  
  return (
    <div>
      <div
        className="flex items-center gap-2 mt-3 cursor-pointer"
        onClick={() => setActiveUnit(!activeUnit)}
      >
        {activeUnit ? (
          <FaChevronDown
            size={24}
            className=" p-[6px] rounded-full bg-[#E6E6E6]"
          />
        ) : (
          <FaChevronRight
            size={24}
            className=" p-[6px] rounded-full bg-[#E6E6E6]"
          />
        )}
        <p className="font-bold text-base text-gray">{name}</p>
      </div>
      {activeUnit &&
        lessons?.map(item => {
          return (
            <div key={item.id} className="ml-8 mt-3">
              <div
                className="flex  items-center gap-2 cursor-pointer"
                onClick={() => setActiveLesson(!activeLesson)}
              >
                {activeLesson ? (
                  <FaChevronDown
                    size={24}
                    className=" p-[6px] rounded-full bg-[#E6E6E6]"
                  />
                ) : (
                  <FaChevronRight
                    size={24}
                    className=" p-[6px] rounded-full bg-[#E6E6E6]"
                  />
                )}
                <p className="font-bold text-sm text-gray">{item?.name}</p>
              </div>
              {activeLesson &&
                item?.contents?.map(item => {
                  return (
                    <div
                      key={item?.id}
                      onClick={() => {
                        setActiveContent(item?.notes?.[0]?.id === notes?.notes?.[0]?.id && !activeContent);
                        setNotes(item);
                      }}
                      className={`flex flex-col  pl-4 ml-2 pr-8 rounded-md whitespace-nowrap  ${
                        item?.notes?.[0]?.id === notes?.[0]?.id ? "bg-blue text-white" : "text-gray"
                      }  py-1 mt-2 inline-block`}
                    >
                      <div className="flex items-center gap-2 cursor-pointer ">
                        {item?.notes?.[0]?.id === notes?.[0]?.id ? (
                          <FaChevronDown size={24} className="p-[6px] " />
                        ) : (
                          <FaChevronRight size={24} className="p-[6px] " />
                        )}
                        <p className="font-bold text-xs">{item?.name}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ContentDetails = ({ contentData, item, index }) => {
  const [sidebarLesson, setSidebarLesson] = useState(false);
  const [selectedSidebarLesson, setSelectedSidebarLesson] = useState("");
  const navigate = useNavigate();
  const handleLessonSideBarClick = item => {
    setSidebarLesson(!sidebarLesson);
    setSelectedSidebarLesson(item.id);
  };

  const handleLessonClick = (contentId, lessonId) => {
    const lessonDetails = {
      contentId: contentId,
      lessonId: lessonId,
    };
    localStorage.setItem("lessonDetails", JSON.stringify(lessonDetails));
    navigate(`/courses/list/content/`);
  };

  const condition = selectedSidebarLesson === item.id || index === 0;
  useEffect(() => {
    if (index === 0) return setSidebarLesson(true);
  }, []);

  return (
    <div className="overflow-x-scroll w-full ">
      <div
        className={`flex gap-1 px-2 items-start mb-2 cursor-pointer  ${
          condition && sidebarLesson ? "bg-blue py-1 rounded-md text-white" : ""
        } `}
        onClick={() => handleLessonSideBarClick(item)}
      >
        {condition && sidebarLesson ? (
          <IoIosArrowDown className="text-white min-w-[16px] h-5" />
        ) : (
          <IoIosArrowForward className="text-blue min-w-[16px] h-5" />
        )}
        <p className="font-semibold text-sm line-clamp-1">{item?.name}</p>
      </div>
      {condition &&
        sidebarLesson &&
        contentData?.map((content, index) => {
          return (
            <div
              key={content?.id}
              onClick={() => handleLessonClick(content?.id, item?.id)}
              className="my-2"
            >
              <div className="flex gap-1 ml-8 items-start mb-2 cursor-pointer ">
                <p className="font-semibold text-sm line-clamp-1">
                  {index + 1 + " . "}
                  {content?.name}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContentDetails;

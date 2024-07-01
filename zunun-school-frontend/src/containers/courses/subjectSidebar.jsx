import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { ShimmerCircularImage, ShimmerText } from "react-shimmer-effects";
import sidebarIcon from "../../assets/images/sidebarIcon.png";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const SubjectSidebar = ({
  lessons,
  selectedChapterId,
  selectedLessonId,
  hideSidebar,
  handleHideSidebar,
  handleChapterClick,
  setSelectedChapterId,
  initial,
  isMaterial,
  wide,
}) => {
  const handleLessonClick = (contentId, lessonId) => {
    setSelectedChapterId(contentId);
    const lessonDetails = {
      contentId: contentId,
      lessonId: lessonId,
    };
    localStorage.setItem("lessonDetails", JSON.stringify(lessonDetails));
  };
  useEffect(() => {
    if (wide > 1024) {
      handleHideSidebar(false);
    } else {
      handleHideSidebar(true);
    }
  }, [wide]);

  if (hideSidebar) {
    return (
      <div>
        <img
          className="cursor-pointer h-7 w-7 sm:hidden object-cover -ml-6 md:ml-0"
          src={sidebarIcon}
          alt="image"
          onClick={() => handleHideSidebar(false)}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`overflow-x-scroll bg-white p-4 rounded-md  pb-18 h-[72vh] md:p-4 md:absolute lg:ml-[-40px] lg:px-4 lg:-mt-7 lg:left-0 lg:rounded-md lg:shadow-md lg:bg-white`}
      >
        {initial ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          <div className="flex justify-between items-center mb-6 pb-2 border-b-[0.5px] border-b-white-gray">
            <div className="font-semibold text-lg text-gray-4">Lessons</div>
            <RxCross2
              className="cursor-pointer"
              size={18}
              onClick={() => handleHideSidebar(true)}
            />
          </div>
        )}
        <div>
          {lessons?.map((item, id) => {
            return (
              <div key={id}>
                {initial ? (
                  <div className="w-32">
                    <ShimmerText line={1} />
                  </div>
                ) : (
                  <div
                    className={`flex mb-2 cursor-pointer items-center ${
                      selectedLessonId === item?.id
                        ? "fill-cyan text-cyan"
                        : "text-gray-4 fill-gray-4"
                    } font-semibold text-sm`}
                    onClick={() => {
                      handleChapterClick(item.id);
                    }}
                  >
                    {selectedLessonId === item?.id ? (
                      <IoIosArrowDown className="min-w-[20px] min-h-[20px] p-1 mr-2 rounded-3xl bg-blue text-white" />
                    ) : (
                      <IoIosArrowForward className="min-w-[20px] rounded-3xl mr-2 p-1 min-h-[20px] bg-gray-6" />
                    )}
                    <span className="line-clamp-1">{item?.name}</span>
                  </div>
                )}
                {selectedLessonId === item?.id &&
                  item?.content?.map((content, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleLessonClick(content?.id, item?.id)}
                        className="flex cursor-pointer ml-3 mb-2 items-center"
                      >
                        <>
                          {initial && (
                            <div className="mr-2">
                              <ShimmerCircularImage size={20} />
                            </div>
                          )}
                        </>
                        <>
                          {initial ? (
                            <div className="w-32">
                              <ShimmerText line={1} />
                            </div>
                          ) : (
                            <>
                              {isMaterial ? (
                                <div
                                  className={`font-medium line-clamp-1 ${
                                    content?.id === selectedChapterId &&
                                    "text-cyan"
                                  } text-[13px] ml-[12px]`}
                                >
                                  {index + 1 + " . "}
                                  {content?.name}
                                </div>
                              ) : (
                                <div>
                                  <div
                                    className={`font-medium line-clamp-1 ${
                                      content?.id === selectedChapterId &&
                                      "text-cyan"
                                    } text-[13px] ml-[12px]`}
                                  >
                                    {index + 1 + " . "}
                                    {content?.name}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default SubjectSidebar;

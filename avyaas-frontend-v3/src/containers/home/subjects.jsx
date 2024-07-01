import React, { useEffect, useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { BotanySvg, ForwardArrowSvg } from "../../assets/allSvg";
import { usePractice, useSubjectListByCourse } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import { useNavigate } from "react-router-dom";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";
import { useVideoStore } from "../../store/useVideoStore";
import sub from "../../assets/sub.png";

const Subjects = ({ page }) => {
  const [initial, setInitial] = useState(true);
  const { currentModule } = useModuleStore();
  const { setCurrentSubject } = useVideoStore();
  const { data, isLoading, isError } = useSubjectListByCourse({
    courseID: currentModule?.id,
  });
  const navigate = useNavigate();

  const width = useWindowsDimensions();

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);



  return (
    <>
      {page === "home" ? (
        <div className="flex flex-col gap-4 md:gap-3">
          <section className="flex items-center gap-3">
            <span className="border border-l-1 h-4 text-[#595959] md:hidden" />
            <h2 className="text-base font-semibold md:text-xs font-semi-bold text-[#595959]">
              Subjects
            </h2>
          </section>
          <section className="grid auto-cols-[10rem] grid-flow-col gap-4 md:gap-2 overflow-x-auto no-scrollbar pl-3 md:pl-0">
            {isLoading || initial ? (
              [...Array(5)]?.map((_, id) => {
                return (
                  <ShimmerThumbnail
                    key={id}
                    height={160}
                    width={160}
                    className="rounded-xl"
                  />
                );
              })
            ) : isError ? (
              <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
                Error
              </h1>
            ) : data?.data?.length === 0 ? (
              <>No data found</>
            ) : (
              data?.data?.map((item) => 
                {
                   return <div
                  key={item?.id}
                  onClick={() => {
                    navigate("/subjects/videos");
                    setCurrentSubject(item);
                  }}
                  className="bg-[#E8EDF7] min-w-[160px] md:min-w-[100px] min-h-[160px] lg:min-h-[100px] lg:min-w-[100px] md:min-h-[96px] flex flex-col gap-2 justify-center items-center px-2 text-center rounded-xl cursor-pointer"
                >
                  {/* <BotanySvg className="text-start p-2 bg-white rounded-full h-16 lg:h-12 md:h-10 w-16 lg:w-12 md:w-10" /> */}
                  <img src={item?.thumbnail === ""?sub:item?.thumbnail} className="text-start  bg-white rounded-full h-16 lg:h-12 md:h-10 w-16 lg:w-12 md:w-10" alt="" />

                  <h4 className="line-clamp-1 text-black text-base lg:text-sm md:text-xs">
                    {item?.title}
                  </h4>
                </div>}
              ))
            }
          </section>
        </div>
      ) : (
        <>
          <p className="hidden md:block text-[#595959] text-sm md:px-3 pb-3">
            Subjects
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-2  md:px-4 cursor-pointer">
            {isLoading || initial ? (
              [...Array(5)]?.map((_, id) => {
                return (
                  <ShimmerThumbnail
                    key={id}
                    height={80}
                    // width={160}
                    className="rounded-xl"
                  />
                );
              })
            ) : isError ? (
              <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
                Error
              </h1>
            ) : data?.data?.length === 0 ? (
              <>No data found</>
            ) : (
              data?.data?.map(({ id, title,thumbnail }) => {
                return(
                <div
                  className="flex items-center bg-[#E8EDF7] px-6 md:px-3 py-4 sm:py-3 rounded-xl justify-between"
                  onClick={() => {
                    setCurrentSubject({ id, title });
                    navigate(
                      width > 768
                        ? `/subjects/videos`
                        : "/subjects/videos/sidebar"
                    );
                  }}
                  key={id}
                >
                  <div className="flex items-center gap-6 md:gap-3">
                    <div className=" ">
                      <img src={thumbnail === ""?sub: thumbnail } className="text-start  bg-white rounded-full h-16 lg:h-12 md:h-10 w-16 lg:w-12 md:w-10" alt="" />
                      {/* <BotanySvg className="text-start p-2 bg-white rounded-full h-16 lg:h-12 md:h-10 w-16 lg:w-12 md:w-10" /> */}
                    </div>
                    <div>
                      <p className="text-[#343434] text-base md:text-xs font-medium">
                        {title}
                      </p>
                      {page === "qBank" && (
                        <p className="text-[#808080] text-[13px] md:text-xs sm:text-[10px]">
                          12 Questions
                        </p>
                      )}
                    </div>
                  </div>
                  <ForwardArrowSvg className="text-gray-slate" />
                </div>
              )})
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Subjects;

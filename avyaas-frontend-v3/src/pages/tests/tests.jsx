import React, { useEffect, useState } from "react";
import LiveUpdates from "../../containers/home/liveUpdates";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../components/navbar/mobileHeader";
import { DotSvg, NoteSvg } from "../../assets/allSvg";
import watch from "../../assets/watch.svg";
import crown from "../../assets/crown.svg";
import { useTest, useTestTypeList } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import { ShimmerCategoryItem } from "react-shimmer-effects";

export default function Tests() {
  const navigate = useNavigate();
  const [testType, setTestType] = useState("all");
  const [initial, setInitial] = useState(true);
  const { currentModule } = useModuleStore();

  const { data, isLoading } = useTest(currentModule?.id);
  const { data: testTypeData, isLoading: testTypeIsLoading } =
    useTestTypeList();

  const date = new Date();

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [1000]);
  }, []);

  return (
    <>
      <MobileHeader headerName={"Tests"} noArrow={true} />
      <div className="flex flex-col gap-6 md:gap-5 md:px-4">
        <div className="flex gap-2 h-12 bg-white py-2 overflow-x-auto fixed w-[64%] md:w-[95%]">
          <div
            className={`border h-fit border-[#646464] rounded-full px-4 py-1 text-sm cursor-pointer  ${
              testType === "all"
                ? "bg-theme-red border-theme-red text-white"
                : "text-[#646464]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setTestType("all");
            }}
          >
            All
          </div>
          {testTypeData?.data?.map((item) => {
            return (
              <div
                key={item?.id}
                className={`border h-fit border-[#646464] rounded-full px-4 py-1 text-sm cursor-pointer ${
                  testType === item?.id
                    ? "bg-theme-red border-theme-red text-white"
                    : "text-[#646464]"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setTestType(item?.id);
                }}
              >
                <p className=" whitespace-nowrap">{item?.Title}</p>
              </div>
            );
          })} 
        </div>
        <div className="mt-16">
          <p className="text-[#4D4D4D]  font-medium text-base mb-4 md:text-xs md:mb-3">
            Ongoing Tests
          </p>
          <div className="overflow-y-auto no-scrollbar max-h-full md:h-[70vh]">
            <LiveUpdates />
          </div>
          <div className="">
            <p className="text-[#4D4D4D] font-medium text-base mb-4 md:text-xs md:mb-3">
              October 2023
            </p>
            {/* testType === (item?.testType?.id) */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {data?.data?.map((item) => {
                if (testType === item?.testType?.id || testType === "all")
                  return isLoading || initial ? (
                    <ShimmerCategoryItem
                      hasImage
                      imageType="circular"
                      text
                      key={item?.id}
                      imageWidth={50}
                      imageHeight={50}
                    />
                  ) : (
                    <div
                      onClick={() =>
                        navigate("/tests/quiz", {
                          state: { eachTestData: item },
                        })
                      }
                      className="flex bg-[#F7F7F7] rounded-lg gap-4 md:gap-3 p-4 cursor-pointer"
                      key={item.id}
                    >
                      <div className="bg-[#E5EEFF] p-2 rounded-full self-start">
                        <NoteSvg color="#4365A7" />
                      </div>
                      <div className="flex flex-col gap-3 md:gap-2">
                        <span className="flex justify-between gap-2 text-blue text-[13px] lg:text-xs md:text-[10px]">
                          <p className="text-[#333333] text-sm lg:text-[13px] md:text-xs font-medium leading-4">
                            {item?.title}
                          </p>
                          {item?.is_premium && (
                            <section className="bg-[#DFA820] px-2 rounded-full flex gap-2 md:gap-1 items-center">
                              <img src={crown} />
                              {/* <p className="text-white text-[12px] lg:text-[11px] md:text-[10px]">
                                Premium
                              </p> */}
                            </section>
                          )}
                        </span>

                        <div className="flex items-center flex-wrap gap-[6px] md:text-[10px]">
                          <img src={watch} alt="watch" />
                          <p className="text-[#808080] text-xs md:text-[10px]  leading-3">
                            {item?.duration + item?.extraTime} mins
                          </p>
                          <DotSvg className="lg:hidden md:flex" />
                          <p className="text-theme-color font-medium text-xs md:text-[10px] leading-3">
                            {`${
                              item?.totalQuestions === 0
                                ? ""
                                : item?.totalQuestions === 1
                                ? "1 Question"
                                : `${item?.totalQuestions} Questions`
                            }`}{" "}
                          </p>
                          <p className="text-theme-color  font-medium text-xs md:text-[10px] leading-3 bg-[#E5EEFF] rounded-full px-[13px] py-1">
                            {item?.price === 0 ? "Free" : `Rs. ${item?.price}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

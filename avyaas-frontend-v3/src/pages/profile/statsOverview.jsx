import React from "react";
import CircularProgress from "./circularProgress";
import { useTestStat } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";

const StatsOverview = () => {
  const { currentModule } = useModuleStore();
  const {
    data: testStat,
    isLoading,
    isError,
  } = useTestStat(currentModule?.module_id);

  return (
    <div className="space-y-4">
      <p className="text-[#4B4B4B] font-medium text-base md:text-xs">
        Stats Overview
      </p>
      <div className="grid grid-cols-5 md:grid-cols-2 gap-10 md:gap-1 md:items-center">
        {isLoading ? (
          [...Array(3)]?.map((_, id) => {
            return (
              <div key={id} className="shadow rounded-md p-4  w-full">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-4 bg-gray-6 rounded" />
                    <div className="h-4 bg-gray-6 rounded" />
                  </div>
                </div>
              </div>
            );
          })
        ) : isError ? (
          <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
            Error
          </h1>
        ) : !testStat ? (
          <>No data found</>
        ) : (
          <div className="flex gap-8 md:flex-col md:gap-3">
            <div className="flex flex-col items-center justify-center gap-1">
              <CircularProgress
                totalValue={testStat?.totalTestCount}
                currentValue={testStat?.userTestCount}
              />
              <p className="text-[#4D4D4D] text-sm text-center">
                {testStat?.userTestCount > 1
                  ? "Tests Completed"
                  : "Test Completed"}
              </p>
            </div>
            <div className="flex md:grid gap-6 md:gap-2">
              <div className="flex flex-col items-center rounded-xl border border-[#F2F2F2] py-[29px] md:py-4 px-10 lg:px-8 md:px-7 gap-2">
                <p className="text-[#595959] text-2xl md:text-xl font-medium">
                  7
                </p>
                <p className="text-[#4D4D4D] text-sm md:text-[11px] leading-4 whitespace-nowrap">
                  Videos Completed
                </p>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-[#F2F2F2] py-[29px] md:py-4 px-10 md:px-7 gap-2">
                <p className="text-[#595959] text-2xl md:text-xl font-medium">
                  {testStat?.userTestCount}
                </p>
                <p className="text-[#4D4D4D] text-sm md:text-[11px] leading-4 whitespace-nowrap">
                  {testStat?.userTestCount > 1
                    ? "Tests Completed"
                    : "Test Completed"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsOverview;

import React from "react";
import { Progress } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import threeD from "../../../assets/images/threeD.png";
import { BsCheckCircle } from "react-icons/bs";
import ErrorPage from "../../../components/errorPage/errorPage";

const CompletedCourse = ({ data, isLoading, isError }) => {
  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 ">
        {data?.map(({ description, name, progress, id }) => {
          return (
            <div
              className="flex p-4 bg-white shadow-md rounded-xl gap-3 sm:p-2"
              key={id}
            >
              <div className="sm:w-1/4">
                <LazyLoadImage
                  src={threeD}
                  alt="img"
                  effect="blur"
                  width={70}
                  height={70}
                  className="rounded-[8px]"
                />
              </div>
              <div className="flex w-3/4 justify-between flex-wrap">
                <div className="flex flex-col  gap-1">
                  <p className="text-lg text-black font-bold">{name}</p>
                  <p className="text-sm text-stone-400">{description}</p>
                  <div className="flex items-center gap-1">
                    <BsCheckCircle className="fill-light-green" />
                    <p className="text-light-green font-semibold text-[13px]">
                      Completed
                    </p>
                  </div>
                </div>
                <div>
                  <Progress
                    type="circle"
                    percent={progress}
                    size={70}
                    format={() => "100%"}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="justify-center items-center flex w-full">
        <ErrorPage
          data={data}
          isFetching={isLoading}
          error={isError}
          title={"No completed course "}
        />
      </div>
    </div>
  );
};

export default CompletedCourse;

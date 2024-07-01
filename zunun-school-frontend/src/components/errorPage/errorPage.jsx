import React from "react";
import emptyImage from "../../assets/images/empty.png";
import errorImage from "../../assets/images/error.png";
import { ShimmerCategoryItem, ShimmerTable } from "react-shimmer-effects";
import noData from "../../assets/images/noData.png";

const ErrorPage = ({
  isFetching,
  emptyImage,
  data,
  error,
  width = "250px",
  height = "200px",
  title = "No data to show currently.",
  isCategory = false,
}) => {
  return (
    <>
      {isFetching &&
        (isCategory ? (
          <ShimmerCategoryItem
            hasImage
            imageType="thumbnail"
            imageWidth={60}
            imageHeight={60}
            title
          />
        ) : (
          <ShimmerTable col={5} row={10} />
        ))}

      {!isFetching && (data?.length === 0 || data === null) && !error && (
        <div className="p-4 h-1/2 flex justify-center">
          <div className="mt-10 flex flex-col items-center gap-4">
            <img
              src={emptyImage ?? noData}
              alt="no-data"
              width={width}
              height={height}
            />
            <p className="text-xl font-bold">{title}</p>
          </div>
        </div>
      )}

      {error && !isFetching && (
        <div className="p-4 h-1/2 flex justify-center">
          <div className="mt-10 flex flex-col items-center gap-4">
            <img src={errorImage} alt="no-data" width="250px" height="200px" />
            <section className="flex flex-col items-center gap-2">
              <p className="text-xl font-bold text-red">
                {" "}
                Oops! Something went wrong.
              </p>
              <p className="text-sm">
                Please refresh or check your internet connection!
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPage;

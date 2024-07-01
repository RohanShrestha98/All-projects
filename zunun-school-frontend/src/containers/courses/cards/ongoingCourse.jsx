import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import threeD from "../../../assets/images/threeD.png";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../../components/errorPage/errorPage";

const OngoingCourse = ({
  data,
  isLoading,
  isError,
  setCourseId,
  setCourseName,
}) => {
  const navigate = useNavigate();
  const [noteCourseId, setNoteCourseId] = useState("");

  // useEffect(() => {
  //   noteCourseId &&
  //     navigate("/notes", {
  //       state: {
  //         noteCourseId,
  //       },
  //     });
  // }, [navigate, noteCourseId]);

  const handleCourseClick = (id, name) => {
    setCourseId(id);
    setCourseName(name);
    localStorage.setItem(
      "courseDetails",
      data !== undefined && JSON.stringify({ courseName: name, courseId: id }),
    );
    setNoteCourseId(id);
    navigate(id);
  };

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
        {data &&
          data?.map(({ description, name, progress, id }) => {
            if (isLoading) {
              return (
                <div className="bg-white px-4 pt-4 pb-0 rounded-3xl" key={id}>
                  <ShimmerCategoryItem
                    hasImage
                    imageType="thumbnail"
                    imageWidth={60}
                    imageHeight={60}
                    title
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={id}
                  onClick={() => handleCourseClick(id, name)}
                  className="cursor-pointer"
                >
                  <div className="flex p-4 shadow-md bg-white rounded-xl gap-4 items-center last:items-start">
                    <div className="sm:w-1/4">
                      <LazyLoadImage
                        src={threeD}
                        alt="img"
                        effect="blur"
                        className="h-100 w-100"
                      />
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                      <p className="text-base text-black line-clamp-1 font-bold">
                        {name}
                      </p>
                      <p className="text-sm text-stone-400 line-clamp-1">
                        {description}
                      </p>
                      <div className="pr-2">
                        <Progress
                          percent={(progress / 100) * 100}
                          format={() => `${progress ?? 0}/100`}
                          strokeColor="#75D9C5"
                          trailColor="#f5f5f5"
                        />
                      </div>
                    </div>
                    <button
                      className="text-xs px-2 border border-gray-6 rounded-md whitespace-nowrap"
                      onClick={e => {
                        e.stopPropagation();
                        navigate("/notes", {
                          state: {
                            id,
                          },
                        });
                        setCourseId(id);
                      }}
                    >
                      See Note
                    </button>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <ErrorPage
        data={data}
        isFetching={isLoading}
        error={isError}
        title={"No ongoing course"}
        isCategory={true}
      />
    </div>
  );
};

export default OngoingCourse;

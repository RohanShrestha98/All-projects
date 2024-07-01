import React, { useEffect, useId, useState } from "react";
import { Progress } from "antd";
import { BsArrowRight } from "react-icons/bs";
import chemistry from "../../assets/images/chemistry.png";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import { useQueryData } from "../../hooks/useQueryData";
import Img from "../../assets/images/threeD.png";
import { useAuthContext } from "../../context/authContext";
import ErrorPage from "../../components/errorPage/errorPage";
import noCourse from "../../assets/images/noCourse.png";

const HomeCard = () => {
  const { auth } = useAuthContext();
  const [isStudent, setIsStudent] = useState(false);
  const { uniqueId } = useId();

  useEffect(() => {
    if (auth?.user?.role?.id === 5) {
      setIsStudent(true);
    }
  });
  const { data, isLoading, error } = useQueryData(
    ["course", isStudent],
    isStudent
      ? `api/v1/course/student-list/${auth?.user?.id}`
      : `api/v1/course/list/`,
  );
  const navigate = useNavigate();
  const handleCourseClick = data => {
    {
      isStudent
        ? navigate(`courses/${data?.id}`, { state: { name: data?.name } })
        : navigate(`courses/list/${data.id}`);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {!isLoading && (
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold text-black-gray sm:text-lg">
            {isStudent ? "Courses in progress" : "Courses"}
          </p>
          <NavLink to="/courses">
            <p className="flex items-center gap-2 text-cyan font-bold flex-shrink-0 sm:text-[16px]">
              See All <BsArrowRight className="sm:hidden" />
            </p>
          </NavLink>
        </div>
      )}
      <div
        key={uniqueId}
        className="grid grid-cols-3 cursor-pointer lg:grid lg:grid-cols-2 gap-x-[30px] gap-y-4 md:flex  overflow-x-scroll "
      >
        {data?.data?.slice(0, 6)?.map(item => {
          if (isLoading) {
            return (
              <div key={item.id} className="bg-white rounded-lg px-3 pt-4 ">
                <ShimmerCategoryItem
                  title
                  hasImage
                  imageType="thumbnail"
                  imageHeight={80}
                  imageWidth={80}
                />
              </div>
            );
          }
          return (
            <>
              {isStudent ? (
                <div
                  onClick={() => handleCourseClick(item)}
                  className="sm:px-4 md:min-w-[292px] flex py-5 px-[22px] bg-white rounded-xl gap-4 sm:py-2 items-center hover:shadow-md"
                  key={item.id}
                >
                  <div className="">
                    <LazyLoadImage
                      src={chemistry}
                      alt={chemistry}
                      width={80}
                      height={80}
                      effect="black-and-white"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-[17px] line-clamp-1 text-black font-bold sm:text-[16px]">
                      {item?.name}
                    </p>
                    <p className="flex gap-1 items-center  text-[13px] font-medium text-gray-slate">
                      <MdOutlinePlayCircleOutline size={20} />{" "}
                      <p className="line-clamp-1">{item?.description}</p>
                    </p>
                    <div className="pr-8 mt-1">
                      <Progress
                        percent={(item?.progress / 100) * 100}
                        format={() => `${item?.progress ?? 0}/100`}
                        strokeColor="#75D9C5"
                        trailColor="#f5f5f5"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={item.id}
                  onClick={() => {
                    handleCourseClick(item);
                  }}
                  className="sm:px-4 md:min-w-[292px] flex py-5 px-[22px] bg-white rounded-xl gap-4 sm:py-2 items-center hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="sm:w-1/4 flex items-center">
                      <LazyLoadImage
                        src={Img}
                        alt="img"
                        effect="blur"
                        className="h-100 w-100"
                      />
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                      <p className="text-lg font-Urbanist line-clamp-1  font-bold">
                        {item.name}
                      </p>
                      <p className="text-sm text-stone-400">View lesson</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <ErrorPage
        emptyImage={noCourse}
        data={data?.data}
        isFetching={isLoading}
        error={error}
        title={"No course"}
      />
    </div>
  );
};

export default HomeCard;

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import blogImg from "../../assets/images/blogImg3.png";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTopBlogData } from "../../hooks/useQueryData";

const TopBlog = () => {
  const { data: topBlogData, isLoading: topBlogDataLoading } = useTopBlogData();

  return (
    <>
      <div className="font-semibold text-[16px] mb-4 sm:px-3">
        Top this month
      </div>
      {topBlogData?.data?.map(({ thumbnail, title, description, id }) => {
        if (topBlogDataLoading) {
          return (
            <div key={id} className="bg-white rounded-[20px] p-4 mb-6 w-full">
              <ShimmerCategoryItem
                hasImage
                imageType="thumbnail"
                imageWidth={200}
                imageHeight={100}
                title
              />
            </div>
          );
        } else {
          return (
            <NavLink to={`/blog/${id}`} key={id} state={{ from: "/blog" }}>
              <div>
                <div className="bg-white  rounded-md shadow-md p-4 mb-6 w-full ">
                
                    <img
                      alt="image"
                      src={thumbnail?.url ?? blogImg}
                      className=" min-w-full  h-40 object-cover object-top rounded-md   "
                    />
                  

                  <div className="text-start">
                    <div className="font-semibold text-xl mt-2 mb-1  line-clamp-1">
                      {title}
                    </div>
                    <p
                      className="font-normal text-md text-gray-slate line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></p>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        }
      })}
    </>
  );
};

export default TopBlog;

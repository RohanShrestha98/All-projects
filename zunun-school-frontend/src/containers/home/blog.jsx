import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blogImg1 from "../../assets/images/blogImg3.png";
import { NavLink } from "react-router-dom";
import { ShimmerText, ShimmerTitle } from "react-shimmer-effects";
import { useBlogData } from "../../hooks/useQueryData";
import ErrorPage from "../../components/errorPage/errorPage";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";
import { TruncateText } from "../../utils/truncateText";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";

const Blog = () => {
  const { data, isLoading, isError } = useBlogData({ search: "" });
  const width = useWindowsDimensions();
  return (
    <div className="flex flex-col w-full  gap-3">
      <div className="flex  justify-between items-center">
        {isLoading ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          <p className="text-xl font-bold text-black-gray sm:text-lg">Blog</p>
        )}
        {!isLoading && (
          <NavLink to="/blog" className="sm:hidden">
            <div className="w-28 flex items-center gap-2 text-[17px] text-cyan font-bold flex-shrink-0">
              <p>See All</p> <BsArrowRight />
            </div>
          </NavLink>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 lg:grid-cols-3 md:grid-cols-2  overflow-x-scroll ">
        {data?.data
          ?.slice(0, width > 1024 ? 4 : width > 768 ? 3 : 2)
          ?.map(item => {
            return (
              <NavLink
                key={item?.id}
                to={`/blog/${item?.id}`}
                state={{ from: "/", blogId: item?.id }}
              >
                <div className=" flex flex-col rounded-[10px] min-h-[260px] bg-white px-3 py-4 space-y-2 hover:shadow-md ">
                  <>
                    <LazyLoadImage
                      src={item?.thumbnail?.url || blogImg1}
                      alt="img"
                      effect="blur"
                      className="roundex-xl sm:rounded-md object-cover  min-h-[130px] max-h-[100px] w-full object-top"
                    />
                  </>
                  <div>
                    {isLoading ? (
                      <div className="w-32">
                        <ShimmerTitle line={1} />
                      </div>
                    ) : (
                      <h2 className="text-[17px] font-bold text-black-gray sm:text-[16px] line-clamp-1">
                        {item?.title}
                      </h2>
                    )}
                    {isLoading ? (
                      <ShimmerText line={2} />
                    ) : (
                      <div className="">
                        {TruncateText(
                          ConvertHtmlToPlainText(item?.description),
                          60,
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </NavLink>
            );
          })}
        <ErrorPage
          title={"No Blog to show"}
          data={data?.data}
          isFetching={isLoading}
          error={isError}
        />
      </div>
    </div>
  );
};

export default Blog;

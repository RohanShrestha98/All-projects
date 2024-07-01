import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogDetailsLeft from "../../containers/blogs/blogDetailsLeft";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import TopBlog from "./topBlog";
import { useBlogDetailsData } from "../../hooks/useQueryData";
import { BiArrowBack } from "react-icons/bi";

const BlogsDetails = () => {
  window.scrollTo(0, 0);
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const { id: blogId } = useParams();
  const { data, isLoading, refetch } = useBlogDetailsData({
    blogId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    changeLayout(width, false, false, "light");
  }, [width]);

  return (
    <div className="w-[100%] md:w-full">
      <div className="title flex items-center gap-2 md:px-6 sm:w-full sm:pt-[28px] pb-3 sm:bg-white sm:shadow-md sm:z-[1000] sm:fixed sm:top-0">
        <button
          className=" flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={16} />
        </button>
        <div className="font-bold sm:text-xl text-xl">{data?.data?.title}</div>
      </div>
      <div className="md:px-6 sm:pt-24">
        <div className="flex gap-14 md:flex-col">
          <div className="w-[60%] md:w-full">
            <BlogDetailsLeft
              data={data}
              isLoading={isLoading}
              refetch={refetch}
              blogId={blogId}
            />
          </div>
          <div className="w-[40%] md:w-full">
            <TopBlog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;

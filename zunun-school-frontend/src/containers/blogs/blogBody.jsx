import BlogCard from "./blogCard";
import React from "react";
import TopBlog from "../../pages/blog/topBlog";

const BlogBody = ({ blogDataLoading, blogData }) => {
  return (
    <div className="flex gap-14 md:block">
      <div className="w-[60%] md:w-full">
        <BlogCard blogDataLoading={blogDataLoading} blogData={blogData} />
      </div>
      <div className="w-[40%] md:w-full">
        <TopBlog />
      </div>
    </div>
  );
};

export default BlogBody;

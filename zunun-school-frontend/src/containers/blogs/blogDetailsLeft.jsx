import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Input, message } from "antd";
import blogImg from "../../assets/images/blogImg3.png";
import {
  ShimmerCategoryItem,
  ShimmerText,
  ShimmerThumbnail,
} from "react-shimmer-effects";
import dayjs from "dayjs";
import { useBlogCommentMutation } from "../../hooks/useMutateData";
import BlogComment from "./blogComment";
const BlogDetailsLeft = ({ blogId, data, refetch, isLoading }) => {
  const [blogComment, setBlogComment] = useState("");
  const [isBlogCommentExpanded, setIsBlogCommentExpanded] = useState(false);


  const eachBlogDetails = data?.data;
  const blogCommentMutation = useBlogCommentMutation({
    blogId: blogId,
  });


  const handleCreateBlogComment = () => {
    blogCommentMutation.mutateAsync(["post", "", { comment: blogComment }], {
      onSuccess: () => {
        message.success("Blog Commented Successfully", [2]);
        setBlogComment("");
        refetch();
      },
      onError: error => {
        let errorMessage = error?.response?.data?.errors?.comment
          ? error?.response?.data?.errors?.comment?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <ShimmerCategoryItem title hasImage imageType="circular" />
      ) : (
        <div className="flex items-center mt-4 mb-7">
          <LazyLoadImage
            alt="example"
            src={eachBlogDetails?.authorThumbnail?.url ?? blogImg}
            effect="blur"
            delayTime={500}
            className="w-9 h-9 rounded-full object-cover mr-2"
          />
          <div>
            <div className="font-medium text-[15px]">Author</div>
            <div className="font-normal text-[12px] text-gray-slate">
              {dayjs(eachBlogDetails?.createdAt)
                .utc()
                .local()
                .format(" MMM D, YYYY h:mm A")}
            </div>
          </div>
        </div>
      )}
      {/* <div className="font-bold text-lg text-gray-5 mb-7">
        {isLoading ? <ShimmerText line={5} /> : eachBlogDetails?.title}
      </div> */}
      {isLoading ? (
        <ShimmerThumbnail />
      ) : (
        <LazyLoadImage
          alt="example"
          src={eachBlogDetails?.thumbnail?.url ?? blogImg}
          effect="blur"
          delayTime={500}
          width={"100%"}
          className="h-[250px] object-cover  rounded-md"
        />
      )}
      <div
        className={`font-normal text-[15px] ${
          isBlogCommentExpanded ? "line-clamp-none" : "line-clamp-4"
        } text-justify cursor-pointer`}
      >
        {isLoading ? (
          <ShimmerText line={4} />
        ) : (
          <div>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: eachBlogDetails?.description }}
              ></p>
          </div>
        )}
      </div>
        <p className="cursor-pointer text-xs justify-end flex italic" onClick={() => setIsBlogCommentExpanded(!isBlogCommentExpanded)}>
        { eachBlogDetails?.description?.length > 200 && isBlogCommentExpanded ? "View less.." : eachBlogDetails?.description?.length > 200 && "View more.."}
        </p> 
      <div className="font-semibold text-[18px] mt-4">Tags</div>
      <div className="flex flex-wrap mt-4 gap-3">
        {eachBlogDetails?.tags?.map((item, id) => {
          return (
            <div
              key={id}
              className="bg-blue-1 mb-7 rounded py-1 px-2 text-gray5 font-normal text-sm"
            >
              # {item}
            </div>
          );
        })}
      </div>
      <div className="font-semibold mb-4 text-[18px] tracking-[0.03em]">
        Leave a comment
      </div>
      {!isLoading && (
        <>
          <Input.TextArea
            value={blogComment}
            placeholder="write a comment.."
            onChange={e => setBlogComment(e?.target?.value)}
          />
          <div
            onClick={() => handleCreateBlogComment()}
            className={`rounded-[100px] mt-4 py-3  flex justify-center items-center shadow-md text-white ${
              blogComment?.length ? "bg-cyan" : "bg-gray-6"
            }  ${
              blogCommentMutation?.isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } font-medium text-[15px] tracking-[0.2px]`}
          >
            Send
          </div>
        </>
      )}
      <BlogComment
        refetch={refetch}
        isLoading={isLoading}
        blogComments={eachBlogDetails?.comment}
        blogId={blogId}
      />
    </>
  );
};

export default BlogDetailsLeft;

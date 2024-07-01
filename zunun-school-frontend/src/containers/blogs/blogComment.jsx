import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { ShimmerCircularImage, ShimmerText } from "react-shimmer-effects";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import blogImg1 from "../../assets/images/blogImg1.png";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  useBlogCommentDeleteMutation,
  useBlogCommentUpdateMutation,
} from "../../hooks/useMutateData";
import { Input, message } from "antd";
import ConfirmModel from "../profile/confirmModel";
import { BiSend } from "react-icons/bi";
import { useComponentVisible } from "../../hooks/useComponentVisible";
import { useAuthContext } from "../../context/authContext";

const BlogComment = ({ isLoading, blogComments, refetch }) => {
  const wrapperRef = useRef();
  const [confirmModel, setConfirmModel] = useState(false);
  const [showCommentInputField, setShowCommentInputField] = useState(true);
  const [editCommentId, setEditCommentId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");
  const { auth } = useAuthContext();
  const [initialComment, setInitialComment] = useState(
    blogComments?.length < 3 ? blogComments?.length : 3,
  );
  const [showLess, setShowLess] = useState(false);

  useComponentVisible(wrapperRef, {
    toggle: () => setShowCommentInputField(false),
  });
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);

  const blogCommentDeleteMutation = useBlogCommentDeleteMutation({
    commentId,
  });
  const blogCommentUpdateMutation = useBlogCommentUpdateMutation({
    commentId,
  });

  const handleDeleteBlogComment = () => {
    blogCommentDeleteMutation.mutateAsync(["delete", ""], {
      onSuccess: () => {
        message.success("Blog comment deleted successfully", [2]);
        setConfirmModel(false);
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

  useEffect(() => {
    setShowCommentInputField(true);
  }, [editCommentId]);

  const handleUpdateBlogComment = () => {
    commentId &&
      blogCommentUpdateMutation.mutateAsync(
        ["patch", "", { comment: editCommentValue }],
        {
          onSuccess: () => {
            message.success("Blog comment updated successfully", [2]);
            setShowCommentInputField(false);
            refetch();
          },
          onError: error => {
            let errorMessage = error?.response?.data?.errors?.comment
              ? error?.response?.data?.errors?.comment?.toString()
              : error?.message?.toString();
            message.error(errorMessage, [2]);
          },
        },
      );
  };

  // console.log("comment",comment)

  return (
    <div className="flex flex-col gap-4 mt-4">
      {blogComments?.slice(0, initialComment)?.map((comment, id) => {
        return (
          <div key={id} className="space-y-2 bg-[#eef0e9] rounded-xl py-2 px-3">
            <div className="flex my-4">
              {isLoading ? (
                <ShimmerCircularImage />
              ) : (
                <LazyLoadImage
                  alt="example"
                  src={comment?.userThumbnail?.url ?? blogImg1}
                  effect="blur"
                  delayTime={500}
                  className="w-9 h-9 rounded-full object-cover mr-2"
                />
              )}
              <div>
                {!isLoading && (
                  <div className="font-medium text-[15px] ">
                    {comment?.author?.name === " "
                      ? "Author"
                      : comment?.author?.name}
                  </div>
                )}
                {!isLoading && (
                  <div className="font-normal text-[12px] text-gray-slate">
                    {dayjs(comment?.createdAt)
                      .utc()
                      .local()
                      .format(" MMM D, YYYY h:mm A")}
                  </div>
                )}
              </div>
            </div>
            {editCommentId === id && showCommentInputField ? (
              <div
                className="font-normal text-[15px] tracking-[0.03em]"
                ref={wrapperRef}
              >
                <Input
                  placeholder="Write your comment"
                  onChange={e => {
                    setEditCommentValue(e?.target?.value);
                  }}
                  value={editCommentValue}
                  addonAfter={
                    <BiSend
                      className={`  ${
                        editCommentValue === comment?.comment
                          ? "cursor-not-allowed text-gray-dark3"
                          : "cursor-pointer text-cyan"
                      }`}
                      size={18}
                      onClick={() =>
                        editCommentValue !== comment?.comment &&
                        handleUpdateBlogComment()
                      }
                    />
                  }
                />
              </div>
            ) : (
              <div
                className={`font-normal text-[15px] ${
                  isCommentExpanded ? "line-clamp-none" : "line-clamp-4"
                } text-justify cursor-pointer`}
                onClick={() => setIsCommentExpanded(!isCommentExpanded)}
              >
                {isLoading ? <ShimmerText line={2} /> : comment?.comment}
              </div>
            )}
            {auth?.user?.id === comment?.author?.id && (
              <div className="flex gap-2 items-center justify-end">
                <BiEdit
                  size={20}
                  onClick={() => {
                    setCommentId(comment?.id);
                    setEditCommentId(id);
                    setEditCommentValue(comment?.comment);
                    setShowCommentInputField(!showCommentInputField);
                  }}
                  className="text-cyan cursor-pointer"
                />
                <BiTrash
                  onClick={() => {
                    setCommentId(comment?.id);
                    setConfirmModel(true);
                  }}
                  size={20}
                  className="text-red cursor-pointer"
                />
              </div>
            )}

            {/* <hr className="text-gray-dark3 "/> */}
            {confirmModel && (
              <ConfirmModel
                title={"Delete Blog Comment"}
                isOpen={confirmModel}
                setOpen={setConfirmModel}
                desc={"Are you sure you want to delete this comment?"}
                btnName={"Delete"}
                className={"bg-red hover:text-red hover:bg-white "}
                handleConfirm={() => handleDeleteBlogComment()}
              />
            )}
          </div>
        );
      })}
      <div
        className={`flex items-center ${
          blogComments?.length || blogComments !== undefined
            ? "justify-between"
            : "justify-center"
        }  my-7`}
      >
        <div
          className={`cursor-pointer ${
            blogComments?.length ||
            (blogComments !== undefined ? "block" : "hidden")
          }`}
        >
          {blogComments?.length > 3 && !showLess && (
            <div
              className="flex gap-1 items-center font-semibold text-[15px] tracking-[0.03em] sm:text-sm sm:mr-1"
              onClick={() => {
                setShowLess(true);
                setInitialComment(blogComments?.length);
              }}
            >
              Show More
              <MdOutlineKeyboardArrowDown />
            </div>
          )}
          {blogComments?.length > 3 && showLess && (
            <div
              className="flex gap-2 items-center font-semibold text-[15px] tracking-[0.03em] sm:text-sm sm:mr-1"
              onClick={() => {
                setShowLess(false);
                setInitialComment(
                  blogComments?.length < 3 ? blogComments?.length : 3,
                );
              }}
            >
              Show Less
              <MdOutlineKeyboardArrowUp />
            </div>
          )}
        </div>
        <div className="font-normal text-sm text-gray-slate tracking-[0.06em] sm:text-sm">
          {`${
            blogComments?.length === 0 || blogComments === undefined
              ? "No comments yet"
              : blogComments?.length < 1
              ? blogComments?.length + " " + "comment"
              : blogComments?.length + " " + "comments"
          }`}
        </div>
      </div>
    </div>
  );
};

export default BlogComment;

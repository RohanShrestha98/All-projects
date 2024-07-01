import React, { useId, useState } from "react";
import empty from "../../images/empty.svg";
import { BubbleCommentSvg, ClapSvg } from "../../assets/allSvg";
import { Modal, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./discussion.css";
import { useDiscussionReply } from "../../hooks/useQueryData";
import { useModuleStore } from "../../store/useModuleStore";
import dayjs from "dayjs";
import { useDiscussionReplyMutation } from "../../hooks/useMutateData";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";

export default function CommentModal({
  isModalOpen,
  submit,
  cancel,
  selectedDiscussion,
}) {
  const { currentModule } = useModuleStore();
  const { id: uniqueId } = useId();
  const {
    data: discussionReplyData,
    isLoading: discussionReplyLoading,
    isError: discussionReplyError,
  } = useDiscussionReply(selectedDiscussion?.id);


  const [replyMessage, setReplyMessage] = useState("");
  const discussionReplyMutation = useDiscussionReplyMutation();

  const handleDiscussionAnswer = (data) => {
    discussionReplyMutation.mutateAsync(["post", "", data], {
      onSuccess: () => {
        setReplyMessage("");

        message.success("Discussion replied successfully", [2]);
      },
      onError: (error) => {
        let errorMessage = error?.response?.data?.error
          ? error?.response?.data?.message?.toString()
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  return (
    <>
      <Modal
        className=" overflow-auto"
        open={isModalOpen}
        onOk={submit}
        onCancel={cancel}
        footer={false}
        centered={true}>
        <div className="flex flex-col gap-3 md:gap-2">
          {discussionReplyLoading ? (
            [...Array(5)]?.map((_, id) => {
              return (
                <div key={id} className="shadow rounded-md p-4  w-full">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-6 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-gray-6 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-gray-6 rounded col-span-2"></div>
                          <div className="h-2 bg-gray-6 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-gray-6 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : discussionReplyError ? (
            <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
              Error
            </h1>
          ) : !discussionReplyData?.data ? (
            <>No data found</>
          ) : (
            <div
              key={selectedDiscussion?.id}
              className=" bg-white rounded-2xl p-4  tracking-tight">
              <div className="flex justify-between items-center md:items-start mb-6 md:mb-4">
                <div className="flex gap-3">
                  <img
                    src={
                      empty || selectedDiscussion?.user?.image
                    }
                    alt="image"
                    className="md:h-8"
                  />
                  <span className=" flex flex-col gap-[10px] md:gap-[6px]">
                    <p className="text-[#4D4D4D] text-sm md:text-xs font-semibold  leading-4">
                      {selectedDiscussion?.user?.name}
                    </p>
                    <p className="text-[#666] text-xs md:text-[10px] leading-3">
                      {dayjs(selectedDiscussion?.end_date).format(
                        "MMM D, YYYY "
                      )}
                    </p>
                  </span>
                </div>
                <div className="text-theme-color font-medium text-sm md:text-xs leading-5 bg-[#E4F2FF] rounded-full px-6 py-1 inline-block cursor-pointer">
                  {selectedDiscussion?.subject?.title}
                </div>
              </div>
              <p className="text-[#4D4D4D] text-sm">
                {selectedDiscussion?.title || "No comment"}
              </p>
              <hr className="text-[#F2F2F2] my-3" />
              <div className="flex md:justify-between gap-6 text-[#4D4D4D] text-sm leading-4 ">
                <span className="flex gap-2 items-center">
                  <ClapSvg className="h-[18px] w-[18px]" />
                  <p className="text-sm md:text-xs">
                    {" "}
                    {selectedDiscussion?.voteCount} 
                    {selectedDiscussion?.voteCount > 1
                      ? ` Claps`
                      : ` Clap`}
                  </p>
                </span>
                <span className="flex gap-2 cursor-pointer items-center">
                  <BubbleCommentSvg className="h-[18px] w-[18px]" />
                  <p className="text-sm md:text-xs">
                      {selectedDiscussion?.replyCount} 
                    {selectedDiscussion?.replyCount > 1
                      ? ` Replies`
                      : ` Reply`}
                  </p>
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          key={uniqueId}
          className="flex flex-col gap-3 h-[200px] overflow-scroll no-scrollbar tracking-tight">
          {discussionReplyLoading ? (
            [...Array(5)]?.map((_, id) => {
              return (
                <div key={id} className="shadow rounded-md p-4  w-full">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-6 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-gray-6 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-gray-6 rounded col-span-2"></div>
                          <div className="h-2 bg-gray-6 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-gray-6 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : discussionReplyError ? (
            <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
              Error
            </h1>
          ) : !discussionReplyData?.data?.length ? (
            <>No data found </>
          ) : (
            discussionReplyData?.data?.map((item) => {
              return (
                <div key={item?.id} className="bg-[#F7F7F7] rounded-2xl p-2 ">
                  <div className="flex gap-3 mb-3">
                    <img
                      src={empty || item?.user?.imageId}
                      className="h-[24px]"
                      alt="image"
                    />
                    <span className=" flex flex-col gap-[3px]">
                      <p className="text-[#4D4D4D] text-[10px] font-semibold  leading-4">
                        {item?.user?.name}
                      </p>
                      <p className="text-[#666] text-[8px] leading-3">
                        {dayjs(item?.ent_date).format("MMM D, YYYY ")}
                      </p>
                    </span>
                  </div>
                  <p className="text-[#4D4D4D] text-[10px]">
                    {ConvertHtmlToPlainText(item?.reply)}
                  </p>
                </div>
              );
            })
          )}
        </div>
        <div>
          <ReactQuill
            className="rounded-lg mt-4  "
            theme="snow"
            value={replyMessage}
            onChange={setReplyMessage}
            style={{ borderRadius: "52px" }}
          />
        </div>
        <div className="flex justify-end ">
          <button
            onClick={() =>
              handleDiscussionAnswer({
                discussionID: selectedDiscussion?.id,
                reply: replyMessage,
                courseID: currentModule?.id,
              })
            }
            className=" bg-theme-color rounded-lg text-white py-[10px] px-[48px] mt-4">
            Leave Comment
          </button>
        </div>
      </Modal>
    </>
  );
}

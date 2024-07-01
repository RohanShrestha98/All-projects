import React, { useEffect, useState } from "react";
import person1 from "../../images/person1.png";
import { useVideoCommentMutation } from "../../hooks/useMutateData";
import { useModuleStore } from "../../store/useModuleStore";
import { SendSvg } from "../../assets/allSvg";
import { message } from "antd";
import { useVideoComment } from "../../hooks/useQueryData";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
dayjs.extend(relativeTime);

export const Comments = ({ videoId }) => {
  const { currentModule } = useModuleStore();
  const [videoCommentText, setVideoCommentText] = useState("");
  const [initial, setInitial] = useState(true);

  const { data, isLoading, isError } = useVideoComment(
    currentModule?.module_id,
    videoId
  );

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [1000]);
  }, []);

  const videoCommentMutation = useVideoCommentMutation(
    currentModule?.module_id,
    videoId
  );

  const handleVideoComment = () => {
    videoCommentMutation.mutateAsync(
      [
        "post",
        "",
        {
          text: videoCommentText,
        },
      ],
      {
        onSuccess: () => {
          message.success("Video commented successfully", [2]);
          setVideoCommentText("");
        },
        onError: (error) => {
          let errorMessage = error?.response?.data?.error
            ? error?.response?.data?.message?.toString()
            : error?.message?.toString();
          message.error(errorMessage, [2]);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-3 max-h-[256px] mt-6 md:mt-4 md:h-full  overflow-y-auto no-scrollbar sm:pb-16 ">
        {isLoading || initial ? (
          [...Array(3)]?.map((_, id) => {
            return (
              <div key={id} className="w-full shadow pt-2 pb-4">
                <div className="animate-pulse space-y-4">
                  <div className="w-full flex gap-2 py-1">
                    <div className="rounded-full bg-gray-6 h-8 w-8" />
                    <div className="space-y-3 w-full">
                      <div className="h-6 w-1/6 bg-gray-6 rounded" />
                      <div className="h-6 w-full bg-gray-6 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : isError ? (
          <h1 className="font-medium text-grayText xs:px-4 xs:text-sm">
            Error
          </h1>
        ) : data?.comment?.length === 0 ? (
          <>No comments found</>
        ) : (
          data?.comment?.map((comment) => {
            return (
              <div
                className="flex gap-4 bg-[#F7F7F7] h-[93px] rounded-r-xl rounded-b-xl px-4 py-2"
                key={comment.id}>
                <div>
                  <img src={person1 || comment?.user?.imageId} alt="" />
                </div>
                <div>
                  <p className="text-[#4D4D4D] text-xs">
                    {comment?.user?.name}
                  </p>
                  <p className="text-[#808080] text-[10px]">
                    {capitalizeFirstLetter(dayjs(comment?.ent_date).fromNow())}
                  </p>
                  <p className="text-[#737373] text-xs font-medium mt-3">
                    {comment?.text}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="relative border border-[#B3B3B3] rounded-xl py-4 px-4 ">
        <textarea
          value={videoCommentText}
          onChange={(e) => setVideoCommentText(e.target.value)}
          className="text-xs text-[#737373] h-[60px] md:h-[30px] w-full  outline-none resize-none"
          placeholder="Write your comment here..."
        />
        <div
          onClick={() => handleVideoComment()}
          className="flex justify-end absolute right-2 bottom-2">
          <SendSvg
            className="bg-[#E5EEFF] p-1 rounded-full h-[32px] w-[32px] cursor-pointer"
            fillColor="#4265a7"
          />
        </div>
      </div>
    </div>
  );
};

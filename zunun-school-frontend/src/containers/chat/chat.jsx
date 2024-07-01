/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { IoImageOutline, IoSendSharp } from "react-icons/io5";
import { Input, Upload } from "antd";
import "./chat.css";
import { useConsultCommentMutation } from "../../hooks/useMutateData";
import { useConsultCommentByContentData } from "../../hooks/useQueryData";
import ErrorPage from "../../components/errorPage/errorPage";
import noChat from "../../assets/images/noChat.png";
import { useAuthContext } from "../../context/authContext";
import { RiReplyFill } from "react-icons/ri";
import { MdClear } from "react-icons/md";

const ChatComponent = ({ isTime, askTeacherClick }) => {
  const [comment, setComment] = useState("");
  const { auth } = useAuthContext();
  const contentDetails = JSON.parse(localStorage?.getItem("lessonDetails"));
  const [selectedChat,setSelectedChat] = useState()

  const isStudent = auth?.user?.role?.id === 5

  const contentId = contentDetails?.contentId;
  const consultCommentMutation = useConsultCommentMutation({ contentId });

  const { data, isError, isLoading } = useConsultCommentByContentData({
    contentId,
    askTeacherClick,
  });

  const handleConsultComment = () => {
    const postData={
      userId:selectedChat?.userId,
      comment:comment,
      contentId:contentId
    }
    const commentData ={
      comment:comment
    }
    consultCommentMutation.mutate(["post", "",  selectedChat?postData:commentData ], {
      onSuccess: () => {
        setComment("");
        setSelectedChat()
      },
    });
  };

  const SentChat = props => {
    return (
      <div className="flex justify-end mb-2 ml-4">
        <div
          className={`max-w-[250px] bg-cyan font-normal text-sm
            rounded-b-[10px] rounded-tl-[10px] px-3 py-2
            text-white flex items-end justify-between md:w-[284px]`}
        >
          <div>{props.message}</div>
          {isTime && <div className="min-w-fit">{props.time}</div>}
        </div>
      </div>
    );
  };

  const RecievedChat = props => {
    return (
      <div className="flex justify-start mb-2 ">
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-1">
          <div
          className={`max-w-[250px] bg-white font-normal text-sm
            rounded-b-[10px] rounded-tl-[10px] px-3 py-2
            flex items-end justify-between md:w-[284px]`}
        >
          <div>{props.message}</div>
          {isTime && <div className="min-w-fit">{props?.time}</div>}
        </div>
        {
          !isStudent && <RiReplyFill onClick={()=>setSelectedChat({comment:props?.message,userId:props?.user?.userId})} className="text-gray-dark2 cursor-pointer"/>
        }
          </div>
        <div className="text-xs ml-1">{props?.user?.username}</div>
        </div>
        
      </div>
    );
  };

  return (
    <>
      <div className={`pt-[17px] ${selectedChat?"h-[350px]":"h-[370px]"}   overflow-y-auto `}>
        {isTime && (
          <div className="flex justify-center items-center mb-[29px]">
            <div
              className="px-[10px] py-[6px] max-w-fit rounded-[5px]
                bg-gray-lighter text-gray-dark1 font-semibold text-[10px]"
            >
              Today
            </div>
          </div>
        )}
        {data?.data?.map(item => {
          return (
            <div key={item?.createdAt} className="mb-2">
              {auth?.user?.id === item?.user?.userId ? (
                <SentChat message={item?.comment} time="10:00" />
              ) : (
                <RecievedChat message={item?.comment} user={item?.user} time="10:00" />
              )}
            </div>
          );
        })}
        <ErrorPage
          emptyImage={noChat}
          title={"No chat yet"}
          data={data?.data}
          isFetching={isLoading}
          error={isError}
        />
      </div>
      <div className="pt-2">

      {
        selectedChat && <div className="bg-gray-11 p-2 flex items-center justify-between">
        {selectedChat?.comment}
        <MdClear className="cursor-pointer" onClick={()=>setSelectedChat(null)}/>
        </div>
      }
      
      <div className="flex items-center chat ">
        <Input
          onChange={e => setComment(e.target.value)}
          value={comment}
          placeholder="Message"
          className="mr-5"
          onPressEnter={() => handleConsultComment()}
        />
        <div
          onClick={() => handleConsultComment()}
          className={`cursor-pointer rounded-full flex justify-center items-center  px-2 py-2 ${
            comment ? "bg-blue" : "bg-gray-dark2"
          }`}
        >
          <IoSendSharp className="fill-white" size={20} />
        </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;

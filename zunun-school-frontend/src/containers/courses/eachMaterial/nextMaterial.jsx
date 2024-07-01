import React from "react";
import { MdCheck } from "react-icons/md";
import { BiCheck, BiUndo } from "react-icons/bi";
import { useMutate } from "../../../hooks/useMutateData";
import { useState } from "react";
import toast from "../../../utils/toast";
import { useAuthContext } from "../../../context/authContext";
import ConfirmModel from "../../profile/confirmModel";
import videoThumbbail from "../../../assets/images/videoThumbnail.svg";
import audioThumbnail from "../../../assets/images/audioThumbnail.svg";
import bookThumbnail from "../../../assets/images/bookThumbnail.svg";
import questionnaireThumbnail from "../../../assets/images/questionnaireThumbnail.svg";
import imageThumbnail from "../../../assets/images/imageThumbnail.svg";

const NextMaterial = (
  { initial, selectedChapterId, setSelectedChapterId, refetch },
  props,
) => {
  const [confirmModel, setConfirmModel] = useState(false);
  const lessonDetails = JSON.parse(localStorage?.getItem("lessonDetails"));
  const contentDetails = JSON.parse(localStorage?.getItem("contentDetails"));
  const filterLessonByContent = contentDetails?.lesson?.filter(
    lesson => lesson?.id === lessonDetails?.lessonId,
  );

  const handleLessonClick = contentId => {
    setSelectedChapterId(contentId);
    const lessonDetail = {
      ...lessonDetails,
      contentId: contentId,
    };
    localStorage.setItem("lessonDetails", JSON.stringify(lessonDetail));
  };

  const EachCard = ({ material, hasCompleted }) => {
    const isPlayed =
      material?.id === selectedChapterId ?? lessonDetails?.contentId;

    return (
      <div
        onClick={() => {
          handleLessonClick(material?.id);
        }}
        className={`${
          isPlayed
            ? "border border-cyan"
            : !isPlayed && hasCompleted && "border border-green"
        } mt-4 shadow-md bg-white cursor-pointer rounded-[15px] flex justify-between items-center px-[21px] py-[15px]`}
      >
        <div className="flex items-center">
          {material?.contentType === "BOOK" ? (
            <img src={bookThumbnail} className="h-6 w-6" />
          ) : material?.contentType === "AUDIO" ? (
            <img src={audioThumbnail} className="h-6 w-6" />
          ) : material?.contentType === "QUESTIONNAIRE" ? (
            <img src={questionnaireThumbnail} className="h-6 w-6" />
          ) : material?.contentType === "IMAGE" ? (
            <img src={imageThumbnail} className="h-6 w-6" />
          ) : material?.contentType === "VIDEO" ? (
            <img src={videoThumbbail} className="h-6 w-6" />
          ) : (
            ""
          )}
          {/* {isPlayed ? (
            <BsPauseCircle className="fill-cyan" size={20} />
          ) : material?.contentType === "AUDIO" ? (
            <PiFileAudioBold className="fill-cyan" size={20} />
          ) : material?.contentType === "SUPPORTFILE" ? (
            <AiOutlineFilePdf className="fill-cyan" size={20} />
          ) : (
            <BsPlayCircle className="fill-cyan" size={20} />
          )} */}
          <div className="ml-5 font-semibold text-[13px]">{material?.name}</div>
        </div>
        <div>
          {hasCompleted ? (
            <MdCheck
              size={20}
              className=" border rounded-full bg-green text-white p-[2px]"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  const { auth } = useAuthContext();
  const useMarkAsCompletedMutation = () =>
    useMutate(["mark-as-completed"], "api/v1/content/complete/");

  const { mutateAsync } = useMarkAsCompletedMutation();

  const handleMarkAsCompleted = async () => {
    const postData = {
      contentID: lessonDetails?.contentId,
      contentProgressPercentage: 100,
    };
    try {
      const response = await mutateAsync(["patch", "", postData]);
      if (response.success) {
        setConfirmModel(false);
        refetch();
        toast.success(
          filterHasCompletedContent?.[0]?.hasCompleted
            ? "Incomplete content"
            : "You have completed this content",
        );
      }
    } catch (err) {
      toast.error(err.response.data.errors.course);
    }
  };

  const filterHasCompletedContent = filterLessonByContent?.[0]?.content?.filter(
    item => item?.id === selectedChapterId ?? lessonDetails?.contentId,
  );

  return (
    <div>
      <div className="mt-4 font-bold text-[13px] text-gray-light">
        {filterLessonByContent?.[0]?.name}
      </div>
      {filterLessonByContent?.[0]?.content?.map((content, id) => {
        const hasCompleted = content?.hasCompleted;
        return (
          <EachCard key={id} material={content} hasCompleted={hasCompleted} />
        );
      })}
      <div className="flex justify-end mt-8">
        {auth?.user?.role?.id === 5 && (
          <div
            onClick={() => {
              setConfirmModel(true);
            }}
            className={`flex cursor-pointer items-center text-white ${
              filterHasCompletedContent?.[0]?.hasCompleted
                ? "bg-red"
                : "bg-light-green1"
            }  rounded-lg py-2 px-4`}
          >
            {filterHasCompletedContent?.[0]?.hasCompleted
              ? "Undo"
              : "Mark as completed"}
            {filterHasCompletedContent?.[0]?.hasCompleted ? (
              <BiUndo className="ml-[6px]" />
            ) : (
              <BiCheck className="ml-[6px]" />
            )}
          </div>
        )}

        {initial &&
          auth?.user?.role?.id == 5 &&
          props.contentType !== "QUESTIONNAIRE" && (
            <div>
              <div className="font-semibold text-[15px] text-gray-light mb-2">
                {props?.hasCompleted &&
                  "Congratulations! You’ve completed this content."}
              </div>
              <div className="flex text-[15px] cursor-pointer items-center justify-end text-white fill-white">
                {!props?.hasCompleted ? (
                  <div
                    onClick={() => {
                      setConfirmModel(true);
                    }}
                    className="flex items-center bg-light-green1 rounded-lg py-2 px-4"
                  >
                    Mark as completed <BiCheck className="ml-[6px]" />{" "}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setConfirmModel(true);
                    }}
                    className="flex items-center bg-red rounded-lg py-2 px-4"
                  >
                    Undo <BiUndo className="ml-[6px]" />{" "}
                  </div>
                )}
              </div>
            </div>
          )}
        {confirmModel && (
          <ConfirmModel
            title={
              filterHasCompletedContent?.[0]?.hasCompleted
                ? "Mark content as incomplete"
                : "Mark content as completed"
            }
            isOpen={confirmModel}
            setOpen={setConfirmModel}
            desc={
              filterHasCompletedContent?.[0]?.hasCompleted
                ? "Are you sure you want to mark this content as incomplete?"
                : "Are you sure you want to mark this content as completed?"
            }
            btnName={
              filterHasCompletedContent?.[0]?.hasCompleted
                ? "Incomplete"
                : "Complete"
            }
            handleConfirm={() => handleMarkAsCompleted()}
          />
        )}
      </div>
    </div>
  );
};

export default NextMaterial;

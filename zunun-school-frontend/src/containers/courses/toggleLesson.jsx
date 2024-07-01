import React from "react";
import { useState, useEffect } from "react";
import { Switch } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import DoPublic from "./doPublic";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import videoThumbbail from "../../assets/images/videoThumbnail.svg";
import audioThumbnail from "../../assets/images/audioThumbnail.svg";
import bookThumbnail from "../../assets/images/bookThumbnail.svg";
import questionnaireThumbnail from "../../assets/images/questionnaireThumbnail.svg";
import imageThumbnail from "../../assets/images/imageThumbnail.svg";

export default function ToggleLesson({
  item,
  contentData,
  index,
  isTeacher,
  studentId,
  sectionId,
}) {
  const [bodyLessonClick, setBodyLessonClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [lessonId, setLessonId] = useState();
  const [selectedBodyLesson, setSelectedBodyLesson] = useState("");
  const navigate = useNavigate();

  const handleBodyLessonClick = item => {
    setSelectedBodyLesson(item.id);
    setBodyLessonClick(!bodyLessonClick);
  };

  const location = useLocation();

  const isSynced = location?.state?.isSynced !== undefined;
  const usePublicMutation = () =>
    useMutate(["course"], "/api/v1/section/public-lesson/");

  const { mutateAsync: publicMutateAsync } = usePublicMutation();

  const handleIsPublic = async idLesson => {
    const postDataForSection = {
      section: sectionId,
      lesson: idLesson,
      forSection: true,
    };
    const postDataForStudent = {
      students: [studentId],
      lesson: idLesson,
      forSection: false,
    };

    try {
      const response = await publicMutateAsync([
        "post",
        "",
        studentId ? postDataForStudent : postDataForSection,
      ]);
      if (response.success && item?.isPublic) {
        toast.success("Lesson made private successfully");
      } else if (response.success && !item?.isPublic) {
        toast.success("Lesson made public successfully");
      }
    } catch (err) {
      toast.error(err.response.data.errors.sync);
    }
  };

  useEffect(() => {
    if (index === 0) return setBodyLessonClick(true);
  }, []);

  const handleLessonClick = (contentId, lessonId) => {
    const lessonDetails = {
      contentId: contentId,
      lessonId: lessonId,
    };

    localStorage.setItem("lessonDetails", JSON.stringify(lessonDetails));
    navigate(`/courses/list/content/`);
  };

  const showLesson = selectedBodyLesson === item.id || index === 0;

  return (
    <div key={item.id} className="">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            handleBodyLessonClick(item);
          }}
        >
          {showLesson && bodyLessonClick ? (
            <IoIosArrowDown className="min-w-[22px] min-h-[22px] p-1 rounded-3xl bg-blue text-white" />
          ) : (
            <IoIosArrowForward className="min-w-[22px] rounded-3xl p-1 min-h-[22px] bg-gray-6" />
          )}
          <p className="font-bold text-base">{item?.name}</p>
        </div>
        {((isTeacher && sectionId) || studentId) && isSynced && (
          <div className="flex items-center gap-2">
            <p className="font-semibold">Public</p>
            <Switch
              onClick={() => {
                setLessonId(item?.id);
                handleIsPublic(item?.id);
              }}
              defaultChecked={item?.isPublic}
            />
          </div>
        )}
      </div>
      <DoPublic
        open={open}
        setOpen={setOpen}
        sectionId={sectionId}
        lessonId={lessonId}
      />
      {showLesson &&
        bodyLessonClick &&
        contentData?.map(content => {
          return (
            <div
              key={content.id}
              onClick={() => handleLessonClick(content.id, item?.id)}
            >
              <div
                className={`ml-8 flex items-center justify-between gap-3 bg-white px-6 py-3 rounded-2xl ${
                  content.hasCompleted && "border border-green"
                } cursor-pointer mb-4 shadow`}
              >
                <div className="flex gap-4 items-center">
                  {content?.contentType === "BOOK" ? (
                    <img
                      src={bookThumbnail}
                      className="max-h-[24px] max-w-[24px]"
                    />
                  ) : content?.contentType === "AUDIO" ? (
                    <img
                      src={audioThumbnail}
                      className="max-h-[24px] max-w-[24px]"
                    />
                  ) : content?.contentType === "QUESTIONNAIRE" ? (
                    <img
                      src={questionnaireThumbnail}
                      className="max-h-[24px] max-w-[24px]"
                    />
                  ) : content?.contentType === "IMAGE" ? (
                    <img
                      src={imageThumbnail}
                      className="max-h-[24px] max-w-[24px]"
                    />
                  ) : content?.contentType === "VIDEO" ? (
                    <img
                      src={videoThumbbail}
                      className="max-h-[24px] max-w-[24px]"
                    />
                  ) : (
                    ""
                  )}
                  <div>
                    <h1 className="text-xs font-medium text-gray-1">
                      {capitalizeFirstLetter(
                        content?.contentType?.toLowerCase(),
                      )}
                    </h1>
                    <p className="text-base font-semibold mt-1 mb-0">
                      {content.name}
                    </p>
                  </div>
                </div>
                {content.hasCompleted && (
                  <div className="flex items-center gap-2">
                    <MdCheck
                      size={20}
                      className=" border rounded-full bg-green text-white p-[2px]"
                    />
                    <p className="text-green font-semibold">Completed</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

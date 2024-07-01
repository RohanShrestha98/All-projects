import { Routes, Route } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import config from "../config";
import "./lessoncardRoutes.scss";
import httpMethods from "../utils/http";
import toasts from "../utils/toast";
import PositionDragDropLesson from "../pages/Lesson/components/PositionDragDropLesson";
import { PATH } from "../constants/routes";
import AddLesson from "../pages/Lesson/AddLesson";
import { ILessonResponse } from "../@types/lesson";

export default function LessonCardRoutes() {
  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const lessonApi = config.endpoints.api.lesson;
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [lesson, setLesson] = useState<ILessonResponse[] | null>();
  const [lessonListByContent, setLessonListByContent] = useState([]);
  const [videoContent, setVideoContent] = useState([]);
  const [selectedID, setSelectedID] = useState("");
  const [videoPreview, setVideoPreview] = useState(false);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [contentDetailLoading, setContentDetailLoading] = useState(false);

  useEffect(() => {
    fetchNewData(lessonApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData?.data) {
      setLesson(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setLesson(null);
    }
  }, [fetchedData, removeFilter]);

  const handleClick = async data => {
    if (data !== null) {
      try {
        const response1 = await httpMethods.GET(lessonApi.listByContent(data?.id), "");
        setLessonListByContent([response1]);
        setSelectedID(data.id);
      } catch (err) {
        toasts.error(err);
      }
    }
  };
  const handleVideoClick = async data => {
    setContentDetailLoading(true)
    try {
      const response1 = await httpMethods.GET(lessonApi.videoContent(data.id), "");
      setVideoContent([response1]);
      setContentDetailLoading(false)
    } catch (err) {
      toasts.error(err);
      setContentDetailLoading(false)
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setLesson([]);
    fetchNewData(`${lessonApi.list}?page=${pageNumber}`);
  };

  return (
    <Routes>
      <Route path={PATH.ADD_LESSON} element={<AddLesson />} />
      <Route
        index
        element={
          <PositionDragDropLesson
            loading={loading}
            contentDetailLoading={contentDetailLoading}
            setRemoveFilter={setRemoveFilter}
            removeFilter={removeFilter}
            hasError={error}
            data={lesson}
            setData={setLesson}
            fetchNewData={fetchNewData}
            handleClick={handleClick}
            handleVideoClick={handleVideoClick}
            lessonListByContent={lessonListByContent}
            selectedID={selectedID}
            videoPreview={videoPreview}
            setVideoPreview={setVideoPreview}
            videoContent={videoContent?.[0]?.data?.data}
            currentPageNumber={currentPageNumber}
            totalPageNumber={totalPageNumber}
            setTotalPageNumber={setTotalPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            handlePageChange={handlePageChange}
          />
        }
      />
    </Routes>
  );
}

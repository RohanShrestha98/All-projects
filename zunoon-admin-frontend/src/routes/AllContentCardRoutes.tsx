import { Routes, Route } from "react-router-dom";
import AllContentsCard from "../pages/Lesson/components/contentCard/AllContentsCard";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import config from "../config";

export default function AllContentCardRoutes() {
  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const lessonApi = config.endpoints.api.lesson;
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    fetchNewData(lessonApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setLesson(fetchedData.data);
      // setTotalPageNumber(fetchedData.total_pages);
      /* setCurrentPageNumber(fetchedData.current_page); */
    }
  }, [fetchedData]);

  return (
    <Routes>
      <Route
        index
        element={
          <AllContentsCard
            loading={false}
            title={"Rohan Shrestha"}
            contents={lesson}
            id={"1"}
            handleClickSubmit={undefined}
            toggleEditContentModal={undefined}
            toggleDeleteContentModal={undefined}
            setDeleteContentData={undefined}
            setUpdateContentData={undefined}
            showAssignContentModal={undefined}
            setShowAssignContentModal={undefined}
            handleVideoClick={undefined}
            setVideoPreview={undefined}
            videoPreview={undefined}
            selectedID={undefined}
          />
        }
      />
    </Routes>
  );
}

import React, { createContext, useContext, useState } from "react";

const ContentDeteilContext = createContext({});

export const ContentDeteilProvider = ({ children }) => {
  const [refetchStudentCourseList, setRefetchStudentCourseList] =
    useState(false);

  const [contentDetails, setContentDetails] = useState(
    localStorage?.getItem("contentDetails") ||
      localStorage?.getItem("contentDetails") !== undefined
      ? JSON.parse(localStorage?.getItem("contentDetails"))
      : [],
  );

  return (
    <ContentDeteilContext.Provider
      value={{
        contentDetails,
        setContentDetails,
        refetchStudentCourseList,
        setRefetchStudentCourseList,
      }}
    >
      {children}
    </ContentDeteilContext.Provider>
  );
};

export const useContentDetailsContext = () => useContext(ContentDeteilContext);

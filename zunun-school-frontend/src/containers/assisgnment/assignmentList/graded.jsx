import React from "react";
import AssignmentTitle from "./assignmentTitle";
import EachAssignment from "./eachAssignment";
import { useQueryData } from "../../../hooks/useQueryData";
import { useAuthContext } from "../../../context/authContext";
import ErrorPage from "../../../components/errorPage/errorPage";
import notGraded from "../../../assets/images/notGraded.png";

const Graded = () => {
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;
  const { data, isLoading, isError } =
    isStudent &&
    useQueryData(
      ["overDue-list"],
      "api/v1/assignment/student-list/?status=graded",
      [],
      open ? true : false,
    );
  return (
    <>
      <AssignmentTitle title="Graded" lastRow="Status" />
      <EachAssignment isGraded={true} data={data?.data} />
      <ErrorPage
        emptyImage={notGraded}
        data={data?.data}
        isFetching={isLoading}
        error={isError}
        title={"No graded assignment "}
      />
    </>
  );
};

export default Graded;

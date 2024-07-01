import React from "react";
import AssignmentTitle from "./assignmentTitle";
import EachAssignment from "./eachAssignment";
import { useQueryData } from "../../../hooks/useQueryData";
import { useAuthContext } from "../../../context/authContext";
import ErrorPage from "../../../components/errorPage/errorPage";
import noOverdue from "../../../assets/images/noOverdue.png";

const Overdue = () => {
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;
  const { data, isLoading, isError } =
    isStudent &&
    useQueryData(
      ["overDue-list"],
      "api/v1/assignment/student-list/?status=late",
      "",
      open ? true : false,
    );

  return (
    <>
      <AssignmentTitle
        title="Overdue"
        isOverdue={true}
        lastRow="Add Submission"
      />
      <EachAssignment isOverdue={true} data={data?.data} />
      <ErrorPage
        emptyImage={noOverdue}
        data={data?.data}
        isFetching={isLoading}
        error={isError}
        title={"No overdue assignment "}
      />
    </>
  );
};

export default Overdue;

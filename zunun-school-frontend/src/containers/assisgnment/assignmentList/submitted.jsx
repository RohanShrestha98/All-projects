import React from "react";
import AssignmentTitle from "./assignmentTitle";
import EachAssignment from "./eachAssignment";
import { useQueryData } from "../../../hooks/useQueryData";
import { useAuthContext } from "../../../context/authContext";
import ErrorPage from "../../../components/errorPage/errorPage";
import noData2 from "../../../assets/images/noData2.png";

const Submitted = () => {
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;
  const { data, isLoading, error } =
    isStudent &&
    useQueryData(
      ["submitted-list"],
      "api/v1/assignment/student-list/?status=submitted",
      [],
      open ? true : false,
    );
  return (
    <>
      <AssignmentTitle title="Submitted" lastRow="Edit" />
      {data && data?.data?.length ? (
        <EachAssignment isSubmitted={true} data={data?.data} />
      ) : (
        <ErrorPage
          emptyImage={noData2}
          data={data?.data}
          isFetching={isLoading}
          error={error}
          title={"No submitted assignment "}
        />
      )}
    </>
  );
};

export default Submitted;

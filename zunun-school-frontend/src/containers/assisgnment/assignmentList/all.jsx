import React from "react";
import AssignmentTitle from "./assignmentTitle";
import EachAssignment from "./eachAssignment";
import { useQueryData } from "../../../hooks/useQueryData";
import { useLocation } from "react-router-dom";
import AssignmentList from "../../../pages/assignment/AssignmentList";
import { useAuthContext } from "../../../context/authContext";
import ErrorPage from "../../../components/errorPage/errorPage";
import noAssignment from "../../../assets/images/noAssignment.png"


const AllAssignment = () => {
  const location = useLocation();
  const { id } = location.state !== null && location.state;
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;

  const { data, isLoading, isError } =
    location.state !== null
      ? useQueryData(
          ["section-list"],
          `api/v1/assignment/list/?section=${id}`,
          [],
          open ? true : false,
        )
      : isStudent &&
        useQueryData(
          ["all-list"],
          `api/v1/assignment/student-list/`,
          [],
          open ? true : false,
        );

  return isStudent ? (
    <>
      <AssignmentTitle title="All" lastRow="Actions" />
      {data && data?.data?.length ? (
        <EachAssignment isSubmitted={true} data={data?.data} />
      ) : (
        <ErrorPage
          emptyImage={noAssignment}
          data={data?.data}
          isFetching={isLoading}
          error={isError}
          title={"No assignment"}
        />
      )}
    </>
  ) : (
    <>
      <AssignmentList />
    </>
  );
};

export default AllAssignment;

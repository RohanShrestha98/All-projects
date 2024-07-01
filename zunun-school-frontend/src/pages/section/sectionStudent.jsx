import React, { useMemo } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQueryData } from "../../hooks/useQueryData";
import StudentTable from "../../components/table/studentTable";
import { BiEdit } from "react-icons/bi";
import { Badge } from "antd";

const SectionStudent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data, isFetching } = useQueryData(
    ["sectionStudent", state.id],
    `api/v1/student/list/?section=${state?.id}`,
  );

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className={"ml-3"}>{info.getValue()}</div>,
        header: () => <span className={"ml-3"}>S/N</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.student.firstName + " " + row.student.surname,
        id: "name",
        cell: info => info.getValue(),
        header: () => <span>Student&apos;s Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.student.username,
        id: "username",
        cell: info => info.getValue(),
        header: () => <span>Username</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.coursesEnrolled || 0,
        id: "enrolled",
        cell: info => info.getValue(),
        header: () => <span>Courses Enrolled</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.student.minEducId,
        id: "minEducId",
        cell: info => info.getValue(),
        header: () => <span>Min Educ ID</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => (row.student.isActive ? "Active" : "Deactivated"),
        id: "account",
        cell: info => info.getValue(),
        header: () => <span>Account</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          let lastActive = row.student.lastActive;
          return lastActive ? (
            lastActive < 5 ? (
              <Badge text={`${lastActive} days ago`} className={"bg-green"} />
            ) : (
              <Badge
                text={`${lastActive}  days ago`}
                className={"bg-rose-400"}
              />
            )
          ) : (
            <Badge text={"Inactive"} className={"bg-zinc-400"} />
          );
        },
        id: "status",
        cell: info => <div className="w-[50px]">{info.getValue()}</div>,
        header: () => <span>Last Active</span>,
        footer: props => props.column.id,
      },
      {
        id: "action",
        cell: info => {
          return (
            <NavLink
              to={"/student/edit-profile"}
              state={{ data: info?.row?.original }}
              className="text-blue flex ml-4 cursor-pointer "
            >
              <BiEdit size={20} />
            </NavLink>
          );
        },
        header: () => <span>Action</span>,
        footer: props => props.column.id,
      },
    ],
    [],
  );

  return (
    <div>
      <h3 className="flex items-center gap-4 mb-8">
        <div
          className="flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          onClick={() => navigate(-1)}
        >
          <ImArrowLeft2 size={16} />
        </div>
        Students in {state.name}
      </h3>
      <StudentTable
        data={data ?? []}
        isFetching={isFetching}
        columns={columns}
      />
    </div>
  );
};

export default SectionStudent;

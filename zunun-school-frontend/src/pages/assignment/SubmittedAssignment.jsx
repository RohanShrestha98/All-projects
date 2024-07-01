import React, { useMemo, useState } from "react";
import { ReactTable } from "../../components/table/table";
import { usePermissionContext } from "../../context/permissionContext";
import { useQueryData } from "../../hooks/useQueryData";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import noSubmitted from "../../assets/images/noSubmitted.png"

export default function SubmittedAssignment({ active }) {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, isError } = useQueryData(
    ["submitted-list", searchText],
    `api/v1/assignment/student-list/?status=submitted&&query=${searchText}`,
  );
  const navigate = useNavigate();
  const { permissions } = usePermissionContext().permissions;
  const assignmentPermission = permissions
    .filter(each => each.url.path.includes("assignment"))
    .map(each => each.url.path);

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.student?.name,
        id: "name",
        cell: info => info.getValue(),
        header: () => <span>Student Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.title,
        id: "title2",
        cell: info => info.getValue(),
        header: () => <span>Assignment Title</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.student?.grade,
        id: "grade2",
        cell: info => info.getValue(),
        header: () => <span>Grade</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.openDate?.slice(0, 10),
        id: "openDate2",
        cell: info => info.getValue(),
        header: () => <span>Open Date</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.dueDate?.slice(0, 10),
        id: "dueDate2",
        cell: info => info.getValue(),
        header: () => <span>Due Date</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.submissionDate?.slice(0, 10),
        id: "submissionDate2",
        cell: info => info.getValue(),
        header: () => <span>Submission Date</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row,
        id: "action",
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-xl">
              <AiOutlineEye
                className="text-blue"
                onClick={() => {
                  navigate("/assignment/details", {
                    state: {
                      data: row.original,
                    },
                  });
                }}
              ></AiOutlineEye>
            </div>
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
      <div className="w-full  bg-white mt-4 rounded-t-xl  px-8 py-4 flex justify-between items-center border-b-[1px] border-gray-6">
        <p className="font-semibold">
          Total Assignment :
          {active === "submitted" && <span> {data?.data?.length ?? 0}</span>}
        </p>
        <div className="flex items-center gap-2 bg-gray-100  rounded-full outline-none px-4 py-2 w-1/4">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="outline-none w-full bg-transparent"
          />
          {searchText && <RxCross2 onClick={() => setSearchText("")} />}
        </div>
      </div>
      {active === "submitted" &&
        (assignmentPermission.includes("/assignment/list/") ||
          permissions?.[0]?.name === "Any") && (
          <>
            <ReactTable
              emptyImage={noSubmitted}
              title={"No assignments submitted yet"}
              loading={isLoading}
              error={isError}
              columns={columns}
              data={data?.data ?? []}
              currentPage={data?.currentPage}
              totalPage={data?.totalPage}
            />
          </>
        )}
    </div>
  );
}

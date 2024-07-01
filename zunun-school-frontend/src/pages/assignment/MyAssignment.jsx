import React, { useMemo, useState } from "react";
import { ReactTable } from "../../components/table/table";
import { usePermissionContext } from "../../context/permissionContext";
import { useQueryData } from "../../hooks/useQueryData";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AssignmentDetailsModel from "../../components/modal/AssignmentDetailsModel";
import ConfirmModel from "../../containers/profile/confirmModel";
import toast from "../../utils/toast";
import { useMutate } from "../../hooks/useMutateData";
import { RxCross2 } from "react-icons/rx";
import noAssignment from "../../assets/images/noAssignment.png"

export default function MyAssignment({ active }) {
  const [searchText, setSearchText] = useState("");
  const { data, isError, isLoading } = useQueryData(
    ["assignment-list", searchText],
    `api/v1/assignment/list/?query=${searchText}`,
  );
  const useEventDeleteMutation = () =>
    useMutate(["assignment-list"], "api/v1/assignment/delete/");
  const mutateDeleteAsync = useEventDeleteMutation().mutateAsync;
  const [detailsModel, setDetailsModel] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const [detailsModelData, setDetailsModelData] = useState([]);
  const [deletedId, setDeletedId] = useState("");
  const navigate = useNavigate();
  const { permissions } = usePermissionContext().permissions;
  const assignmentPermission = permissions
    .filter(each => each.url.path.includes("assignment"))
    .map(each => each.url.path);

  const handleDetailsModelOpen = data => {
    setDetailsModelData(data);
    setDetailsModel(!detailsModel);
  };
  const handleConfirm = id => {
    setConfirmModel(!confirmModel);
    setDeletedId(id);
  };

  const handleDelete = async id => {
    try {
      const response = await mutateDeleteAsync(["delete", `${id}`]);
      if (response.success) {
        setConfirmModel(false);
        toast.success("Assignment Deleted Successfully!");
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };

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
        accessorFn: row => row.title,
        id: "title",
        cell: info => info.getValue(),
        header: () => <span>Assignment Title</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.openDate?.slice(0, 10),
        id: "openDate",
        cell: info => info.getValue(),
        header: () => <span>Open Date</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.dueDate?.slice(0, 10),
        id: "dueDate",
        cell: info => info.getValue(),
        header: () => <span>Due Date</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => (row?.isPublic === true ? "Public" : "Draft"),
        id: "isPublic",
        cell: info => info.getValue(),
        header: () => <span>Status</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.assignToType ?? "No Type",
        id: "assignType",
        cell: info => info.getValue(),
        header: () => <span>Assign Type</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row?.dueDate?.slice(0, 10),
        id: "action",
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-xl">
              <AiOutlineEye
                onClick={() => handleDetailsModelOpen(row.original)}
              />
              {(assignmentPermission.includes("/assignment/update/") ||
                permissions[0].name === "Any") && (
                <AiOutlineEdit
                  className="text-blue"
                  onClick={() => {
                    navigate("/assignment/add", {
                      state: {
                        data: row.original,
                        edit: true,
                      },
                    });
                  }}
                >
                  Edit
                </AiOutlineEdit>
              )}
              {(assignmentPermission.includes("/assignment/delete/") ||
                permissions[0].name === "Any") && (
                <BiTrash
                  className="text-red"
                  onClick={() => handleConfirm(row.original.id)}
                />
              )}
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
          {active === "myAssignment" && <span> {data?.data?.length ?? 0}</span>}
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
      {active === "myAssignment" &&
        (assignmentPermission.includes("/assignment/list/") ||
          permissions[0].name === "Any") && (
          <>
            <ReactTable
              emptyImage={noAssignment}
              title={"No assignments to show"}
              loading={isLoading}
              error={isError}
              columns={columns}
              data={data?.data ?? []}
              currentPage={data?.currentPage}
              totalPage={data?.totalPage}
            />
          </>
        )}
      {confirmModel && (
        <ConfirmModel
          title={"Delete Assignment"}
          isOpen={confirmModel}
          setOpen={setConfirmModel}
          desc={"Are you sure you want to delete this assignment?"}
          btnName={"Delete"}
          className={"bg-red hover:text-red hover:bg-white "}
          handleConfirm={() => handleDelete(deletedId)}
        />
      )}
      {detailsModel && (
        <AssignmentDetailsModel
          isOpen={detailsModel}
          setOpen={handleDetailsModelOpen}
          data={detailsModelData}
        />
      )}
    </div>
  );
}

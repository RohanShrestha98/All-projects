/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useAdminData } from "../../hooks/useQueryData";
import { ReactTable } from "../../components/Shared/Table";
import { BiEditAlt } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Staff() {
  const { data } = useAdminData();
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: (info) => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => {
          return <p>{row?.username}</p>;
        },
        id: "username",
        cell: (info) => info.getValue(),
        header: () => <span>Username</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => {
          return <p>{row?.email}</p>;
        },
        id: "email",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      // {
      //   id: "action",
      //   cell: ({ row }) => {
      //     return (
      //       <div className="flex items-center gap-3">
      //         <BiEditAlt size={20} className="text-blue-700 " />
      //         <LuTrash2 size={20} className="text-red-600 " />
      //       </div>
      //     );
      //   },
      //   header: () => <span>Action</span>,
      //   footer: (props) => props.column.id,
      // },
    ],
    []
  );
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Staff Page</h1>
        <button onClick={() => navigate("/register")}>Add Staff</button>
      </div>

      <ReactTable data={data ?? []} columns={columns} />
    </div>
  );
}

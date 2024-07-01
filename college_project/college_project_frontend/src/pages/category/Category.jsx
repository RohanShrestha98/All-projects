/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeadingAdd from "../../components/UI/HeadingAdd";
import { ReactTable } from "../../components/Shared/Table";
import { useCategoryData } from "../../hooks/useQueryData";
import { useCategoryMutation } from "../../hooks/useMutateData";

export default function Category() {
  const { data } = useCategoryData();
  const navigate = useNavigate();
  const categoryMutation = useCategoryMutation();
  const handleDelete = async (id) => {
    try {
      const response = await categoryMutation.mutateAsync(["delete", `${id}`]);
      if (response?.success) {
        console.log("Deleted successfully");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: (info) => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        id: "image",
        header: () => <>Thumbnail</>,
        cell: ({ row }) => (
          <div className="flex gap-4">
            <img
              className="h-14 rounded-xl"
              src={row?.original?.thumbnail?.url}
              alt=""
            />
          </div>
        ),
      },
      {
        accessorFn: (row) => {
          return row?.title;
        },

        id: "title",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.description,
        id: "description",
        cell: (info) => info.getValue(),
        header: () => <span>Description</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: () => <>Actions</>,
        cell: ({ row }) => (
          <div className="flex  gap-4">
            <Link
              to="add-category"
              state={{ data: row.original }}
              className="cursor-pointer"
            >
              Edit
            </Link>
            <div
              className="cursor-pointer"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </div>
          </div>
        ),
      },
    ],
    [data]
  );
  return (
    <div className="p-4">
      <HeadingAdd
        heading={"Category"}
        buttonName={"Add Category"}
        handleButtonClick={() => navigate("add-category")}
      />
      <ReactTable data={data?.data || []} columns={columns} />
    </div>
  );
}

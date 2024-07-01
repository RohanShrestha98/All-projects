/* eslint-disable react/prop-types */
import InputField from "../../components/UI/InputField";
import { useForm } from "react-hook-form";
import { useApproveShopMutation } from "../../hooks/useMutateData";
import { useMemo, useState } from "react";
import FileUploader from "../../components/FileUpload/FileUploader";
import { useShopData } from "../../hooks/useQueryData";
import { ReactTable } from "../../components/Shared/Table";
import { BiEditAlt } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";

export default function ApproveShop() {
  const { register, handleSubmit } = useForm();
  const [citizenshipFile, setCitizenshipFile] = useState();
  const approveShopMutation = useApproveShopMutation();
  const { data: shopData } = useShopData();
  console.log("shopData", shopData);
  const handleCreateShop = async (data) => {
    const postData = {
      ...data,
      isApprove: false,
      citizenship: citizenshipFile?.url,
    };
    try {
      const result = approveShopMutation.mutateAsync(["post", "", postData]);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleApproveShop = async (id, status) => {
    const postData = {
      isApprove: status === "approve" ? true : false,
    };
    try {
      const result = await approveShopMutation.mutateAsync([
        "put",
        `/${id}`,
        postData,
      ]);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };
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
          return <p>{row?.shop_name}</p>;
        },
        id: "shop_name",
        cell: (info) => info.getValue(),
        header: () => <span>Shop name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => {
          return <p>{row?.location}</p>;
        },
        id: "location",
        cell: (info) => info.getValue(),
        header: () => <span>Location</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => {
          return <p>{row?.isApprove ? "Approved" : "Not approved"}</p>;
        },
        id: "isApprove",
        cell: (info) => info.getValue(),
        header: () => <span>isApproved</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => {
          return (
            <a href={row?.citizenship} target="_blank" rel="noreferrer">
              Preview
            </a>
          );
        },
        id: "citizenship",
        cell: (info) => info.getValue(),
        header: () => <span>Citizenship</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "action",
        cell: ({ row }) => {
          console.log("row", row);
          return (
            <div className="flex items-center gap-3">
              <p
                className="text-green-700 cursor-pointer"
                onClick={() => handleApproveShop(row?.original?._id, "approve")}
              >
                Approve
              </p>

              <p
                onClick={() => handleApproveShop(row?.original?._id, "decline")}
                className="text-red-600 cursor-pointer"
              >
                Decline
              </p>
            </div>
          );
        },
        header: () => <span>Action</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateShop)}>
        <InputField
          type={"text"}
          placeholder={"Enter shop name "}
          register={register}
          registerName={"shop_name"}
        />
        <InputField
          type={"text"}
          placeholder={"Enter shop location "}
          register={register}
          registerName={"location"}
        />
        <InputField
          type={"number"}
          placeholder={"Enter shop vat number "}
          register={register}
          registerName={"vat_number"}
        />
        <InputField
          type={"number"}
          placeholder={"Enter shop pat number "}
          register={register}
          registerName={"pat_number"}
        />
        <FileUploader setFile={setCitizenshipFile} />
        <button>Submit</button>
      </form>
      <ReactTable data={shopData ?? []} columns={columns} />
    </div>
  );
}

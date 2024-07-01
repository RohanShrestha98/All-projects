import { useState } from "react";
import { useDocumentUpdateMutation } from "../hooks/useMutateData";
import { useAdminData, useAdminFilesData } from "../hooks/useQueryData";
import Contact from "./Contact";
import DocumentUpload from "./DocumentUpload";
import FileUploader from "../components/FileUpload/FileUploader";

export default function Home() {
  const { data } = useAdminData();
  const { data: files } = useAdminFilesData();
  const updateDocumentMutation = useDocumentUpdateMutation();

  const handleDocumentUpdate = async (id) => {
    const formData = new FormData();
    formData.append("title", "rohan");
    formData.append("description", "shrestha");
    try {
      const result = await updateDocumentMutation.mutateAsync([
        "patch",
        `${id}`,
        formData,
      ]);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleDocumentDelete = async (id) => {
    try {
      const result = await updateDocumentMutation.mutateAsync([
        "delete",
        `${id}`,
      ]);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="bg-white">
      {files?.files?.map((item) => {
        return (
          <div key={item?.id} className="grid grid-cols-4  border p-4 px-10 ">
            <p>{item?.title}</p>
            <p>{item?.description}</p>
            <a
              href={`http://localhost:5001/${item?.filePath}`}
              target="_blank"
              rel="noreferrer"
            >
              Preview
            </a>
            <div className="flex items-center gap-2">
              <p
                className="cursor-pointer "
                onClick={() => {
                  handleDocumentUpdate(item?._id);
                }}
              >
                Edit
              </p>
              <p
                className="cursor-pointer "
                onClick={() => {
                  handleDocumentDelete(item?._id);
                }}
              >
                Delete
              </p>
            </div>
          </div>
        );
      })}
      <FileUploader />
      <Contact />
      <DocumentUpload />
    </div>
  );
}

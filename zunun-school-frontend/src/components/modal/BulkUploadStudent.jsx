import React, { useState } from "react";
import { Modal, message } from "antd";
import { useStudentBulkUploadMutation } from "../../hooks/useMutateData";
import { FiUpload, FiDownload } from "react-icons/fi";
import CSVSelector from "./CSVSelector";
import { RxCross2 } from "react-icons/rx";

const BulkUploadStudent = ({ isOpen, setOpen }) => {
  const [fileName, setFileName] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [csvFile, setCsvFile] = useState();

  const headers = csvData?.[0];
  const rows = csvData?.slice(1);

  const studentBulkUploadMutation = useStudentBulkUploadMutation();

  const handleOk = () => {
    setOpen(false);
  };

  const handleBulkUpload = () => {
    studentBulkUploadMutation.mutateAsync(["post", "", { file: csvFile }], {
      onSuccess: () => {
        message.success("Student data bulk uploaded successfully", [2]);
      },
      onError: error => {
        let errorMessage = error?.response?.data?.errors
          ? Object.values(error?.response?.data?.errors)?.[0]
          : error?.message?.toString();
        message.error(errorMessage, [2]);
      },
    });
  };

  return (
    <>
      <Modal
        open={isOpen}
        title="Student Bulk Upload"
        onOk={handleOk}
        onCancel={handleOk}
        height={400}
        width={1000}
        footer={null}
      >
        <hr />
        <p className="mt-2 font-bold">Note:</p>
        <ul className="flex flex-col gap-4 mt-1 list-disc pl-4">
          <li>All fields in the file are required to fill.</li>
          <li>
            The Date of Birth (DOB) should be in the UTC format i.e.
            1994-11-05T13:15:30Z (YYYY-MM-DDTHH:MM:SSZ)
          </li>
          <li>
            The name of the grade should exactly match as in the grade list.
          </li>
        </ul>
        {fileName && (
          <div className="flex gap-2 items-center mt-2">
            <p className="p-2  bg-stone-200 rounded">Filename: {fileName}</p>
            <div
              className="cursor-pointer border rounded-full p-[1px] border-red"
              onClick={() => {
                setCsvData(null);
                setFileName(null);
                setCsvFile(null);
              }}
            >
              <RxCross2 className="text-red h-4 w-4" />
            </div>
          </div>
        )}

        <div className="flex mt-4 flex-col justify-between">
          {csvData?.length > 0 && (
            <div className="overflow-auto h-64">
              <table className="border-collapse border border-b-0 border-slate-200">
                <thead>
                  <tr>
                    {headers?.map((header, i) => (
                      <th
                        key={i}
                        className="whitespace-nowrap border border-slate-200 py-4 px-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows?.map((rowData, i) => {
                    return (
                      <tr key={i}>
                        {rowData?.map((data, i) => {
                          return (
                            <td
                              className="border  border-slate-200 px-2"
                              key={i}
                            >
                              {data}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex  gap-4">
            <a
              target="_blank"
              href="../../../public/student.csv"
              className="flex items-center justify-center gap-2 bg-blue hover:text-blue hover:bg-white border w-1/2 text-center text-white px-4 py-1 rounded-md"
            >
              <FiDownload />
              Download Sample CSV
            </a>
            {csvData?.length ? (
              <button
                className="flex items-center justify-center gap-2 bg-blue hover:text-blue hover:border-blue hover:bg-white border w-1/2 text-white px-4 py-1 text-center rounded-md"
                onClick={() => handleBulkUpload()}
                disabled={studentBulkUploadMutation.isLoading}
              >
                <FiUpload /> Upload
              </button>
            ) : (
              <>
                <label
                  htmlFor="studentUpload"
                  className="flex items-center justify-center gap-2 bg-blue hover:text-blue hover:bg-white border w-1/2 text-white px-4 py-1 text-center rounded-md"
                >
                  <FiUpload />
                  Upload Student Data
                </label>
                <CSVSelector
                  setCsvFile={setCsvFile}
                  setCsvData={setCsvData}
                  setFileName={setFileName}
                />
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default BulkUploadStudent;

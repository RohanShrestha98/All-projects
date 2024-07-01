/* eslint-disable react/prop-types */
import { useFileMutation } from "../../hooks/useMutateData";

export default function FileUploader({ setFile }) {
  const fileMutation = useFileMutation();

  const handleFileUpload = async (e) => {
    const formData = await new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const result = await fileMutation.mutateAsync(["post", "", formData]);
      setFile(result?.details);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex flex-col">
      <input
        type="file"
        onChange={(e) => handleFileUpload(e)}
        id="addMedication"
      />
    </div>
  );
}

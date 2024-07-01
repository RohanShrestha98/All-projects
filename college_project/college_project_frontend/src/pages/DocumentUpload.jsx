import { useForm } from "react-hook-form";
import { useNavigate } from "`react-router-dom`";
import { useDocumentMutation } from "../hooks/useMutateData";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import { Link } from "react-router-dom";
import { useState } from "react";

const DocumentUpload = () => {
  const documentMutation = useDocumentMutation();
  const [document, setDocument] = useState();
  const [fileLink, setFileLink] = useState();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmitHandler = async (data) => {
    const formData = await new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("file", document);
    try {
      const result = await documentMutation.mutateAsync(["post", "", formData]);
      setFileLink(result?.file?.filePath);
    } catch (error) {}
  };

  console.log("document", document);
  console.log("fileLink", fileLink);
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-2 w-96 border shadow-md px-4 py-4 pb-10 items-center rounded-md"
      >
        <h1 className="font-bold text-2xl">Register Form</h1>
        <InputField
          register={register}
          registerName="title"
          type="text"
          placeholder="Your title"
        />
        <InputField
          register={register}
          registerName="description"
          type="text"
          placeholder="Your description"
        />
        <input
          type="file"
          onChange={(e) => setDocument(e.target.files[0])}
          id="addMedication"
        />
        <a
          href={`http://localhost:5001/${fileLink}`}
          target="_blank"
          rel="noreferrer"
        >
          okey
        </a>
        <Button buttonName={"Register"} />
        <Link to="/login">login</Link>
      </form>
    </div>
  );
};

export default DocumentUpload;

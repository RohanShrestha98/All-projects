import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import KeywordSelect from "../../components/UI/KeywordSelect";
import InputField from "../../components/UI/InputField";
import TextArea from "../../components/UI/TextArea";
import FileUploader from "../../components/FileUpload/FileUploader";
import { useCategoryMutation } from "../../hooks/useMutateData";

export default function AddCategory() {
  const { register, handleSubmit } = useForm();
  const [thumbnail, setThumbnail] = useState();
  const [tags, setTags] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryMutation = useCategoryMutation();
  const editData = location?.state?.data;

  const onSubmitHandler = async (data) => {
    const postData = {
      ...data,
      thumbnail: thumbnail,
      tags: tags,
    };
    try {
      const response = await categoryMutation.mutateAsync([
        editData ? "patch" : "post",
        editData ? `${editData?._id}` : "create/",
        postData,
      ]);
      if (response?.success) {
        navigate("/category");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (editData?.tags) {
      setTags(editData?.tags);
      setThumbnail(editData?.thumbnail);
    }
  }, [editData?.tags, editData?.thumbnail]);

  return (
    <div className="p-4 bg-slate-50 h-[92vh]">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Add Category </p>
        <div className="w-40">{/* <Button title={"Add Category"} /> */}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-grow gap-4 mt-4">
          <div className="w-1/4 flex h-52 bg-white flex-col gap-6">
            <div className="border bg-white w-full  rounded-lg p-4">
              <h1 className="font-medium text-xl mb-2">Thumbnail</h1>
              <p className="mb-2">Photo</p>
              <div className="flex flex-col items-center border border-dashed p-8 rounded-md">
                <div className=" flex gap-3 mb-4">
                  {thumbnail && !editData?.thumbnail?.url && (
                    <img src={thumbnail?.url} className="w-full h-full" />
                  )}
                  {editData?.thumbnail?.url && (
                    <img
                      className="rounded-lg"
                      src={editData?.thumbnail?.url}
                    />
                  )}
                </div>
                {!thumbnail && !editData?.thumbnail?.url && (
                  <p className="mb-2 text-sm text-center">
                    You can select images here
                  </p>
                )}
                {!thumbnail && !editData?.thumbnail?.url && (
                  <FileUploader setFile={setThumbnail} />
                )}
              </div>
            </div>
          </div>
          <div className="w-3/4 flex bg-white flex-col gap-6">
            <div className="border bg-white w-full  rounded-lg p-4">
              <h1 className="font-medium text-xl mb-2">General Information</h1>
              <InputField
                defaultValue={editData?.title}
                placeholder={"Enter the category name"}
                registerName={"title"}
                label={"Category Name"}
                type={"text"}
                classes={"bg-[#f9f9fcff] h-10 border"}
                register={register}
              />
              <TextArea
                defaultValue={editData?.description}
                className={"mt-4"}
                placeholder={"Enter the category description here ..."}
                registerName={"description"}
                label={"Category Description"}
                type={"textarea"}
                classes={"bg-[#f9f9fcff] h-32 border"}
                register={register}
              />
            </div>
          </div>
        </div>
        <div>
          <KeywordSelect
            title={
              "Enter the Input Field you want add as an feature description in this category"
            }
            id="catagory_inputfield "
            tags={tags}
            setTags={setTags}
          />
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <div className="w-40 mt-4">
            <Button
              buttonName={editData?.title ? "Update Category" : "Add Category"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

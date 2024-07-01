import React, { useState } from "react";
import { Input, Select, message } from "antd";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ImArrowRight2 } from "react-icons/im";
import { Controller, useForm } from "react-hook-form";
import { convertToSelectOptions } from "../../utils/convertToSelectOptions";
import { Button } from "../../components/UI/button";
import { useGradeData } from "../../hooks/useQueryData";
import { useFileUploadMutation } from "../../hooks/useMutateData";
import { LoadingSpinnerSvg } from "../../assets/icons/allSvg";
import CustomCKEditor from "../../components/ckEditor/customCKEditor";

const BlogForm = ({
  onSubmitHandler,
  isLoading,
  isEditForm,
  isSubmitting,
  editDefaultValues,
}) => {
  const [gradeIds, setGradeIds] = useState(
    !isLoading && editDefaultValues ?  editDefaultValues?.grade?.map(item => item?.id) :[],
  );
  const [tags, setTags] = useState(editDefaultValues?.tags ?? []);
  const [description, setDescription] = useState(
    editDefaultValues?.description ?? "",
  );
  const fileUploadMUtation = useFileUploadMutation();

  const [thumbnail, setThumbnail] = useState({
    fileName: "",
    fileType: "",
    id: "",
    url: "",
  });

  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm(
    isEditForm
      ? {
          defaultValues: {...editDefaultValues,gradeIds:editDefaultValues?.grade?.map(item => item?.id)},
        }
      : {
          defaultValues: {
            title: "",
            description: "",
            gradeIds: [],
            tags: [],
            thumbnail: {},
          },
        },
  );


  const { data } = useGradeData();

  const handleGradeChange = data => {
    setValue("gradeIds", data);
    setGradeIds(data);
  };

  const handleTagsChange = data => {
    setValue("tags", data);
    setTags(data);
  };

  const handleThumbnailUpload = async e => {
    const file = e.target.files[0];
    setThumbnailUploading(true);
    try {
      const response = await fileUploadMUtation.mutateAsync([
        "post",
        ``,
        {
          file: file,
        },
      ]);
      setThumbnail(response?.data);
      setValue("thumbnail", response?.data);
      setThumbnailUploading(false);
    } catch (err) {
      message.error(err?.toString());
      setThumbnailUploading(false);
    }
  };

  const handleFormSubmit = async data => {
    await onSubmitHandler(data);
  };

  if(isLoading) return<p>Loading...</p>

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex gap-16 md:flex-col md:gap-4"
    >
      <div className="w-[20%] md:w-full gap-4 flex flex-col items-center justify-center">
        <img
          src={
            editDefaultValues?.thumbnail?.url??thumbnail?.url 
          }
          alt="thumbnail"
          className="rounded-full h-32 w-32 object-cover object-top"
        />
        <div className="flex gap-2 items-center">
          <input
            type="file"
            id="thumbnail"
            onChange={e => handleThumbnailUpload(e)}
            className="hidden"
          />
          <label
            className="px-4 py-[3px] border flex items-center gap-2 border-[#d9d9d9] hover:border-cyan hover:bg-cyan hover:text-white bg-white rounded-full whitespace-nowrap"
            htmlFor="thumbnail"
          >
            Upload Thumbnail{" "}
            {thumbnailUploading && (
              <LoadingSpinnerSvg className="h-5 w-5 text-cyan" />
            )}
          </label>
        </div>
        <p className="whitespace-nowrap truncate text-sm"></p>
      </div>
      <div className="w-[60%] md:w-full space-y-4">
        <div className="flex flex-col">
          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                Title <span className="text-red">*</span>
              </label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    placeholder="Enter title"
                    onChange={e => {
                      field.onChange(e.target.value);
                      field.value = e.target.value;
                      setValue("description");
                    }}
                    value={field.value}
                  />
                )}
              />
              {errors?.title?.type === "required" && (
                <p className="text-sm text-red">Required</p>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                Description <span className="text-red">*</span>
              </label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <CustomCKEditor
                    label="description"
                    placeholder="Write description..."
                    onChange={e => {
                      field?.onChange(e);
                      setDescription(e);
                    }}
                    // defaultValue={editDefaultValues?.description}
                    value={description}
                  />
                )}
              />
              {errors?.description?.type === "required" && (
                <p className="text-sm text-red">Required</p>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                Grades <span className="text-red">*</span>
              </label>
              <Controller
                name="gradeIds"
                control={control}
                rules={{
                  required: false,
                }}
                render={() => {
                  return (
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Select grades"
                      onChange={data => handleGradeChange(data)}
                      defaultValue={editDefaultValues?.grade?.map((item) => {return(
                        {
                          value:item?.id,
                          label:item?.name
                        }
                      ) })}
                      options={convertToSelectOptions(data?.data)}
                      value={gradeIds}
                    />
                  );
                }}
              />
              {errors?.gradeIds?.type === "required" && (
                <p className="text-sm text-red">Required</p>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <ShimmerThumbnail line={1} height={40} />
          ) : (
            <>
              <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                Tags
              </label>
              <Controller
                name="tags"
                control={control}
                rules={{
                  required: false,
                }}
                render={() => {
                  return (
                    <Select
                      mode="tags"
                      allowClear
                      placeholder="Create tags"
                      onChange={data => handleTagsChange(data)}
                      dropdownStyle={{ display: "none" }}
                      value={tags}
                    />
                  );
                }}
              />
            </>
          )}
        </div>

        <div className="flex justify-end mt-3">
          <Button
            type="primary"
            htmlType="submit"
            className="flex justify-center items-center gap-2 px-6"
            disabled={fileUploadMUtation?.isLoading || isSubmitting}
          >
            Submit <ImArrowRight2 />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;

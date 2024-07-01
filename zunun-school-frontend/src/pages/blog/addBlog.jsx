import React, { useEffect, useState } from "react";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import BlogForm from "./blogForm";
import { useBlogMutation } from "../../hooks/useMutateData";
import { message } from "antd";
import { useBlogDetailsData } from "../../hooks/useQueryData";

const AddBlog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const blogMutation = useBlogMutation();
  const location = useLocation();
  const {
    data: editDefaultValues,
    isLoading: editIsLoading,
    refetch,
  } = useBlogDetailsData({
    blogId: location?.state?.blogId,
  });

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, [500]);
  }, []);


  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const onSubmitHandler = data => {
    blogMutation.mutateAsync(
      [
        location?.state?.edit ? "patch" : "post",
        location?.state?.edit ? `update/${location?.state?.blogId}` : "create",
        data,
      ],
      {
        onSuccess: () => {
          message.success("Blog Created Successfully", [2]);
          refetch()
          navigate(-1);
        },
        onError: error => {
          let errorMessage = error?.response?.data?.errors?.error
            ? error?.response?.data?.errors?.error?.toString()
            : error?.message?.toString();
          message.error(errorMessage, [2]);
        },
      },
    );
  };
  if (location?.state?.edit && editIsLoading) return <p>Loading...</p>;

  return (
    <div className="w-full space-y-10">
      <h3 className="flex items-center gap-4">
        <button
          className=" flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={16} />
        </button>
        {location?.state?.edit ? "Edit Blog" : "Add Blog"}
      </h3>
      <BlogForm
        isEditForm={location?.state?.edit}
        onSubmitHandler={onSubmitHandler}
        // isLoading={editIsLoading}
        editDefaultValues={ editDefaultValues && editDefaultValues?.data}
        isSubmitting={blogMutation?.isLoading}
      />
    </div>
  );
};

export default AddBlog;

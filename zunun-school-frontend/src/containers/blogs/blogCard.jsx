import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import blogImg from "../../assets/images/blogImg3.png";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import React, { useState } from "react";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmModel from "../profile/confirmModel";
import toast from "../../utils/toast";
import { useBlogMutation } from "../../hooks/useMutateData";
import { useAuthContext } from "../../context/authContext";

const BlogCard = ({ blogDataLoading, blogData }) => {
  const navigate = useNavigate();
  const [confirmModel, setConfirmModel] = useState(false);
  const { auth } = useAuthContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState();
  const mutateDeleteAsync = useBlogMutation().mutateAsync;
  const handleDeleteSection = async () => {
    try {
      const response = await mutateDeleteAsync([
        "delete",
        `delete/${selectedDeleteId}`,
        selectedDeleteId,
      ]);
      if (response.success) {
        toast.success("Blog deleted successfully!");
      }
      setConfirmModel(false);
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  return (
    <>
      {blogData?.map(item => {
        if (blogDataLoading) {
          return (
            <div
              key={item?.id}
              className="bg-white rounded-[20px] p-4 mb-6 w-full"
            >
              <ShimmerCategoryItem
                hasImage
                imageType="thumbnail"
                imageWidth={200}
                imageHeight={100}
                title
              />
            </div>
          );
        } else {
          return (
            <>
              <div
                key={item?.id}
                onClick={() =>
                  navigate(`/blog/${item?.id}`, { state: { from: "/blog" } })
                }
              >
                <div className="bg-white rounded-[20px] shadow-md p-4 mb-6 w-full flex items-start gap-4">
                  <div className="">
                    <LazyLoadImage
                      alt="image"
                      src={item?.thumbnail?.url ?? blogImg}
                      className=" max-w-[150px] min-w-[150px] object-cover max-h-[104px] min-h-[104px]"
                    />
                  </div>
                  <div className="text-start flex items-start justify-between w-full">
                    <div>
                      <div className="font-semibold text-lg mb-2 line-clamp-1">
                        {item?.title}
                      </div>
                      <div className="font-normal text-[13px] text-gray-slate line-clamp-3">
                        {ConvertHtmlToPlainText(item?.description)}
                      </div>
                    </div>
                    {auth?.user?.role?.id !== 5 && (
                      <div className="flex items-start gap-2 ">
                        <BiEditAlt
                          className="text-blue cursor-pointer"
                          onClick={e => {
                            e.stopPropagation();
                            navigate(`./create`, {
                              state: {
                                from: "/blog",
                                blogId: item?.id,
                                edit: true,
                              },
                            });
                          }}
                          size={20}
                        />
                        <FaRegTrashAlt
                          onClick={e => {
                            e.stopPropagation();
                            setConfirmModel(true);
                            setSelectedDeleteId(item?.id);
                          }}
                          className="text-red-2 cursor-pointer"
                          size={18}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {confirmModel && (
                <ConfirmModel
                  title={"Delete Blog"}
                  isOpen={confirmModel}
                  setOpen={setConfirmModel}
                  desc={"Are you sure you want to delete this blog?"}
                  btnName={"Delete"}
                  className={"bg-red hover:text-red hover:bg-white"}
                  handleConfirm={() => handleDeleteSection()}
                />
              )}
            </>
          );
        }
      })}
    </>
  );
};

export default BlogCard;

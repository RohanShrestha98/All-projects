import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useWindowsDimensions from "../../components/customHooks/windowsDimesnions";
import BlogBody from "../../containers/blogs/blogBody";
import useChangeLayout from "../../components/customHooks/changeLayout";
import { useBlogData } from "../../hooks/useQueryData";
import ErrorPage from "../../components/errorPage/errorPage";
import { BiArrowBack } from "react-icons/bi";
import { useAuthContext } from "../../context/authContext";
import { RxCross2 } from "react-icons/rx";

const AllBlogs = () => {
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const [searchText, setSearchText] = useState("");
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useBlogData({ search: searchText });
  useEffect(() => {
    changeLayout(width, false, false, "light");
  }, [width]);

  return (
    <div className="space-y-4">
      <div className="title flex w-full justify-between items-center md:px-6 sm:w-full sm:pt-[28px] pb-3 sm:bg-white sm:shadow-md sm:z-[1000] sm:fixed sm:top-0">
        <div className="flex items-center justify-between gap-2">
          <button
            className=" flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
            onClick={() => navigate(-1)}
          >
            <BiArrowBack size={16} />
          </button>
          <h3 className="font-bold sm:text-xl text-2xl ">Blog</h3>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 bg-white  rounded-md outline-none px-4 py-1 ">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="outline-none w-full bg-transparent"
            />
            {searchText && <RxCross2 onClick={() => setSearchText("")} />}
          </div>
          {auth?.user?.role?.id !== 5 && (
            <NavLink
              to={"/blog/create"}
              className="border border-blue  px-4 py-[2px] rounded-md bg-blue text-white hover:bg-white hover:text-blue"
            >
              Create Blog
            </NavLink>
          )}
        </div>
      </div>
      <div className="md:px-6 sm:pt-28">
        <BlogBody blogDataLoading={isLoading} blogData={data?.data} />
        <ErrorPage
          title={"No Blog to show"}
          data={data?.data}
          isFetching={isLoading}
          error={isError}
        />
      </div>
    </div>
  );
};

export default AllBlogs;

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BsArrowRight } from "react-icons/bs";
import {
  ShimmerBadge,
  ShimmerText,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";
import { NavLink } from "react-router-dom";
import english from "../../assets/images/english.png";
import { ButtonSubmit } from "../../components/UI/button";
import { useQueryData } from "../../hooks/useQueryData";
import { MdOutlineFileUpload } from "react-icons/md";
import { useAuthContext } from "../../context/authContext";
import ErrorPage from "../../components/errorPage/errorPage";
import noAssignment from "../../assets/images/noAssignment.png";

const Assignments = ({ initial }) => {
  const { auth } = useAuthContext();
  const isStudent = auth?.user?.role?.id === 5;
  const { data, isLoading, isError } =
    isStudent &&
    useQueryData(
      ["dashboard-assignment-list"],
      `api/v1/assignment/student-list/`,
      [],
      open ? true : false,
    );

  return (
    <div className="flex flex-col w-full gap-4 sm:gap-3">
      <div className="flex flex-row justify-between items-center">
        {isLoading ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          <p className="text-xl font-bold text-black-gray sm:text-lg">
            Assignments
          </p>
        )}
        {isLoading ? (
          <div className="w-32">
            <ShimmerText line={1} />
          </div>
        ) : (
          <NavLink to="/assignment">
            <p className="flex items-center gap-2 text-cyan font-bold flex-shrink-0">
              See All <BsArrowRight className="sm:hidden" />
            </p>
          </NavLink>
        )}
      </div>
      {!isLoading && (
        <p className="text-[15px] text-gray-slate font-medium">This month</p>
      )}
      <div className="grid grid-cols-1 gap-4 ">
        {data?.data &&
          data?.data.slice(0, 3)?.map(item => {
            return (
              <div
                className="flex h-18 rounded-[10px] bg-white w-full px-4 py-4 items-center justify-between sm:block hover:shadow-md sm:px-4"
                key={item.id}
              >
                <div className="flex gap-4 items-center">
                  <div className="h-16 w-16">
                    {initial ? (
                      <ShimmerThumbnail width={70} height={70} />
                    ) : (
                      <LazyLoadImage
                        src={english}
                        alt={english}
                        effect="blur"
                        className="rounded-[10px] sm:rounded-lg object-cover"
                      />
                    )}
                  </div>
                  {isLoading ? (
                    <div className="w-32 ml-4">
                      <ShimmerTitle />
                    </div>
                  ) : (
                    <div className="flex-grow sm:flex sm:justify-between items-center gap-2">
                      <div className="flex sm:inline gap-3">
                        <h2 className="text-[17px] line-clamp-1 font-bold sm:text-[16px]">
                          {item?.title}
                        </h2>
                        <p className="text-[15px] font-medium text-gray-slate sm:text-sm">
                          {item?.openDate.slice(0, 10)}
                        </p>
                      </div>

                      <NavLink to="/assignment/upload" state={{ data: item }}>
                        <div className="w-2/3 hidden sm:flex mt-2 ">
                          <button className="text-base border flex items-center bg-blue hover:bg-blue-3 text-white justify-center py-1 px-1 rounded-md gap-2">
                            <MdOutlineFileUpload size={20} />
                          </button>
                        </div>
                      </NavLink>
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <ShimmerBadge className="sm:hidden" />
                ) : (
                  <NavLink
                    to="/assignment/upload"
                    state={{ data: item }}
                    className="sm:hidden"
                  >
                    <ButtonSubmit
                      isImage={false}
                      color="white"
                      bgColor="cyan"
                      border="none"
                      borderRadius="16px"
                      text="Submit"
                    />
                  </NavLink>
                )}
              </div>
            );
          })}
        {(!data?.data || !isStudent) && (
          <ErrorPage
            emptyImage={noAssignment}
            data={data?.data ?? []}
            isFetching={isLoading}
            error={isError}
            title={"No assignment found"}
          />
        )}
      </div>
    </div>
  );
};

export default Assignments;

/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useLibaryDetailsData } from "../hooks/useQueryData";
import { useEffect, useState } from "react";
import SubCategoryToggle from "./SubCategoryToggle";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import useWindowsDimensions from "../hooks/customHooks/windowsDimesnions";
import ChapterDetails from "./ChapterDetails";
import loading from "../assets/loading.webp";
import NoDataPage from "../components/UI/NoDataPage";

export default function BookDetails() {
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(true);
  const { data, isLoading } = useLibaryDetailsData({
    idx: location?.state?.id,
  });

  const width = useWindowsDimensions();

  useEffect(() => {
    if (width < 768) {
      setOpenSidebar(false);
    }
  }, [width]);

  return (
    <div>
      {isLoading ? (
        <div className="h-[80vh] flex  items-center justify-center">
          <img className="w-20 h-20" src={loading} alt="" />
        </div>
      ) : data ? (
        <div>
          <Header title={`${data?.title}`} isBack={true} isProfile={false} />
          <div
            className={`w-full flex gap-10 md:gap-0
             ${
               openSidebar ? "justify-between" : ""
             } bg-white rounded-md  mt-4 sm:mt-0`}
          >
            {openSidebar ? (
              <div
                className={`${
                  openSidebar
                    ? "w-1/3  sm:w-[90%] sm:absolute z-50  h-screen no-scrollbar overflow-auto"
                    : ""
                }  h-[84vh] overflow-auto no-scrollbar bg-[#FDFCFC] `}
              >
                <div className="flex items-center justify-between gap-4 px-4 pt-4 pb-2">
                  <p className="text-blue-700 text-lg  line-clamp-1 font-semibold ">
                    {" "}
                    {data?.title?.slice(0, 20)}
                  </p>
                  <AiOutlineMenuFold
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className="text-blue-700 cursor-pointer font-semibold"
                    size={22}
                  />
                </div>
                {data?.chapters?.map((item, index) => {
                  return (
                    <div key={item?.id} className="border-b border-gray-100">
                      {" "}
                      <SubCategoryToggle
                        item={item}
                        index2={-1}
                        index={index}
                        setOpenSidebar={setOpenSidebar}
                        width={width}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="m-4 sm:m-0 z-50  sm:mt-4 sm:mr-2 sm:absolute ">
                <AiOutlineMenuUnfold
                  onClick={() => setOpenSidebar(!openSidebar)}
                  className="text-blue-700 sm:bg-white  cursor-pointer font-semibold"
                  size={22}
                />
              </div>
            )}
            <div
              id="containerElement"
              className={`${
                openSidebar
                  ? "w-2/3 sm:w-full"
                  : "sm:w-[100%] w-[80%] mr-10 sm:mr-0 "
              }  h-[84vh]  mt-4 sm:pr-0 overflow-auto pr-6 no-scrollbar`}
            >
              <h1 className="text-sm font-normal">
                {" "}
                <b> Author: </b>
                {data?.author}
              </h1>
              {data?.chapters?.map((item, index) => {
                return (
                  <>
                    <ChapterDetails
                      key={index}
                      index={index}
                      index2={-1}
                      item={item}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <NoDataPage />
      )}
    </div>
  );
}

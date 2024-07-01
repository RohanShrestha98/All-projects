import React from "react";
import { useState } from "react";
// import AddCycle from "./addCycle";
import { useQueryData } from "../../hooks/useQueryData";
import AddGrading from "./addGrading";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "../../components/errorPage/errorPage";
import { ImArrowLeft2 } from "react-icons/im";

export default function Grading() {
  const [open, setOpen] = useState();
  const location = useLocation();
  const { data, isError, isLoading, isFetching } = useQueryData(
    ["grading", location?.state?.id],
    `api/v1/grading-report/details/${location?.state?.id}`,
    "",
    !!location?.state?.id,
  );

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
            onClick={() => navigate(-1)}
          >
            <ImArrowLeft2 size={16} />
          </div>
          <h1 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
            Grading
          </h1>
        </div>

        <button
          className="border-2 border-blue px-4 py-[2px] cursor-pointer text-white bg-blue font-semibold hover:text-blue hover:bg-white rounded"
          onClick={() => setOpen(!open)}
        >
          Update Grading Point
        </button>
        {open && (
          <AddGrading
            open={open}
            setOpen={setOpen}
            studentId={location?.state?.id}
          />
        )}
      </div>
      <div className="mt-6 bg-white  rounded-2xl">
        <div className="flex">
          {data?.data?.courses?.slice(0, 1)?.map(item => {
            return (
              <div key={item?.id} className="min-w-[160px]">
                <p className=" text-center py-2 border-b-2  rounded-tl-2xl  bg-cyan text-white font-semibold border-gray-dark3 ">
                  Unit
                </p>
                {item?.units?.map(item2 => {
                  return (
                    <div key={item2?.id} className="">
                      <p className="py-1 px-3 font-semibold text-gray-4 text-center border-transparent border-b">
                        {item2?.name}
                      </p>
                      <div className="">
                        {item2?.grades?.slice(0, -1)?.map((item3, index) => {
                          return (
                            <div key={item3?.id}>
                              <p
                                className={`py-1 text-transparent ${
                                  index === item2?.grades?.length - 3 ||
                                  index === item2?.grades?.length - 2
                                    ? "border-b-transparent"
                                    : "border-b"
                                } `}
                              >
                                p
                              </p>
                              {index === item2?.grades?.length - 3 && (
                                <p className="bg-[#E8E9EA] font-semibold text-gray-4 text-center py-1">
                                  Sub Total
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className=" bg-[#E6F3F9] text-cyan font-semibold  text-center py-1">
                        Total
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {data?.data?.courses?.slice(0, 1)?.map(item => {
            return (
              <div key={item?.id} className="min-w-[200px]">
                <p className=" text-center bg-cyan text-white font-semibold  min-w-[200px] py-2 border-b-2 border-gray-dark3">
                  Grading
                </p>
                {item?.units?.map(item2 => {
                  return (
                    <div key={item2?.id} className="">
                      {/* <p>{item2?.name}</p> */}
                      <div className="">
                        {item2?.grades?.map((item3, index) => {
                          return (
                            <div key={item3?.id} className={``}>
                              <p
                                className={`py-1 ${
                                  index === item2?.grades?.length - 2 ||
                                  index === item2?.grades?.length - 1
                                    ? "border-b-transparent"
                                    : "border-b"
                                }   border-l border-gray-6 px-2`}
                              >
                                {item3?.title}
                              </p>
                              {index === item2?.grades?.length - 2 && (
                                <p className="bg-[#E8E9EA] py-1  border-l border-gray-6 px-2">
                                  {item2?.subTotal ?? 0}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className=" bg-[#E6F3F9] text-cyan py-1 border-l px-2 border-gray-6">
                        {item2?.total ?? 0}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {data?.data?.courses?.map(item => {
            return (
              <div key={item?.id}>
                <p className=" text-center bg-cyan text-white font-semibold py-2 border-b-2 border-gray-dark3 min-w-[200px]">
                  {item?.name}
                </p>
                {item?.units?.map(item2 => {
                  return (
                    <div key={item2?.id} className=" ">
                      <div className="">
                        {item2?.grades?.map((item3, index) => {
                          return (
                            <div key={item3?.id} className="">
                              <p
                                className={`py-1 border-l border-gray-6 ${
                                  index === item2?.grades?.length - 2 ||
                                  index === item2?.grades?.length - 1
                                    ? "border-b-transparent"
                                    : "border-b"
                                } px-2`}
                              >
                                {item3?.point ?? 0}
                              </p>
                              {index === item2?.grades?.length - 2 && (
                                <p className="bg-[#E8E9EA] py-1 border-l border-gray-6 px-2">
                                  {item2?.subTotal ?? 0}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className=" bg-[#E6F3F9] text-cyan py-1 border-l  border-gray-6 px-2">
                        {item2?.total ?? 0}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {!data?.data?.courses && (
        <ErrorPage
          data={[]}
          isFetching={false}
          error={false}
          title={"No grading details to show "}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ShimmerBadge,
  ShimmerCircularImage,
  ShimmerText,
} from "react-shimmer-effects";
import { BsCheckCircle } from "react-icons/bs";
import fileImg from "../../../assets/images/file.png";
import arrowUpImg from "../../../assets/images/arrowUp.png";
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

const EachAssignment = ({ isOverdue, isSubmitted, isGraded, data }) => {
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  return (
    <>
      {data?.map(item => {
        return (
          <div
            key={item.id}
            className="mb-4 shadow-md bg-white rounded-[12px] flex items-center sm:justify-between sm:p-2"
          >
            <div className="flex items-center w-[40%] sm:w-[100px] md:[25%]">
              {initial ? (
                <div className="mx-2 mt-2">
                  <ShimmerCircularImage />
                </div>
              ) : (
                <div
                  className="bg-[#00B9D6] h-16 w-16 
            rounded-full flex justify-center object-cover
            items-center my-4 mr-4 ml-7 md:h-10 md:w-10 sm:hidden"
                >
                  <img src={fileImg} alt="img" />
                </div>
              )}
              <div className="sm:pl-2">
                {initial ? (
                  <div className="w-32">
                    <ShimmerText line={1} />
                  </div>
                ) : (
                  <div className="font-medium text-lg mb-2 tracking-[0.03em] md:text-[15px] sm:tracking-tight sm:mb-1">
                    {item.title}
                  </div>
                )}
                {initial ? (
                  <ShimmerText line={1} />
                ) : (
                  <div className="font-normal text-[15px] text-[#6f6f6f] tracking-[0.03em] md:text-[12px]">
                    Course name
                  </div>
                )}
              </div>
            </div>
            <div className="font-semibold text-[15px] tracking-[0.03em] w-[20%] md:w-[25%] sm:hidden text-center">
              {initial ? (
                <div className="w-32">
                  <ShimmerText line={1} />
                </div>
              ) : (
                <>{item.openDate.slice(0, 10)}</>
              )}
            </div>
            <div
              className={`font-semibold text-[15px] w-[20%] md:w-[25%] sm:hidden text-center tracking-[0.03em] ${
                isOverdue ? "text-[#F20D0D]" : "text-[#000000]"
              }`}
            >
              {initial ? (
                <div className="w-32">
                  <ShimmerText line={1} />
                </div>
              ) : (
                <>{item.dueDate.slice(0, 10)}</>
              )}
            </div>
            {isSubmitted ? (
              <>
                {initial ? (
                  <ShimmerBadge />
                ) : (
                  <NavLink
                    to={`${
                      item?.submissionStatus === "DUE"
                        ? "/assignment/upload"
                        : "/assignment/submitted"
                    }`}
                    state={{ data: item }}
                    className="w-[20%] sm:w-10 "
                  >
                    <div className="flex justify-center sm:block">
                      <div className=" font-semibold text-[26px] text-center cursor-pointer ">
                        {" "}
                        {item?.submissionStatus === "DUE" ? (
                          <button className="text-base border flex items-center bg-blue hover:bg-blue-3 text-white justify-center w-32 sm:w-10   py-1 rounded-md gap-2">
                            <MdOutlineFileUpload size={20} />{" "}
                            <p className="sm:hidden">Upload</p>
                          </button>
                        ) : item?.submissionStatus === "SUBMITTED" ? (
                          <button className="text-base border flex items-center bg-blue hover:bg-blue-3 text-white justify-center w-32 sm:w-10  py-1 rounded-md gap-2">
                            <AiOutlineEdit size={20} />{" "}
                            <p className="sm:hidden">Edit</p>
                          </button>
                        ) : (
                          <button className="text-base border flex items-center bg-blue hover:bg-blue-3 text-white justify-center  w-32 sm:w-10  py-1 rounded-md gap-2">
                            <AiOutlineEye size={20} />{" "}
                            <p className="sm:hidden">View</p>
                          </button>
                        )}
                      </div>
                    </div>
                  </NavLink>
                )}
              </>
            ) : isGraded ? (
              <>
                {initial ? (
                  <div className="w-32">
                    <ShimmerText line={1} />
                  </div>
                ) : (
                  <div className="font-medium text-[#1fad53] text-[17px] w-[20%] md:w-[25%] ml-2">
                    <NavLink
                      to="/assignment/submitted"
                      state={{ data: item }}
                      className="flex justify-center items-center gap-1"
                    >
                      <div>Graded</div> <BsCheckCircle size={15} />
                    </NavLink>
                  </div>
                )}
              </>
            ) : (
              <>
                {initial ? (
                  <ShimmerCircularImage size={20} />
                ) : (
                  <div className="flex justify-center  w-[20%] md:w-[25%] ">
                    <NavLink to="/assignment/upload">
                      <img src={arrowUpImg} alt="img" />
                    </NavLink>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default EachAssignment;

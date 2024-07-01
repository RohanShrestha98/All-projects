import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { ShimmerText, ShimmerCircularImage } from "react-shimmer-effects";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import logicImg from "../../../assets/images/logic.png";
import teamImg from "../../../assets/images/team.png";
import techImg from "../../../assets/images/tech.png";
import readImg from "../../../assets/images/reading.png";
import userImg from "../../../assets/images/mdiuser.png";
import GradeTable from "../../../containers/courses/eachGrades/gradeTable";
import DoughnutChart from "../../../containers/courses/eachGrades/doughnut";
import "../../../containers/courses/courses.css";

const EachSubGradesPage = () => {
  const statisticsItem = [
    {
      image: logicImg,
      title: "Logical Thinking",
      color: "#FF526B",
    },
    {
      image: readImg,
      title: "Reading",
      color: "#A6EA14",
    },
    {
      image: teamImg,
      title: "Teamwork",
      color: "#00B9D6",
    },
    {
      image: techImg,
      title: "Technology",
      color: "#FFE100",
    },
  ];

  const width = useWindowsDimensions();

  const { changeLayout } = useChangeLayout();

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  return (
    <div className="overflow-hidden each-grade">
      <div className="sm:bg-white sm:w-full sm:fixed sm:top-0 sm:shadow-md sm:z-[1000] sm:pt-[28px] sm:pb-3 md:px-6">
        {initial ? (
          <div className="flex justify-center">
            <div className="w-32 text-center">
              <ShimmerText line={1} />
            </div>
          </div>
        ) : (
          <div className="flex items-center each-grade">
            <NavLink to="/courses" state={{ active: "3" }}>
              <HiOutlineArrowLeft className="cursor-pointer mr-2" />
            </NavLink>
            <div className="w-full font-bold text-xl flex justify-center sm:justify-start">
              Subject Name
            </div>
          </div>
        )}
      </div>
      <div className="md:px-6 sm:pt-24">
        {initial ? (
          <div className="flex justify-center">
            <div className="w-1/2 text-center sm:w-full sm:px-3">
              <ShimmerText line={1} />
            </div>
          </div>
        ) : (
          <div className="mt-4 mb-10 font-normal text-[16px] text-center">
            Following is the grade sheet of all the subjects of &#39;Subject
            Name&#39; faculty
          </div>
        )}
        <GradeTable initial={initial} />
        {initial ? (
          <div className="sm:w-full w-1/2 sm:px-3">
            <ShimmerText line={1} />
          </div>
        ) : (
          <div className="font-medium text-lg text-gray-9 mt-4 mb-[38px] md:mx-3">
            Observation: The student did well and his hard work shows.
            CONGRATULATIONS.
          </div>
        )}

        {!initial && (
          <div className="mb-4 font-bold text-xl md:mx-3">Statistics</div>
        )}
        <div className="grid grid-cols-6 md:mx-3 sm:mx-2">
          <div className="col-start-1 col-end-4 w-full sm:hidden md:col-start-1 md:col-end-2">
            {statisticsItem.map((item, id) => {
              return (
                <div key={id} className="flex items-center gap-x-4 mb-6 w-full">
                  {initial ? (
                    <ShimmerCircularImage size={25} />
                  ) : (
                    <img
                      src={item.image}
                      alt="img"
                      className="w-[25px] h-[25px]"
                    />
                  )}
                  {initial ? (
                    <div className="w-20">
                      <ShimmerText line={1} />
                    </div>
                  ) : (
                    <div className="font-bold text-[16px] text-gray-light">
                      {item.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className=" col-start-4 col-end-7 flex items-start sm:justify-between md:col-start-3 md:col-end-7 sm:col-start-1 sm:col-end-7">
            <div className="w-40 h-40  relative">
              <DoughnutChart />
              <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                <img src={userImg} alt="img" />
              </div>
            </div>
            <div className="ml-[82px] sm:ml-0">
              {statisticsItem.map((item, id) => {
                return (
                  <div
                    key={id}
                    className="flex items-center gap-x-4 mb-6 w-full"
                  >
                    {!initial && (
                      <div
                        className={`w-[12px] h-[12px] rounded-full`}
                        style={{ backgroundColor: item.color }}
                      ></div>
                    )}
                    {initial ? (
                      <div className="w-20">
                        <ShimmerText line={1} />
                      </div>
                    ) : (
                      <div className="font-medium text-[15px] text-gray-light">
                        {item.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachSubGradesPage;

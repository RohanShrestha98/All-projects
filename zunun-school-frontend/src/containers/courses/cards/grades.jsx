import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShimmerTable, ShimmerText } from "react-shimmer-effects";

const Grades = () => {
  const navigate = useNavigate();

  const [initial, setInitial] = useState(true);

  const columns = [
    {
      title: " Course Name",
      dataIndex: "courseName",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      align: "right",
    },
  ];

  const data = [
    {
      key: "1",
      courseName: "John Brown",
      grade: 3.2,
    },
    {
      key: "2",
      courseName: "Jim Green",
      grade: 3.2,
    },
    {
      key: "3",
      courseName: "Joe Black",
      grade: 3.2,
    },
    {
      key: "4",
      courseName: "Joe Black",
      grade: 2.9,
    },
    {
      key: "5",
      courseName: "Joe Black",
      grade: 3.2,
    },
    {
      key: "6",
      courseName: "Joe Black",
      grade: 3.0,
    },
    {
      key: "7",
      courseName: "Joe Black",
      grade: 2.75,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [1000]);
  }, []);

  return (
    <div className=" space-y-4">
      {initial ? (
        <div className="w-1/2 sm:w-full">
          <ShimmerText line={1} />
        </div>
      ) : (
        <h1 className="font-medium text-lg mb-7">
          Here are your grades of the courses you've completed
        </h1>
      )}
      {initial ? (
        <ShimmerTable row={4} col={2} />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="font-semibold text-[15px] flex justify-between h-10 px-7 cursor-pointer">
              {columns.map((column, index) => {
                return <th key={index}>{column.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((data, id) => {
              return (
                <tr
                  onClick={() => navigate(`/grades/${id}`)}
                  key={id}
                  className={`font-nromal text-[15px] flex cursor-pointer justify-between items-center px-7 h-10 ${
                    id % 2 === 0 ? "bg-white" : "bg-blue-2"
                  }`}
                >
                  <td>{data.courseName}</td>
                  <td>{data.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Grades;

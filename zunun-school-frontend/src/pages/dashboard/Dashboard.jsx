import React from "react";
import WelcomePage from "../../containers/home/welcomePage";
import { HiOutlineUserGroup } from "react-icons/hi";
import { VerticalBarGraph } from "../../components/charts/VerticalBarGraph";
import { Calendar } from "antd";

export default function Dashboard() {
  const dashboard = [
    {
      id: "1",
      title: "Total Students",
      total: "100",
      icon: <HiOutlineUserGroup className="w-4 h-4" />,
    },
    {
      id: "2",
      title: "Total Courses",
      total: "10",
      icon: <HiOutlineUserGroup className="w-4 h-4" />,
    },
    {
      id: "3",
      title: "Total Grades",
      total: "15",
      icon: <HiOutlineUserGroup className="w-4 h-4" />,
    },
    {
      id: "4",
      title: "Total Sections",
      total: "3",
      icon: <HiOutlineUserGroup className="w-4 h-4" />,
    },
    {
      id: "5",
      title: "Attendance",
      total: "100",
      icon: <HiOutlineUserGroup className="w-4 h-4" />,
    },
  ];
  const labels = ["A", "B", "C", "D", "E"];

  const data = {
    labels,
    datasets: [
      {
        label: "Course",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "#1677ff",
      },
    ],
  };

  return (
    <div>
      <WelcomePage />
      <div className="flex gap-4 my-10 flex-wrap">
        {dashboard &&
          dashboard?.map(item => (
            <div
              key={item.id}
              className="rounded-2xl bg-white min-w-[180px] w-[18.6%] flex-grow xl:w-[23%] md:w-[28%] md:min-w-[140px] sm:w-[46%] sm:min-w-[100px] px-7 py-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div> {item.icon}</div>
                <p>{item.title}</p>
              </div>
              <h1 className="font-semibold text-3xl">{item.total}</h1>
            </div>
          ))}
      </div>
      <div className="flex gap-3 flex-wrap">
        <div className="w-[30%] xl:w-[46%]  md:w-full flex-grow bg-white p-4  rounded-lg">
          <p className="text-base">Course progress by Section</p>
          <p className="text-base ">(By percentage)</p>
          <VerticalBarGraph data={data} />
        </div>
        <div className="w-[30%] xl:w-[46%]  md:w-full flex-grow bg-white p-4  rounded-lg">
          <p className="text-base">Attendance this week</p>
          <p className="text-base ">Progress increased this week</p>
          <VerticalBarGraph data={data} />
        </div>
        <div className="w-[30%] xl:w-[46%] md:w-full flex-grow">
          <Calendar fullscreen={false} className="p-4 rounded-lg" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center mt-8 bg-white px-8 py-2 rounded-lg">
        <p className="font-bold text-lg">Student List</p>
        <input
          type="text"
          className="border border-gray-dark3 outline-none bg-gray-6 h-8 rounded-lg"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

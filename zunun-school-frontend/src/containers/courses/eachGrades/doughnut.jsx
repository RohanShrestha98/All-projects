import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";
//import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

ChartJS.register(ArcElement, Tooltip, Legend);

const color = ["#FF526B", "#A6EA14", "#00B9D6", "#FFE100"];

const dougnutdata = {
  datasets: [
    {
      label: "",
      data: [40, 30, 15, 15],
      borderColor: color,
      backgroundColor: color,
      borderWidth: 1,
    },
  ],
};

// const pieData = [
//   {
//     name:"A", value:40
//   },
//   {
//     name:"B", value:30
//   },
//   {
//     name:"C", value:15
//   },
//   {
//     name:"D", value:15
//   },
// ]

const DoughnutChart = () => {
  return (
    <Doughnut
      data={dougnutdata}
      options={{
        cutout: 65,
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
    // <ResponsiveContainer aspect={1}>
    // <PieChart >
    //   <Pie data={pieData}
    //   color="#000000"
    //   dataKey="value"
    //   nameKey="name"

    //   outerRadius={120}
    //   innerRadius={100}
    //   fill="#8884d8"

    //   >
    //       {pieData.map((entry, index) => (
    //     <Cell
    //        key={`cell-${index}`}
    //        fill={color[index % color.length]}
    //     />
    //  ))}
    //   </Pie>
    // </PieChart>
    // </ResponsiveContainer>
  );
};

export default DoughnutChart;

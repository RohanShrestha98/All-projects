import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// import { Chart, XAxis, YAxis, Title } from "highcharts";
// require("highcharts/highcharts-more")(Highcharts);
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts);

const BubbleChart = () => {
  // const options = {
  //   chart: { type: "column" },
  //   legend: "",
  //   title: {
  //     text: "New Users"
  //   },
  //   xAxis: {
  //     // labels: {
  //     //   formatter: function () {
  //     //     return "";
  //     //   }
  //     // },
  //     title: {
  //       text: "Date"
  //     },
  //     gridLineWidth: 0
  //     // categories: ["Nov 14", "Nov 15", "Nov 16"]
  //   },
  //   yAxis: {
  //     // for labels in axixs
  //     // labels: {
  //     //   formatter: function () {
  //     //     return "";
  //     //   }
  //     // },
  //     title: {
  //       text: "No. of users"
  //     },
  //     gridLineWidth: 0
  //   },
  //   series: [
  //     {
  //       data: [
  //         { name: "Nov 1", y: 1, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 1, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 1, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 2, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 4, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 4, color: "#a2ebfa" },
  //         { name: "Nov 1", y: 5, color: "#a2ebfa" }
  //       ]
  //     }
  //   ]
  // };
  const options = {
    chart: {
      type: "packedbubble",
      height: "70%",
    },
    title: {
      text: "",
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}m CO<sub>2</sub>",
    },
    plotOptions: {
      packedbubble: {
        minSize: "20%",
        maxSize: "190%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.1,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 0,
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
            fontStyle: "Poppins",
          },
        },
      },
    },
    series: [
      {
        name: "Yearly Exam",
        data: [
          {
            name: "First Term",
            value: 30,
            color: "#00bad6",
          },
          {
            name: "Second Term",
            value: 20,
            color: "#fab82a",
            title: "quick recall",
          },
          {
            name: "Final",
            value: 50,
            color: "#ff58f9",
          },
        ],
      },
    ],
  };
  return (
    <div className="chart_container">
      <div className="subject_chart_container">
        <HighchartsReact
          className="chart"
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </div>
  );
};

export default BubbleChart;

import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// import { Chart, XAxis, YAxis, Title } from "highcharts";

import "./Charts.scss";

const Charts = () => {
  const options = {
    chart: {
      type: "area"
    },
    accessibility: {
      description: "New Users chart"
    },
    title: {
      text: ""
    },
    // subtitle: {
    //   text:
    //     'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
    //     'target="_blank">FAS</a>'
    // },
    xAxis: {
      allowDecimals: false,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      gridLineWidth: 0
      // labels: {
      //   formatter: function () {
      //     return this.value;
      //   }
      // },
      // accessibility: {
      //   rangeDescription: "Range: 2021 to 2022."
      // }
    },
    yAxis: {
      title: {
        text: "No. of users"
      },
      borderWidth: 20,
      gridLineWidth: 0,

      labels: {
        formatter: function () {
          return this.value;
        }
      }
    },
    tooltip: {
      pointFormat: "{series.name} <b>{point.y:,.0f}</b><br/> in {point.x}"
    },
    plotOptions: {
      area: {
        borderWidth: "20",

        pointStart: 2021,

        color: "#a2ebfa",
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [
      {
        name: "Users",
        data: [10, 12, 15, 18, 12, 12, 12, 12, 12]
      }
    ]
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

export default Charts;

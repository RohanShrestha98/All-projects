import React from "react";
import { ShimmerBadge, ShimmerText, ShimmerThumbnail } from "react-shimmer-effects";
import AntdSelect from "./antdSelect";
import { LineCharts } from "../../components/charts/lineChart";


const Statistics = ({initial}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center mb-4 sm:hidden sm:mb-0">
        {initial ? <div className="w-32"><ShimmerText line={1}/></div> : <p className="text-xl font-bold">Statistics</p>}
        {initial ? <ShimmerBadge line={1}/>: <AntdSelect />}
      </div>
      <div className="w-full bg-white items-center justify-center rounded-md px-4 py-4 sm:px-0">
        {initial ? <ShimmerThumbnail/> : 
        <LineCharts/>
        }
      </div>
    </div>
  );
};

export default Statistics;

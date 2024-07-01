/* eslint-disable react/prop-types */
import nodata from "../../assets/nodata.jpg";
export default function NoDataPage({ messege }) {
  return (
    <div className="flex flex-col items-center mt-20">
      <img src={nodata} className="w-96" alt="" />
      <p className="text-xl ">{messege}</p>
    </div>
  );
}

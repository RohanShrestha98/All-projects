import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function NoticeDetails() {
  const location = useLocation();
  const data = location?.state?.data;
  return (
    <div className="">
      <Header title={data?.title} isBack={true} />
      <h1 className="text-[#072D4B] font-semibold font-md mt-2">
        {data?.title}
      </h1>
      <p className="text-gray-500">{data?.description}</p>
      {data?.uploaded_file && (
        <a
          href={data?.uploaded_file}
          target="__blank"
          className="text-sm font-medium underline"
        >
          Click to View
        </a>
      )}
    </div>
  );
}

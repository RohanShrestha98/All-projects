/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function OpeningCard({ item }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F8F9FC] p-6 rounded-md">
      <h1 className="text-[#363F72] font-normal text-lg">{item?.title}</h1>
      <p className="border inline-block mt-2 bg-[#E3E5F2] rounded-full px-3 text-xs">
        {item?.level}
      </p>
      <p className="list-disc flex items-center gap-1 mt-2 text-xs text-[#596273]">
        <div className="w-[6px] h-[6px] bg-[#596273] rounded-full"></div>
        Application Deadline : {item?.deadline}
      </p>
      <p className="list-disc text-xs flex items-center gap-1  text-[#596273]">
        <div className="w-[6px] h-[6px] bg-[#596273] rounded-full"></div>
        Post Opening : {item?.opening}
      </p>
      <Button
        handleButtonClick={() => navigate("/career-detail")}
        buttonName={"Apply now"}
        className={"w-full mt-10 py-1 text-sm"}
      />
    </div>
  );
}

import DescriptionText from "../../components/DescriptionText";
import Heading from "../../components/Heading";
import img1 from "../../assets/hiring1.svg";
import img2 from "../../assets/hiring2.svg";
import img3 from "../../assets/hiring3.svg";
import img4 from "../../assets/hiring4.svg";
import { useEffect, useState } from "react";

export default function Hiring() {
  const [selected, setSelected] = useState();
  const hiringData = [
    {
      id: 1,
      img: img1,
      title: "On-Site Interview",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus",
    },
    {
      id: 2,
      img: img2,
      title: "Task Assignment",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus",
    },
    {
      id: 3,
      img: img3,
      title: "Final Selection and Onboarding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus",
    },
    {
      id: 4,
      img: img4,
      title: "Contract Signing and Project Assignment",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus",
    },
  ];
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (count === 3) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    }, 2000);
    setSelected(hiringData?.[count]);
  }, [count]);

  return (
    <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4  py-16">
      <div className="flex flex-col justify-center items-center gap-6">
        <Heading title={"Our Hiring Process"} />
        <DescriptionText
          className={"w-[50%] md:w-[90%] text-center"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        />
        <div className="flex justify-between md:flex-col w-full gap-12 mt-6">
          <div className="flex gap-6 md:flex-col">
            <img src={selected?.img ?? hiringData?.[0]?.img} alt="" />
            <div className="flex flex-col  gap-5">
              <h1 className="text-[#3E4784] text-base font-semibold">
                {selected?.title ?? hiringData?.[0]?.title}
              </h1>
              <p className="text-[#667085] leading-loose">
                {selected?.desc ?? hiringData?.[0]?.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:hidden">
            {hiringData?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className={`cursor-pointer border w-9 h-9 rounded-full flex items-center justify-center ${
                    selected?.id === item?.id ? "bg-[#3E4784] text-white" : ""
                  }`}
                  // onClick={() => {
                  //   setSelected(item);
                  // }}
                >
                  {item?.id}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

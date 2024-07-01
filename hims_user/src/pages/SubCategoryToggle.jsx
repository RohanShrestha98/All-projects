import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-scroll";
/* eslint-disable react/prop-types */
export default function SubCategoryToggle({
  item,
  index,
  index2,
  width,
  setOpenSidebar,
}) {
  const [active, setActive] = useState(false);
  return (
    <div key={item?.id} className="ml-4 mb-2 mt-2">
      <Link
        onClick={() => {
          width < 480 && setOpenSidebar(false);
          setActive(!active);
        }}
        activeClass="activeScroll"
        spy={true}
        smooth={true}
        duration={500}
        containerId="containerElement"
        to={item?.idx}
        className={`font-medium flex  gap-2 text-sm cursor-pointer line-clamp-1 text-gray-500
        `}
      >
        <IoIosArrowForward className="min-w-[16px] min-h-[16px]" />
        {index + 1 + "."}
        {index2 !== -1 && <>{index2 + 1 + "."}</>}
        {item?.title}
      </Link>
      {active &&
        item?.sub_chapter?.map((item2, index2) => {
          return (
            <SubCategoryToggle
              key={item2?.id}
              item={item2}
              index={index}
              index2={index2}
            />
          );
        })}
    </div>
  );
}

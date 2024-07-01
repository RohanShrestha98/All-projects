import React from "react";
import revision from "../../assets/revision.svg";
import dmodal from "../../assets/3dmodal.svg";
import discussion from "../../assets/discussion.svg";
import resources from "../../assets/resources.svg";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const navigate = useNavigate();
  const links = [
    {
      id: 1,
      name: "3D Modal",
      image: dmodal,
      bgColor: "bg-[#FAF4E5]",
      link: "/",
    },
    {
      id: 2,
      name: "Discussion",
      image: discussion,
      bgColor: "bg-[#E5FAEB]",
      link: "/discussion",
    },
    {
      id: 3,
      name: "Revision",
      image: revision,
      bgColor: "bg-[#F5E5FA]",
      link: "/bookmarks",
    },
    {
      id: 4,
      name: "Resources",
      image: resources,
      bgColor: "bg-[#FAE5E5]",
      link: "",
    },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-3">
      <section className="flex items-center gap-3">
        <span className="border border-l-1 h-4 text-[#595959] md:hidden" />
        <h2 className="text-base font-semibold md:text-xs font-semi-bold text-[#595959]">
          Quick Links
        </h2>
      </section>
      <section className="flex md:grid md:grid-cols-2 gap-4 md:gap-2 overflow-x-auto no-scrollbar pl-3 md:pl-0 ">
        {links?.map((item) => {
          return (
            <div
              key={item?.id}
              onClick={() => navigate(`${item?.link}`)}
              className={`${item?.bgColor} min-w-[220px] md:min-w-[165px] flex gap-2 items-center px-2 py-4 md:py-2 rounded-xl cursor-pointer`}>
              <img
                src={item?.image}
                className="p-[14px] lg:h-12 lg:p-3 md:p-2 rounded-full bg-white"
              />
              <h4 className="text-black text-base md:text-sm">{item?.name}</h4>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default QuickLinks;

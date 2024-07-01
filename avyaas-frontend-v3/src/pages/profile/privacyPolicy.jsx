import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShimmerText, ShimmerTitle } from "react-shimmer-effects";
import LeftMenu from "../../containers/profile/leftMenu";
import { LeftArrowSvg } from "../../assets/allSvg";
import useChangeLayout from "../../hooks/useChangeLayout";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";

const PrivacyPolicy = () => {
  const width = useWindowsDimensions();

  const { changeLayout } = useChangeLayout();

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (initial) {
        setInitial(false);
      }
    }, [500]);
  }, []);

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const itemsList = [
    {
      title: "Types of Data We Collect",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem",
    },
    {
      title: "Types of Data We Collect",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem",
    },
    {
      title: "Types of Data We Collect",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem",
    },
    {
      title: "Types of Data We Collect",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem",
    },
    {
      title: "Types of Data We Collect",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem",
    },
  ];

  return (
    <div className="flex flex-col">
      {!initial && (
        <p className="font-bold text-3xl block sm:hidden md:pl-3">Profile</p>
      )}
      <div className="flex sm:block">
        <div className="min-w-fit block sm:hidden">
          <LeftMenu initial={initial} />
        </div>
        <div className="w-[80%] ml-20 mt-[43px] sm:mt-0 sm:w-[100%] sm:ml-0 ">
          <div className="px-6 flex items-center sm:fixed sm:top-0 sm:shadow-md sm:w-full sm:pt-[28px] sm:pb-3 sm:z-[1000]  sm:bg-white">
            {!initial && (
              <Link to="/profile">
                <LeftArrowSvg className="cursor-pointer mr-[15px] hidden sm:inline" />
              </Link>
            )}
            {initial ? (
              <div className="w-32">
                <ShimmerTitle line={1} />
              </div>
            ) : (
              <div className="font-bold text-2xl tracking-[0.03em] sm:text-black-gray sm:text-xl">
                Privacy Policy
              </div>
            )}
          </div>
          <div className="sm:mt-28 px-6">
            {itemsList.map((item, id) => {
              return (
                <div key={id} className="mt-7">
                  {initial ? (
                    <div className="w-32">
                      <ShimmerTitle line={1} />
                    </div>
                  ) : (
                    <div className="font-semibold text-[17px] tracking-wider mb-4">
                      {item.title}
                    </div>
                  )}
                  {initial ? (
                    <div>
                      <ShimmerText line={3} />
                    </div>
                  ) : (
                    <div className="font-normal text-sm text-gray-dark tracking-[0.03em]">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

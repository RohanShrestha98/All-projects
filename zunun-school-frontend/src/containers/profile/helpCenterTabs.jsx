import React from "react";
import { Tabs } from "antd";
import "./helpCenterTabs.css";
import FAQ from "./Faq";
import ContactUs from "./contactUs";
import { ShimmerBadge } from "react-shimmer-effects";

const HelpCenterTabs = ({ initial, activeTab }) => {
  const items = [
    {
      key: "1",
      label: (
        <div className="px-4 py-1 flex items-center justify-center h-[32px] sm:w-[100px]">
          <span className="font-bold text-[16px]">FAQ</span>
        </div>
      ),
      children: <FAQ />,
    },
    {
      key: "2",
      label: (
        <div className="py-1 flex items-center justify-center px-4 sm:w-[100px] h-[32px] ">
          <span className="font-bold text-[16px]">Contact us</span>
        </div>
      ),
      children: <ContactUs />,
    },
  ];

  return (
    <div className="w-full help-center">
      {initial ? (
        <div className="flex gap-x-2">
          <div>
            <ShimmerBadge />
          </div>
          <div>
            <ShimmerBadge />
          </div>
        </div>
      ) : (
        <Tabs defaultActiveKey={activeTab} items={items} />
      )}
    </div>
  );
};

export default HelpCenterTabs;
